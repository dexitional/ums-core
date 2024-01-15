import { Request, Response, NextFunction } from "express";
import { v4 as uuid } from 'uuid';
import EvsModel from '../model/evsModel'
import AuthModel from '../model/authModel'
import { PrismaClient } from '../prisma/client/ums'
import moment from "moment";
//import sha1 from "sha1";
import { getGrade, getGradePoint } from "../util/helper";
const ais = new PrismaClient()
const evs = new EvsModel();
const Auth = new AuthModel();
const sha1 = require('sha1');


export default class AisController {
     
     /* Student */
     async fetchStudents(req: Request,res: Response) {
        const { page = 1, pageSize = 6, keyword = '' } :any = req.query;
        const offset = (page - 1) * pageSize;
        let searchCondition = { }
        try {
           if(keyword) searchCondition = { 
              where: { 
               OR: [
                  { fname: { contains: keyword } },
                  { lname: { contains: keyword } },
                  { id: { contains: keyword } },
                  { phone: { contains: keyword } },
                  { email: { contains: keyword } },
                  { indexno: { contains: keyword } },
                ],
              }
            }
            const resp = await ais.$transaction([
               ais.student.count({
                  ...(searchCondition),
               }),
               ais.student.findMany({
                  ...(searchCondition),
                  skip: offset,
                  take: Number(pageSize),
                  include: { 
                     title:{ select: { label: true }},
                     country:{ select: { longName: true }},
                     region:{ select: { title: true }},
                     religion:{ select: { title: true }},
                     disability:{ select: { title: true }},
                     program:{
                      select:{
                        longName:true,
                        department: { select: { title: true } }
                      }
                     },
                  }
               })
            ]);
           
            if(resp && resp[1]?.length){
              res.status(200).json({
                  totalPages: Math.ceil(resp[0]/pageSize) ?? 0,
                  totalData: resp[1]?.length,
                  data: resp[1],
              })
            } else {
              res.status(204).json({ message: `no records found` })
            }
        } catch (error: any) {
           console.log(error)
           return res.status(500).json({ message: error.message }) 
        }
     }

     async fetchStudent(req: Request,res: Response) {
         try {
            const resp = await ais.student.findUnique({
               where: { 
                   id: req.params.id 
               },
               include: { 
                  title:{ select: { label: true }},
                  country:{ select: { longName: true }},
                  region:{ select: { title: true }},
                  religion:{ select: { title: true }},
                  disability:{ select: { title: true }},
                  program:{
                     select:{
                       longName:true,
                       department: { select: { title: true } }
                     }
                  },
               }, 
            })
            if(resp){
              res.status(200).json(resp)
            } else {
              res.status(204).json({ message: `no record found` })
            }
         } catch (error: any) {
            console.log(error)
            return res.status(500).json({ message: error.message }) 
         }
     }

     async fetchStudentTranscript(req: Request,res: Response) {
         try {
            const resp = await ais.assessment.findMany({
               where: { indexno: req.params.id },
               include: { 
                  student: { select: { fname: true, mname: true, id: true, program: { select: { longName: true } } } },
                  scheme: { select: { gradeMeta: true, } },
                  session: { select: { title: true, } },
                  course:{ select:{ title:true } },
               }, 
               orderBy: { session: { createdAt: 'asc' }}
            })
            
           
            if(resp){ 
               var mdata:any = new Map();
               for(const sv of resp){
                  const index: string = sv?.session?.title ?? 'none';
                  const grades: any = sv.scheme?.gradeMeta;
                  const zd = { ...sv, grade: await getGrade(sv.totalScore,grades ),gradepoint: await getGradePoint(sv.totalScore,grades ) }
                  // Data By Courses
                  if(mdata.has(index)){
                    mdata.set(index, [...mdata.get(index), { ...zd }])
                  }else{
                     mdata.set(index,[{ ...zd }])
                  }
               }
               res.status(200).json(Array.from(mdata))
            } else {
               res.status(204).json({ message: `no record found` })
            }
         } catch (error: any) {
            console.log(error)
            return res.status(500).json({ message: error.message }) 
         }
     }
       
     async fetchStudentFinance(req: Request,res: Response) {
         try {
            const resp = await ais.studentAccount.findMany({
               where: { studentId: req.params.id },
               include: { 
                  student: { select: { fname: true, mname: true, indexno: true, program: { select: { longName: true } } } },
                  bill: { select: { narrative: true }},
                  charge: { select: { title: true }},
                  session: { select: { title: true }},
                  transaction: { select: { transtag: true }},
               }, 
            })
            if(resp){
               res.status(200).json(resp)
            } else {
               res.status(204).json({ message: `no record found` })
            }
         } catch (error: any) {
            console.log(error)
            return res.status(500).json({ message: error.message }) 
         }
     }

     async fetchStudentActivity(req: Request,res: Response) {
         try {
            const resp = await ais.student.findUnique({
               where: { 
                  id: req.params.id 
               },
               include: { 
                  country:true,
                  program:{
                     select:{
                     longName:true
                     }
                  },
               }, 
            })
            if(resp){
            res.status(200).json(resp)
            } else {
            res.status(204).json({ message: `no record found` })
            }
         } catch (error: any) {
            console.log(error)
            return res.status(500).json({ message: error.message }) 
         }
     }

     async postStudent(req: Request,res: Response) {
       try {
         const { titleId,programId,countryId,regionId,religionId,disabilityId } = req.body
         delete req.body.titleId;    delete req.body.programId;
         delete req.body.countryId;  delete req.body.regionId;
         delete req.body.religionId; delete req.body.disabilityId;
         
         const resp = await ais.student.create({
           data: {
             ... req.body,
             ... programId && ({ program: { connect: { id: programId }}}),
             ... titleId && ({ title: { connect: { id:titleId }}}),
             ... countryId && ({ country: { connect: { id:countryId }}}),
             ... regionId && ({ region: { connect: { id:regionId }}}),
             ... religionId && ({ religion: { connect: { id:religionId }}}),
             ... disabilityId && ({ disability: { connect: { id:disabilityId }}}),
           }
         })
         if(resp){
            res.status(200).json(resp)
         } else {
            res.status(204).json({ message: `no records found` })
         }
         
        } catch (error: any) {
           console.log(error)
           return res.status(500).json({ message: error.message }) 
        }
     }

     async updateStudent(req: Request,res: Response) {
       try {
          const { titleId,programId,countryId,regionId,religionId,disabilityId } = req.body
          delete req.body.titleId;    delete req.body.programId;
          delete req.body.countryId;  delete req.body.regionId;
          delete req.body.religionId; delete req.body.disabilityId;
          
          const resp = await ais.student.update({
            where: { id: req.params.id },
            data: {
              ... req.body,
              ... programId && ({ program: { connect: { id: programId }}}),
              ... titleId && ({ title: { connect: { id:titleId }}}),
              ... countryId && ({ country: { connect: { id:countryId }}}),
              ... regionId && ({ region: { connect: { id:regionId }}}),
              ... religionId && ({ religion: { connect: { id:religionId }}}),
              ... disabilityId && ({ disability: { connect: { id:disabilityId }}}),
            }
          })
          if(resp){
            res.status(200).json(resp)
          } else {
            res.status(204).json({ message: `No records found` })
          }
        } catch (error: any) {
           console.log(error)
           return res.status(500).json({ message: error.message }) 
        }
     }

     async deleteStudent(req: Request,res: Response) {
      try {
         const resp = await ais.student.delete({
           where: {  id: req.params.id  }
         })
         if(resp){
           res.status(200).json(resp)
         } else {
           res.status(204).json({ message: `No records found` })
         }
      } catch (error: any) {
          console.log(error)
          return res.status(500).json({ message: error.message }) 
      }
     }


     /* Courses */
     async fetchCourseList(req: Request,res: Response) {
      try {
         const resp = await ais.course.findMany({ where: { status: true }, orderBy: { title:'asc' } })
         if(resp){
         res.status(200).json(resp)
         } else {
         res.status(204).json({ message: `no record found` })
         }
      } catch (error: any) {
         console.log(error)
         return res.status(500).json({ message: error.message }) 
      }
   }

     async fetchCourses(req: Request,res: Response) {
      const { page = 1, pageSize = 9, keyword = '' } :any = req.query;
      const offset = (page - 1) * pageSize;
      let searchCondition = { }
      try {
         if(keyword) searchCondition = { 
            where: { 
             OR: [
                { title: { contains: keyword } },
                { id: { contains: keyword } },
             ],
            }
          }
          const resp = await ais.$transaction([
             ais.course.count({
                ...(searchCondition),
             }),
             ais.course.findMany({
                ...(searchCondition),
                skip: offset,
                take: Number(pageSize),
             })
          ]);
         
          if(resp && resp[1]?.length){
            res.status(200).json({
                totalPages: Math.ceil(resp[0]/pageSize) ?? 0,
                totalData: resp[1]?.length,
                data: resp[1],
            })
          } else {
            res.status(204).json({ message: `no records found` })
          }
      } catch (error: any) {
         console.log(error)
         return res.status(500).json({ message: error.message }) 
      }
     }

     async fetchCourse(req: Request,res: Response) {
         try {
            const resp = await ais.course.findUnique({
               where: { 
                  id: req.params.id 
               },
            })
            if(resp){
               res.status(200).json(resp)
            } else {
               res.status(204).json({ message: `no record found` })
            }
         } catch (error: any) {
            console.log(error)
            return res.status(500).json({ message: error.message }) 
         }
     }

     async postCourse(req: Request,res: Response) {
     try {
      
       const resp = await ais.course.create({
          data: {
             ...req.body,
          },
       })
       if(resp){
          res.status(200).json(resp)
       } else {
          res.status(204).json({ message: `no records found` })
       }
       
      } catch (error: any) {
         console.log(error)
         return res.status(500).json({ message: error.message }) 
      }
     }

     async updateCourse(req: Request,res: Response) {
     try {
        const resp = await ais.course.update({
          where: { 
            id: req.params.id 
          },
          data: {
            ...req.body,
          }
        })
        if(resp){
          res.status(200).json(resp)
        } else {
          res.status(204).json({ message: `No records found` })
        }
      } catch (error: any) {
         console.log(error)
         return res.status(500).json({ message: error.message }) 
      }
     }

     async deleteCourse(req: Request,res: Response) {
    try {
       const resp = await ais.course.delete({
         where: {  id: req.params.id  }
       })
       if(resp){
         res.status(200).json(resp)
       } else {
         res.status(204).json({ message: `No records found` })
       }
    } catch (error: any) {
        console.log(error)
        return res.status(500).json({ message: error.message }) 
    }
     }


     /* Structure & Curriculum */
     async fetchCurriculums(req: Request,res: Response) {
      const { page = 1, pageSize = 9, keyword = '' } :any = req.query;
      const offset = (page - 1) * pageSize;
      let searchCondition = { }
      try {
         if(keyword) searchCondition = { 
            where: { 
            OR: [
               {courseId: { contains: keyword }},
               { unit: { title: {contains: keyword } } },
               { program: { longName: {contains: keyword } } },
               { course: { title: {contains: keyword } } },
            ],
            }
         }
         const resp = await ais.$transaction([
            ais.structure.count({
               ...(searchCondition),
            }),
            ais.structure.findMany({
               ...(searchCondition),
               skip: offset,
               take: Number(pageSize),
               include: {
                  unit: { select: { title: true }},
                  program: { select: { longName: true }},
                  course: { select: { title: true }},
               }
            })
         ]);
         
         if(resp && resp[1]?.length){
            res.status(200).json({
               totalPages: Math.ceil(resp[0]/pageSize) ?? 0,
               totalData: resp[1]?.length,
               data: resp[1],
            })
         } else {
            res.status(204).json({ message: `no records found` })
         }
      } catch (error: any) {
         console.log(error)
         return res.status(500).json({ message: error.message }) 
      }
     }

     async fetchCurriculumList(req: Request,res: Response) {
            try {
               const resp = await ais.structure.findMany({
                  where: { status: true },
               })
               if(resp){
               res.status(200).json(resp)
               } else {
               res.status(204).json({ message: `no record found` })
               }
            } catch (error: any) {
               console.log(error)
               return res.status(500).json({ message: error.message }) 
            }
      }

      async fetchCurriculum(req: Request,res: Response) {
            try {
               const resp = await ais.structure.findUnique({
                  where: { 
                     id: req.params.id 
                  },
               })
               if(resp){
                  res.status(200).json(resp)
               } else {
                  res.status(204).json({ message: `no record found` })
               }
            } catch (error: any) {
               console.log(error)
               return res.status(500).json({ message: error.message }) 
            }
      }

      async postCurriculum(req: Request,res: Response) {
         try {
            const { unitId,programId,courseId } = req.body
               delete req.body.courseId; delete req.body.programId;
               delete req.body.unitId;
               const resp = await ais.structure.create({
               data: {
                  ... req.body,
                  ... programId && ({ program: { connect: { id: programId }}}),
                  ... courseId && ({ course: { connect: { id:courseId }}}),
                  ... unitId && ({ unit: { connect: { id:unitId }}}),
               }
            })
            if(resp){
               res.status(200).json(resp)
            } else {
               res.status(204).json({ message: `no records found` })
            }
            
            } catch (error: any) {
               console.log(error)
               return res.status(500).json({ message: error.message }) 
            }
      }

      async updateCurriculum(req: Request,res: Response) {
         try {
            const { unitId,programId,courseId } = req.body
               delete req.body.courseId; delete req.body.programId;
               delete req.body.unitId;
               const resp = await ais.structure.update({
               where: { id: req.params.id },
               data: {
                  ... req.body,
                  ... programId && ({ program: { connect: { id: programId }}}),
                  ... courseId && ({ course: { connect: { id:courseId }}}),
                  ... unitId && ({ unit: { connect: { id:unitId }}}),
               }
            })
            if(resp){
               res.status(200).json(resp)
            } else {
               res.status(204).json({ message: `No records found` })
            }
            } catch (error: any) {
               console.log(error)
               return res.status(500).json({ message: error.message }) 
            }
      }

      async deleteCurriculum(req: Request,res: Response) {
            try {
               const resp = await ais.structure.delete({
                  where: {  id: req.params.id  }
               })
               if(resp){
                  res.status(200).json(resp)
               } else {
                  res.status(204).json({ message: `No records found` })
               }
            } catch (error: any) {
               console.log(error)
               return res.status(500).json({ message: error.message }) 
            }
      }


     /* Schemes */
     async fetchSchemes(req: Request,res: Response) {
         const { page = 1, pageSize = 9, keyword = '' } :any = req.query;
         const offset = (page - 1) * pageSize;
         let searchCondition = { }
         try {
            if(keyword) searchCondition = { 
               where: { 
               OR: [
                  { title: { contains: keyword } },
               ],
               }
            }
            const resp = await ais.$transaction([
               ais.scheme.count({
                  ...(searchCondition),
               }),
               ais.scheme.findMany({
                  ...(searchCondition),
                  skip: offset,
                  take: Number(pageSize),
                  include:{
                     _count: {
                        select: { program: true }
                     }
                  }
               })
            ]);
            
            if(resp && resp[1]?.length){
               res.status(200).json({
                  totalPages: Math.ceil(resp[0]/pageSize) ?? 0,
                  totalData: resp[1]?.length,
                  data: resp[1],
               })
            } else {
               res.status(204).json({ message: `no records found` })
            }
         } catch (error: any) {
            console.log(error)
            return res.status(500).json({ message: error.message }) 
         }
     }

     async fetchSchemeList(req: Request,res: Response) {
         try {
            const resp = await ais.scheme.findMany({
               where: { status: true },
            })
            if(resp){
            res.status(200).json(resp)
            } else {
            res.status(204).json({ message: `no record found` })
            }
         } catch (error: any) {
            console.log(error)
            return res.status(500).json({ message: error.message }) 
         }
     }

     async fetchScheme(req: Request,res: Response) {
         try {
            const resp = await ais.scheme.findUnique({
               where: { 
                  id: req.params.id 
               },
               include:{ program: true }
            })
            if(resp){
               res.status(200).json(resp)
            } else {
               res.status(204).json({ message: `no record found` })
            }
         } catch (error: any) {
            console.log(error)
            return res.status(500).json({ message: error.message }) 
         }
     }

     async postScheme(req: Request,res: Response) {
      try {
         
         const resp = await ais.scheme.create({
            data: {
               ...req.body,
            },
         })
         if(resp){
            res.status(200).json(resp)
         } else {
            res.status(204).json({ message: `no records found` })
         }
         
         } catch (error: any) {
            console.log(error)
            return res.status(500).json({ message: error.message }) 
         }
     }

     async updateScheme(req: Request,res: Response) {
      try {
         const resp = await ais.scheme.update({
            where: { 
               id: req.params.id 
            },
            data: {
               ...req.body,
            }
         })
         if(resp){
            res.status(200).json(resp)
         } else {
            res.status(204).json({ message: `No records found` })
         }
         } catch (error: any) {
            console.log(error)
            return res.status(500).json({ message: error.message }) 
         }
     }

     async deleteScheme(req: Request,res: Response) {
         try {
            const resp = await ais.scheme.delete({
               where: {  id: req.params.id  }
            })
            if(resp){
               res.status(200).json(resp)
            } else {
               res.status(204).json({ message: `No records found` })
            }
         } catch (error: any) {
            console.log(error)
            return res.status(500).json({ message: error.message }) 
         }
   }


   /* Registrations */
   async fetchRegistrationList(req: Request,res: Response) {
      try {
         const resp = await ais.activityRegister.findMany({
            where: { session: { default : true }},
            orderBy: { createdAt: 'desc' },
            include: { 
               student:{
                 select: {
                   fname: true, mname: true, lname: true,
                   semesterNum: true, id: true,
                   program: { select: { longName: true }}
                 }
               }
            }
         })
         if(resp){
            res.status(200).json(resp)
         } else {
            res.status(204).json({ message: `no record found` })
         }
      } catch (error: any) {
         console.log(error)
         return res.status(500).json({ message: error.message }) 
      }
   }

   async fetchRegistrations(req: Request,res: Response) {
      const { page = 1, pageSize = 9, keyword = '' } :any = req.query;
      const offset = (page - 1) * pageSize;
      let searchCondition = { }
      try {
         if(keyword) searchCondition = { 
            where: { 
               session: { default : true },
               OR: [
                  { indexno: { contains: keyword } },
                  { student: { fname: { contains: keyword }} },
                  { student: { mname: { contains: keyword }} },
                  { student: { lname: { contains: keyword }} },
                  { student: { id: { contains: keyword }} },
                  { student: { program: { longName: { contains: keyword }}} },
               ],
            }
         }
         const resp = await ais.$transaction([
            ais.activityRegister.count({
               ...(searchCondition),
            }),
            ais.activityRegister.findMany({
               ...(searchCondition),
               skip: offset,
               take: Number(pageSize),
               orderBy: { createdAt: 'desc' },
               include: { 
                  student:{
                     select: {
                        fname: true, mname: true, lname: true,
                        semesterNum: true, id: true,
                        program: { select: { longName: true }}
                     }
                  }
               }
            })
         ]);
         
         if(resp && resp[1]?.length){
            res.status(200).json({
               totalPages: Math.ceil(resp[0]/pageSize) ?? 0,
               totalData: resp[1]?.length,
               data: resp[1],
            })
         } else {
            res.status(204).json({ message: `no records found` })
         }
      } catch (error: any) {
         console.log(error)
         return res.status(500).json({ message: error.message }) 
      }
  }

  async fetchRegistration(req: Request,res: Response) {
      try {
         const resp = await ais.assessment.findMany({
            include: { 
               course: { select: { title: true, creditHour: true }},
               student: { select: { id: true, fname: true, mname: true, lname: true, gender: true, semesterNum: true, program: { select: { longName: true }} }},
            },
            where: { 
               indexno: req.params.indexno,
               session: { default: true }
            },
         })
         if(resp){
            res.status(200).json(resp)
         } else {
            res.status(204).json({ message: `no record found` })
         }
      } catch (error: any) {
         console.log(error)
         return res.status(500).json({ message: error.message }) 
      }
  }

  async fetchRegistrationMount(req: Request,res: Response) {
      try {
         const courses:any = [];
         const id = req.params.indexno;
         // Get Student Info
         const student:any = await ais.student.findUnique({ include:{ program: { select: { schemeId: true }}}, where : { id }})
         const indexno = student?.indexno;
         // Get Active Sessions Info
         const sessions:any = await ais.session.findMany({ where : { default: true }})
         // Get Session, If Student is Main(Sept)/Sub(Jan) for AUCC Only
         const session:any = sessions.find((row: any) => (moment(student?.entryDate).format("MM") == '01' && student?.entrySemesterNum <= 2) ? row.tag == 'sub': row.tag == 'main')
         // Get Normal Courses with/without Majors
         const maincourses = await ais.structure.findMany({
            include: { course: { select: { title: true, creditHour: true }}},
            where: {  programId: student?.programId, semesterNum: student?.semesterNum },
            orderBy: { type:'asc'}
         })
         // Meta & Instructions
         const meta = await ais.structmeta.findFirst({
            where: {  programId: student?.programId, semesterNum: student?.semesterNum },
         })
         if(student && maincourses.length){
            for(const course of maincourses){
               courses.push({
                  code: course.courseId,
                  course: course?.course?.title,
                  credit: course?.course?.creditHour,
                  type: course?.type,
                  lock: course?.lock,
                  sessionId: session?.id,
                  schemeId: student?.program?.schemeId,
                  semesterNum: student?.semesterNum,
                  indexno
               })
            }
         }
         // Get Resit Courses
         const resitcourses:any = await ais.resit.findMany({ 
            include: { course: { select: { title: true, creditHour: true }}},
            where : { indexno, taken: false,trailSession: { semester: session.semesterNum },
         }})
         if(student && resitcourses.length){
            for(const course of resitcourses){
               courses.push({
                  code: course.courseId,
                  course: course?.course?.title,
                  credit: course?.course?.creditHour,
                  type: 'R',
                  lock: false,
                  sessionId: session.id,
                  schemeId: student?.program?.schemeId,
                  semesterNum: student.semesterNum,
                  indexno
               })
            }
         }
         if(courses.length){
            res.status(200).json({ courses, meta })
         } else {
            res.status(204).json({ message: `no record found` })
         }
      } catch (error: any) {
         console.log(error)
         return res.status(500).json({ message: error.message }) 
      }
   }

   async postRegistration(req: Request,res: Response) {
      try {
         const courses = req.body;
         const data:any = [], rdata:any = [];
         const slip = await ais.assessment.findMany({ where: { indexno: req.params.indexno, session: { default: true }} });
         if(slip.length) throw("Registration already submitted!")
         
         const resitcourses = courses.filter((row:any) => row.type == 'R')
         const maincourses = courses.filter((row:any) => row.type != 'R')
         if(maincourses.length){
            for(const course of maincourses){
               data.push({
                  courseId: course.code,
                  sessionId: course.sessionId,
                  schemeId: course.schemeId,
                  credit: course.credit,
                  semesterNum: course.semesterNum,
                  indexno: course.indexno,
                  totalScore: 0,
                  type:'N'
               })
            }
         }
         if(resitcourses.length){
            // Resit Session Info
            const rsession:any = await ais.resession.findFirst({ where: { default: true }})
            // Save Resit Registration
            for(const course of resitcourses){
               const ups = await ais.resit.updateMany({
                  where:  {
                     indexno: course?.indexno,
                     courseId: course?.code,
                     taken: false
                  },
                  data: {
                     registerSessionId: course?.sessionId,
                     resitSessionId: rsession?.id,
                     taken: true
                  }
               })
               if(ups) rdata.push(ups);
            }
         }
         // Log Registration
         const activityresp = await ais.activityRegister.create({ data : {
            indexno: maincourses[0].indexno,
            sessionId: maincourses[0].sessionId,
            courses: courses?.length,
            credits: courses?.reduce((sum:number,cur:any) => sum+cur.credit,0)
         }})
         // Save Registration Courses
         const mainresp = await ais.assessment.createMany({ data })
         if(mainresp){
           res.status(200).json({ courses: mainresp, resits: rdata })
         } else {
           res.status(204).json({ message: `no records found` })
         }
      } catch (error: any) {
         console.log(error)
         return res.status(202).json({ message: error }) 
      }
   }


  async updateRegistration(req: Request,res: Response) {
      try {
         const indexno = req.params.indexno;
         const courses = req.body;
         const data:any = [], rdata:any = [];
         const resitcourses = courses.filter((row:any) => row.type == 'R')
         const maincourses = courses.filter((row:any) => row.type != 'R')
         if(maincourses.length){
            for(const course of maincourses){
               data.push({
                  courseId: course.courseId,
                  sessionId: course.sessionId,
                  schemeId: course.schemeId,
                  credit: course.credit,
                  semesterNum: course.semesterNum,
                  indexno,
                  totalScore: 0
               })
            }
         }

         if(resitcourses.length){
            for(const course of resitcourses){
               const ups = await ais.resit.updateMany({
               where:  {
                  indexno,
                  courseId: course.courseId,
                  taken: false
               },
               data: {
                  registerSessionId: course.sessionId,
                  resitSessionId: course.sessionId,
                  taken: true
               }
               })
               if(ups) rdata.push(ups);
            }
         }

         const mainresp = await ais.assessment.createMany({ data })
         if(mainresp){
            res.status(200).json({ courses: mainresp, resits: rdata })
         } else {
            res.status(204).json({ message: `no records found` })
         }
         
      } catch (error: any) {
         console.log(error)
         return res.status(500).json({ message: error.message }) 
      }
  }
 
  async deleteRegistration(req: Request,res: Response) {
      try {
         // Delete Courses Registration
         const resp = await ais.assessment.deleteMany({
            where: {  
               indexno: req.params.indexno,  
               session: { default: true }
            }
         })
         // Delete Registration Log
         const log = await ais.activityRegister.deleteMany({
            where: {  
               indexno: req.params.indexno,  
               session: { default: true }
            }
         })
         // Reset Resit Registration
         const resit = await ais.resit.updateMany({
            where: {  
               indexno: req.params.indexno,  
               registerSession: { default: true }
            },
            data: {
               taken:false,
               resitSessionId:null,
               registerSessionId:null,
            }
         })
         
         if(resp){
            res.status(200).json(resp)
         } else {
            res.status(204).json({ message: `No records found` })
         }
      } catch (error: any) {
         console.log(error)
         return res.status(500).json({ message: error.message }) 
      }
}

  /* programs */
  async fetchProgramList(req: Request,res: Response) {
      try {
         const resp = await ais.program.findMany({
            where: { status: true },
            include: { 
            department:{ select: { title: true }},
            }, 
         })
         if(resp){
         res.status(200).json(resp)
         } else {
         res.status(204).json({ message: `no record found` })
         }
      } catch (error: any) {
         console.log(error)
         return res.status(500).json({ message: error.message }) 
      }
   }

   async fetchPrograms(req: Request,res: Response) {
      const { page = 1, pageSize = 6, keyword = '' } :any = req.query;
      const offset = (page - 1) * pageSize;
      let searchCondition = { }
      try {
         if(keyword) searchCondition = { 
            where: { 
             OR: [
                { code: { contains: keyword } },
                { shortName: { contains: keyword } },
                { longName: { contains: keyword } },
                { prefix: { contains: keyword } },
               ],
            }
          }
          const resp = await ais.$transaction([
             ais.program.count({
                ...(searchCondition),
             }),
             ais.program.findMany({
                ...(searchCondition),
                skip: offset,
                take: Number(pageSize),
                include: { 
                  department:{ select:{ title:true }},
                  student:{ select: { _count: true }}
                }
             })
          ]);
         
          if(resp && resp[1]?.length){
            res.status(200).json({
                totalPages: Math.ceil(resp[0]/pageSize) ?? 0,
                totalData: resp[1]?.length,
                data: resp[1],
            })
          } else {
            res.status(204).json({ message: `no records found` })
          }
      } catch (error: any) {
         console.log(error)
         return res.status(500).json({ message: error.message }) 
      }
   }

   async fetchProgram(req: Request,res: Response) {
       try {
          const resp = await ais.program.findUnique({
             where: { 
                 id: req.params.id 
             },
             include: { 
               department:{ select:{ title:true }},
               student:{ select: { _count: true }}
             }
          })
          if(resp){
            res.status(200).json(resp)
          } else {
            res.status(204).json({ message: `no record found` })
          }
       } catch (error: any) {
          console.log(error)
          return res.status(500).json({ message: error.message }) 
       }
   }

   async fetchProgramStructure(req: Request,res: Response) {
      try {
         const resp = await ais.program.findUnique({
            where: { id: req.params.id },
            include: { 
              structure:{ 
                select: {
                  id: true,
                  type: true,
                  semesterNum: true,
                  course: { select: { title: true, creditHour: true, id: true,practicalHour:true, theoryHour: true }}
                },
                orderBy: { semesterNum:'asc' }
              }
           }, 
         })
         if(resp?.structure?.length){
            var mdata:any = new Map();
            for(const sv of resp?.structure){
               const index: string = `LEVEL ${Math.ceil(sv.semesterNum/2)*100}, ${sv.semesterNum%2 == 0 ? 'SEMESTER 2':'SEMESTER 1'}` ?? 'none';
               const zd = { ...sv, course: sv?.course?.title, code: sv?.course?.id, credit: sv?.course?.creditHour, practical: sv?.course?.practicalHour, theory: sv?.course?.theoryHour, type: sv?.type }
               // Data By Level - Semester
               if(mdata.has(index)){
                 mdata.set(index, [...mdata.get(index), { ...zd }])
               }else{
                  mdata.set(index,[{ ...zd }])
               }
            }
            console.log(Array.from(mdata))
            res.status(200).json(Array.from(mdata))
         } else {
            res.status(204).json({ message: `no record found` })
         }
      } catch (error: any) {
         console.log(error)
         return res.status(500).json({ message: error.message }) 
      }
   }
     
   async fetchProgramStudents(req: Request,res: Response) {
       try {
          const resp = await ais.program.findUnique({
             where: { id: req.params.id },
             include: { 
               student:{ 
                  where: { completeStatus: false },
                  select: {
                     id: true,
                     indexno: true,
                     fname: true,
                     mname: true,
                     lname: true,
                     gender: true,
                     semesterNum: true,
                     residentialStatus: true,
                     deferStatus: true,
                  },
                  orderBy: { semesterNum:'asc' }
               }
             }, 
          })
          if(resp?.student?.length){
               var mdata:any = new Map();
               for(const sv of resp?.student){
                  const index: string = `LEVEL ${Math.ceil(sv.semesterNum/2)*100}` ?? 'none';
                  const zd = { ...sv }
                  // Data By Level - Semester
                  if(mdata.has(index)){
                     mdata.set(index, [...mdata.get(index), { ...zd }])
                  }else{
                     mdata.set(index,[{ ...zd }])
                  }
               }
             console.log(Array.from(mdata))
             res.status(200).json(Array.from(mdata))
          } else {
             res.status(204).json({ message: `no record found` })
          }
       } catch (error: any) {
          console.log(error)
          return res.status(500).json({ message: error.message }) 
       }
   }

   async fetchProgramStatistics(req: Request,res: Response) {
       try {
          const resp = await ais.program.findUnique({
             where: { 
                id: req.params.id 
             },
             include: { 
              department:{ select:{ title:true }},
             }
          })
          if(resp){
          res.status(200).json(resp)
          } else {
          res.status(204).json({ message: `no record found` })
          }
       } catch (error: any) {
          console.log(error)
          return res.status(500).json({ message: error.message }) 
       }
   }

   async postProgram(req: Request,res: Response) {
     try {
       const { unitId,schemeId } = req.body
       delete req.body.schemeId;    delete req.body.unitId;
       
       const resp = await ais.program.create({
         data: {
           ... req.body,
           ... unitId && ({ department: { connect: { id: unitId }}}),
           ... schemeId && ({ scheme: { connect: { id:schemeId }}}),
         }
       })
       if(resp){
          res.status(200).json(resp)
       } else {
          res.status(204).json({ message: `no records found` })
       }
       
      } catch (error: any) {
         console.log(error)
         return res.status(500).json({ message: error.message }) 
      }
   }

   async updateProgram(req: Request,res: Response) {
     try {
         const { unitId,schemeId } = req.body
         delete req.body.schemeId;    delete req.body.unitId;
         console.log(req.body)
         const resp = await ais.program.update({
         where: { id: req.params.id },
         data: {
            ... req.body,
            ... unitId && ({ department: { connect: { id: unitId }}}),
            ... schemeId && ({ scheme: { connect: { id:schemeId }}}),
         }
        })
        if(resp){
          res.status(200).json(resp)
        } else {
          res.status(204).json({ message: `No records found` })
        }
      } catch (error: any) {
         console.log(error)
         return res.status(500).json({ message: error.message }) 
      }
   }

   async deleteProgram(req: Request,res: Response) {
      try {
         const resp = await ais.program.delete({
            where: {  id: req.params.id  }
         })
         if(resp){
            res.status(200).json(resp)
         } else {
            res.status(204).json({ message: `No records found` })
         }
      } catch (error: any) {
         console.log(error)
         return res.status(500).json({ message: error.message }) 
      }
   }


     /* Departments */
     async fetchDepartments(req: Request,res: Response) {
      try {
         const resp = await ais.unit.findMany({
            where: { status: true, levelNum: 2, type: 'ACADEMIC' },
            include: { 
               level1:{ select: { title: true, code: true }},
               _count: { 
                  select: {
                     staff:true,
                     program: true
                  }
               },
             }, 
         })
         if(resp){
           res.status(200).json(resp)
         } else {
           res.status(204).json({ message: `no record found` })
         }
      } catch (error: any) {
         console.log(error)
         return res.status(500).json({ message: error.message }) 
      }
     }

     /* Faculties */
     async fetchFaculties(req: Request,res: Response) {
      try {
         const resp = await ais.unit.findMany({
            where: { status: true, levelNum: 1, type: 'ACADEMIC' },
            include: { 
               levelone: { select: { _count: { select: { program: true } }}},
               _count: { 
                  select: {
                     staff:true,
                     levelone: true
                  }
               },
             }, 
         })
         console.log(resp)
         
         if(resp){
           res.status(200).json(resp)
         } else {
           res.status(204).json({ message: `no record found` })
         }
      } catch (error: any) {
         console.log(error)
         return res.status(500).json({ message: error.message }) 
      }
     }

     /* Units */
     async fetchUnits(req: Request,res: Response) {
         const { page = 1, pageSize = 6, keyword = '' } :any = req.query;
         const offset = (page - 1) * pageSize;
         let searchCondition = { }
         try {
            if(keyword) searchCondition = { 
               where: { 
                  OR: [
                     { title: { contains: keyword } },
                     { id: { contains: keyword } },
                  ],
               },
               include: { 
                  level1:{ select: { title: true, code: true }}
               }, 
            }
            const resp = await ais.$transaction([
               ais.unit.count({
                  ...(searchCondition),
               }),
               ais.unit.findMany({
                  ...(searchCondition),
                  skip: offset,
                  take: Number(pageSize),
               })
            ]);
            
            if(resp && resp[1]?.length){
               res.status(200).json({
                  totalPages: Math.ceil(resp[0]/pageSize) ?? 0,
                  totalData: resp[1]?.length,
                  data: resp[1],
               })
            } else {
               res.status(204).json({ message: `no records found` })
            }
         } catch (error: any) {
            console.log(error)
            return res.status(500).json({ message: error.message }) 
         }
     }

     async fetchUnit(req: Request,res: Response) {
         try {
            const resp = await ais.unit.findUnique({
               where: { 
                  id: req.params.id 
               },
            })
            if(resp){
               res.status(200).json(resp)
            } else {
               res.status(204).json({ message: `no record found` })
            }
         } catch (error: any) {
            console.log(error)
            return res.status(500).json({ message: error.message }) 
         }
     }

     async postUnit(req: Request,res: Response) {
      try {
            const resp = await ais.unit.create({
               data: {
                  ...req.body,
               },
            })
            if(resp){
               res.status(200).json(resp)
            } else {
               res.status(204).json({ message: `no records found` })
            }
            
         } catch (error: any) {
               console.log(error)
               return res.status(500).json({ message: error.message }) 
         }
     }

     async updateUnit(req: Request,res: Response) {
         try {
            const resp = await ais.unit.update({
               where: { 
                  id: req.params.id 
               },
               data: {
                  ...req.body,
               }
            })
            if(resp){
               res.status(200).json(resp)
            } else {
               res.status(204).json({ message: `No records found` })
            }
         } catch (error: any) {
               console.log(error)
               return res.status(500).json({ message: error.message }) 
         }
     }

     async deleteUnit(req: Request,res: Response) {
         try {
            const resp = await ais.unit.delete({
               where: {  id: req.params.id  }
            })
            if(resp){
               res.status(200).json(resp)
            } else {
               res.status(204).json({ message: `No records found` })
            }
         } catch (error: any) {
            console.log(error)
            return res.status(500).json({ message: error.message }) 
         }
     }

     /* Helpers */
     async fetchCountries(req: Request,res: Response) {
      try {
         const resp = await ais.country.findMany({
            where: { status: true },
         })
         if(resp){
           res.status(200).json(resp)
         } else {
           res.status(204).json({ message: `no record found` })
         }
      } catch (error: any) {
         console.log(error)
         return res.status(500).json({ message: error.message }) 
      }
     }

     async fetchRegions(req: Request,res: Response) {
      try {
         const resp = await ais.region.findMany({
            where: { status: true },
         })
         if(resp){
           res.status(200).json(resp)
         } else {
           res.status(204).json({ message: `no record found` })
         }
      } catch (error: any) {
         console.log(error)
         return res.status(500).json({ message: error.message }) 
      }
     }

     async fetchReligions(req: Request,res: Response) {
      try {
         const resp = await ais.religion.findMany({
            where: { status: true },
         })
         if(resp){
           res.status(200).json(resp)
         } else {
           res.status(204).json({ message: `no record found` })
         }
      } catch (error: any) {
         console.log(error)
         return res.status(500).json({ message: error.message }) 
      }
     }

     async fetchDisabilities(req: Request,res: Response) {
      try {
         const resp = await ais.disability.findMany({
            where: { status: true },
         })
         if(resp){
           res.status(200).json(resp)
         } else {
           res.status(204).json({ message: `no record found` })
         }
      } catch (error: any) {
         console.log(error)
         return res.status(500).json({ message: error.message }) 
      }
     }

     async fetchTitles(req: Request,res: Response) {
      try {
         const resp = await ais.title.findMany({
            where: { status: true },
         })
         if(resp){
           res.status(200).json(resp)
         } else {
           res.status(204).json({ message: `no record found` })
         }
      } catch (error: any) {
         console.log(error)
         return res.status(500).json({ message: error.message }) 
      }
     }







    async runData(req: Request,res: Response) {
      try { 
         let resp;
         const courses:any = require('../../util/courses.json');
         const students = require('../../util/students.json');
         // if(courses.length){
         //   for(const course of courses){
         //      console.log(course)
         //      const ins = await ais.course.create({
         //          data: {
         //             id: course.code,
         //             title: course.title?.toUpperCase(),
         //             creditHour: Number(course.c),
         //             theoryHour: Number(course.t),
         //             practicalHour: Number(course.p),
         //             remark:'ACTIVE'
         //          }
         //      })
         //   }
         // }

         // if(students.length){
         //   for(const student of students){
         //      console.log(student)
         //      const ins = await ais.student.create({
         //          data: {
         //             id: student?.indexno,
         //             indexno: student.indexno,
         //             fname: student.fname?.toUpperCase(),
         //             mname: student.mname?.toUpperCase(),
         //             lname: student.lname?.toUpperCase(),
         //             dob: moment(student?.dob,'DD/MM/YYYY').toDate(),
         //             semesterNum: Number(student.semesterNum),
         //             phone: student.phone,
         //             email: student.email,
         //             gender: student.gender,
         //             completeStatus: false,
         //             deferStatus: false,
         //             graduateStatus: false,
         //             program: {
         //                connect: {
         //                   id: student.programId
         //                }
         //             },
         //             country: {
         //                connect: {
         //                   id: "96b0a1d5-7899-4b9a-bcbe-7a72eee6572c"
         //                }
         //             },
         //          }
         //      })
         //   }
         // }
         if(students){
           res.status(200).json(students)
         } else {
           res.status(204).json({ message: `no record found` })
         }
        } catch (error: any) {
           console.log(error)
           return res.status(500).json({ message: error.message }) 
        }
    }

    async runAccount(req: Request,res: Response) {
      try { 
         let resp = [];
         const students = await ais.student.findMany();
         // if(students.length){
         //   for(const student of students){
         //      const ins = await ais.user.create({
         //          data: {
         //             tag: student?.id,
         //             username: student?.id,
         //             password: sha1(student.fname?.toLowerCase()),
         //             unlockPin: '2024',
         //             locked: false,
         //             group: {
         //                connect: {
         //                   id: 1
         //                }
         //             },
         //          }
         //      })
         //      resp.push(ins)
         //   }
         // }
         // if(students){
         //   res.status(200).json(resp)
         // } else {
         //   res.status(204).json({ message: `no record found` })
         // }
        } catch (error: any) {
           console.log(error)
           return res.status(500).json({ message: error.message }) 
        }
    }
     

   
}
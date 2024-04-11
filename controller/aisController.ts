import { Request, Response, NextFunction } from "express";
import { v4 as uuid } from 'uuid';
import EvsModel from '../model/evsModel'
import AuthModel from '../model/authModel'
import { PrismaClient } from '../prisma/client/ums'
import moment from "moment";
//import sha1 from "sha1";
import { getBillCodePrisma, getGrade, getGradePoint } from "../util/helper";
import path from "path";
import fs from "fs";
const ais = new PrismaClient()
const evs = new EvsModel();
const Auth = new AuthModel();
const sha1 = require('sha1');
const { customAlphabet } = require("nanoid");
const pwdgen = customAlphabet("1234567890abcdefghijklmnopqrstuvwzyx", 6);



export default class AisController {
     
     /* Session */
     async fetchSessionList(req: Request,res: Response) {
         try {
            const resp = await ais.session.findMany({ where: { status: true }, orderBy: { title:'asc' } })
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

     async fetchSessions(req: Request,res: Response) {
       const { page = 1, pageSize = 9, keyword = '' } :any = req.query;
       const offset = (page - 1) * pageSize;
       let searchCondition:any = { orderBy: { createdAt: 'desc'} }
         try {
            if(keyword) searchCondition = { 
               where: { 
               OR: [
                  { title: { contains: keyword } },
                  { id: { contains: keyword } },
               ],
               },
               orderBy: { createdAt: 'desc'}
            }
            const resp = await ais.$transaction([
               ais.session.count({
                  ...(searchCondition),
               }),
               ais.session.findMany({
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

     async fetchSession(req: Request,res: Response) {
         try {
            const resp = await ais.session.findUnique({
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

     async postSession(req: Request,res: Response) {
         try {
         
         const resp = await ais.session.create({
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

     async updateSession(req: Request,res: Response) {
         try {
         const resp = await ais.session.update({
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

     async deleteSession(req: Request,res: Response) {
         try {
            const resp = await ais.session.delete({
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
               orderBy: [{ session: { createdAt: 'asc' }}, {courseId:'asc'}]
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

     async stageStudent(req: Request,res: Response) {
      try {
        const { studentId } = req.body
        const password = pwdgen();
        const isUser = await ais.user.findFirst({ where: { tag: studentId }})
        if(isUser) throw("Student Portal Account Exists!")
        const ssoData = { tag:studentId, username:studentId, password:sha1(password) }  // Others
         // Populate SSO Account
         const resp = await ais.user.create({
            data: {
               ... ssoData,
               group: { connect: { id: 1 }},
            },
         })
        if(resp){
           res.status(200).json(resp)
        } else {
           res.status(204).json({ message: `no records found` })
        }
        
       } catch (error: any) {
          console.log(error)
          return res.status(500).json(error) 
       }
     }

     async resetStudent(req: Request,res: Response) {
      try {
        const { studentId } = req.body
        const password = pwdgen();
        const resp = await ais.user.updateMany({
            where: { tag: studentId },
            data: { password: sha1(password)},
        })
        if(resp?.count){
           res.status(200).json({ password })
        } else {
           res.status(204).json({ message: `no records found` })
        }
        
      } catch (error: any) {
          console.log(error)
          return res.status(500).json(error) 
      }
     }

     async changePhoto(req: Request,res: Response) {
      try {
        const { studentId } = req.body
        const password = pwdgen();
        const resp = await ais.user.updateMany({
            where: { tag: studentId },
            data: { password: sha1(password)},
        })
        if(resp){
           res.status(200).json({ password })
        } else {
           res.status(204).json({ message: `no records found` })
        }
        
      } catch (error: any) {
          console.log(error)
          return res.status(500).json(error) 
      }
     }

     async generateIndex(req: Request,res: Response) {
      try {
        const { studentId } = req.body;
        let indexno;
        const student = await ais.student.findUnique({
            where: { id: studentId },
            include: {  program:{ select:{ prefix:true }}}, 
        })
        if(student?.indexno) throw("Index number exists for student!")
        const count = student?.progCount?.toString().length == 1 ? `00${student?.progCount}`  : student?.progCount?.toString().length == 2 ? `0${student?.progCount}` : student?.progCount;
        indexno = `${student?.program?.prefix}/${moment(student?.entryDate || new Date()).format("YY")}/${count}`
        const resp = await ais.student.update({
            where: { id: studentId },
            data: { indexno },
        })
        if(resp){
           res.status(200).json({ indexno })
        } else {
           res.status(204).json({ message: `no records found` })
        }
      } catch (error: any) {
          console.log(error)
          return res.status(500).json(error) 
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
                        fname: true, mname: true, lname: true, indexno: true,
                        semesterNum: true, id: true, gender: true,
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
               student: { select: { id: true, indexno: true, fname: true, mname: true, lname: true, gender: true, semesterNum: true, program: { select: { longName: true, department: true }} }},
               session: { select:{ title: true }},
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
         const student:any = await ais.student.findUnique({ include:{ program: { select: { schemeId: true, hasMajor: true, }}}, where : { id }})
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
            where: {  programId: student?.programId, majorId: student?.majorId, semesterNum: student?.semesterNum },
         })
         // Current Posted Bill 
         const groupCode =  await getBillCodePrisma(student?.semesterNum);
         const bill = await ais.bill.findFirst({
            where: {  
               programId: student?.programId, sessionId: session?.id, residentialStatus: student?.residentialStatus || 'RESIDENTIAL',
               OR: groupCode,
            },
         })
         console.log("Bill", bill)
         // const meta:any = []
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

         // Conditions
         let condition = true; // Allow Registration
         let message;          // Reason attached
         /*
            // Check for Exceeded Credit Hours - After
            // If No courses are not selected! - After
            // Check whether Total Number of Electives are chosen - After
            
            
            // If student Doesnt Have an Index Number - Before
               if(!student?.indexno) { condition = false; message = "No Index Number for Student!" }
            // If Semester Level or Program ID or Major  ID is not Updated, Block Registration - Before
               if(!student?.programId || (student.program.hasMajor && !student.majorId) || !student?.semesterNum) { condition = false; message = "No Major or Program or Level Set!" }
            // If Student is Owing Fees, Lock Registration - Before
               if(student?.accountNet > 0 && student?.accountNet < (Bill amount * Payment Percentage )) { condition = false; message = "No Index Number for Student!" }
            // If Student is Pardoned by Finance, Allow Registration - Before
            // If Registration Period is Inactive - Before
            // If Registration Period is Active and Halt status is ON - Before
            // If Registration Period is Extended for Late Finers - Before
            
         
         */

         if(courses.length){
            res.status(200).json({ session: session?.title, courses, meta, condition, message })
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
         const slip = await ais.assessment.findMany({ where: { indexno: courses[0].indexno, session: { default: true }} });
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
           res.status(200).json({ courses: mainresp, resits: rdata, totalCourses: courses.length })
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
         
         if(resp?.count){
            res.status(200).json(resp)
         } else {
            res.status(204).json({ message: `Registration not deleted` })
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
                orderBy: [{ semesterNum:'asc'}, { type:'asc' },]
              },
              structmeta:{ 
               select: {
                 id: true,
                 minCredit: true,
                 maxCredit: true,
                 maxElectiveNum: true,
                 semesterNum: true,
                 major: { select: { longName: true }}
               },
               orderBy: [{ semesterNum:'asc'},]
            }
           }, 
         })
         
         if(resp?.structure?.length){
            var mdata:any = new Map(), sdata:any = new Map();
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

            for(const sv of resp?.structmeta){
               const index: string = `LEVEL ${Math.ceil(sv.semesterNum/2)*100}, ${sv.semesterNum%2 == 0 ? 'SEMESTER 2':'SEMESTER 1'}` ?? 'none';
               const zd = { ...sv }
               // Data By Level - Semester
               if(sdata.has(index)){
                 sdata.set(index, [...sdata.get(index), { ...zd }])
               }else{
                 sdata.set(index,[{ ...zd }])
               }
            }
            console.log(Object.fromEntries(sdata))
            res.status(200).json({ data: Array.from(mdata), meta: Object.fromEntries(sdata) })
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
                     { code: { contains: keyword } },
                  ],
               },
               include: { level1:true }, 
            //   orderBy: { createdAt: 'asc'}
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

     async fetchUnitList(req: Request,res: Response) {
         try {
            const resp = await ais.unit.findMany({
               where: { status: true },
               include: { level1:true }, 
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

     async fetchUnit(req: Request,res: Response) {
         try {
            const resp = await ais.unit.findUnique({
               where: { 
                  id: req.params.id 
               },
               include: { level1:true }, 
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
            const { level1Id } = req.body
            delete req.body.level1Id;
            const resp = await ais.unit.create({
               data: {
                  ...req.body,
                  ... level1Id && ({ level1: { connect: { id: level1Id }}}),
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
            const { level1Id } = req.body
            delete req.body.level1Id;
            const resp = await ais.unit.update({
               where: { 
                  id: req.params.id 
               },
               data: {
                  ...req.body,
                  ... level1Id && ({ level1: { connect: { id: level1Id }}}),
                  ... !level1Id && ({ level1: { disconnect: true }}),
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

     /* Jobs */
     async fetchJobs(req: Request,res: Response) {
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
            ais.job.count({
               ...(searchCondition),
            }),
            ais.job.findMany({
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

  async fetchJobList(req: Request,res: Response) {
      try {
         const resp = await ais.job.findMany({
            where: { status: true }
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

  async fetchJob(req: Request,res: Response) {
      try {
         const resp = await ais.job.findUnique({
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

  async postJob(req: Request,res: Response) {
   try {
         const resp = await ais.job.create({
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

  async updateJob(req: Request,res: Response) {
      try {
         const resp = await ais.job.update({
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

  async deleteJob(req: Request,res: Response) {
      try {
         const resp = await ais.job.delete({
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


   /* Sheets */
   async fetchSheets(req: Request,res: Response) {
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
               session:{ select: { title: true }},
               program:{ select: { longName: true, category: true }},
               course:{ select: { title: true, id: true, creditHour: true }},
               major:{ select: { longName: true }},
               assignee:true,
            }, 
            
         }
         const resp = await ais.$transaction([
            ais.sheet.count({
               ...(searchCondition),
            }),
            ais.sheet.findMany({
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

  async stageSheet(req: Request,res: Response) {
      try {
         // Fetch Active Semester
         const { sessionId } = req.body
         // Fetch Mounted Courses all Program Levels
         const mounts = await ais.structure.findMany({ where: { status: true }})
         // Upsert Bulk into Sheet 
         



         // const resp = await ais.job.findMany({
         //    where: { status: true }
         // })
         // if(resp){
         //    res.status(200).json(resp)
         // } else {
         //    res.status(204).json({ message: `no record found` })
         // }
      } catch (error: any) {
         console.log(error)
         return res.status(500).json({ message: error.message }) 
      }
  }

  async fetchSheet(req: Request,res: Response) {
      try {
         const resp = await ais.sheet.findUnique({
            where: { id: req.params.id },
            include: { 
               session:{ select: { title: true,  }},
               program:{ select: { longName: true, category: true }},
               course:{ select: { title: true, id: true, creditHour: true }},
               major:{ select: { longName: true }},
               assignee:true,
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

  async fetchMySheet(req: Request,res: Response) {
   try {
      const resp = await ais.sheet.findUnique({
         where: { id: req.params.id },
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

  async postSheet(req: Request,res: Response) {
   try {
         const resp = await ais.job.create({
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

  async updateSheet(req: Request,res: Response) {
      try {
         const resp = await ais.job.update({
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

  async deleteSheet(req: Request,res: Response) {
      try {
         const resp = await ais.job.delete({
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

  /* App Roles */

   async fetchARoleList(req: Request,res: Response) {
      try {
         const resp = await ais.appRole.findMany({
            where: { status: true },
            include: { app:{ select: { title: true }}
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
  
  /* User Roles */

  async fetchURoleList(req: Request,res: Response) {
   try {
     const { staffId } = req.body
     const resp = await ais.userRole.findMany({
        where: { user: { tag: staffId.toString()} },
        include: { appRole: { select: { title: true, app: true }}}
     })
     if(resp?.length){
        res.status(200).json(resp)
     } else {
        res.status(204).json({ message: `no records found` })
     }
     
   } catch (error: any) {
       console.log(error)
       return res.status(500).json(error) 
   }
}


   async fetchURoles(req: Request,res: Response) {
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
            ais.userRole.count({
               ...(searchCondition),
            }),
            ais.userRole.findMany({
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

  
  async fetchURole(req: Request,res: Response) {
      try {
         const resp = await ais.userRole.findUnique({
            where: { 
               id: Number(req.params.id) 
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

  async postURole(req: Request,res: Response) {
   try {
         const { appRoleId, staffNo } = req.body
         delete req.body.appRoleId; delete req.body.staffNo;
         let allowRole = true; let resp;

         const user = await ais.user.findFirst({ where: { tag: staffNo.toString() }})
         const uroles = await ais.userRole.findMany({ where: { userId: user?.id }, include: { appRole: { select: { app:true }} }})
         const urole = await ais.appRole.findFirst({ where: {  id: Number(appRoleId) }, include: { app: true }})
         
         if(uroles.length &&  uroles.find(r => [ urole?.app?.tag ].includes(r?.appRole?.app?.tag))) allowRole = false;
         if(!allowRole) throw(`Privilege exists for app`)

         resp = await ais.userRole.create({
            data: {
              ...req.body,
              ... appRoleId && ({ appRole: { connect: { id: Number(appRoleId) }}}),
              ... user && ({ user: { connect: { id: user?.id }}}),
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

  async updateURole(req: Request,res: Response) {
      try {
         const resp = await ais.userRole.update({
            where: { 
               id: Number(req.params.id) 
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

  async deleteURole(req: Request,res: Response) {
      try {
         const resp = await ais.userRole.delete({
            where: {  id: Number(req.params.id)  }
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

  async checkUser(req: Request,res: Response) {
      try {
         const { userId } = req.body
         const resp = await ais.user.findFirst({ where: { tag: userId.toString() }})
         res.status(200).json(!!resp)
         
      } catch (error: any) {
         console.log(error)
         return res.status(500).json({ message: error.message }) 
      }
  }



     /* Staff */
     async fetchStaffs(req: Request,res: Response) {
      const { page = 1, pageSize = 6, keyword = '' } :any = req.query;
      const offset = (page - 1) * pageSize;
      let searchCondition = { }
      try {
         if(keyword) searchCondition = { 
            where: { 
             OR: [
                { fname: { contains: keyword } },
                { lname: { contains: keyword } },
                { phone: { contains: keyword } },
                { email: { contains: keyword } },
              ],
            }
          }
          const resp = await ais.$transaction([
             ais.staff.count({
                ...(searchCondition),
             }),
             ais.staff.findMany({
                ...(searchCondition),
                skip: offset,
                take: Number(pageSize),
                include: { 
                  title:{ select: { label: true }},
                  country:{ select: { longName: true }},
                  region:{ select: { title: true }},
                  religion:{ select: { title: true }},
                  marital:{ select: { title: true }},
                  unit:{ select: { title: true }},
                  job:{ select: { title: true }},
                  //promotion:{ select: { job: { select: { title:true }}}},
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

   async fetchStaff(req: Request,res: Response) {
       try {
          const resp = await ais.staff.findUnique({
             where: { 
                 staffNo: req.params.id
             },
             include: { 
               title:{ select: { label: true }},
               country:{ select: { longName: true }},
               region:{ select: { title: true }},
               religion:{ select: { title: true }},
               marital:{ select: { title: true }},
               unit:{ select: { title: true }},
               job:{ select: { title: true }},
               //promotion:{ select: { job: { select: { title:true }}}},
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

   async stageStaff(req: Request,res: Response) {
    try {
      const { staffId } = req.body;
      const password = pwdgen();
      const isUser = await ais.user.findFirst({ where: { tag: staffId.toString(), groupId:  2 }})
      if(isUser) throw("Staff User Account Exists!")
      const ssoData = { tag:staffId.toString(), username:staffId.toString(), password:sha1(password) }  // Others
       // Populate SSO Account
       const resp = await ais.user.create({
          data: {
             ... ssoData,
             group: { connect: { id: 2 }},
          },
       })
      if(resp){
         // Send Password By SMS
         // Send Password By Email
         res.status(200).json({ ...resp, password })
      } else {
         res.status(204).json({ message: `no records found` })
      }
      
     } catch (error: any) {
        console.log(error)
        return res.status(500).json(error) 
     }
   }

   async resetStaff(req: Request,res: Response) {
    try {
      const { staffId } = req.body
      const password = pwdgen();
      const resp = await ais.user.updateMany({
          where: { tag: staffId.toString(), groupId:  2 },
          data: { password: sha1(password)},
      })
      if(resp?.count){
         res.status(200).json({ password })
      } else {
         res.status(204).json({ message: `no records found` })
      }
      
    } catch (error: any) {
        console.log(error)
        return res.status(500).json(error) 
    }
   }

   async staffRole(req: Request,res: Response) {
      try {
        const { staffId } = req.body
        const resp = await ais.userRole.findMany({
           where: { user: { tag: staffId.toString()} },
           include: { appRole: { select: { title: true, app: true }}}
        })
        if(resp?.length){
           res.status(200).json(resp)
        } else {
           res.status(204).json({ message: `no records found` })
        }
        
      } catch (error: any) {
          console.log(error)
          return res.status(500).json(error) 
      }
   }

   async changeStaffPhoto(req: Request,res: Response) {
    try {
      const { staffId } = req.body
      const password = pwdgen();
      const resp = await ais.user.updateMany({
          where: { tag: staffId },
          data: { password: sha1(password)},
      })
      if(resp){
         res.status(200).json({ password })
      } else {
         res.status(204).json({ message: `no records found` })
      }
      
    } catch (error: any) {
        console.log(error)
        return res.status(500).json(error) 
    }
   }


   async postStaff(req: Request,res: Response) {
     try {
       const { titleId,maritalId,countryId,regionId,religionId,unitId,jobId,staffNo } = req.body
       delete req.body.titleId;    delete req.body.maritalId;
       delete req.body.countryId;  delete req.body.regionId;
       delete req.body.religionId; delete req.body.unitId;
       delete req.body.jobId;   
      //  delete req.body.staffNo; 
       
       const resp = await ais.staff.create({
         data: {
           ... req.body,
           ... maritalId && ({ marital: { connect: { id: maritalId }}}),
           ... titleId && ({ title: { connect: { id:titleId }}}),
           ... countryId && ({ country: { connect: { id:countryId }}}),
           ... regionId && ({ region: { connect: { id:regionId }}}),
           ... religionId && ({ religion: { connect: { id:religionId }}}),
           ... unitId && ({ unit: { connect: { id:unitId }}}),
           ... jobId && ({ job: { connect: { id:jobId }}}),
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

   async updateStaff(req: Request,res: Response) {
     try {
        const { titleId,maritalId,countryId,regionId,religionId,unitId,jobId } = req.body
        delete req.body.titleId;    delete req.body.maritalId;
        delete req.body.countryId;  delete req.body.regionId;
        delete req.body.religionId; delete req.body.unitId;
        delete req.body.jobId; //   
        req.body.staffNo = req.body.staffNo.toString()
        
        const resp = await ais.staff.update({
          where: { staffNo: req.params.id },
          data: {
            ... req.body,
            ... maritalId && ({ marital: { connect: { id: maritalId }}}),
            ... titleId && ({ title: { connect: { id:titleId }}}),
            ... countryId && ({ country: { connect: { id:countryId }}}),
            ... regionId && ({ region: { connect: { id:regionId }}}),
            ... religionId && ({ religion: { connect: { id:religionId }}}),
            ... unitId && ({ unit: { connect: { id:unitId }}}),
            ... jobId && ({ job: { connect: { id:jobId }}}),
          }
        })
        if(resp){
          if(req.params.id != req.body.staffNo){
              // Update SSO User with New (Tag/Username)
              await ais.user.updateMany({ where: { tag: req.params.id, groupId: 2 }, data: { tag: req.body.staffNo, username: req.body.staffNo }});
              // Update Photo FileName
              const tag = req.params.id.split("/").join("").trim().toLowerCase();
              const dtag = req.body.staffNo.split("/").join("").trim().toLowerCase();
              var file = path.join(__dirname,"/../../public/cdn/photo/staff/",tag+'.jpg');
              //var file2 = path.join(__dirname,"/../../public/cdn/photo/staff/",tag+'.jpeg');
              var dfile = path.join(__dirname,"/../../public/cdn/photo/staff/",dtag+'.jpg');
              var stats = fs.statSync(file);
             //var stats2 = fs.statSync(file2);
              if (stats) {
                fs.renameSync(file,dfile);
              } 
            //   else if (stats2) {
            //     fs.renameSync(file2,dfile);
            //   }
    
          }   res.status(200).json(resp)
        
        } else {
          res.status(204).json({ message: `No records found` })
        }
      } catch (error: any) {
         console.log(error)
         return res.status(500).json({ message: error.message }) 
      }
   }

   async deleteStaff(req: Request,res: Response) {
    try {
       const resp = await ais.staff.delete({
         where: {  staffNo: req.params.id  }
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
            orderBy: { createdAt:'asc'}
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

     async fetchCategories(req: Request,res: Response) {
      try {
         const resp = await ais.category.findMany({
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

     async fetchRelations(req: Request,res: Response) {
      try {
         const resp = await ais.relation.findMany({
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

     async fetchMarital(req: Request,res: Response) {
      try {
         const resp = await ais.marital.findMany({
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

     async fetchVendors(req: Request,res: Response) {
      try {
         const resp = await ais.vendor.findMany({
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

     async fetchCollectors(req: Request,res: Response) {
      try {
         const resp = await ais.collector.findMany()
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

     async fetchAppRoles(req: Request,res: Response) {
      try {
         const resp = await ais.appRole.findMany()
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
         // const subjects:any = require('../../util/subjects.json');
         // const structure:any = require('../../util/structure.json');
         // const courses:any = require('../../util/courses2.json');
         //  const students = require('../../util/student2.json');
         //  const staff = require('../../util/staff.json');
          const scores = require('../../util/scores.json');
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
         //             //dob: moment(student?.dob,'DD/MM/YYYY').toDate(),
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

         // if(staff.length){
         //    for(const st of staff){
         //       console.log(st)
         //       const ins = await ais.staff.create({
         //           data: {
         //              staffNo: st?.staffNo,
         //              fname: st.fname?.toUpperCase(),
         //              mname: st.mname?.toUpperCase(),
         //              lname: st.lname?.toUpperCase(),
         //              dob: moment(st?.dob,'DD/MM/YYYY').toDate(),
         //              phone: st.phone,
         //              email: st.email,
         //              gender: st.gender,
         //              qualification: st.qualification,
         //              religion: {
         //                 connect: {
         //                    id: st.religionId
         //                 }
         //              },
         //              unit: {
         //                connect: {
         //                   id: st.unitId
         //                }
         //             },
         //             job: {
         //                connect: {
         //                   id: st.jobId
         //                }
         //             },
         //              country: {
         //                 connect: {
         //                    id: "96b0a1d5-7899-4b9a-bcbe-7a72eee6572c"
         //                 }
         //              },
         //           }
         //       })
         //    }
         // }
         
         // if(structure.length){
         //   for(const struct of structure){
         //      console.log(struct)
         //      const ins = await ais.structure.create({
         //          data: {
         //             course: { connect: { id: struct.courseId }},
         //             unit: { connect: { id: struct.unitId }},
         //             program: { connect: { id: struct.programId }},
         //             type: struct.type,
         //             semesterNum: Number(struct.semesterNum),
         //          }
         //      })
         //   }
         // }

         //  if(subjects.length){
         //   for(const subj of subjects){
         //      console.log(subj)
         //      const ins = await ais.subject.create({
         //          data: {
         //             title: subj?.title 
         //          }
         //      })
         //   }
         // }

         if(scores.length){
            for(const st of scores){
               console.log(st)
               const ins = await ais.assessment.create({
                   data: {
                      //indexno: st?.indexno,
                      credit: Number(st.credit),
                      semesterNum: Number(st.semesterNum),
                      classScore: parseFloat(st.classScore),
                      examScore: parseFloat(st.examScore),
                      totalScore: parseFloat(st.totalScore),
                      type: 'N',
                      session: {
                         connect: {
                            id: st.sessionId
                         }
                      },
                      scheme: {
                        connect: {
                           id: st.schemeId
                        }
                     },
                     course: {
                        connect: {
                           id: st.courseId?.trim()
                        }
                     },
                     student: {
                        connect: {
                           indexno: st.indexno?.trim()
                        }
                     },
                     
                   }
               })
            }
         }
         


         if(scores){
           res.status(200).json(scores)
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
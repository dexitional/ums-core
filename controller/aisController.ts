import { Request, Response } from "express";
import moment from "moment";
import AuthModel from '../model/authModel';
import EvsModel from '../model/evsModel';
import { PrismaClient } from '../prisma/client/ums';
//import sha1 from "sha1";
import fs from "fs";
import path from "path";
import { getBillCodePrisma, getGrade, getGradePoint } from "../util/helper";
const ais:any = new PrismaClient()
const evs = new EvsModel();
const Auth = new AuthModel();
const sha1 = require('sha1');
const { customAlphabet } = require("nanoid");
const pwdgen = customAlphabet("1234567890abcdefghijklmnopqrstuvwzyx", 6);
const sms = require('../config/sms');



export default class AisController {
     
   async fetchTest(req: Request,res: Response) {
      try {
         const tag = '24010001';
         const resp = await ais.election.findMany({
            // where: { voterList: { array_contains: tag }},
             where: { voterData: { path:'$[*].tag', array_contains: tag }},
           
         })

         console.log(resp)
         if(resp?.length){
            res.status(200).json(resp)
         } else {
            res.status(202).json({ message: `no record found` })
         }
      } catch (error: any) {
         console.log(error)
         return res.status(500).json({ message: error.message }) 
      }
  }

     /* Session */
     async fetchSessionList(req: Request,res: Response) {
         try {
            const resp = await ais.session.findMany({ where: { status: true }, orderBy: { createdAt:'desc' } })
            if(resp){
            res.status(200).json(resp)
            } else {
            res.status(202).json({ message: `no record found` })
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
            
            //if(resp && resp[1]?.length){
               res.status(200).json({
                  totalPages: Math.ceil(resp[0]/pageSize) ?? 0,
                  totalData: resp[1]?.length,
                  data: resp[1],
               })
            //} else {
               //res.status(202).json({ message: `no records found` })
            //}
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
               res.status(202).json({ message: `no record found` })
            }
         } catch (error: any) {
            console.log(error)
            return res.status(500).json({ message: error.message }) 
         }
     }

     async activateSession(req: Request,res: Response) {
         try {
         const { sessionId } = req.body;
         
         const resm = await ais.session.findUnique({ where: { id: sessionId } })
         const resx = await ais.session.updateMany({ where: { NOT: { id: sessionId }, tag: resm?.tag  }, data: { default: false } })
         //const resx = await ais.session.updateMany({ where: { NOT: { id: sessionId }  }, data: { default: false } })
         const resp = await ais.session.update({ where: { id: sessionId }, data: { default: true} })
         if(resp){
            res.status(200).json(resp)
         } else {
            res.status(202).json({ message: `no records found` })
         }
         
         } catch (error: any) {
            console.log(error)
            return res.status(500).json({ message: error.message }) 
         }
     }

     
     async postSession(req: Request,res: Response) {
         try {
            const resp = await ais.session.create({ data: { ...req.body } })
            if(resp){
               res.status(200).json(resp)
            } else {
               res.status(202).json({ message: `no records found` })
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
            res.status(202).json({ message: `No records found` })
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
               res.status(202).json({ message: `No records found` })
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
           
            //if(resp && resp[1]?.length){
              res.status(200).json({
                  totalPages: Math.ceil(resp[0]/pageSize) ?? 0,
                  totalData: resp[1]?.length,
                  data: resp[1],
              })
            //} else {
              //res.status(202).json({ message: `no records found` })
            //}
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
              res.status(202).json({ message: `no record found` })
            }
         } catch (error: any) {
            console.log(error)
            return res.status(500).json({ message: error.message }) 
         }
     }

     async fetchStudentTranscript(req: Request,res: Response) {
         try {
            const st:any = await ais.student.findFirst({ 
               where: {
                  OR:[
                      { 
                        AND: [ 
                           { indexno: { not: null } }, 
                           { id: req.params.id } 
                      ]}, 
                      { indexno: req.params.id } 
                  ] 
               }
            });
            if(!st) throw("No index number generated")
            
            const resp = await ais.assessment.findMany({
               where: { indexno: st?.indexno },
               include: { 
                  //student: true,
                  student: { select: { indexno:true, fname: true, mname: true, lname: true, id: true, program: { select: { longName: true, shortName: true } } } },
                  scheme: { select: { gradeMeta: true,classMeta:true } },
                  session: { select: { title: true, } },
                  course:{ select:{ title:true } },
               }, 
               orderBy: { session: { createdAt: 'asc'}}
            });
            
            
            if(resp){ 
               // Class Awards
               var mdata:any = new Map();
               for(const sv of resp){
                  const index: string = sv?.session?.title ?? 'none';
                  const grades: any = sv.scheme?.gradeMeta;
                  const classes: any = sv.scheme?.classMeta;
                  const zd = { ...sv, grade: await getGrade(sv.totalScore,grades ),gradepoint: await getGradePoint(sv.totalScore,grades ), classes }
                  // Data By Courses
                  if(mdata.has(index)){
                    mdata.set(index, [...mdata.get(index), { ...zd }])
                  }else{
                     mdata.set(index,[{ ...zd }])
                  }
               }
               return res.status(200).json(Array.from(mdata))
            } else {
               return res.status(202).json({ message: `no record found` })
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
               res.status(202).json({ message: `no record found` })
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
            res.status(202).json({ message: `no record found` })
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
        const ssoData = { tag:studentId, username:studentId, password:sha1(password), unlockPin: password }  // AUCC only
      //   const ssoData = { tag:studentId, username:studentId, password:sha1(password), unlockPin: password }  // MLK & Others
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
           res.status(202).json({ message: `no records found` })
        }
        
       } catch (error: any) {
          console.log(error)
          return res.status(500).json(error) 
       }
     }

     

     async resetStudent(req: Request,res: Response) {
      try {
        const { studentId } = req.body;
        const password = pwdgen();
        const resp = await ais.user.updateMany({
            where: { tag: studentId },
            // data: { password: sha1(password), unlockPin: password },
            data: { password: sha1(password) },
            include:true
        })
        if(resp?.count){
           // Send Password By SMS
           const st = await ais.student.findFirst({ where: { id: studentId }});
           if(st?.phone) await sms(st?.phone,`Hi! Your new credentials is username: ${st?.instituteEmail}, password: ${password}`)
           // Return Password
           res.status(200).json({ password })
        } else {
           res.status(202).json({ message: `no records found` })
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
           res.status(202).json({ message: `no records found` })
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
        const students = await ais.$queryRaw`select * from ais_student where date_format(entryDate,'%m%y') = ${moment(student?.entryDate).format("mmyyyy")}`;
        // AUCC INDEX NUMBER GENERATION
        const studentCount = students?.length+1;
        const count = studentCount.toString().length == 1 ? `000${studentCount}` : studentCount.toString().length == 2 ? `00${studentCount}` : studentCount.toString().length == 3 ? `0${studentCount}` : studentCount;
        indexno = `${student?.program?.prefix}${moment(student?.entryDate || new Date()).format("MMYY")}${count}`
         
      // MLK INDEX NUMBER GENERATION
      // const count = student?.progCount?.toString().length == 1 ? `00${student?.progCount}`  : student?.progCount?.toString().length == 2 ? `0${student?.progCount}` : student?.progCount;
      // indexno = `${student?.program?.prefix}/${moment(student?.entryDate || new Date()).format("YY")}/${count}`
        
        const resp = await ais.student.update({
            where: { id: studentId },
            data: { indexno },
        })
        if(resp){
           res.status(200).json({ indexno })
        } else {
           res.status(202).json({ message: `no records found` })
        }
      } catch (error: any) {
          console.log(error)
          return res.status(500).json(error) 
      }
     }

     async generateEmail(req: Request,res: Response) {
      try {
            let count = 1;
            let isNew = true;
            const { studentId } = req.body;
            const st = await ais.student.findFirst({ where: { id: studentId }});
            if(st?.instituteEmail) throw("mail already exists !");
            let username = `${st?.fname?.replaceAll(' ','')}.${st?.lname}`.toLowerCase();
            
            while(isNew){
               const ck =  await ais.student.findFirst({ where: { instituteEmail: { startsWith: `${username}${count > 1 ? count:''}` } }});
               if(ck) count = count+1;
               else isNew = false;
            }
            // Update Student Email
            const instituteEmail =  `${username}@${process.env.UMS_MAIL}`;
            const resp = await ais.student.update({ where: {  id: studentId }, data: { instituteEmail } });
            if(resp){
               // Update SSO User
               await ais.user.updateMany({ where: {  tag: studentId }, data: { username: instituteEmail } });
               // Return Response
               res.status(200).json(resp)
            } else {
               res.status(202).json({ message: `no records found` })
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
         req.body.indexno  = !req.body.indexno ? null : req.body.indexno;
         
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
            res.status(202).json({ message: `no records found` })
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
          req.body.indexno  = !req.body.indexno ? null : req.body.indexno;
          //req.body.entryDate  = moment(req.body.indexno).toDate;

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
            res.status(202).json({ message: `No records found` })
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
           res.status(202).json({ message: `No records found` })
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
         res.status(202).json({ message: `no record found` })
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
         
          //if(resp && resp[1]?.length){
            res.status(200).json({
                totalPages: Math.ceil(resp[0]/pageSize) ?? 0,
                totalData: resp[1]?.length,
                data: resp[1],
            })
          //} else {
            //res.status(202).json({ message: `no records found` })
          //}
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
               res.status(202).json({ message: `no record found` })
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
          res.status(202).json({ message: `no records found` })
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
          res.status(202).json({ message: `No records found` })
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
         res.status(202).json({ message: `No records found` })
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
         
         //if(resp && resp[1]?.length){
            res.status(200).json({
               totalPages: Math.ceil(resp[0]/pageSize) ?? 0,
               totalData: resp[1]?.length,
               data: resp[1],
            })
        // } else {
         //   res.status(202).json({ message: `no records found` })
        // }
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
               res.status(202).json({ message: `no record found` })
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
                  res.status(202).json({ message: `no record found` })
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
               res.status(202).json({ message: `no records found` })
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
               res.status(202).json({ message: `No records found` })
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
                  res.status(202).json({ message: `No records found` })
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
            
            //if(resp && resp[1]?.length){
               res.status(200).json({
                  totalPages: Math.ceil(resp[0]/pageSize) ?? 0,
                  totalData: resp[1]?.length,
                  data: resp[1],
               })
            //} else {
               //res.status(202).json({ message: `no records found` })
            //}
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
            res.status(202).json({ message: `no record found` })
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
               res.status(202).json({ message: `no record found` })
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
            res.status(202).json({ message: `no records found` })
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
            res.status(202).json({ message: `No records found` })
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
               res.status(202).json({ message: `No records found` })
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
            res.status(202).json({ message: `no record found` })
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
         
         //if(resp && resp[1]?.length){
            res.status(200).json({
               totalPages: Math.ceil(resp[0]/pageSize) ?? 0,
               totalData: resp[1]?.length,
               data: resp[1],
            })
        // } else {
        //    res.status(202).json({ message: `no records found` })
        // }
      } catch (error: any) {
         console.log(error)
         return res.status(500).json({ message: error.message }) 
      }
  }

  async fetchRegistration(req: Request,res: Response) {
      try {
         let resp;
         const st = await ais.student.findUnique({ 
            where: { id: req.params.indexno },
            select: { id: true, indexno: true, fname: true, mname: true, lname: true, gender: true, semesterNum: true, program: { select: { longName: true, department: true }} },
         })
         if(st) 
            resp = await ais.assessment.findMany({
               include: { 
                  course: { select: { title: true, creditHour: true }},
                  // student: { select: { id: true, indexno: true, fname: true, mname: true, lname: true, gender: true, semesterNum: true, program: { select: { longName: true, department: true }} }},
                  session: { select:{ title: true }},
               },
               where: { 
                  indexno: st?.indexno,
                  session: { default: true }
               },
            })
         console.log(req.params.indexno,st,resp)
         if(resp){
            // Add Student Bio
            resp = resp.map((r:any) => ({ ...r, student:st }));
            // Return Response
            res.status(200).json(resp)
         } else {
            res.status(202).json({ message: `no record found` })
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
         const student:any = await ais.student.findUnique({ include:{ program: { select: { schemeId: true, hasMajor: true }}}, where : { id }})
         const indexno = student?.indexno;
         // Get Active Sessions Info
         const sessions:any = await ais.session.findMany({ where : { default: true }})
         
         // Get Session, for AUCC Only
         const session:any = sessions.find((row: any) => (moment(student?.entryDate).format("MM") == '01' && student?.entrySemesterNum <= 2) ? row?.tag?.toUpperCase() == 'SUB': row?.tag?.toUpperCase() == 'MAIN')
         // Get Session, for MLK Only
         // const session:any = sessions[0];
         
         // Get Normal Courses with/without Majors
         const maincourses = await ais.structure.findMany({
            include: { course: { select: { title: true, creditHour: true }}},
            where: {  
                semesterNum: student?.semesterNum, 
                programId: student?.programId, 
            },
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
               const isAdded = courses.find((c:any) => c.code == course.courseId);
               if(!isAdded)
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
            where : { indexno, taken: false, trailSession: { semester: session?.semesterNum },
         }})
         if(student && resitcourses.length){
            for(const course of resitcourses){
               const isAdded = courses.find((c:any) => c.code == course.courseId);
               if(!isAdded)
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

         
            // Check for Exceeded Credit Hours - After
            // If No courses are not selected! - After
            // Check whether Total Number of Electives are chosen - After
            
            // If student Doesnt Have an Index Number - Before
               if(!student?.indexno) { condition = false; message = "No Index Number for Student!" }
            // If Semester Level or Program ID or Major  ID is not Updated, Block Registration - Before
               if(!student?.programId || (student.program.hasMajor && !student.majorId) || !student?.semesterNum) { condition = false; message = "No Major or Program or Level Set!" }
            
               // If Student is Owing Fees, Lock Registration - Before
            // if(student?.accountNet > 0 && student?.accountNet < (Bill amount * Payment Percentage )) { condition = false; message = "No Index Number for Student!" }
            
            // If Student is Pardoned by Finance, Allow Registration - Before
            // If Registration Period is Inactive - Before
            // If Registration Period is Active and Halt status is ON - Before
            // If Registration Period is Extended for Late Finers - Before
        

         if(courses?.length){
            res.status(200).json({ session: session?.title, courses, meta, condition, message })
         } else {
            res.status(202).json({ message: `no record found` })
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
         console.log(mainresp);
         if(mainresp){
           res.status(200).json({ courses: mainresp, resits: rdata, totalCourses: courses.length })
         } else {
           res.status(202).json({ message: `no records found` })
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
            res.status(202).json({ message: `no records found` })
         }
         
      } catch (error: any) {
         console.log(error)
         return res.status(500).json({ message: error.message }) 
      }
  }
 
  async deleteRegistration(req: Request,res: Response) {
      try {
         // const { data } =  req.body;
         // if(data?.length){

         // }
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
            res.status(202).json({ message: `Registration not deleted` })
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
         res.status(202).json({ message: `no record found` })
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
         
          //if(resp && resp[1]?.length){
            res.status(200).json({
                totalPages: Math.ceil(resp[0]/pageSize) ?? 0,
                totalData: resp[1]?.length,
                data: resp[1],
            })
          //} else {
            //res.status(202).json({ message: `no records found` })
          //}
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
            res.status(202).json({ message: `no record found` })
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
               const index: string = `LEVEL ${Math.ceil(sv.semesterNum/2)*100}, ${sv.semesterNum%2 == 0 ? 'SEMESTER 2':'SEMESTER 1'}` || 'none';
               const zd = { ...sv, course: sv?.course?.title, code: sv?.course?.id, credit: sv?.course?.creditHour, practical: sv?.course?.practicalHour, theory: sv?.course?.theoryHour, type: sv?.type }
               // Data By Level - Semester
               if(mdata.has(index)){
                 mdata.set(index, [...mdata.get(index), { ...zd }])
               }else{
                 mdata.set(index,[{ ...zd }])
               }
            }

            for(const sv of resp?.structmeta){
               const index: string = `LEVEL ${Math.ceil(sv.semesterNum/2)*100}, ${sv.semesterNum%2 == 0 ? 'SEMESTER 2':'SEMESTER 1'}` || 'none';
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
            res.status(202).json({ message: `no record found` })
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
                  const index: string = `LEVEL ${Math.ceil(sv.semesterNum/2)*100}` || 'none';
                  const zd = { ...sv }
                  // Data By Level - Semester
                  if(mdata.has(index)){
                     mdata.set(index, [...mdata.get(index), { ...zd }])
                  }else{
                     mdata.set(index,[{ ...zd }])
                  }
               }
            res.status(200).json(Array.from(mdata))
          } else {
            res.status(200).json([])
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
          res.status(202).json({ message: `no record found` })
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
          res.status(202).json({ message: `no records found` })
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
          res.status(202).json({ message: `No records found` })
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
            res.status(202).json({ message: `No records found` })
         }
      } catch (error: any) {
         console.log(error)
         return res.status(500).json({ message: error.message }) 
      }
   }


   /* Majors */
   async fetchMajorList(req: Request,res: Response) {
      try {
         const resp = await ais.major.findMany({
            where: { status: true },
            include: { 
              program:{ select: { shortName: true }},
            }, 
         })
         if(resp){
         res.status(200).json(resp)
         } else {
         res.status(202).json({ message: `no record found` })
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
           res.status(202).json({ message: `no record found` })
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
           res.status(202).json({ message: `no record found` })
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
               res.status(202).json({ message: `no records found` })
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
               res.status(202).json({ message: `no record found` })
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
               res.status(202).json({ message: `no record found` })
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
               res.status(202).json({ message: `no records found` })
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
               res.status(202).json({ message: `No records found` })
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
               res.status(202).json({ message: `No records found` })
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
            res.status(202).json({ message: `no records found` })
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
            res.status(202).json({ message: `no record found` })
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
            res.status(202).json({ message: `no record found` })
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
            res.status(202).json({ message: `no records found` })
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
            res.status(202).json({ message: `No records found` })
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
            res.status(202).json({ message: `No records found` })
         }
      } catch (error: any) {
         console.log(error)
         return res.status(500).json({ message: error.message }) 
      }
  }


  /* Progression */
  async fetchProgressions(req: Request,res: Response) {
      const { page = 1, pageSize = 6, keyword = '' } :any = req.query;
      const offset = (page - 1) * pageSize;
      let searchCondition:any = {
         where: { session: { default: true } }
       }
      try {
         if(keyword) searchCondition = { 
            where: { 
               session: { default: true },
               OR: [
                  { indexno: { contains: keyword } },
                  { session: { title: { contains: keyword } }},
                  { student: { id: { contains: keyword } }},
                  { student: { fname: { contains: keyword } }},
                  { student: { lname: { contains: keyword } }},
                 
               ],
            }
         }
         const resp = await ais.$transaction([
            ais.activityProgress.count({
               ...(searchCondition),
            }),
            ais.activityProgress.findMany({
               ...(searchCondition),
               skip: offset,
               take: Number(pageSize),
               include: { 
                  student: { include: {program: true }},
                  session: true
               }, 
            })
         ]);
         
         //if(resp && resp[1]?.length){
            res.status(200).json({
               totalPages: Math.ceil(resp[0]/pageSize) ?? 0,
               totalData: resp[1]?.length,
               data: resp[1],
            })
         // } else {
         //    res.status(202).json({ message: `no records found` })
         // }
      } catch (error: any) {
         console.log(error)
         return res.status(500).json({ message: error.message }) 
      }
   }

   async fetchProgression(req: Request,res: Response) {
      try {
         const resp = await ais.activityProgress.findUnique({
            where: {  id: req.params.id },
         })
         if(resp){
            res.status(200).json(resp)
         } else {
            res.status(202).json({ message: `no record found` })
         }
      } catch (error: any) {
         console.log(error)
         return res.status(500).json({ message: error.message }) 
      }
   }

   async postProgression(req: Request,res: Response) {
      try {
         const { indexno } = req.body;
         delete req.body.indexno;
         // Check If Student Exist with Index number
         const st = await ais.student.findFirst({ where: { indexno },include: { program: { select: { semesterTotal: true }} }});
         if(!st) throw("No Student Index Number !");
         
         // Fetch Active Session for Student - AUCC Only
         const session = ((st.semesterNum <= 2 && st.entrySemesterNum == 1 ) || (st.semesterNum <= 4 && st.entrySemesterNum == 3 )) && ['01','1'].includes(moment(st.entryDate).format("MM"))  
         ? await ais.session.findFirst({ where: { default: true, tag: 'SUB' } })
         : await ais.session.findFirst({ where: { default: true, tag: 'MAIN' } })
         
         // Fetch Active Session for Student - MLK & Others Only
         // const session = await ais.sesssion.findFirst({ where: { default: true }})
      
         // Check If Progressed
         const pg = await ais.activityProgress.findFirst({ where: { indexno, sessionId: session?.id }})
         if(pg) throw("Student already progressed !");

         
         // Save Progression Data
         const resp = await ais.activityProgress.create({
            data: {
               semesterNum: (st.semesterNum+1 > st.program?.semesterTotal ?  0 : st.semesterNum+1),
               status: true,
               ... session && ({ session: { connect: { id: session?.id }}}),
               ... indexno && ({ student: { connect: { indexno } }}),
            }
         })
         if(resp){
            // Update Student SemesterNum & CompleteStatus
            await ais.student.update({
               where: { id: st?.id }, 
               data: { 
                  semesterNum: (st.semesterNum+1 > st.program?.semesterTotal ?  0 : st.semesterNum+1), 
                  completeStatus: (st.semesterNum+1 > st.program?.semesterTotal ?  true : false 
               )}
            })
            // Return Response
            res.status(200).json(resp)
         } else {
            res.status(202).json({ message: `no records found` })
         }
         
      } catch (error: any) {
            console.log(error)
            return res.status(500).json({ message: error.message }) 
      }
   }

   async postAllProgression(req: Request,res: Response) {
      try {
         const { sessionId } = req.body
         delete req.body.sessionId;
         // Fetch Active Session for Student
         const session = await ais.session.findFirst({ where: { id: sessionId }})
         // AUCC only
         const students = session.tag == 'SUB'
            ? await ais.$queryRaw`select s.id,indexno,semesterNum,p.semesterTotal from ais_student s left join ais_program p on s.programId = p.id where (((semesterNum <= 2 and entrySemesterNum = 1) or (semesterNum <= 4 and entrySemesterNum = 3)) and date_format(entryDate,'%m') = '01') and completeStatus = 0 and deferStatus = 0 and indexno is not NULL`
            : await ais.$queryRaw`select s.id,indexno,semesterNum,p.semesterTotal from ais_student s left join ais_program p on s.programId = p.id where ((((semesterNum > 2 and entrySemesterNum = 1) or (semesterNum > 4 and entrySemesterNum = 3)) and date_format(entryDate,'%m') = '01') or (date_format(entryDate,'%m') <> '01')) and completeStatus = 0 and deferStatus = 0 and indexno is not NULL`;
         
         // MLK & Others only
         // const students = await ais.$queryRaw`select indexno,semesterNum from ais_student where completeStatus = 0 and deferStatus = 0 and indexno is not NULL`;

         const resp = await Promise.all(students.map(async (st:any) => {
            console.log("st: ",st)
            // Check If Progressed
            const pg = await ais.activityProgress.findFirst({ where: { indexno: st?.indexno, sessionId: session?.id }})
            if(pg) return null;

            // Update Student SemesterNum & CompleteStatus
            await ais.student.update({
               where: { id: st?.id }, 
               data: { 
                  semesterNum: (st?.semesterNum+1 > st?.semesterTotal ?  0 : st?.semesterNum+1), 
                  completeStatus: (st?.semesterNum+1 > st?.semesterTotal ?  true : false 
               )}
            })
            
            // Return Response
            return ais.activityProgress.create({
               data: {
                  student: { connect: { indexno: st.indexno }},
                  semesterNum: st.semesterNum+1,
                  status: true,
                  ... session && ({ session: { connect: { id: session?.id }}}),
               }
            })
         }))
         
         if(resp){
            res.status(200).json(resp)
         } else {
            res.status(202).json({ message: `no records found` })
         }
         
      } catch (error: any) {
            console.log(error)
            return res.status(500).json({ message: error.message }) 
      }
   }

   async updateProgression(req: Request,res: Response) {
      try {
         const resp = await ais.activityProgress.update({
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
            res.status(202).json({ message: `No records found` })
         }
      } catch (error: any) {
            console.log(error)
            return res.status(500).json({ message: error.message }) 
      }
   }

   async deleteProgression(req: Request,res: Response) {
      try {
         const resp = await ais.activityProgress.delete({
            where: {  id: req.params.id  }
         })
         if(resp){
            res.status(200).json(resp)
         } else {
            res.status(202).json({ message: `No records found` })
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
      let searchCondition:any = {
         where: { 
           session: { OR: [{ default: true  },{ assignLateSheet: true  }] }
         }
      }
      try {
         if(keyword) searchCondition = { 
            where: { 
               session: { 
                 OR: [
                  { default: true  },
                  { assignLateSheet: true  },
                 ]
               },
               OR: [
                  { courseId: { contains: keyword }},
                  { session: { title: { contains: keyword } }},
                  { course: { title: { contains: keyword } }},
                  { course: { id: { contains: keyword } }},
                  { program: { longName: { contains: keyword } }},
                  { unit: { title: { contains: keyword }, levelNum: 2 }},
               ],
            }
         }

         const resp = await ais.$transaction([
            ais.sheet.count({
               ...(searchCondition),
            }),
            ais.sheet.findMany({
               ...(searchCondition && 
               ({ ...searchCondition, 
                  include: { 
                     session:true,
                     program:true,
                     course:true,
                     major:true,
                     assignee:true,
               }})),
               skip: offset,
               take: Number(pageSize),
               orderBy: [{ sessionId:'desc'},{ semesterNum:'asc'}]
            })
         ]);
         
         //if(resp && resp[1]?.length){
            res.status(200).json({
               totalPages: Math.ceil(resp[0]/pageSize) ?? 0,
               totalData: resp[1]?.length,
               data: resp[1],
            })
        // } else {
            //res.status(202).json({ message: `no records found` })
         //}
      } catch (error: any) {
         console.log(error)
         return res.status(500).json({ message: error.message }) 
      }
  }

  async fetchMySheets(req: any, res: Response) {
      const assignStaffId = req.userId;
      const { page = 1, pageSize = 6, keyword = '' } :any = req.query;
      const offset = (page - 1) * pageSize;
      let searchCondition:any = { 
         where: {
            //assessorId: assignStaffId,
            assignStaffId,
            session: { 
               OR: [
                  { default: true  },
                  { assignLateSheet: true  },
               ]
            }, 
         } 
      };
      try {
         if(keyword) searchCondition = { 
            where: { 
               //assessorId: assignStaffId,
               assignStaffId,
               session: { 
                  OR: [
                    { default: true  },
                    { assignLateSheet: true  },
                  ]
               },
               OR: [
                  { session: { title: { contains: keyword } }},
                  { course: { title: { contains: keyword } }},
                  { course: { id: { contains: keyword } }},
                  { program: { longName: { contains: keyword } }},
                  { unit: { title: { contains: keyword }, levelNum: 2 }},
                 
               ],
            }
         }

         const resp = await ais.$transaction([
            ais.sheet.count({
               ...(searchCondition),
            }),
            ais.sheet.findMany({
               ...(searchCondition && 
               ({ ...searchCondition, 
                  include: { 
                     session:true,
                     program:true,
                     course:true,
                     major:true,
                     assignee:true,
               }})),
               skip: offset,
               take: Number(pageSize),
               orderBy: [{ sessionId:'desc'},{ semesterNum:'asc'}]
            })
         ]);
         
         //if(resp && resp[1]?.length){
            res.status(200).json({
               totalPages: Math.ceil(resp[0]/pageSize) ?? 0,
               totalData: resp[1]?.length,
               data: resp[1],
            })
      // } else {
            //res.status(202).json({ message: `no records found` })
         //}
      } catch (error: any) {
         console.log(error)
         return res.status(500).json({ message: error.message }) 
      }
  }

  async stageSheet(req: Request,res: Response) {
      try {
         // Fetch Active Semester
         const { sessionId } = req.body
         // Fetch Session Info
         const session = await ais.session.findFirst({ where: { id: sessionId, default: true }})
         if(session){
            // Fetch Mounted Courses all Program Levels
            let mounts = await ais.structure.findMany({ where: { status: true }})
            mounts = mounts.filter((meta: any) => (meta?.semesterNum % 2) == (session?.semester == 'SEM2' ? 0 : 1))
            // Check whether Sheets are generated 
            const form = await ais.sheet.findFirst({ where: { sessionId, status: true }})
            if(form){
               // Update Generated Flag
               await ais.session.update({ where: { id: sessionId }, data: { stageSheet: true } })
               // Return Response
               return res.status(202).json({ message: `sheets exists for calendar` });
            }
            
            // Upsert Bulk into Sheet 
            const resp:any = await Promise.all(mounts?.map(async (row:any) => {
               let { courseId,programId,unitId,majorId } = row;
               return await ais.sheet.create({ data: {
                  semesterNum: row.semesterNum,
                  ... sessionId && ({ session: { connect: { id: sessionId }}}),
                  ... courseId && ({ course: { connect: { id: courseId }}}),
                  ... programId && ({ program: { connect: { id: programId }}}),
                  ... majorId && ({ major: { connect: { id: majorId }}}),
                  ... unitId && ({ unit: { connect: { id: unitId }}}),
               }})
            }))
            //const resp = await ais.sheet.create({ data })
            if(resp){
               // Update Stage Status in Calendar
               await ais.session.update({ where: { id: sessionId }, data: { stageSheet: true } })
               return res.status(200).json(resp)

            } else {
               return res.status(202).json({ message: `no record found` })
            }
         
         } else {
            return res.status(202).json({ message: `no record found` })
         }
         
      } catch (error: any) {
         console.log(error)
         return res.status(500).json({ message: error.message }) 
      }
  }

  async loadSheet(req: Request,res: Response) {
      try {
         // Fetch Active Semester
         const { sheetId } = req.body;
         // Fetch Session Info
         const sheet = await ais.sheet.findFirst({ where: { id: sheetId, status: true }, include:{ program: true, unit: true, session: true, course: true, major: true  }})
         //console.log(sheet)
         if(sheet){
            // Fetch Mounted Courses all Program Levels
            let mounts = await ais.assessment.findMany({ 
                where: { 
                  semesterNum: sheet.semesterNum,
                  sessionId: sheet?.sessionId,  
                  courseId: sheet?.courseId,  
                  student: { programId: sheet?.programId },  
                },
                include: { student: true, scheme: true },
                orderBy: [ { student: { fname: 'asc' }}, ]
            })
            mounts = mounts?.filter((st: any,i: number) => {
               // if(st?.student?.semesterNum < 5) return sheet?.programId == st?.student?.programId && sheet?.studyMode == st?.student?.studyMode;
               // return sheet?.programId == st?.student?.programId && sheet?.majorId == st?.student?.majorId && sheet?.studyMode == st?.student?.studyMode;
               if(st?.student?.semesterNum < 5) return sheet?.studyMode == st?.student?.studyMode;
               return sheet?.majorId == st?.student?.majorId && sheet?.studyMode == st?.student?.studyMode;
            });
            
            let resp = mounts?.map((row:any) => {  
               const grade = getGrade(row.totalScore, row.scheme?.gradeMeta);
               const gradepoint = getGradePoint(row.totalScore, row.scheme?.gradeMeta);
               return ({
                  ...row,
                  grade,
                  gradepoint
               })
            });
            
            if(resp){
               res.status(200).json(resp)
            } else {
               res.status(202).json({ message: `no record found` })
            }
         } else {
            res.status(202).json({ message: `no record found` })
         }
         
      } catch (error: any) {
         console.log(error)
         return res.status(500).json({ message: error.message }) 
      }
  }

  async saveSheet(req: Request,res: Response) {
      try {
         // Fetch Active Semester
         const { count, data } = req.body;
         console.log(req.body)
         let mounts = [];
         const courseId = data[`cid`]; 
         const sessionId = data[`sid`]; 
            
         for(let i = 0; i < count; i++){
            const scoreA = data[`${i}_scorea`] ? parseFloat(data[`${i}_scorea`]): null; 
            const scoreB = data[`${i}_scoreb`] ? parseFloat(data[`${i}_scoreb`]): null;
            const scoreC = data[`${i}_scorec`] ? parseFloat(data[`${i}_scorec`]): null;
            const classScore = (scoreA && scoreB && scoreC) ? (scoreA + scoreB + scoreC) : (scoreA && scoreB && !scoreC) ? (scoreA + scoreB) : parseFloat(data[`${i}_class`]); 
            const examScore = parseFloat(data[`${i}_exam`]); 
            const totalScore = classScore+examScore; 
            const indexno = data[`${i}_idx`]; 
            const id = data[`${i}_id`]; 
            
            mounts.push({
               where: { id, course: { id: courseId }, session: { id: sessionId }, indexno },
               data: {
                  // ... scoreA && ({ scoreA }),
                  // ... scoreB && ({ scoreB }),
                  // ... scoreC && ({ scoreC }),
                  scoreA,
                  scoreB,
                  scoreC,
                  classScore,
                  examScore,
                  totalScore, 
               }
            })
         }
         // Bulk Score Update 
         const resp:any = await Promise.all(mounts?.map(async (query:any) => {
            return await ais.assessment.updateMany(query)
         }))
   
         if(resp){
            res.status(200).json(resp)
         } else {
            res.status(202).json({ message: `no record found` })
         }
        
      } catch (error: any) {
         console.log(error)
         return res.status(500).json({ message: error.message }) 
      }
   }

   async stageAuccSheet(req: Request,res: Response) {
      try {
         // Fetch Active Semester
         const { sessionId } = req.body;
         let loopcount = 0;
         // Check whether Sheets are generated 
         const form = await ais.sheet.findFirst({ where: { sessionId, status: true }})
         if(form) res.status(202).json({ message: `no record found` });
         // Fetch Session Info
         const session = await ais.session.findFirst({ where: { id: sessionId, default: true }})
         if(session){
            if(session?.tag?.toLowerCase() == 'main'){
               // Fetch Mounted Courses all Program Levels
               const mounts = await ais.structure.findMany({ where: { status: true, program: { status: true } }, include: { program: true }})
               if(mounts?.length){
                  for(let meta of mounts){
                     if (meta.semesterNum % 2 == (session.semester == 'SEM2' ? 1 : 0)) continue;
                     var sessionModes:any = [];
                     switch (meta?.program?.category) {
                        case "CP": sessionModes = ["M"]; break;
                        case "DP": sessionModes = ["M", "E", "W"]; break;
                        case "UG": sessionModes = ["M", "E", "W"]; break;
                        case "PG": sessionModes = ["W"]; break;
                     }

                     // Run Data For All Existing Session Modes
                     if (sessionModes?.length) {
                        const resp:any = await Promise.all(sessionModes?.map(async (mode:any) => {
                           let { courseId,programId,unitId,majorId } = meta;
                           return await ais.sheet.create({ data: {
                              semesterNum: meta.semesterNum,
                              studyMode: mode,
                              ... sessionId && ({ session: { connect: { id: sessionId }}}),
                              ... courseId && ({ course: { connect: { id: courseId }}}),
                              ... programId && ({ program: { connect: { id: programId }}}),
                              ... majorId && ({ major: { connect: { id: majorId }}}),
                              ... unitId && ({ unit: { connect: { id: unitId }}}),
                           }})
                        }))
                        if(resp.length) loopcount += resp.length;
                     }
                  }
               } 
            
            } else {
               // JAN - SUB STREAM
               const code = session?.admissionPrefix;
               if(code){  // Only Set for January Sessions - not Main Session
                  // Check Student if students admitted
                  const st:any = await ais.$queryRaw`select * from ais_student where date_format(entryDate,'%m%y') = ${code} and semesterNum < 5`;
                  // Fetch Mounted Courses all Program Levels
                  let mounts = await ais.structure.findMany({ where: { status: true, semesterNum: { lt: 5 }, program: { status: true } }, include: { program: true }})
                  // Filter Mounted to Some Specific course and programs
                  let holder:any = new Set();
                  for (const s of st) {
                  if(!holder.has(`${s.programId}${s.semesterNum}${s.studyMode ? s.studyMode : ""}`))
                     holder.add(`${s.programId}${s.semesterNum}${s.studyMode ? s.studyMode : ""}`);
                  }
                  mounts = mounts.filter((r:any) => [1, 2].includes(r.semesterNum) || ([3, 4].includes(r.semesterNum) && holder.has(`${r.programId}${r.semesterNum}${r.studyMode ? r.studyMode : ""}`)));
                  
                  if(st?.length && mounts?.length){
                     for(let meta of mounts){
                        if (meta.semesterNum % 2 == (session.semester == 'SEM2' ? 1 : 0)) continue;
                        var sessionModes:any = [];
                        switch (meta?.program?.category) {
                           case "CP": sessionModes = ["M"]; break;
                           case "DP": sessionModes = ["M", "E", "W"]; break;
                           case "UG": sessionModes = ["M", "E", "W"]; break;
                           case "PG": sessionModes = ["W"]; break;
                        }

                        // Run Data For All Existing Session Modes
                        if (sessionModes?.length) {
                           const resp:any = await Promise.all(sessionModes?.map(async (mode:any) => {
                              let { courseId,programId,unitId,majorId } = meta;
                              return await ais.sheet.create({ data: {
                                 semesterNum: meta.semesterNum,
                                 studyMode: mode,
                                 ... sessionId && ({ session: { connect: { id: sessionId }}}),
                                 ... courseId && ({ course: { connect: { id: courseId }}}),
                                 ... programId && ({ program: { connect: { id: programId }}}),
                                 ... majorId && ({ major: { connect: { id: majorId }}}),
                                 ... unitId && ({ unit: { connect: { id: unitId }}}),
                              }})
                           }))
                           if(resp.length) loopcount += resp.length;
                        }
                     }
                  } 
               }
            }
         } else {
            // Session Not Default or Activated
            res.status(202).json({ message: `Session is not activated!` })
         }
         
         if(loopcount){
            // Update Stage Status in Calendar
            await ais.session.update({ where: { id: sessionId }, data: { stageSheet: true } })
            res.status(200).json(loopcount)

         } else {
            res.status(202).json({ message: `no record found` })
         }
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
               session:{ select: { title: true,tag: true }},
               program:{ select: { longName: true, category: true }},
               course:{ select: { title: true, id: true, creditHour: true }},
               major:{ select: { longName: true }},
               assignee:true,
               assessor: true,
               certifier: true
            }, 
         })
         if(resp){
            res.status(200).json(resp)
         } else {
            res.status(202).json({ message: `no record found` })
         }
      } catch (error: any) {
         console.log(error)
         return res.status(500).json({ message: error.message }) 
      }
  }

  async postSheet(req: Request,res: Response) {
      try {
         const resp = await ais.sheet.create({
            data: {
               ...req.body,
            },
         })
         if(resp){
            res.status(200).json(resp)
         } else {
            res.status(202).json({ message: `no records found` })
         }
         
      } catch (error: any) {
            console.log(error)
            return res.status(500).json({ message: error.message }) 
      }
  }

  async submitSheet(req: any,res: Response) {
      try {
         const assessorId:any = req.userId;
         const resp = await ais.sheet.update({ where: { id: req.params.id }, data: { assessed: true, assessorId } });
         if(resp){
            console.log(resp)
            res.status(200).json(resp)
         } else {
            res.status(202).json({ message: `No records found` })
         }
      } catch (error: any) {
            console.log(error)
            return res.status(500).json({ message: error.message }) 
      }
  }

  async closeSheet(req: Request,res: Response) {
      try {
         const resp:any = await ais.sheet.findUnique({ where: { id: req.params.id }});
         if(resp){
            let { courseId,programId,unitId,majorId,sessionId,semesterNum,studyMode } = resp
            // Update Student Assessment Publish Status
            await ais.assessment.updateMany({ 
               where: {
                  ... sessionId && ({ sessionId }),
                  ... courseId && ({ courseId }),
                  ... programId && ({ student: { programId }}),
                  ... majorId && ({ student: { majorId }}),
                  ... studyMode && ({ student: { studyMode }}),
                  ... semesterNum && ({ semesterNum: Number(semesterNum) }),
                  // ... unitId && ({ unitId }),
               }, 
               data: { status: true } 
            })
            // Update Sheet
            await ais.sheet.update({ where: { id: req.params.id }, data: { finalized: true } })
            // Return Response
            res.status(200).json(resp)
         } else {
            res.status(202).json({ message: `No records found` })
         }
      } catch (error: any) {
            console.log(error)
            return res.status(500).json({ message: error.message }) 
      }
  }

  async publishSheet(req: any,res: Response) {
      try {
         const certifierId:any = req.userId;
         const resp:any = await ais.sheet.findUnique({ where: { id: req.params.id }});
         if(resp){
            let { courseId,programId,unitId,majorId,sessionId,semesterNum,studyMode } = resp
            // Update Student Assessment Publish Status
            await ais.assessment.updateMany({ 
               where: {
                  ... sessionId && ({ sessionId }),
                  ... courseId && ({ courseId }),
                  ... programId && ({ student: { programId }}),
                  ... majorId && ({ student: { majorId }}),
                  ... studyMode && ({ student: { studyMode }}),
                  ... semesterNum && ({ semesterNum: Number(semesterNum) }),
                  // ... unitId && ({ unitId }),
               }, 
               data: { status: true } 
            })
            // Update Sheet
            await ais.sheet.update({ where: { id: req.params.id }, data: { certified: true, certifierId } })
            // Return Response
            res.status(200).json(resp)
         } else {
            res.status(202).json({ message: `No records found` })
         }
      } catch (error: any) {
            console.log(error)
            return res.status(500).json({ message: error.message }) 
      }
   }

   async unpublishSheet(req: Request,res: Response) {
      try {
         const resp:any = await ais.sheet.findUnique({ where: { id: req.params.id }});
         if(resp){
            let { courseId,programId,unitId,majorId,sessionId,semesterNum,studyMode } = resp
            // Update Student Assessment Publish Status
            const ups = await ais.assessment.updateMany({ 
               where: {
                  ... sessionId && ({ sessionId }),
                  ... courseId && ({ courseId }),
                  ... programId && ({ student: { programId }}),
                  ... majorId && ({ student: { majorId }}),
                  ... studyMode && ({ student: { studyMode }}),
                  ... semesterNum && ({ semesterNum: Number(semesterNum) }),
                  // ... unitId && ({ unitId }),
               }, 
               data: { status: false } 
            })
            console.log(ups)
            // Update Sheet
            await ais.sheet.update({ where: { id: req.params.id }, data: { certified: false, certifierId: null } })
            // Return Response
            res.status(200).json(resp)
         } else {
            res.status(202).json({ message: `No records found` })
         }
      } catch (error: any) {
            console.log(error)
            return res.status(500).json({ message: error.message }) 
      }
   }

   async updateSheet(req: Request,res: Response) {
      try {
         const resp = await ais.sheet.update({
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
            res.status(202).json({ message: `No records found` })
         }
      } catch (error: any) {
            console.log(error)
            return res.status(500).json({ message: error.message }) 
      }
   }

  async deleteSheet(req: Request,res: Response) {
      try {
         const resp = await ais.sheet.delete({
            where: {  id: req.params.id  }
         })
         if(resp){
            res.status(200).json(resp)
         } else {
            res.status(202).json({ message: `No records found` })
         }
      } catch (error: any) {
         console.log(error)
         return res.status(500).json({ message: error.message }) 
      }
  }



  /* Backlog */
  async fetchBacklogs(req: Request,res: Response) {
   const { page = 1, pageSize = 6, keyword = '' } :any = req.query;
   const offset = (page - 1) * pageSize;
   let searchCondition = { }
   try {
      if(keyword) searchCondition = { 
         where: { 
            OR: [
               { type: { contains: keyword } },
               { session: { title: { contains: keyword } }},
            ],
         },
      }
      const resp = await ais.$transaction([
         ais.activityBacklog.count({
            ...(searchCondition),
         }),
         ais.activityBacklog.findMany({
            ...(searchCondition),
            skip: offset,
            take: Number(pageSize),
            include: { 
               session: true
            }
         })
      ]);
      
      //if(resp && resp[1]?.length){
         return res.status(200).json({
            totalPages: Math.ceil(resp[0]/pageSize) ?? 0,
            totalData: resp[1]?.length,
            data: resp[1],
         })
      // } else {
      //    return res.status(202).json({ message: `no records found` })
      // }
   } catch (error: any) {
      console.log(error)
      return res.status(500).json({ message: error.message }) 
   }
}

async fetchBacklog(req: Request,res: Response) {
   try {
      const resp = await ais.activityBacklog.findUnique({
         where: { id: req.params.id },
         include: { session: true }
      })
      if(resp){
         return res.status(200).json(resp)
      } else {
         return res.status(202).json({ message: `no record found` })
      }
   } catch (error: any) {
      console.log(error)
      return res.status(500).json({ message: error.message }) 
   }
}

async approveBacklog(req: any,res: Response) {
   try {
      const approvedBy = req.userId;
      const rs = await ais.activityBacklog.findUnique({
         where: { id: req.body?.backlogId },
      })

      if(rs){
         const { id, type, meta,sessionId,schemeId } = rs;
         let data = [], resp; 

         if(type == 'ASSESSMENT'){ // BACKLOG ASSESSMENT
            // data = await Promise.all(meta.map(async(r:any) => {
            //    const cs = await ais.course.findUnique({ where: { id: r.courseId }});
            //    return ({
            //       indexno: r.indexno,
            //       courseId: r.courseId,
            //       semesterNum: Number(r.semesterNum),
            //       classScore: r.scoreClass,
            //       examScore: r.scoreExam,
            //       totalScore: r.scoreTotal,
            //       type: r.scoreType,
            //       status: true,
            //       credit: cs?.creditHour,
            //       sessionId,
            //       schemeId
            //    })
            // }))
            // resp = await ais.assessment.createMany({ data });

            data = await Promise.all(meta.map(async(r:any) => {
               const as = await ais.assessment.findFirst({ where: {  sessionId, courseId: r.courseId, indexno: r.indexno }});
               const cs = await ais.course.findUnique({ where: { id: r.courseId }});
               // Log Existing Data
               await ais.log.create({ data: { action:`BACKLOG_${type}`, user:req.userId, student:r.indexno, meta:as }});
               console.log(as);
               // Upsert New Data
               return await ais.assessment.upsert({
                  where: { 
                     id: as?.id ?? ''
                    // sessionId,
                     // courseId: r.courseId,
                     // indexno: r.indexno
                  },
                  create:{
                     indexno: r.indexno,
                     courseId: r.courseId,
                     semesterNum: Number(r.semesterNum),
                     classScore: r.scoreClass,
                     examScore: r.scoreExam,
                     totalScore: r.scoreTotal,
                     type: r.scoreType,
                     status: true,
                     credit: cs?.creditHour,
                     sessionId,
                     schemeId
                  },
                  update: {
                     semesterNum: Number(r.semesterNum),
                     classScore: r.scoreClass,
                     examScore: r.scoreExam,
                     totalScore: r.scoreTotal,
                     type: r.scoreType,
                     credit: cs?.creditHour,
                     schemeId
                  },
                  
               })
            }))
            resp = { count: data?.length };
            

         } else if(type == 'REGISTRATION'){ // BACKLOG REGISTRATION
            data = await Promise.all(meta.map(async(r:any) => {
               const cs = await ais.course.findUnique({ where: { id: r.courseId }});
               return ({
                  indexno: r.indexno,
                  courseId: r.courseId,
                  semesterNum: Number(r.semesterNum),
                  type: r.scoreType,
                  status: true,
                  credit: cs?.creditHour,
                  sessionId,
                  schemeId
               })
            }))
            resp = await ais.assessment.createMany({ data });

         } else if(type == 'DELETION'){ // BACKLOG DELETION
            data = await Promise.all(meta.map(async(r:any) => {
               const as = await ais.assessment.findFirst({ where: { sessionId, courseId: r.courseId, indexno: r.indexno }});
               // Log Existing Data
               await ais.log.create({ data: { action:`BACKLOG_${type}`, user:req.userId, student:r.indexno, meta:as }});
               // Upsert New Data
               return ais.assessment.deleteMany({ where: { indexno: r.indexno, courseId: r.courseId, sessionId } })
            }))
            resp = { count: data?.length };
         }
         console.log(resp)
         if(resp?.count){
            // Update Backlog Status
            await ais.activityBacklog.update({ where: { id }, data: { approvedBy, status: true } });
            // Return Response
            res.status(200).json({ success:true, data:resp })

         } else {
            res.status(202).json({ message: `no records found` })
         }

      } 
      else throw("Invalid Backlog Id")
   
   } catch (error: any) {
         console.log(error)
         return res.status(500).json({ message: error.message }) 
   }
}

async postBacklog(req: any,res: Response) {
   try {
      const createdBy = req.userId;
      const { sessionId,schemeId,type,title } = req.body;
      let meta = [];
      const metaNum = parseInt(req.body.metaNum);
      if(metaNum)
        for(let i = 1; i <= metaNum; i++ ){
           const indexno = req.body[`${i}_indexno`];
           const courseId = req.body[`${i}_courseId`];
           const semesterNum = req.body[`${i}_semesterNum`];
           const scoreType = req.body[`${i}_scoreType`];
           const scoreClass = parseFloat(req.body[`${i}_scoreClass`]);
           const scoreExam = parseFloat(req.body[`${i}_scoreExam`]);
           const scoreTotal = parseFloat(req.body[`${i}_scoreTotal`]);
           if(type == 'REGISTRATION')
             meta.push({ indexno,courseId,semesterNum,scoreType })
           else if(type == 'ASSESSMENT')
             meta.push({ indexno,courseId,semesterNum, scoreType, scoreClass, scoreExam, scoreTotal  })
           else 
             meta.push({ indexno,courseId,semesterNum })
        }
      
      const resp = await ais.activityBacklog.create({
         data: {
            title,
            type,
            meta,
            ... createdBy && ({ creator: { connect: { staffNo:createdBy }}}),
            ... sessionId && ({ session: { connect: { id:sessionId }}}),
            ... schemeId && ({ scheme: { connect: { id:schemeId }}}),
         },
      })
      if(resp){
         res.status(200).json({success: true, data:resp })
      } else {
         res.status(202).json({ message: `no records found` })
      }
      
   } catch (error: any) {
         console.log(error)
         return res.status(500).json({ message: error.message }) 
   }
}

async updateBacklog(req: any,res: Response) {
   try {
      const createdBy = req.userId
      const { sessionId,schemeId,type,title } = req.body;
      let meta = [];
      const metaNum = parseInt(req.body.metaNum);
      if(metaNum)
        for(let i = 1; i <= metaNum; i++ ){
           const indexno = req.body[`${i}_indexno`];
           const courseId = req.body[`${i}_courseId`];
           const semesterNum = req.body[`${i}_semesterNum`];
           const scoreType = req.body[`${i}_scoreType`];
           const scoreClass = parseFloat(req.body[`${i}_scoreClass`]);
           const scoreExam = parseFloat(req.body[`${i}_scoreExam`]);
           const scoreTotal = parseFloat(req.body[`${i}_scoreTotal`]);
           if(type == 'REGISTRATION')
             meta.push({ indexno,courseId,semesterNum,scoreType })
           else if(type == 'ASSESSMENT')
             meta.push({ indexno,courseId,semesterNum,scoreType, scoreClass, scoreExam, scoreTotal  })
           else 
             meta.push({ indexno,courseId,semesterNum })
        }
      
      const resp = await ais.activityBacklog.update({
         where: { id: req.params.id },
         data: {
            title,
            type,
            meta,
            ... createdBy && ({ creator: { connect: { staffNo:createdBy }}}),
            ... sessionId && ({ session: { connect: { id:sessionId }}}),
            ... schemeId && ({ scheme: { connect: { id:schemeId }}}),
         },
      })
      if(resp){
         res.status(200).json(resp)
      } else {
         res.status(202).json({ message: `No records found` })
      }
   } catch (error: any) {
         console.log(error)
         return res.status(500).json({ message: error.message }) 
   }
}


async deleteBacklog(req: Request,res: Response) {
   try {
      const resp = await ais.activityBacklog.delete({
         where: {  id: req.params.id  }
      })
      if(resp){
         res.status(200).json(resp)
      } else {
         res.status(202).json({ message: `No records found` })
      }
   } catch (error: any) {
      console.log(error)
      return res.status(500).json({ message: error.message }) 
   }
}



 /* Deferments */
 async fetchDeferments(req: Request,res: Response) {
   const { page = 1, pageSize = 9, keyword = '' } :any = req.query;
   const offset = (page - 1) * pageSize;
   let searchCondition = { }
   try {
      if(keyword) searchCondition = { 
         where: { 
            OR: [
               { student:{ id: { contains: keyword } }},
               { student:{ indexno: { contains: keyword } }},
               { student:{ fname: { contains: keyword } }},
               { student:{ lname: { contains: keyword } }},
               { session:{ title: { contains: keyword } }},
            ],
         }
      }
      const resp = await ais.$transaction([
         ais.activityDefer.count({
            ...(searchCondition),
         }),
         ais.activityDefer.findMany({
            ...(searchCondition),
            skip: offset,
            take: Number(pageSize),
            include:{
               // _count: {
               //    select: { program: true }
               // }
               student: true,
               session: true
            }
         })
      ]);
      
      //if(resp && resp[1]?.length){
         res.status(200).json({
            totalPages: Math.ceil(resp[0]/pageSize) ?? 0,
            totalData: resp[1]?.length,
            data: resp[1],
         })
      //} else {
         //res.status(202).json({ message: `no records found` })
      //}
   } catch (error: any) {
      console.log(error)
      return res.status(500).json({ message: error.message }) 
   }
}

async fetchDefermentList(req: Request,res: Response) {
   try {
      const resp = await ais.activityDefer.findMany({
         where: { status: true },
      })
      if(resp){
      res.status(200).json(resp)
      } else {
      res.status(202).json({ message: `no record found` })
      }
   } catch (error: any) {
      console.log(error)
      return res.status(500).json({ message: error.message }) 
   }
}

async fetchDeferment(req: Request,res: Response) {
   try {
      const resp = await ais.activityDefer.findUnique({
         where: { 
            id: req.params.id 
         },
         include:{ program: true }
      })
      if(resp){
         res.status(200).json(resp)
      } else {
         res.status(202).json({ message: `no record found` })
      }
   } catch (error: any) {
      console.log(error)
      return res.status(500).json({ message: error.message }) 
   }
}

async postDeferment(req: Request,res: Response) {
try {
   
   const resp = await ais.activityDefer.create({
      data: {
         ...req.body,
      },
   })
   if(resp){
      res.status(200).json(resp)
   } else {
      res.status(202).json({ message: `no records found` })
   }
   
   } catch (error: any) {
      console.log(error)
      return res.status(500).json({ message: error.message }) 
   }
}

async updateDeferment(req: Request,res: Response) {
try {
   const resp = await ais.activityDefer.update({
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
      res.status(202).json({ message: `No records found` })
   }
   } catch (error: any) {
      console.log(error)
      return res.status(500).json({ message: error.message }) 
   }
}

async deleteDeferment(req: Request,res: Response) {
   try {
      const resp = await ais.activityDefer.delete({
         where: {  id: req.params.id  }
      })
      if(resp){
         res.status(200).json(resp)
      } else {
         res.status(202).json({ message: `No records found` })
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
            res.status(202).json({ message: `no record found` })
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
        res.status(202).json({ message: `no records found` })
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
            res.status(202).json({ message: `no records found` })
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
            res.status(202).json({ message: `no record found` })
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
         
         if(uroles.length &&  uroles.find((r:any) => [ urole?.app?.tag ].includes(r?.appRole?.app?.tag))) allowRole = false;
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
            res.status(202).json({ message: `no records found` })
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
            res.status(202).json({ message: `No records found` })
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
            res.status(202).json({ message: `No records found` })
         }
      } catch (error: any) {
         console.log(error)
         return res.status(500).json({ message: error.message }) 
      }
  }

  async checkUser(req: Request,res: Response) {
      try {
         const { userId } = req.body
         const resp = await ais.user.findFirst({ where: { tag: userId?.toString() }})
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
                { staffNo: { contains: keyword } },
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
            res.status(202).json({ message: `no records found` })
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
            res.status(202).json({ message: `no record found` })
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
         res.status(202).json({ message: `no records found` })
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
         res.status(202).json({ message: `no records found` })
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
           res.status(202).json({ message: `no records found` })
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
         res.status(202).json({ message: `no records found` })
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
          res.status(202).json({ message: `no records found` })
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
          res.status(202).json({ message: `No records found` })
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
         res.status(202).json({ message: `No records found` })
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
           res.status(202).json({ message: `no record found` })
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
           res.status(202).json({ message: `no record found` })
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
           res.status(202).json({ message: `no record found` })
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
           res.status(202).json({ message: `no record found` })
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
           res.status(202).json({ message: `no record found` })
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
           res.status(202).json({ message: `no record found` })
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
           res.status(202).json({ message: `no record found` })
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
           res.status(202).json({ message: `no record found` })
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
           res.status(202).json({ message: `no record found` })
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
           res.status(202).json({ message: `no record found` })
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
           res.status(202).json({ message: `no record found` })
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
         //  const students = require('../../util/active_student.json');
         //   const staff = require('../../util/staff.json');
         //  const users = require('../../util/users.json');
         //  const jobs = require('../../util/job.json');
         //  const scores = require('../../util/_calendar.json');
         //const scores = require('../../util/_scheme.json');
         //  const scores = require('../../util/units.json');
         // const courses = require('../../util/aucc_courses.json');
         // const courses = require('../../util/courses.json');
         
         // if(courses.length){
         //   for(const course of courses){
         //      console.log(course)
         //      const ins = await ais.course.create({
         //          data: {
         //             id: course.course_code,
         //             title: course.title?.toUpperCase(),
         //             creditHour: Number(course.credit),
         //             remark:'ACTIVE'
         //          }
         //      })
         //   }
         // }
         //  if(jobs.length){
         //    for(const subj of jobs){
         //       console.log(subj)
         //       const ins = await ais.job.create({
         //           data: {
         //              title: subj?.title, 
         //              type: subj?.type, 
         //              staffCategory: subj?.staff_group, 
         //              status: true
         //           }
         //       })
         //       console.log(ins)
         //    }
         //  }


         // if(students.length){
         //   for(const student of students){
         //      console.log(student)
         //      const ins = await ais.student.create({
         //          data: {
         //             id: student?.refno,
         //             indexno: student.indexno,
         //             fname: student.fname?.toUpperCase(),
         //             mname: student.mname?.toUpperCase(),
         //             lname: student.lname?.toUpperCase(),
         //             ... student?.dob && ({ dob: moment(student?.dob,'YYYY-MM-DD').toDate() }),
         //             ... student?.doa && ({ entryDate: moment(student?.doa,'YYYY-MM-DD').toDate() }),
         //             ... student?.doc && ({ exitDate: moment(student?.doc,'YYYY-MM-DD').toDate() }),
         //             entryGroup: student.entry_group,
         //             semesterNum: Number(student?.semester),
         //             phone: student.phone?.replace("+233","0")?.substring(0,10),
         //             email: student.email,
         //             gender: student.gender,
         //             guardianName: student.guardian_name,
         //             guardianPhone: student.guardian_phone,
         //             instituteEmail: student.institute_email,
         //             completeStatus: student.complete_status == 1 ? true : false,
         //             deferStatus: student.defer_status == 1 ? true : false,
         //             graduateStatus: student.graduate_status == 1 ? true : false,
         //             studyMode: student.session,
         //             ... student?.transact_account && ({ accountNet: parseFloat(student.transact_account) }),
         //             ... student?.entry_semester && ({ entrySemesterNum: Number(student.entry_semester) }),
         //             ... student?.prog_id && ({ program: { connect: { id: student?.prog_id }} }),
         //             ... student?.major_id && ({ major: { connect: { id: student?.major_id }} }),
         //             ... student?.country_id && ({ country: { connect: { id: student?.country_id }} }),
         //             //country: { connect: { id: "96b0a1d5-7899-4b9a-bcbe-7a72eee6572c" } },
         //          }
         //      })
         //   }
         // }

         // if(staff.length){
         //    for(const st of staff){
         //       console.log(st)
         //       const ins = await ais.staff.create({
         //           data: {
         //              staffNo: st?.staff_no?.toString(),
         //              fname: st.fname?.toUpperCase(),
         //              mname: st.mname?.toUpperCase(),
         //              lname: st.lname?.toUpperCase(),
         //              dob: st?.dob && moment(st?.dob,'YYYY-MM-DD').toDate(),
         //              phone: st.phone,
         //              email: st.email,
         //              residentAddress: st.address,
         //              gender: st.gender,
         //              hometown: st.hometown,
         //              birthplace: st.birth_place,
         //              ssnitNo: st.ssnit,
         //              instituteEmail: st.inst_mail,
         //              qualification: st.position,
         //             //  religion: { connect: { id: st.religionId }},
         //             ... st.unit_id && ({ unit: { connect: { id: st.unit_id?.toString() }}}),
         //             ... st.job_id && ({ job: { connect: { id: st.job_id?.toString() }}}),
         //             // job: { connect: { id: st.job_id }},
         //             country: { connect: { id: "96b0a1d5-7899-4b9a-bcbe-7a72eee6572c" }},
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

         // if(scores.length){
         //    for(const st of scores){
         //       console.log(st)
         //       const ins = await ais.assessment.create({
         //           data: {
         //              //indexno: st?.indexno,
         //              credit: Number(st.credit),
         //              semesterNum: Number(st.semesterNum),
         //              classScore: parseFloat(st.classScore),
         //              examScore: parseFloat(st.examScore),
         //              totalScore: parseFloat(st.totalScore),
         //              type: 'N',
         //              session: {
         //                 connect: {
         //                    id: st.sessionId
         //                 }
         //              },
         //              scheme: {
         //                connect: {
         //                   id: st.schemeId
         //                }
         //             },
         //             course: {
         //                connect: {
         //                   id: st.courseId?.trim()
         //                }
         //             },
         //             student: {
         //                connect: {
         //                   indexno: st.indexno?.trim()
         //                }
         //             },
                     
         //           }
         //       })
         //    }
         // }
         

         //  if(scores.length){
         //   for(const subj of scores){
         //      console.log(subj)
         //      const ins = await ais.unit.create({
         //          data: {
         //             code: subj?.code, 
         //             title: subj?.title, 
         //             type: subj?.type, 
         //             location: subj?.location, 
         //             levelNum: Number(subj?.level), 
         //          }
         //      })
         //   }
         // }

         // if(scores.length){
         //    for(const subj of scores){
         //       console.log(subj)
         //       const ins = await ais.major.create({
         //           data: {
         //              shortName: subj?.title, 
         //              longName: subj?.title, 
         //              status: true
         //           }
         //       })
         //    }
         //  }

         // if(scores.length){
         //    for(const subj of scores){
         //       console.log(subj)
         //       const ins = await ais.program.create({
         //           data: {
         //              code: subj?.code, 
         //              prefix: subj?.prefix, 
         //              shortName: subj?.short, 
         //              longName: subj?.long, 
         //              category: subj?.group_id, 
         //              semesterTotal: Number(subj?.semesters), 
         //              creditTotal: Number(subj?.credits), 
         //           }
         //       })
         //    }
         //  }

         // if(scores.length){
         //    for(const subj of scores){
         //       console.log(subj)
         //       const ins:any = await ais.student.create({
         //          data: {
         //             id: subj?.refno,
         //             indexno: subj.indexno,
         //             fname: subj.fname?.toUpperCase() || '',
         //             mname: subj.mname?.toUpperCase() || '',
         //             lname: subj.lname?.toUpperCase() || '',
         //             //dob: moment(subj?.dob,'DD/MM/YYYY').toDate(),
         //             semesterNum: Number(subj.semester) || 0,
         //             phone: subj.phone,
         //             email: subj.email,
         //             gender: subj.gender,
         //             completeStatus: !!subj.complete_status,
         //             deferStatus: !!subj.defer_status,
         //             graduateStatus: !!subj.graduate_status,
         //             // program: {
         //             //    connect: {
         //             //       id: subj.programId
         //             //    }
         //             // },
         //             country: {
         //                connect: {
         //                   id: "96b0a1d5-7899-4b9a-bcbe-7a72eee6572c"
         //                }
         //             },
         //          },
                  
         //       })
         //    }
         //  }

         // if(scores.length){
         //    for(const subj of scores){
         //       console.log(subj)
         //       const ins:any = await ais.student.upsert({
         //          where: { id: subj?.refno },
         //          create: {
         //             id: subj?.refno,
         //             indexno: subj.indexno,
         //             fname: subj.fname?.toUpperCase() || '',
         //             mname: subj.mname?.toUpperCase() || '',
         //             lname: subj.lname?.toUpperCase() || '',
         //             //dob: moment(subj?.dob,'DD/MM/YYYY').toDate(),
         //             semesterNum: Number(subj.semester) || 0,
         //             phone: subj.phone?.substring(10),
         //             email: subj.email,
         //             gender: subj.gender,
         //             completeStatus: !!subj.complete_status,
         //             deferStatus: !!subj.defer_status,
         //             graduateStatus: !!subj.graduate_status,
         //             // program: {
         //             //    connect: {
         //             //       id: subj.programId
         //             //    }
         //             // },
         //             country: {
         //                connect: {
         //                   id: "96b0a1d5-7899-4b9a-bcbe-7a72eee6572c"
         //                }
         //             },
         //          },
         //          update: {
         //             indexno: subj.indexno,
         //             fname: subj.fname?.toUpperCase() || '',
         //             mname: subj.mname?.toUpperCase() || '',
         //             lname: subj.lname?.toUpperCase() || '',
         //             //dob: moment(subj?.dob,'DD/MM/YYYY').toDate(),
         //             semesterNum: Number(subj.semester) || 0,
         //             phone: subj?.phone?.substring(10),
         //             email: subj.email,
         //             gender: subj.gender,
         //             completeStatus: !!subj.complete_status,
         //             deferStatus: !!subj.defer_status,
         //             graduateStatus: !!subj.graduate_status,
         //             // program: {
         //             //    connect: {
         //             //       id: subj.programId
         //             //    }
         //             // },
         //             country: {
         //                connect: {
         //                   id: "96b0a1d5-7899-4b9a-bcbe-7a72eee6572c"
         //                }
         //             },
         //          },
                  
         //       })
         //    }
         //  }

         //  if(users.length){
         //    for(const subj of users){
         //       console.log(subj)
         //       const ins = await ais.user.create({
         //           data: {
         //              groupId: Number(subj?.group_id), 
         //              tag: subj?.tag, 
         //              username: subj?.username, 
         //              password: subj?.password, 
         //          }
         //       })
         //    }
         //  }

         // if(scores.length){
         //    for(const subj of scores){
         //       console.log(subj)
         //       const ins = await ais.user.upsert({
         //           where: { tag: subj?.tag },
         //           create: {
         //              groupId: Number(subj?.group_id), 
         //              tag: subj?.tag, 
         //              username: subj?.username, 
         //              password: subj?.password, 
         //          },
         //          update: {
         //             username: subj?.username, 
         //             password: subj?.password, 
         //         }
         //       })
         //    }
         //  }
         //  // Calendar
         //  if(scores.length){
         //    for(const subj of scores){
         //       console.log(subj)
         //       const ins = await ais.session.create({
         //          data: {
         //             tag: subj?.tag, 
         //             title: subj?.title, 
         //             year: subj?.academic_year?.toString(), 
         //             semester: subj?.academic_sem == '1' ? 'SEM1':'SEM2', 
         //             default: !!subj?.default, 
         //             status: !!subj?.status
         //          }
         //       })
         //    }
         //  }

         //  // Schemes
         //  if(scores.length){
         //    for(const subj of scores){
         //       console.log(subj)
         //       const ins = await ais.scheme.create({
         //          data: {
         //             title: subj?.title, 
         //             gradeMeta: subj?.grade_meta || null, 
         //             classMeta: subj?.class_meta || null, 
         //             passMark: 0, 
         //          }
         //       })
         //    }
         //  }

         /* ADMISSION MIGRATIONS  */
 
          //const sessions = require('../../util/ams/session.json');
          //const letters = require('../../util/ams/letter.json');
          const vouchers = require('../../util/ams/voucher.json');
 
         //  if(vouchers.length){  // VOUCHERS
         //    for(const subj of vouchers){
         //       console.log(subj)
         //       const ins = await ais.voucher.create({
         //           data: {
         //              serial: subj?.serial?.toString(), 
         //              pin: subj?.pin, 
         //              applicantName: subj?.applicant_name, 
         //              applicantPhone: subj?.applicant_phone?.toString()?.substring(0,10), 
         //              sellType: subj?.sell_type, 
         //              status: subj?.status == 1 ? true: false, 
         //              ... subj?.sold_at && ({ soldAt: moment(subj?.sold_at,'YYYY-MM-DD').toDate() }),
         //              ... subj.session_id && ({ admission: { connect: { id: subj.session_id?.toString() }}}),
         //              ... subj.group_id && ({ category: { connect: { id: subj?.group_id }}}),
         //              ... subj.vendor_id && ({ vendor: { connect: { id: subj?.vendor_id }}}),
         //           }
         //       })
         //       console.log(ins)
         //    }
         //  }
         
          //  if(sessions.length){  // SESSIONS
         //    for(const subj of sessions){
         //       console.log(subj)
         //       const ins = await ais.admission.create({
         //           data: {
         //              title: subj?.title, 
         //              voucherIndex: subj?.voucher_index, 
         //              applyPause: subj?.apply_freeze == 1 ? true: false, 
         //              showAdmitted: subj?.admission_show == 1 ? true: false, 
         //              status: subj?.status == 1 ? true: false, 
         //              ... subj?.exam_start && ({ examStart: moment(subj?.exam_start,'YYYY-MM-DD').toDate() }),
         //              ... subj?.exam_end && ({ examStart: moment(subj?.exam_end,'YYYY-MM-DD').toDate() }),
         //              ... subj?.apply_start && ({ applyStart: moment(subj?.apply_start,'YYYY-MM-DD').toDate() }),
         //              ... subj?.apply_end && ({ applyEnd: moment(subj?.apply_end,'YYYY-MM-DD').toDate() }),
         //              ... subj?.admission_date && ({ admittedAt: moment(subj?.admission_date,'YYYY-MM-DD').toDate() }),
         //              ... subj.pg_letter && ({ pgletter: { connect: { id: subj.pg_letter }}}),
         //              ... subj.ug_letter && ({ ugletter: { connect: { id: subj.ug_letter }}}),
         //              ... subj.dp_letter && ({ dpletter: { connect: { id: subj.dp_letter }}}),
         //              ... subj.cp_letter && ({ cpletter: { connect: { id: subj.cp_letter }}}),
         //            }
         //       })
         //       console.log(ins)
         //    }
         //  }

         //  if(letters.length){
         //    for(const subj of letters){ // LETTERS
         //       console.log(subj)
         //       const ins = await ais.admissionLetter.create({
         //           data: {
         //              title: subj?.title, 
         //              signatory: subj?.signatory, 
         //              signature: subj?.signature, 
         //              template: subj?.template, 
         //              ... subj.tag && ({ category: { connect: { id: subj.tag }}}),
         //              status: subj?.status == 1 ? true: false
         //           }
         //       })
         //       console.log(ins)
         //    }
         //  }



         if(vouchers){
           res.status(200).json(vouchers)
         } else {
           res.status(202).json({ message: `no record found` })
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
         //   res.status(202).json({ message: `no record found` })
         // }
        } catch (error: any) {
           console.log(error)
           return res.status(500).json({ message: error.message }) 
        }
    }
     

   
}
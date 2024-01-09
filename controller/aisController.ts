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
        
         const resp = await ais.student.create({
            data: {
               ...req.body,
            },
            include: { 
               country:true,
               program:{
                  select:{
                    longName:true
                  }
               },
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
          const resp = await ais.student.update({
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
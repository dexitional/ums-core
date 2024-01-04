import { Request, Response, NextFunction } from "express";
import { v4 as uuid } from 'uuid';
import EvsModel from '../model/evsModel'
import AuthModel from '../model/authModel'
import { PrismaClient } from '../prisma/client/ums'
import moment from "moment";
const ais = new PrismaClient()
const evs = new EvsModel();
const Auth = new AuthModel();


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
                     country:true,
                     program:{
                      select:{
                        longName:true
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
            const resp = await await ais.student.findUnique({
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
     

   
}
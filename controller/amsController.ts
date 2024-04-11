import { Request, Response, NextFunction } from "express";
import { v4 as uuid } from 'uuid';
import EvsModel from '../model/evsModel'
import AuthModel from '../model/authModel'
import { PrismaClient } from '../prisma/client/ums'
import { getBillCodePrisma } from "../util/helper";
const sha1 = require('sha1')
const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwzyx", 8);
const pwdgen = customAlphabet("1234567890abcdefghijklmnopqrstuvwzyx", 6);
const digit = customAlphabet("1234567890", 4);


const sms = require('../config/sms');
const evs = new EvsModel();
const Auth = new AuthModel();
const ams = new PrismaClient()
const SENDERID = process.env.UMS_SENDERID;
const DOMAIN = process.env.UMS_DOMAIN;


export default class AmsController {
     
     /* Session */
     async fetchSessionList(req: Request,res: Response) {
         try {
            const resp = await ams.admission.findMany({ where: { status: true }, orderBy: { createdAt:'asc' } })
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
         let searchCondition = { }
         try {
            if(keyword) searchCondition = { 
               where: { 
               OR: [
                  { title: { contains: keyword } },
                  { session: { title: { contains: keyword }} },
               ],
               }
            }
            const resp = await ams.$transaction([
               ams.admission.count({
                  ...(searchCondition),
               }),
               ams.admission.findMany({
                  ...(searchCondition),
                  skip: offset,
                  take: Number(pageSize),
                  include: { 
                     _count: { select: { voucher: true, sortedApplicant:true, fresher: true } }
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

     async fetchSession(req: Request,res: Response) {
         try {
            const resp = await ams.admission.findUnique({
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

     async ActivateSession(req: Request,res: Response) {
         try {
            const ups = await ams.admission.updateMany({
               where: { id: { not: req.params.id  }},
               data: { default: false },
            })
            const resp = await ams.admission.update({
               where: { id: req.params.id },
               data: { default: true },
            })

            if(ups && resp){
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
            const { pgletterId, ugletterId, dpletterId, cpletterId, sessionId } = req.body
            delete req.body.pgletterId;  delete req.body.ugletterId;
            delete req.body.dpletterId;  delete req.body.cpletterId;
            delete req.body.sessionId;
         
            const resp = await ams.admission.create({
               data: {
                  ... req.body,
                  ... pgletterId && ({ pgletter: { connect: { id: pgletterId }}}),
                  ... ugletterId && ({ ugletter: { connect: { id:ugletterId }}}),
                  ... dpletterId && ({ dpletter: { connect: { id:dpletterId }}}),
                  ... cpletterId && ({ cpletter: { connect: { id:cpletterId }}}),
                  ... sessionId && ({ session: { connect: { id:sessionId }}}),
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
            const { pgletterId, ugletterId, dpletterId, cpletterId, sessionId } = req.body
            delete req.body.pgletterId;  delete req.body.ugletterId;
            delete req.body.dpletterId;  delete req.body.cpletterId;
            delete req.body.sessionId;
         
            const resp = await ams.admission.update({
               where: { 
                  id: req.params.id 
               },
               data: {
                  ... req.body,
                  ... pgletterId && ({ pgletter: { connect: { id: pgletterId }}}),
                  ... ugletterId && ({ ugletter: { connect: { id:ugletterId }}}),
                  ... dpletterId && ({ dpletter: { connect: { id:dpletterId }}}),
                  ... cpletterId && ({ cpletter: { connect: { id:cpletterId }}}),
                  ... sessionId && ({ session: { connect: { id:sessionId }}}),
               },
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
            const resp = await ams.admission.delete({
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


     /* Vouchers */
     async fetchVoucherList(req: Request,res: Response) {
      try {
         const resp = await ams.voucher.findMany({ where: { status: true }, orderBy: { createdAt:'asc' } })
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

  async fetchVouchers(req: Request,res: Response) {
      const { page = 1, pageSize = 9, keyword = '' } :any = req.query;
      const offset = (page - 1) * pageSize;
      let searchCondition = { }
      try {
         if(keyword) searchCondition = { 
            where: { 
               admission: { default: true },
               OR: [
                     { category: { title: {  contains: keyword } }},
                     { pin: {  contains: keyword } },
                     { applicantName: { contains: keyword } },
                     { applicantPhone: { contains: keyword } },
                     { serial: { contains: keyword } },
                     { sellType: keyword == 'general' ? 0 : keyword == 'matured' ? 1 : keyword == 'international' ? 2 : null } ,
                  ],
            }
         }
         const resp = await ams.$transaction([
            ams.voucher.count({
               ...(searchCondition),
            }),
            ams.voucher.findMany({
               ...(searchCondition),
               skip: offset,
               take: Number(pageSize),
               include: {
                  vendor: true,
                  admission: true,
                  category: true
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

  async fetchVoucher(req: Request,res: Response) {
      try {
         const resp = await ams.voucher.findUnique({
            where: { 
               serial: req.params.id
            },
            include: {
               vendor: true,
               admission: true,
               category: true
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

  async sellVoucher(req: Request,res: Response) {
      try {
         const { applicantPhone, applicantName } = req.body;
         const resp = await ams.voucher.update({
            where: { serial: req.params.id },
            data: { soldAt: new Date(), applicantName, applicantPhone },
         })
         if(resp){
            const msg = `Hi, Your Serial: ${resp.serial}, Pin: ${resp.pin}, Goto the Unified Portal to apply. Thank you.`
            const sent = await sms(resp.applicantPhone,msg,SENDERID)
            res.status(200).json(resp)
         } else {
            res.status(204).json({ message: `no record found` })
         }
      } catch (error: any) {
         console.log(error)
         return res.status(500).json({ message: error.message }) 
      }
  }

  async recoverVoucher(req: Request,res: Response) {
      try {
         const resp = await ams.voucher.findUnique({
           where: { serial: req.params.id },
         })
         if(resp){
            const msg = `Hi, Your Serial: ${resp.serial}, Pin: ${resp.pin}, Goto the Unified Portal to apply. Thank you.`
            const sent = await sms(resp.applicantPhone,msg,SENDERID)
            res.status(200).json(resp)
         } else {
            res.status(204).json({ message: `no record found` })
         }
      } catch (error: any) {
         console.log(error)
         return res.status(500).json({ message: error.message }) 
      }
  }

  async postVoucher(req: Request,res: Response) {
      try {
         const admission: any = await ams.admission.findFirst({ where: { default: true }})
         const voucher: any = await ams.voucher.findFirst({ where: { admission:{ default: true }}, orderBy: {'createdAt':'desc'} })
         const { vendorId, categoryId, sellType, quantity } = req.body
         const lastIndex = voucher ? Number(voucher.serial): admission?.voucherIndex;
         const admissionId = admission?.id;
         
         const data = [];
         let count = 0;
         if (quantity > 0) {
           for (var i = 1; i <= quantity; i++) {
             let dt = {
               serial: lastIndex + i,
               pin: nanoid(),
               sellType,
               ... vendorId && ({ vendor: { connect: { id:vendorId }}}),
               ... categoryId && ({ category: { connect: { id:categoryId }}}),
               ... admissionId && ({ admission: { connect: { id:admissionId }}}),
               
             }
             data.push(dt)
             const resp = await ams.voucher.create({ data:dt})
             if(resp) count+=1;
           }
         }
         // const resp = await ams.voucher.createMany({ data })
         if(count){
            res.status(200).json(count)
         } else {
            res.status(204).json({ message: `no records found` })
         }
         // if(resp){
         //    res.status(200).json(resp)
         // } else {
         //    res.status(204).json({ message: `no records found` })
         // }
         
      } catch (error: any) {
         console.log(error)
         return res.status(500).json({ message: error.message }) 
      }
  }

  async updateVoucher(req: Request,res: Response) {
      try {
         delete req.body.action;  delete req.body.id; 
         const resp = await ams.voucher.update({
            where: { serial: req.params.id },
            data: { ... req.body },
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

  async deleteVoucher(req: Request,res: Response) {
      try {
         const resp = await ams.voucher.updateMany({
            where: { serial: req.params.id },
            data: {
               soldAt: null,
               applicantName: null,
               applicantPhone: null
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


  /* Letters */
  async fetchLetterList(req: Request,res: Response) {
      try {
         const resp = await ams.admissionLetter.findMany({ where: { status: true }, orderBy: { createdAt:'asc' } })
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

  async fetchLetters(req: Request,res: Response) {
      const { page = 1, pageSize = 9, keyword = '' } :any = req.query;
      const offset = (page - 1) * pageSize;
      let searchCondition = { }
      try {
         if(keyword) searchCondition = { 
            where: { 
            OR: [
               { title: { contains: keyword } },
               { category: { title: { contains: keyword }} },
            ],
            }
         }
         const resp = await ams.$transaction([
            ams.admissionLetter.count({
               ...(searchCondition),
            }),
            ams.admissionLetter.findMany({
               ...(searchCondition),
               skip: offset,
               take: Number(pageSize),
               include: {
                  category: true
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

  async fetchLetter(req: Request,res: Response) {
      try {
         const resp = await ams.admissionLetter.findUnique({
            where: { id: req.params.id },
            include: { category: true }
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

  async postLetter(req: Request,res: Response) {
      try {
         const { categoryId } = req.body
         delete req.body.categoryId;
      
         const resp = await ams.admissionLetter.create({
            data: {
               ... req.body,
               ... categoryId && ({ category: { connect: { id: categoryId }}}),
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

  async updateLetter(req: Request,res: Response) {
      try {
         const { categoryId } = req.body
         delete req.body.categoryId;
      
         const resp = await ams.admissionLetter.update({
            where: { id: req.params.id },
            data: {
               ... req.body,
               ... categoryId && ({ category: { connect: { id: categoryId }}}),
            },
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

  async deleteLetter(req: Request,res: Response) {
      try {
         const resp = await ams.admissionLetter.delete({
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


  /* Applicants */
  async fetchApplicantList(req: Request,res: Response) {
      try {
         const resp = await ams.applicant.findMany({ where: { status: true }, orderBy: { createdAt:'asc' } })
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

   async fetchApplicants(req: Request,res: Response) {
      const { page = 1, pageSize = 9, keyword = '' } :any = req.query;
      const offset = (page - 1) * pageSize;
      let searchCondition = { }
      try {
         if(keyword) searchCondition = { 
            where: { 
               OR: [
                  { title: { contains: keyword } },
                  { stage: { title: { contains: keyword }} },
                  { applyType: { title: { contains: keyword }} },
               ],
            }
         }
         const resp = await ams.$transaction([
            ams.applicant.count({
               ...(searchCondition),
            }),
            ams.applicant.findMany({
               ...(searchCondition),
               skip: offset,
               take: Number(pageSize),
               include: {
                  stage: { include: { category:true }},
                  applyType: true,
                  profile: true,
                  choice: { include: { program: true } },
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

   async fetchApplicant(req: Request,res: Response) {
      try {
         const resp = await ams.applicant.findUnique({
            where: { serial: req.params.id },
            include: { stage: true, applyType: true, choice: { include: { program: true } }, profile: { include: { title:true, region: true, country: true, religion: true, disability: true, marital: true }}}
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

   async fetchApplicantPreview(req: Request,res: Response) {
      try {

         // Fetch Applicant Form Meta
         const applicant = await ams.applicant.findUnique({ where: { serial: req.params.id }})
         const meta:any = applicant?.meta;
         const output = new Map();
         // Locate entities and Fetch Data
         if(meta?.length){
            for(const row of meta){
               if(row.tag == 'profile'){
                  const res = await ams.stepProfile.findUnique({ where: { serial: req.params.id}, include: { title: true, disability: true, religion: true, region: true, country: true, nationality: true, marital: true }})
                  if(res) output.set('profile',res)
               }
               if(row.tag == 'guardian'){
                  const res = await ams.stepGuardian.findUnique({ where: { serial: req.params.id}, include: { title: true, relation: true }})
                  if(res) output.set('guardian',res)
               }
               if(row.tag == 'education'){
                  const res = await ams.stepEducation.findMany({ where: { serial: req.params.id}, include: { instituteCategory: true, certCategory: true }})
                  if(res?.length) output.set('education',res)
               }
               if(row.tag == 'result'){
                  const res = await ams.stepResult.findMany({ where: { serial: req.params.id}, include: { certCategory: true, grades: { select: { gradeWeight: true, subject: { select: { title:true }} }}}})
                  if(res?.length) output.set('result',res)
               }
               if(row.tag == 'choice'){
                  const res = await ams.stepChoice.findMany({ where: { serial: req.params.id}, include: { program: true, major: true }})
                  if(res?.length) output.set('choice',res)
               }
               if(row.tag == 'document'){
                  const res = await ams.stepDocument.findMany({ where: { serial: req.params.id}, include: { documentCategory: true }})
                  if(res?.length) output.set('document',res)
               }
               if(row.tag == 'employment'){
                  const res = await ams.stepEmployment.findMany({ where: { serial: req.params.id}})
                  if(res?.length) output.set('employment',res)
               }
               if(row.tag == 'referee'){
                  const res = await ams.stepReferee.findMany({ where: { serial: req.params.id}, include: { title: true }})
                  if(res?.length) output.set('referee',res)
               }
            } 
            // Construct Output
            res.status(200).json(Object.fromEntries(output))

         } else {
            res.status(204).json({ message: `no record found` })
         }
      } catch (error: any) {
         console.log(error)
         return res.status(500).json({ message: error.message }) 
      }
   }

   async postApplicant(req: Request,res: Response) {
      try {
         const { applyTypeId,stageId,choiceId } = req.body
         delete req.body.stageId; delete req.body.applyTypeId;
         delete req.body.choiceId;
      
         const resp = await ams.applicant.create({
            data: {
               ... req.body,
               ... stageId && ({ stage: { connect: { id: stageId }}}),
               ... applyTypeId && ({ applyType: { connect: { id: applyTypeId }}}),
               ... choiceId && ({ choice: { connect: { id: choiceId }}}),
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

   async updateApplicant(req: Request,res: Response) {
      try {
         const { applyTypeId,stageId,choiceId } = req.body
         delete req.body.stageId; delete req.body.applyTypeId;
         delete req.body.choiceId;
      
         const resp = await ams.applicant.update({
            where: { serial: req.params.id },
            data: {
               ... req.body,
               ... stageId && ({ stage: { connect: { id: stageId }}}),
               ... applyTypeId && ({ applyType: { connect: { id: applyTypeId }}}),
               ... choiceId && ({ choice: { connect: { id: choiceId }}}),
            },
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

   async deleteApplicant(req: Request,res: Response) {
      try {
         const resp = await ams.applicant.delete({
            where: { serial: req.params.id }
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


   /* Shortlist */
  
   async fetchShortlists(req: Request,res: Response) {
      const { page = 1, pageSize = 9, keyword = '' }: any = req.query;
      const offset = (page - 1) * pageSize;
      let searchCondition = { }
      try {
         if(keyword) searchCondition = { 
            where: { 
               admission: { default: true },
               OR: [
                  { serial: { contains: keyword } },
                  { choice1: { program: { longName: { contains: keyword }}} },
                  { choice2: { program: { longName: { contains: keyword }}} },
               ],
            }
         }
         const resp = await ams.$transaction([
            ams.sortedApplicant.count({
               ...(searchCondition),
            }),
            ams.sortedApplicant.findMany({
               ...(searchCondition),
               skip: offset,
               take: Number(pageSize),
               include: {
                  admission: true, choice1: { include: { program: true }}, choice2: { include: { program: true }}, profile:true, stage: true, applyType: true, category: true 
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

   async fetchShortlist(req: Request,res: Response) {
      try {
         const resp = await ams.sortedApplicant.findUnique({
            where: { serial: req.params.id },
            include: {
               admission: true, choice1: { include: { program: true }}, choice2: { include: { program: true }}, profile:true, stage: true, applyType: true, category: true 
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

   async postShortlist(req: Request,res: Response) {
      try {
         const { serial } = req.body
         const sorted:any = await ams.sortedApplicant.findFirst({ where:{ serial }})
         if(sorted) throw("Applicant already shortlisted!")

         const voucher:any = await ams.voucher.findFirst({ where:{ serial }})
         const admission:any = await ams.admission.findFirst({ where:{ default: true }})
         const applicant:any = await ams.applicant.findFirst({ where:{ serial }, include:{ stage: true }})
         const choice:any = await ams.stepChoice.findFirst({ where:{ serial, id: { not: applicant?.choiceId } }})
         //const education:any = await ams.stepEducation.findFirst({ where:{ serial  }})

         const { stageId,applyTypeId, classValue,gradeValue, stage:{ categoryId }, choiceId:choice1Id } = applicant ?? null;
         const { id: admissionId } = admission ?? null;
         const { sellType } = voucher ?? null;
         const dt = { serial, sellType,classValue, gradeValue, admitted: false }
         
         const resp = await ams.sortedApplicant.create({
            data: {
               ... dt,
               ... admissionId && ({ admission: { connect: { id: admissionId }}}),
               ... stageId && ({ stage: { connect: { id: stageId }}}),
               ... applyTypeId && ({ applyType: { connect: { id: applyTypeId }}}),
               ... choice1Id && ({ choice1: { connect: { id: choice1Id }}}),
               ... choice && ({ choice2: { connect: { id: choice?.id }}}),
               ... categoryId && ({ category: { connect: { id: categoryId }}}),
               ... serial && ({ profile: { connect: { serial }}}),
            },
         })
         const ups = await ams.applicant.update({
            where: { serial },
            data: { sorted: true }
         })

         
         if(resp){
            res.status(200).json(resp)
         } else {
            res.status(204).json({ message: `no records found` })
         }
         
      } catch (error: any) {
         console.log(error)
         return res.status(500).json({ message: error }) 
      }
   }

   async updateShortlist(req: Request,res: Response) {
      try {
         const { admissionId,stageId,applyTypeId,categoryId,choice1Id,choice2Id } = req.body
         delete req.body.admissionId; delete req.body.stageId;
         delete req.body.applyTypeId; delete req.body.choice1Id;
         delete req.body.choice2Id; delete req.body.categoryId;
      
         const resp = await ams.sortedApplicant.update({
            where: { serial: req.params.id },
            data: {
               ... req.body,
               ... admissionId && ({ admission: { connect: { id: admissionId }}}),
               ... stageId && ({ stage: { connect: { id: stageId }}}),
               ... applyTypeId && ({ applyType: { connect: { id: applyTypeId }}}),
               ... choice1Id && ({ choice1: { connect: { id: choice1Id }}}),
               ... choice2Id && ({ choice2: { connect: { id: choice2Id }}}),
               ... categoryId && ({ category: { connect: { id: categoryId }}}),
            },
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

   async deleteShortlist(req: Request,res: Response) {
      try {
         const resp = await ams.sortedApplicant.delete({
            where: { serial: req.params.id }
         })
         if(resp){
            const ups = await ams.applicant.update({
               where: { serial: req.params.id },
               data: { sorted: false }
            })
            res.status(200).json(resp)
            
         } else {
            res.status(204).json({ message: `No records found` })
         }
      } catch (error: any) {
         console.log(error)
         return res.status(500).json({ message: error.message }) 
      }
   }


    /* Matriculants */
  
    async fetchMatriculantList(req: Request,res: Response) {
      try {
         const resp = await ams.fresher.findMany({ where: { admission: { default: true }}, orderBy: { createdAt:'asc' } })
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

    async fetchMatriculants(req: Request,res: Response) {
      const { page = 1, pageSize = 9, keyword = '' }: any = req.query;
      const offset = (page - 1) * pageSize;
      let searchCondition = { }
      try {
         if(keyword) searchCondition = { 
            where: { 
               admission: { default: true },
               OR: [
                  { serial: { contains: keyword } },
                  { sessionMode: { contains: keyword } },
                  { program: { title: { contains: keyword }} },
                  { category: { title: { contains: keyword }} },
               ],
            }
         }
         const resp = await ams.$transaction([
            ams.fresher.count({
               ...(searchCondition),
            }),
            ams.fresher.findMany({
               ...(searchCondition),
               skip: offset,
               take: Number(pageSize),
               include: {
                  admission: true, program: true, major: true, category: true, student: true 
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

   async fetchMatriculant(req: Request,res: Response) {
      try {
         const resp = await ams.fresher.findUnique({
            where: { serial: req.params.id },
            include: {
               admission: { include: { sortedApplicant: { include: { applyType:true }}}}, student:true, program: true, bill: { include:{ bankacc: true }}, session: true, major: true, category: { include: { admissionLetter: true }} 
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

   async postMatriculant(req: Request,res: Response) {
         try {
         const { serial,programId,semesterNum,sessionMode } = req.body
         const semcode = getBillCodePrisma(Number(semesterNum))
         const sorted:any = await ams.sortedApplicant.findFirst({ where:{ serial }, include: { profile: true, admission:{ include: { session: true}} }})
         const { sellType, admission:{ id:admissionId, session:{ id:sessionId } }, categoryId, profile: { titleId,countryId,regionId,religionId,disabilityId,maritalId,fname,lname,mname,gender,dob,hometown,phone,email,residentAddress  } } = sorted ?? null;
         const bill:any = await ams.bill.findFirst({ where:{ programId,sessionId, type: countryId == '96b0a1d5-7899-4b9a-bcbe-7a72eee6572c' ? 'GH':'INT', OR: semcode }})
         const guardian:any = await ams.stepGuardian.findFirst({ where:{ serial }})
         // Check email 
         const emailUser = `${fname.trim().toLowerCase()}.${lname.trim().toLowerCase()}`;
         const fetchEmail = await ams.student.findMany({ where: { instituteEmail:{ contains: emailUser }}})
         // Data for Population
         const instituteEmail = `${fname}.${lname}${fetchEmail.length ? fetchEmail.length+1 : '' }@${DOMAIN}`;
         const username = serial; /* const username = instituteEmail; // AUCC */
         const password = pwdgen();
         const studentData = { id:serial,fname,mname,lname,gender,dob,semesterNum,hometown,phone,email,address:residentAddress,instituteEmail,guardianName:`${guardian?.fname} ${guardian?.mname && guardian?.mname+' '}${guardian?.lname}`, guardianPhone: guardian?.phone }
         const fresherData = { sellType, semesterNum, sessionMode, username, password }
         // const ssoData = { tag:serial, username:instituteEmail, password:sha1(), } // AUCC 
         const ssoData = { tag:serial, username, password:sha1(password) }  // Others
         
         // Populate Student Information
         const student = await ams.student.create({
            data:{
               ... studentData,
               ... programId && ({ program: { connect: { id: programId }}}),
               ... titleId && ({ title: { connect: { id: titleId }}}),
               ... countryId && ({ country: { connect: { id: countryId }}}),
               ... regionId && ({ region: { connect: { id: regionId }}}),
               ... religionId && ({ religion: { connect: { id: religionId }}}),
               ... maritalId && ({ marital: { connect: { id: maritalId }}}),
               ... disabilityId && ({ disability: { connect: { id: disabilityId }}}),
            } 
         })
         // Populate Fresher Information
         const resp = await ams.fresher.create({
            data: {
               ... fresherData,
               ... admissionId && ({ admission: { connect: { id: admissionId }}}),
               ... programId && ({ program: { connect: { id: programId }}}),
               ... bill && ({ bill: { connect: { id: bill?.id }}}),
               ... sessionId && ({ session: { connect: { id: sessionId }}}),
               ... categoryId && ({ category: { connect: { id: categoryId }}}),
               ... serial && ({ student: { connect: { serial }}}),
               ... student && ({ student: { connect: { id: student?.id }}}),
            },
         })
         // Populate SSO Account
         const sso = await ams.user.create({
            data: {
               ... ssoData,
               group: { connect: { id: 1 }},
            },
         })
         // Update Applicant Status 
         const ups = await ams.sortedApplicant.update({
            where: { serial },
            data: { admitted: true },
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

   async updateMatriculant(req: Request,res: Response) {
      try {
         const { admissionId,sessionId,billId,categoryId,programId,majorId, } = req.body
         delete req.body.admissionId; delete req.body.sessionId;
         delete req.body.billId; delete req.body.programId;
         delete req.body.majorId; delete req.body.categoryId;
      
         const resp = await ams.sortedApplicant.update({
            where: { serial: req.params.id },
            data: {
               ... req.body,
               ... admissionId && ({ admission: { connect: { id: admissionId }}}),
               ... sessionId && ({ session: { connect: { id: sessionId }}}),
               ... billId && ({ bill: { connect: { id: billId }}}),
               ... categoryId && ({ category: { connect: { id: categoryId }}}),
               ... programId && ({ program: { connect: { id: programId }}}),
               ... majorId && ({ major: { connect: { id: majorId }}}),
            },
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

   async deleteMatriculant(req: Request,res: Response) {
      try {
         const serial = req.params.id;
          // Remove Matriculant Data
         const resp = await ams.fresher.delete({
            where: { serial }
         })
         // Remove Student Data
         const student = await ams.student.delete({
            where: { id:serial }
         })
         // Remove SSO Account
         const sso = await ams.user.deleteMany({
            where: { tag:serial }
         })
         // Update Applicant Status 
         const ups = await ams.sortedApplicant.update({
            where: { serial },
            data: { admitted: false },
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
   async fetchSubjectList(req: Request,res: Response) {
      try {
         const resp = await ams.subject.findMany({
            where: { status: true },
            orderBy: { createdAt: 'asc' }
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

   async fetchInstituteList(req: Request,res: Response) {
      try {
         const resp = await ams.instituteCategory.findMany({
            where: { status: true },
            orderBy: { createdAt: 'asc' }
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

   async fetchCertList(req: Request,res: Response) {
      try {
         const resp = await ams.certCategory.findMany({
            where: { status: true },
            orderBy: { createdAt: 'asc' }
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

   async fetchWeightList(req: Request,res: Response) {
      try {
         const resp = await ams.gradeWeight.findMany({
            where: { status: true },
            orderBy: { createdAt: 'asc' }
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

   async fetchStageList(req: Request,res: Response) {
      try {
         const resp = await ams.stage.findMany({
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

   async fetchApplytypeList(req: Request,res: Response) {
      try {
         const resp = await ams.applyType.findMany({
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

   async fetchAmsPriceList(req: Request,res: Response) {
      try {
         const resp = await ams.amsPrice.findMany({
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

   async fetchAmsDocList(req: Request,res: Response) {
      try {
            const resp = await ams.documentCategory.findMany({
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


   /* Step Applicant - Configuration */
   async fetchStepApplicant(req: Request,res: Response) {
      try {
         const resp = await ams.applicant.findUnique({
            where: { serial: req.params.id },
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

   async saveStepApplicant(req: Request,res: Response) {
      try {
         const { serial,stageId,applyTypeId,categoryId } = req.body
         delete req.body.stageId; delete req.body.serial;
         delete req.body.applyTypeId; 
         delete req.body.categoryId; 
         // Application Form Schema for Chosen Category
         const form = await ams.amsForm.findFirst({ where: { categoryId }})
         if(form) req.body.meta = form?.meta

         const resp = await ams.applicant.upsert({
            where: { serial },
            create: { 
               ...req.body, 
               serial, 
               ... stageId && ({ stage: { connect: { id: stageId }}}),
               ... applyTypeId && ({ applyType: { connect: { id: applyTypeId }}}),
            },
            update: {
               ...req.body, 
               ... stageId && ({ stage: { connect: { id: stageId }}}),
               ... applyTypeId && ({ applyType: { connect: { id: applyTypeId }}}),
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

   /* Step Profile */
   async fetchStepProfile(req: Request,res: Response) {
      try {
         const resp = await ams.stepProfile.findUnique({
            where: { serial: req.params.id },
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

   async saveStepProfile(req: Request,res: Response) {
      try {
         const { serial,titleId,regionId,religionId,countryId,nationalityId,maritalId,disabilityId } = req.body
         delete req.body.titleId; delete req.body.regionId;
         delete req.body.religionId; delete req.body.countryId;
         delete req.body.nationalityId; delete req.body.maritalId;
         delete req.body.disabilityId;  delete req.body.serial;
         delete req.body.id;
         
         const resp = await ams.stepProfile.upsert({
            where: { serial },
            create: {
               serial,  
               //applicant: { connect: { profileId: serial }},
               ...req.body, 
               ... titleId && ({ title: { connect: { id: titleId }}}),
               ... regionId && ({ region: { connect: { id: regionId }}}),
               ... religionId && ({ religion: { connect: { id: religionId }}}),
               ... countryId && ({ country: { connect: { id: countryId }}}),
               ... nationalityId && ({ nationality: { connect: { id: nationalityId }}}),
               ... maritalId && ({ marital: { connect: { id: maritalId }}}),
               ... disabilityId && ({ marital: { connect: { id: disabilityId }}}),
               
            },
            update: {
               ...req.body, 
               ... titleId && ({ title: { connect: { id: titleId }}}),
               ... regionId && ({ region: { connect: { id: regionId }}}),
               ... religionId && ({ religion: { connect: { id: religionId }}}),
               ... countryId && ({ country: { connect: { id: countryId }}}),
               ... nationalityId && ({ nationality: { connect: { id: nationalityId }}}),
               ... maritalId && ({ marital: { connect: { id: maritalId }}}),
               ... disabilityId && ({ marital: { connect: { id: disabilityId }}}),
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

   /* Step Guardian */
   async fetchStepGuardian(req: Request,res: Response) {
      try {
         const resp = await ams.stepGuardian.findUnique({
            where: { serial: req.params.id },
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

   async saveStepGuardian(req: Request,res: Response) {
      try {
         const { serial,titleId,relationId } = req.body
         delete req.body.titleId; delete req.body.serial;
         delete req.body.relationId; ;

         const resp = await ams.stepGuardian.upsert({
            where: { serial },
            create: { 
               ...req.body, 
               serial, 
               ... titleId && ({ title: { connect: { id: titleId }}}),
               ... relationId && ({ relation: { connect: { id: relationId }}}),
            },
            update: {
               ...req.body, 
               ... titleId && ({ title: { connect: { id: titleId }}}),
               ... relationId && ({ relation: { connect: { id: relationId }}}),
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

   /* Step Education */
   async fetchStepEducation(req: Request,res: Response) {
      try {
         const resp = await ams.stepEducation.findMany({
            where: { serial: req.params.id },
         })
         if(resp?.length){
            res.status(200).json(resp)
         } else {
            res.status(204).json({ message: `no record found` })
         }
      } catch (error: any) {
         console.log(error)
         return res.status(500).json({ message: error.message }) 
      }
   }

   async saveStepEducation(req: Request,res: Response) {
      try {
         const data = req.body;
         await ams.stepEducation.deleteMany({ where: { serial: req.body[0].serial }});
         const resp = await Promise.all(data?.map(async (row:any) => {
            const { id,instituteCategoryId,certCategoryId } = row;
            delete row?.instituteCategoryId; delete row?.id;
            delete row?.certCategoryId; 
            
            return await ams.stepEducation.upsert({
               where: { id: (id || '') },
               create: { 
                  ...row, 
                  ... instituteCategoryId && ({ instituteCategory: { connect: { id: instituteCategoryId }}}),
                  ... certCategoryId && ({ certCategory: { connect: { id: certCategoryId }}}),
               },
               update: {
                  ...row, 
                  ... instituteCategoryId && ({ instituteCategory: { connect: { id: instituteCategoryId }}}),
                  ... certCategoryId && ({ certCategory: { connect: { id: certCategoryId }}}),
               }
            })
         }))
         
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


   /* Step Result */
   async fetchStepResult(req: Request,res: Response) {
      try {
         const resp = await ams.stepResult.findMany({
            where: { serial: req.params.id },
            include: { grades: true }
         })
         if(resp?.length){
            res.status(200).json(resp)
         } else {
            res.status(204).json({ message: `no record found` })
         }
      } catch (error: any) {
         console.log(error)
         return res.status(500).json({ message: error.message }) 
      }
   }

   async saveStepResult(req: Request,res: Response) {
      try {
         const data = req.body;
         console.log(data)
         await ams.stepResult.deleteMany({ where: { serial: req.body[0].serial }});
         await ams.stepGrade.deleteMany({ where: { serial: req.body[0].serial }});
         
         // Results 
         const resp = await Promise.all(data?.map(async(row:any) => {
            const { id,certCategoryId } = row;
            delete row?.id; delete row?.certCategoryId; 
            // Grades
            const newGrades = row.grades.map((item:any) => {
               const { resultId,gradeWeightId,subjectId } = item;
               delete item?.resultId; delete item?.gradeWeightId; delete item?.subjectId; 
               return ({
                  ...item, 
                  ...resultId && ({ result: { connect: { id: resultId }}}),
                  ...gradeWeightId && ({ gradeWeight: { connect: { id: gradeWeightId }}}),
                  ...subjectId && ({ subject: { connect: { id: subjectId }}}),
               })
            })
            return await ams.stepResult.upsert({
               where: { id: (id || '') },
               create: { 
                  ...row, 
                  ... certCategoryId && ({ certCategory: { connect: { id: certCategoryId }}}),
                  grades: { create: newGrades }
               },
               update: {
                  ...row, 
                  ... certCategoryId && ({ certCategory: { connect: { id: certCategoryId }}}),
                  grades: { create: newGrades }
               }
            })
         }))
         
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

   /* Step Employment */
   async fetchStepEmployment(req: Request,res: Response) {
      try {
         const resp = await ams.stepEmployment.findMany({
            where: { serial: req.params.id },
         })
         if(resp?.length){
            res.status(200).json(resp)
         } else {
            res.status(204).json({ message: `no record found` })
         }
      } catch (error: any) {
         console.log(error)
         return res.status(500).json({ message: error.message }) 
      }
   }

   async saveStepEmployment(req: Request,res: Response) {
      try {
         const data = req.body;
         const resp = await ams.stepEmployment.upsert(data?.map((row:any) => {
            const { id } = row;
            return ({
               where: { id: (id || null) },
               create: row,
               update: row
            })
         }))
         
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

   /* Step Document */
   async fetchStepDocument(req: Request,res: Response) {
      try {
         const resp = await ams.stepDocument.findMany({
            where: { serial: req.params.id },
         })
         if(resp?.length){
            res.status(200).json(resp)
         } else {
            res.status(204).json({ message: `no record found` })
         }
      } catch (error: any) {
         console.log(error)
         return res.status(500).json({ message: error.message }) 
      }
   }

   async saveStepDocument(req: Request,res: Response) {
      try {
         const data = req.body;
         await ams.stepDocument.deleteMany({ where: { serial: req.body[0].serial }});
         const resp = await Promise.all(data?.map(async (row:any) => {
            const { id,documentCategoryId } = row;
            delete row?.documentCategoryId; delete row?.id;
          
            return await ams.stepDocument.upsert({
               where: { id: (id || '') },
               create: { 
                  ...row, 
                  ... documentCategoryId && ({ documentCategory: { connect: { id: documentCategoryId }}}),
               },
               update: {
                  ...row, 
                  ... documentCategoryId && ({ documentCategory: { connect: { id: documentCategoryId }}}),
               }
            })
         }))
         
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

   /* Step Choice */
   async fetchStepChoice(req: Request,res: Response) {
      try {
         const resp = await ams.stepChoice.findMany({
            where: { serial: req.params.id },
         })
         if(resp?.length){
            res.status(200).json(resp)
         } else {
            res.status(204).json({ message: `no record found` })
         }
      } catch (error: any) {
         console.log(error)
         return res.status(500).json({ message: error.message }) 
      }
   }

   async saveStepChoice(req: Request,res: Response) {
      try {
         const data = req.body;
         await ams.stepChoice.deleteMany({ where: { serial: req.body[0].serial }});
         const resp = await Promise.all(data?.map( async (row:any) => {
            const { id,programId,majorId } = row;
            delete row?.programId; delete row?.programId; delete row?.id;
          
            return await ams.stepChoice.upsert({
               where: { id: (id || '') },
               create: { 
                  ...row, 
                  ... programId && ({ program: { connect: { id: programId }}}),
                  ... majorId && ({ major: { connect: { id: majorId }}}),
               },
               update: {
                  ...row, 
                  ... programId && ({ program: { connect: { id: programId }}}),
                  ... majorId && ({ major: { connect: { id: majorId }}}),
               }
            })
         }))
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

    /* Step Referee */
    async fetchStepReferee(req: Request,res: Response) {
      try {
         const resp = await ams.stepReferee.findMany({
            where: { serial: req.params.id },
         })
         if(resp?.length){
            res.status(200).json(resp)
         } else {
            res.status(204).json({ message: `no record found` })
         }
      } catch (error: any) {
         console.log(error)
         return res.status(500).json({ message: error.message }) 
      }
   }

   async saveStepReferee(req: Request,res: Response) {
      try {
         const data = req.body;
         const resp = await ams.stepReferee.upsert(data?.map((row:any) => {
            const { id, titleId } = row;
            delete row?.titleId; delete row?.id;
            
            return ({
               where: { id: (id || null) },
               create: { 
                  ...row, 
                  ... titleId && ({ title: { connect: { id: titleId }}}),
               },
               update: {
                  ...row, 
                  ... titleId && ({ title: { connect: { id: titleId }}}),
               }
            })
         }))
         
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

   /* Step Review */
   async saveStepReview(req: Request,res: Response) {
      try {
         const { serial,choiceId } = req.body;
         delete req.body?.choiceId;
         console.log(req.body)
         const resp = await ams.applicant.update({
            where: { serial },
            data: {
               ...req.body,
               ...choiceId && ({ choice: { connect: { id: choiceId }}}),
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
 
   
}
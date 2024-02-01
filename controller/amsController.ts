import { Request, Response, NextFunction } from "express";
import { v4 as uuid } from 'uuid';
import EvsModel from '../model/evsModel'
import AuthModel from '../model/authModel'
import { PrismaClient } from '../prisma/client/ums'
const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwzyx", 8);
const digit = customAlphabet("1234567890", 4);

const sms = require('../config/sms');
const evs = new EvsModel();
const Auth = new AuthModel();
const ams = new PrismaClient()
const SENDERID = process.env.UMS_SENDERID;


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
                  stage: true,
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
            include: { stage: true, applyType: true, choice: { include: { program: true } }, profile: { include: { title:true, region: true, country: true, religion: true, disability: true }}}
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
                  const res = await ams.stepProfile.findUnique({ where: { serial: req.params.id}, include: { title: true, disability: true, religion: true, region: true, country: true, nationality: true }})
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
                  { choice1: { program: { title: { contains: keyword }}} },
                  { choice2: { program: { title: { contains: keyword }}} },
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
                  admission: true, choice1: true, choice2: true, stage: true, applyType: true, category: true 
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
               admission: true, choice1: true, choice2: true, stage: true, applyType: true, category: true 
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
         // const { admissionId,stageId,applyTypeId,categoryId,choice1Id,choice2Id } = req.body
         const applicant:any = await ams.applicant.findFirst({ where:{ serial }, include:{ stage: true }})
         const choice:any = await ams.stepChoice.findFirst({ where:{ serial, id: { not: applicant?.choiceId } }})

         const { stageId,applyTypeId, stage:{ categoryId }, choiceId:choice1Id } = applicant ?? null;
         const { id: choice2Id } = choice ?? null;
         // delete req.body.admissionId; delete req.body.stageId;
         // delete req.body.applyTypeId; delete req.body.choice1Id;
         // delete req.body.choice2Id; delete req.body.categoryId;
      
         const resp = await ams.sortedApplicant.create({
            data: {
               ... req.body,
               // ... admissionId && ({ admission: { connect: { id: admissionId }}}),
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
            res.status(204).json({ message: `no records found` })
         }
         
      } catch (error: any) {
         console.log(error)
         return res.status(500).json({ message: error.message }) 
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
                  admission: true, program: true, bill: true, session: true, major: true, category: true 
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
               admission: true, program: true, bill: { include:{ bankacc: true }}, session: true, major: true, category: { include: { admissionLetter: true }} 
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
         const { admissionId,sessionId,billId,categoryId,programId,majorId, } = req.body
         delete req.body.admissionId; delete req.body.sessionId;
         delete req.body.billId; delete req.body.programId;
         delete req.body.majorId; delete req.body.categoryId;
      
         const resp = await ams.sortedApplicant.create({
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
         const resp = await ams.fresher.delete({
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
 
   
}
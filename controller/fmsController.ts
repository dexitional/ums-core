import { Request, Response, NextFunction } from "express";
import { v4 as uuid } from 'uuid';
import EvsModel from '../model/evsModel'
import AuthModel from '../model/authModel'
const evs = new EvsModel();
const Auth = new AuthModel();


export default class FmsController {
     
    // Loaders

     async fetchColleges(req: Request,res: Response) {
        try {
          const resp = await evs.fetchColleges()
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

     async fetchFaculties(req: Request,res: Response) {
        try {
          const resp = await evs.fetchFaculties(Number(req.params.collegeId))
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

     async fetchDepartments(req: Request,res: Response) {
        try {
          const resp = await evs.fetchDepartments(Number(req.params.facultyId))
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

     async fetchCandidates(req: Request,res: Response) {
        try {
          const resp = await evs.fetchCandidates(Number(req.params.deptId))
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
 
     async fetchCandidate(req: Request,res: Response) {
         try {
            const keyword: any = req.query.keyword;
             const resp = await evs.fetchCandidate(keyword)
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

     // Submission

     async fetchVoters(req: Request,res: Response) {
        try {
           const resp = await evs.fetchVotesByVoters()
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

     async fetchVotes(req: Request,res: Response) {
        try {
          const resp = await evs.fetchVotesByCandidates()
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
 
     async fetchVote(req: Request,res: Response) {
         try {
            const resp = await evs.fetchVote(req.params.regno)
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
 
     async postVote(req: Request,res: Response) {
       try {
         const vote = await evs.fetchVote(req.body.regno)
         if(!vote.length){
            const setting = await evs.fetchActiveSetting()
            const data = { ...req.body, setting_id: setting.id }
            const resp = await evs.postVote(data)
            if(resp){
               res.status(200).json(resp)
             } else {
               res.status(204).json({ message: `no records found` })
             }
         } else {
            res.status(202).json({ message: `You have already submitted a vote !` })
         }
         
        } catch (error: any) {
           console.log(error)
           return res.status(500).json({ message: error.message }) 
        }
     }

     
 
     async updateVote(req: Request,res: Response) {
       try {
          const resp = await evs.updateVote(req.params.regno,req.body)
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

     // Roles
    async fetchRoles(req: Request,res: Response) {
        try {
           const appId:any = req.query.appId ?? 7;
           const resp = await Auth.fetchRolesByApp(parseInt(appId))
           if(resp.length > 0){
             res.status(200).json(resp)
           } else {
             res.status(204).json({ message: `no record found` })
           }
         } catch (error: any) {
            console.log(error)
            return res.status(500).json({ message: error.message }) 
         }
      }
  
      async fetchRole(req: Request,res: Response) {
        try {
           const resp = await Auth.fetchRoleById(parseInt(req.params.id))
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
  
      async postRole(req: Request,res: Response) {
        try {
           const { uid } = await Auth.fetchSSOUser(req.body.identity);
           console.log(uid)
           const resp = await Auth.insertSSORole({ uid, arole_id: req.body.arole_id })
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
  
      async updateRole(req: Request,res: Response) {
        try {
           const resp = await Auth.updateSSORole(parseInt(req.params.id), { arole_id: req.body.arole_id,status: req.body.status });
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
  
      async deleteRole(req: Request,res: Response) {
        try {
           const resp = await Auth.deleteSSORole(parseInt(req.params.id))
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
 
   
}
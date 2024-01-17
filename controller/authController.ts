import { Request, Response } from "express";
import AuthModel from '../model/authModel'
import { PrismaClient } from '../prisma/client/ums'
const sso = new PrismaClient()
//import { customAlphabet } from 'nanoid'

const jwt = require('jsonwebtoken');
const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwzyx", 8);
const sha1 = require('sha1')


const Auth = new AuthModel();

export default class AuthController {
    
    async authenticateWithCredential(req: Request,res: Response) {
        try {
           const { username, password }:{ username: string, password: string } = req.body;
           if(!username) throw new Error('No username provided!');
           if(!password) throw new Error('No password provided!');
           // Locate Single-Sign-On Record or Student account
           //const isUser = await Auth.withCredential(username, password);
           const isUser:any = await sso.user.findFirst({ where: { username, password: sha1(password)}, include: { group: { select: { title: true }}}});
           if (isUser) {
                let { id, tag, groupId, group: { title: groupName } } = isUser;
                let user;
                console.log( id, tag, groupId,groupName)
                if(groupId == 4){ // Support
                   const data = await sso.support.findUnique({ where: { supportNo: Number(tag) } }); 
                   console.log(data)
                   if(data) user = { tag, fname: data?.fname, mname: data?.mname, lname: data?.lname, mail: data?.email, descriptor: "IT Support", department: "System Support", group_id: groupId, group_name: groupName }
                
                } else if(groupId == 3){ // Applicant
                   const data = await sso.voucher.findFirst({ where: { serial: Number(""), pin: "" } }); 
                   if(data) user = { tag, fname: "Admission", mname: "", lname: "Applicant" , mail: "", descriptor: "Applicant", department: "", group_id: groupId, group_name: groupName }

                } else if(groupId == 2){ // Staff
                   const data = await sso.staff.findUnique({ where: { staffNo: Number(tag) }, include: { promotion: { select: { job: true }}} }); 
                   if(data) user = { tag, fname: data?.fname, mname: data?.mname, lname: data?.lname, mail: data?.email, descriptor: "IT Support", department: "System Support", group_id: groupId, group_name: groupName }

                } else { // Student
                   const data = await sso.student.findUnique({ where: { id : tag }, include: { program: { select: { longName: true }}} }); 
                   if(data) user = { tag, fname: data?.fname, mname: data?.mname, lname: data?.lname, mail: data?.email, descriptor: data?.program?.longName, department: "", group_id: groupId, group_name: groupName }
                }
                console.log(user)
                const photo = `https://cdn.ucc.edu.gh/photos/?tag=${encodeURIComponent(tag)}`;
                let roles:any = []; // All App Roles
                // let evsRoles = await Auth.fetchEvsRoles(tag); // Only Electa Roles
                // Construct UserData
                const userdata: any = {
                  user,
                  roles: [...roles ],
                  photo
                }
                console.log(userdata)
                // Generate Session Token & 
                const token = jwt.sign(userdata || {}, process.env.SECRET, { expiresIn: 60 * 60});
                // Send Response to Client
                res.status(200).json({ success: true, data: userdata, token });
            
            } else {
                res.status(401).json({
                   success: false,
                   message: "Invalid Username or Password!",
                });
            }
        
        } catch (error: any) {
            console.log(error)
            res.status(401).json({
              success: false,
              message: error.message,
            });
        }
    }

    async authenticateWithGoogle(req: Request,res: Response) {

        const { providerId, email }:{ providerId: string, email: string } = req.body;
        console.log(req.body)
        try {
            if(!email) throw new Error('No identity Email provided!');
            // Get University User Record and Category
            var user = await Auth.fetchUserByVerb(email);
            if (user) {
                // Locate Single-Sign-On Record
                const isUser = await Auth.fetchSSOUser(user.tag);
                if (isUser) {
                    const photo = `https://cdn.ucc.edu.gh/photos/?tag=${encodeURIComponent(user?.tag)}`;
                    const { uid, group_id: gid } = isUser;
                    let roles = uid ? await Auth.fetchRoles(uid) : []; // All App Roles
                    let evsRoles = await Auth.fetchEvsRoles(user.tag); // Only Electa Roles
                    // Construct UserData
                    const userdata: any = {
                       user: { tag: user.tag, fname: user.fname, mname: user.mname, lname: user.lname, mail: user.username, descriptor: user.descriptor, department: user.unitname, group_id: gid, group_name: user.group_name },
                       roles: [...roles, ...evsRoles ],
                       photo
                    }
                    // Generate Session Token & 
                    const token = jwt.sign(userdata || {}, process.env.SECRET, { expiresIn: 60 * 60});
                    // Send Response to Client
                    res.status(200).json({ success: true, data: userdata, token });

                
                } else {
                    const pwd = nanoid();
                    const photo = `https://cdn.ucc.edu.gh/photos/?tag=${encodeURIComponent(user?.tag)}`;
                    // Create Single-Sign-On Account or Record
                    const ins = await Auth.insertSSOUser({
                        username: email,
                        password: sha1(pwd),
                        group_id: user.gid, 
                        tag: user.tag,
                    });
                    if (ins?.insertId) {
                        const uid = ins.insertId;
                        let evsRoles = await Auth.fetchEvsRoles(user.tag); // EVS Roles
                        // Construct UserData
                        const userdata: any = {
                           user: { tag: user.tag, fname: user.fname, mname: user.mname, lname: user.lname, mail: user.username, descriptor: user.descriptor, department: user.unitname, group_id: user.gid, group_name: user.group_name },
                            roles: [...evsRoles ],
                            photo
                        }
                        // Generate Session Token & 
                        const token = jwt.sign(userdata || {}, process.env.SECRET, { expiresIn: 60 * 60});
                        // Send Response to Client
                        res.status(200).json({ success: true, data: userdata, token });
                    
                    } else {
                        res.status(500).json({
                          success: false,
                          message: "Account not Staged!",
                        });
                    }
                }
            } else {
                res.status(401).json({
                    success: false,
                    message: "Invalid email account!",
                });
            }
        } catch (e: any) {
            console.log(e);
            res.status(401).json({ success: false, message: e.message });
        }
    }

    
    async authenticateWithKey(req: Request,res: Response) {}

   /* Account & Password */
     
   async changePassword(req: Request,res: Response) {
    try {
          const { oldpassword, newpassword, tag } = req.body;
          const isUser = await sso.user.findFirst({
             where: {
                username: tag,
                password: sha1(oldpassword)
             }
          })
          console.log("isUser",isUser)
          if(isUser){
             const ups = await sso.user.updateMany({
                where: { tag },
                 data:{ password: sha1(newpassword) }
             })
             res.status(200).json(ups)
          } else {
             res.status(202).json({ message: `Wrong password provided!` })
          }
          
       } catch (error: any) {
             console.log(error)
             return res.status(500).json({ message: error.message }) 
       }
   }


}
   
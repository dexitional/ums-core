"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authModel_1 = __importDefault(require("../model/authModel"));
const ums_1 = require("../prisma/client/ums");
const helper_1 = require("../util/helper");
const sso = new ums_1.PrismaClient();
//import { customAlphabet } from 'nanoid'
const jwt = require('jsonwebtoken');
const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwzyx", 8);
const sha1 = require('sha1');
const path = require('path');
const fs = require("fs");
const Auth = new authModel_1.default();
class AuthController {
    authenticateWithCredential(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                if (!username)
                    throw new Error('No username provided!');
                if (!password)
                    throw new Error('No password provided!');
                // Locate Single-Sign-On Record or Student account
                //const isUser = await Auth.withCredential(username, password);
                const isUser = yield sso.user.findFirst({ where: { username, password: sha1(password) }, include: { group: { select: { title: true } } } });
                if (isUser) {
                    let { id, tag, groupId, group: { title: groupName } } = isUser;
                    let user;
                    if (groupId == 4) { // Support
                        const data = yield sso.support.findUnique({ where: { supportNo: Number(tag) } });
                        if (data)
                            user = { tag, fname: data === null || data === void 0 ? void 0 : data.fname, mname: data === null || data === void 0 ? void 0 : data.mname, lname: data === null || data === void 0 ? void 0 : data.lname, mail: data === null || data === void 0 ? void 0 : data.email, descriptor: "IT Support", department: "System Support", group_id: groupId, group_name: groupName };
                    }
                    else if (groupId == 3) { // Applicant
                        const data = yield sso.voucher.findFirst({ where: { serial: "", pin: "" } });
                        if (data)
                            user = { tag, fname: "Admission", mname: "", lname: "Applicant", mail: "", descriptor: "Applicant", department: "", group_id: groupId, group_name: groupName };
                    }
                    else if (groupId == 2) { // Staff
                        const data = yield sso.staff.findUnique({ where: { staffNo: Number(tag) }, include: { promotion: { select: { job: true } } } });
                        if (data)
                            user = { tag, fname: data === null || data === void 0 ? void 0 : data.fname, mname: data === null || data === void 0 ? void 0 : data.mname, lname: data === null || data === void 0 ? void 0 : data.lname, mail: data === null || data === void 0 ? void 0 : data.email, descriptor: "IT Support", department: "System Support", group_id: groupId, group_name: groupName };
                    }
                    else { // Student
                        const data = yield sso.student.findUnique({ where: { id: tag }, include: { program: { select: { longName: true } } } });
                        if (data)
                            user = { tag, fname: data === null || data === void 0 ? void 0 : data.fname, mname: data === null || data === void 0 ? void 0 : data.mname, lname: data === null || data === void 0 ? void 0 : data.lname, mail: data === null || data === void 0 ? void 0 : data.email, descriptor: (_a = data === null || data === void 0 ? void 0 : data.program) === null || _a === void 0 ? void 0 : _a.longName, department: "", group_id: groupId, group_name: groupName };
                    }
                    const photo = `https://cdn.ucc.edu.gh/photos/?tag=${encodeURIComponent(tag)}`;
                    let roles = []; // All App Roles
                    // let evsRoles = await Auth.fetchEvsRoles(tag); // Only Electa Roles
                    // Construct UserData
                    const userdata = {
                        user,
                        roles: [...roles],
                        photo
                    };
                    // Generate Session Token & 
                    const token = jwt.sign(userdata || {}, process.env.SECRET, { expiresIn: 60 * 60 });
                    // Send Response to Client
                    res.status(200).json({ success: true, data: userdata, token });
                }
                else {
                    res.status(401).json({
                        success: false,
                        message: "Invalid Username or Password!",
                    });
                }
            }
            catch (error) {
                console.log(error);
                res.status(401).json({
                    success: false,
                    message: error.message,
                });
            }
        });
    }
    authenticateWithGoogle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { providerId, email } = req.body;
            console.log(req.body);
            try {
                if (!email)
                    throw new Error('No identity Email provided!');
                // Get University User Record and Category
                var user = yield Auth.fetchUserByVerb(email);
                if (user) {
                    // Locate Single-Sign-On Record
                    const isUser = yield Auth.fetchSSOUser(user.tag);
                    if (isUser) {
                        const photo = `https://cdn.ucc.edu.gh/photos/?tag=${encodeURIComponent(user === null || user === void 0 ? void 0 : user.tag)}`;
                        const { uid, group_id: gid } = isUser;
                        let roles = uid ? yield Auth.fetchRoles(uid) : []; // All App Roles
                        let evsRoles = yield Auth.fetchEvsRoles(user.tag); // Only Electa Roles
                        // Construct UserData
                        const userdata = {
                            user: { tag: user.tag, fname: user.fname, mname: user.mname, lname: user.lname, mail: user.username, descriptor: user.descriptor, department: user.unitname, group_id: gid, group_name: user.group_name },
                            roles: [...roles, ...evsRoles],
                            photo
                        };
                        // Generate Session Token & 
                        const token = jwt.sign(userdata || {}, process.env.SECRET, { expiresIn: 60 * 60 });
                        // Send Response to Client
                        res.status(200).json({ success: true, data: userdata, token });
                    }
                    else {
                        const pwd = nanoid();
                        const photo = `https://cdn.ucc.edu.gh/photos/?tag=${encodeURIComponent(user === null || user === void 0 ? void 0 : user.tag)}`;
                        // Create Single-Sign-On Account or Record
                        const ins = yield Auth.insertSSOUser({
                            username: email,
                            password: sha1(pwd),
                            group_id: user.gid,
                            tag: user.tag,
                        });
                        if (ins === null || ins === void 0 ? void 0 : ins.insertId) {
                            const uid = ins.insertId;
                            let evsRoles = yield Auth.fetchEvsRoles(user.tag); // EVS Roles
                            // Construct UserData
                            const userdata = {
                                user: { tag: user.tag, fname: user.fname, mname: user.mname, lname: user.lname, mail: user.username, descriptor: user.descriptor, department: user.unitname, group_id: user.gid, group_name: user.group_name },
                                roles: [...evsRoles],
                                photo
                            };
                            // Generate Session Token & 
                            const token = jwt.sign(userdata || {}, process.env.SECRET, { expiresIn: 60 * 60 });
                            // Send Response to Client
                            res.status(200).json({ success: true, data: userdata, token });
                        }
                        else {
                            res.status(500).json({
                                success: false,
                                message: "Account not Staged!",
                            });
                        }
                    }
                }
                else {
                    res.status(401).json({
                        success: false,
                        message: "Invalid email account!",
                    });
                }
            }
            catch (e) {
                console.log(e);
                res.status(401).json({ success: false, message: e.message });
            }
        });
    }
    authenticateWithKey(req, res) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    /* Account & Password */
    changePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { oldpassword, newpassword, tag } = req.body;
                const isUser = yield sso.user.findFirst({
                    where: {
                        username: tag,
                        password: sha1(oldpassword)
                    }
                });
                if (isUser) {
                    const ups = yield sso.user.updateMany({
                        where: { tag },
                        data: { password: sha1(newpassword) }
                    });
                    res.status(200).json(ups);
                }
                else {
                    res.status(202).json({ message: `Wrong password provided!` });
                }
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ message: error.message });
            }
        });
    }
    fetchPhoto(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.setHeader("Access-Control-Allow-Origin", "*");
                let mtag = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.tag;
                mtag = mtag.trim().toLowerCase();
                const isUser = yield sso.user.findFirst({ where: { tag: mtag } }); // Biodata
                if (isUser) {
                    let { groupId } = isUser, spath;
                    const tag = mtag.replaceAll("/", "").replaceAll("_", "");
                    if (groupId == 4)
                        spath = path.join(__dirname, "/../../public/cdn/photo/support/");
                    else if (groupId == 3)
                        spath = path.join(__dirname, "/../../public/cdn/photo/applicant/");
                    else if (groupId == 2)
                        spath = path.join(__dirname, "/../../public/cdn/photo/staff/");
                    else if (groupId == 1)
                        spath = path.join(__dirname, "/../../public/cdn/photo/student/");
                    else
                        spath = path.join(__dirname, "/../../public/cdn/");
                    const file = `${spath}${tag}.jpg`;
                    const file2 = `${spath}${tag}.jpeg`;
                    console.log(file);
                    try {
                        if (fs.statSync(file))
                            return res.status(200).sendFile(file);
                        else if (fs.statSync(file2))
                            return res.status(200).sendFile(file2);
                        else
                            return res.status(200).sendFile(`${spath}/none.png`);
                    }
                    catch (e) {
                        return res.status(200).sendFile(path.join(__dirname, "/../../public/cdn/") + `/none.png`);
                    }
                }
                else {
                    res.status(200).sendFile(path.join(__dirname, "/../../public/cdn", "none.png"));
                }
            }
            catch (err) {
                console.log(err);
                res.status(200).sendFile(path.join(__dirname, "/../../public/cdn", "none.png"));
            }
        });
    }
    postPhoto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.files || Object.keys(req.files).length === 0) {
                return res.status(400).send('No files were uploaded.');
            }
            const photo = req.files.photo;
            const { tag } = req.body;
            const isUser = yield sso.user.findFirst({ where: { tag } });
            let { groupId } = isUser;
            var mpath;
            switch (groupId) {
                case 1:
                    mpath = "student";
                    break;
                case 2:
                    mpath = "staff";
                    break;
                case 3:
                    mpath = "applicant";
                    break;
                case 4:
                    mpath = "support";
                    break;
                default:
                    mpath = "student";
                    break;
            }
            const dest = path.join(__dirname, "/../../public/cdn/photo/" + mpath, (tag && tag.toString().replaceAll("/", "").trim().toLowerCase()) + ".jpg");
            photo.mv(dest, function (err) {
                if (err)
                    return res.status(500).send(err);
                const stphoto = `${req.protocol}://${req.get("host")}/api/auth/photos/?tag=${tag.toString().toLowerCase()}&cache=${Math.random() * 1000}`;
                return res.status(200).json({ success: true, data: stphoto });
            });
        });
    }
    //   async sendPhotos(req: Request,res: Response) {
    //     var { gid } = req.body;
    //     var spath = path.join(__dirname,"/../../public/cdn/photo/"), mpath;
    //     if (req.files && req.files.photos.length > 0) {
    //       for (var file of req.files.photos) {
    //         switch (parseInt(gid)) {
    //           case 1:
    //             mpath = `${spath}/student/`;
    //             break;
    //           case 2:
    //             mpath = `${spath}/staff/`;
    //             break;
    //           case 3:
    //             mpath = `${spath}/nss/`;
    //             break;
    //           case 4:
    //             mpath = `${spath}/applicant/`;
    //             break;
    //           case 5:
    //             mpath = `${spath}/alumni/`;
    //             break;
    //           case 6:
    //             mpath = `${spath}/code/`;
    //             break;
    //         }
    //         let tag = file.name.toString().split(".")[0].replaceAll("/", "").trim().toLowerCase();
    //             tag = `${mpath}${tag}.jpg`;
    //         file.mv(tag, (err) => {
    //           if (!err) count = count + 1;
    //         });
    //       }
    //       res.status(200).json({ success: true, data: null });
    //     }
    //   }
    rotatePhoto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { studentId: tag } = req.body;
            var spath = path.join(__dirname, "/../../public/cdn/photo/");
            const isUser = yield sso.user.findFirst({ where: { tag } });
            let { groupId } = isUser;
            switch (parseInt(groupId)) {
                case 1:
                    spath = `${spath}/student/`;
                    break;
                case 2:
                    spath = `${spath}/staff/`;
                    break;
                case 3:
                    spath = `${spath}/applicant/`;
                    break;
                case 4:
                    spath = `${spath}/support/`;
                    break;
            }
            tag = tag.toString().replaceAll("/", "").trim().toLowerCase();
            const file = `${spath}${tag}.jpg`;
            const file2 = `${spath}${tag}.jpeg`;
            var stats = fs.statSync(file);
            var stats2 = fs.statSync(file2);
            if (stats) {
                yield (0, helper_1.rotateImage)(file);
                const stphoto = `${req.protocol}://${req.get("host")}/api/photos/?tag=${tag.toString().toLowerCase()}&cache=${Math.random() * 1000}`;
                res.status(200).json({ success: true, data: stphoto });
            }
            else if (stats2) {
                yield (0, helper_1.rotateImage)(file2);
                const stphoto = `${req.protocol}://${req.get("host")}/api/photos/?tag=${tag.toString().toLowerCase()}&cache=${Math.random() * 1000}`;
                res.status(200).json({ success: true, data: stphoto });
            }
            else {
                res.status(200).json({ success: false, data: null, msg: "Photo Not Found!" });
            }
        });
    }
    removePhoto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let tag = req.params.id;
            const isUser = yield sso.user.findFirst({ where: { tag } });
            let { groupId } = isUser;
            var spath = path.join(__dirname, "/../../public/cdn/photo");
            switch (parseInt(groupId)) {
                case 1:
                    spath = `${spath}/student/`;
                    break;
                case 2:
                    spath = `${spath}/staff/`;
                    break;
                case 3:
                    spath = `${spath}/applicant/`;
                    break;
                case 4:
                    spath = `${spath}/support/`;
                    break;
            }
            tag = tag.toString().replaceAll("/", "").replaceAll("_", "").trim().toLowerCase();
            const file = `${spath}${tag}.jpg`;
            var stats = fs.statSync(file);
            if (stats) {
                fs.unlinkSync(file);
                const stphoto = `${req.protocol}://${req.get("host")}/api/photos/?tag=${tag.toString().toLowerCase()}&cache=${Math.random() * 1000}`;
                res.status(200).json({ success: true, data: stphoto });
            }
            else {
                res.status(200).json({ success: false, data: null, msg: "Photo Not Found!" });
            }
        });
    }
}
exports.default = AuthController;

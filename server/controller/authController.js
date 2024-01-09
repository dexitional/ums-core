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
const sso = new ums_1.PrismaClient();
//import { customAlphabet } from 'nanoid'
const jwt = require('jsonwebtoken');
const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwzyx", 8);
const sha1 = require('sha1');
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
                    console.log(id, tag, groupId, groupName);
                    if (groupId == 4) { // Support
                        const data = yield sso.support.findUnique({ where: { supportNo: Number(tag) } });
                        console.log(data);
                        if (data)
                            user = { tag, fname: data === null || data === void 0 ? void 0 : data.fname, mname: data === null || data === void 0 ? void 0 : data.mname, lname: data === null || data === void 0 ? void 0 : data.lname, mail: data === null || data === void 0 ? void 0 : data.email, descriptor: "IT Support", department: "System Support", group_id: groupId, group_name: groupName };
                    }
                    else if (groupId == 3) { // Applicant
                        const data = yield sso.voucher.findFirst({ where: { serial: Number(""), pin: "" } });
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
                    console.log(user);
                    const photo = `https://cdn.ucc.edu.gh/photos/?tag=${encodeURIComponent(tag)}`;
                    let roles = []; // All App Roles
                    // let evsRoles = await Auth.fetchEvsRoles(tag); // Only Electa Roles
                    // Construct UserData
                    const userdata = {
                        user,
                        roles: [...roles],
                        photo
                    };
                    console.log(userdata);
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
}
exports.default = AuthController;

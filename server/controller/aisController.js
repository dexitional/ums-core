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
const evsModel_1 = __importDefault(require("../model/evsModel"));
const authModel_1 = __importDefault(require("../model/authModel"));
const ums_1 = require("../prisma/client/ums");
const ais = new ums_1.PrismaClient();
const evs = new evsModel_1.default();
const Auth = new authModel_1.default();
class AisController {
    /* Student */
    fetchStudents(req, res) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const { page = 1, pageSize = 6, keyword = '' } = req.query;
            const offset = (page - 1) * pageSize;
            let searchCondition = {};
            try {
                if (keyword)
                    searchCondition = {
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
                    };
                const resp = yield ais.$transaction([
                    ais.student.count(Object.assign({}, (searchCondition))),
                    ais.student.findMany(Object.assign(Object.assign({}, (searchCondition)), { skip: offset, take: Number(pageSize), include: {
                            country: true,
                            program: {
                                select: {
                                    longName: true
                                }
                            },
                        } }))
                ]);
                if (resp && ((_a = resp[1]) === null || _a === void 0 ? void 0 : _a.length)) {
                    res.status(200).json({
                        totalPages: (_b = Math.ceil(resp[0] / pageSize)) !== null && _b !== void 0 ? _b : 0,
                        totalData: (_c = resp[1]) === null || _c === void 0 ? void 0 : _c.length,
                        data: resp[1],
                    });
                }
                else {
                    res.status(204).json({ message: `no records found` });
                }
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ message: error.message });
            }
        });
    }
    fetchStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield yield ais.student.findUnique({
                    where: {
                        id: req.params.id
                    },
                    include: {
                        country: true,
                        program: {
                            select: {
                                longName: true
                            }
                        },
                    },
                });
                if (resp) {
                    res.status(200).json(resp);
                }
                else {
                    res.status(204).json({ message: `no record found` });
                }
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ message: error.message });
            }
        });
    }
    postStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ais.student.create({
                    data: Object.assign({}, req.body),
                    include: {
                        country: true,
                        program: {
                            select: {
                                longName: true
                            }
                        },
                    }
                });
                if (resp) {
                    res.status(200).json(resp);
                }
                else {
                    res.status(204).json({ message: `no records found` });
                }
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ message: error.message });
            }
        });
    }
    updateStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ais.student.update({
                    where: {
                        id: req.params.id
                    },
                    data: Object.assign({}, req.body)
                });
                if (resp) {
                    res.status(200).json(resp);
                }
                else {
                    res.status(204).json({ message: `No records found` });
                }
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ message: error.message });
            }
        });
    }
    deleteStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ais.student.delete({
                    where: { id: req.params.id }
                });
                if (resp) {
                    res.status(200).json(resp);
                }
                else {
                    res.status(204).json({ message: `No records found` });
                }
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ message: error.message });
            }
        });
    }
    runData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let resp;
                const courses = require('../../util/courses.json');
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
                if (students) {
                    res.status(200).json(students);
                }
                else {
                    res.status(204).json({ message: `no record found` });
                }
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.default = AisController;

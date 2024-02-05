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
const moment_1 = __importDefault(require("moment"));
//import sha1 from "sha1";
const helper_1 = require("../util/helper");
const ais = new ums_1.PrismaClient();
const evs = new evsModel_1.default();
const Auth = new authModel_1.default();
const sha1 = require('sha1');
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
                            title: { select: { label: true } },
                            country: { select: { longName: true } },
                            region: { select: { title: true } },
                            religion: { select: { title: true } },
                            disability: { select: { title: true } },
                            program: {
                                select: {
                                    longName: true,
                                    department: { select: { title: true } }
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
                const resp = yield ais.student.findUnique({
                    where: {
                        id: req.params.id
                    },
                    include: {
                        title: { select: { label: true } },
                        country: { select: { longName: true } },
                        region: { select: { title: true } },
                        religion: { select: { title: true } },
                        disability: { select: { title: true } },
                        program: {
                            select: {
                                longName: true,
                                department: { select: { title: true } }
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
    fetchStudentTranscript(req, res) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ais.assessment.findMany({
                    where: { indexno: req.params.id },
                    include: {
                        student: { select: { fname: true, mname: true, id: true, program: { select: { longName: true } } } },
                        scheme: { select: { gradeMeta: true, } },
                        session: { select: { title: true, } },
                        course: { select: { title: true } },
                    },
                    orderBy: { session: { createdAt: 'asc' } }
                });
                if (resp) {
                    var mdata = new Map();
                    for (const sv of resp) {
                        const index = (_b = (_a = sv === null || sv === void 0 ? void 0 : sv.session) === null || _a === void 0 ? void 0 : _a.title) !== null && _b !== void 0 ? _b : 'none';
                        const grades = (_c = sv.scheme) === null || _c === void 0 ? void 0 : _c.gradeMeta;
                        const zd = Object.assign(Object.assign({}, sv), { grade: yield (0, helper_1.getGrade)(sv.totalScore, grades), gradepoint: yield (0, helper_1.getGradePoint)(sv.totalScore, grades) });
                        // Data By Courses
                        if (mdata.has(index)) {
                            mdata.set(index, [...mdata.get(index), Object.assign({}, zd)]);
                        }
                        else {
                            mdata.set(index, [Object.assign({}, zd)]);
                        }
                    }
                    res.status(200).json(Array.from(mdata));
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
    fetchStudentFinance(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ais.studentAccount.findMany({
                    where: { studentId: req.params.id },
                    include: {
                        student: { select: { fname: true, mname: true, indexno: true, program: { select: { longName: true } } } },
                        bill: { select: { narrative: true } },
                        charge: { select: { title: true } },
                        session: { select: { title: true } },
                        transaction: { select: { transtag: true } },
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
    fetchStudentActivity(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ais.student.findUnique({
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
                const { titleId, programId, countryId, regionId, religionId, disabilityId } = req.body;
                delete req.body.titleId;
                delete req.body.programId;
                delete req.body.countryId;
                delete req.body.regionId;
                delete req.body.religionId;
                delete req.body.disabilityId;
                const resp = yield ais.student.create({
                    data: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, req.body), programId && ({ program: { connect: { id: programId } } })), titleId && ({ title: { connect: { id: titleId } } })), countryId && ({ country: { connect: { id: countryId } } })), regionId && ({ region: { connect: { id: regionId } } })), religionId && ({ religion: { connect: { id: religionId } } })), disabilityId && ({ disability: { connect: { id: disabilityId } } }))
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
                const { titleId, programId, countryId, regionId, religionId, disabilityId } = req.body;
                delete req.body.titleId;
                delete req.body.programId;
                delete req.body.countryId;
                delete req.body.regionId;
                delete req.body.religionId;
                delete req.body.disabilityId;
                const resp = yield ais.student.update({
                    where: { id: req.params.id },
                    data: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, req.body), programId && ({ program: { connect: { id: programId } } })), titleId && ({ title: { connect: { id: titleId } } })), countryId && ({ country: { connect: { id: countryId } } })), regionId && ({ region: { connect: { id: regionId } } })), religionId && ({ religion: { connect: { id: religionId } } })), disabilityId && ({ disability: { connect: { id: disabilityId } } }))
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
    /* Courses */
    fetchCourseList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ais.course.findMany({ where: { status: true }, orderBy: { title: 'asc' } });
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
    fetchCourses(req, res) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const { page = 1, pageSize = 9, keyword = '' } = req.query;
            const offset = (page - 1) * pageSize;
            let searchCondition = {};
            try {
                if (keyword)
                    searchCondition = {
                        where: {
                            OR: [
                                { title: { contains: keyword } },
                                { id: { contains: keyword } },
                            ],
                        }
                    };
                const resp = yield ais.$transaction([
                    ais.course.count(Object.assign({}, (searchCondition))),
                    ais.course.findMany(Object.assign(Object.assign({}, (searchCondition)), { skip: offset, take: Number(pageSize) }))
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
    fetchCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ais.course.findUnique({
                    where: {
                        id: req.params.id
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
    postCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ais.course.create({
                    data: Object.assign({}, req.body),
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
    updateCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ais.course.update({
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
    deleteCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ais.course.delete({
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
    /* Structure & Curriculum */
    fetchCurriculums(req, res) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const { page = 1, pageSize = 9, keyword = '' } = req.query;
            const offset = (page - 1) * pageSize;
            let searchCondition = {};
            try {
                if (keyword)
                    searchCondition = {
                        where: {
                            OR: [
                                { courseId: { contains: keyword } },
                                { unit: { title: { contains: keyword } } },
                                { program: { longName: { contains: keyword } } },
                                { course: { title: { contains: keyword } } },
                            ],
                        }
                    };
                const resp = yield ais.$transaction([
                    ais.structure.count(Object.assign({}, (searchCondition))),
                    ais.structure.findMany(Object.assign(Object.assign({}, (searchCondition)), { skip: offset, take: Number(pageSize), include: {
                            unit: { select: { title: true } },
                            program: { select: { longName: true } },
                            course: { select: { title: true } },
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
    fetchCurriculumList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ais.structure.findMany({
                    where: { status: true },
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
    fetchCurriculum(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ais.structure.findUnique({
                    where: {
                        id: req.params.id
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
    postCurriculum(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { unitId, programId, courseId } = req.body;
                delete req.body.courseId;
                delete req.body.programId;
                delete req.body.unitId;
                const resp = yield ais.structure.create({
                    data: Object.assign(Object.assign(Object.assign(Object.assign({}, req.body), programId && ({ program: { connect: { id: programId } } })), courseId && ({ course: { connect: { id: courseId } } })), unitId && ({ unit: { connect: { id: unitId } } }))
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
    updateCurriculum(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { unitId, programId, courseId } = req.body;
                delete req.body.courseId;
                delete req.body.programId;
                delete req.body.unitId;
                const resp = yield ais.structure.update({
                    where: { id: req.params.id },
                    data: Object.assign(Object.assign(Object.assign(Object.assign({}, req.body), programId && ({ program: { connect: { id: programId } } })), courseId && ({ course: { connect: { id: courseId } } })), unitId && ({ unit: { connect: { id: unitId } } }))
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
    deleteCurriculum(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ais.structure.delete({
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
    /* Schemes */
    fetchSchemes(req, res) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const { page = 1, pageSize = 9, keyword = '' } = req.query;
            const offset = (page - 1) * pageSize;
            let searchCondition = {};
            try {
                if (keyword)
                    searchCondition = {
                        where: {
                            OR: [
                                { title: { contains: keyword } },
                            ],
                        }
                    };
                const resp = yield ais.$transaction([
                    ais.scheme.count(Object.assign({}, (searchCondition))),
                    ais.scheme.findMany(Object.assign(Object.assign({}, (searchCondition)), { skip: offset, take: Number(pageSize), include: {
                            _count: {
                                select: { program: true }
                            }
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
    fetchSchemeList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ais.scheme.findMany({
                    where: { status: true },
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
    fetchScheme(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ais.scheme.findUnique({
                    where: {
                        id: req.params.id
                    },
                    include: { program: true }
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
    postScheme(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ais.scheme.create({
                    data: Object.assign({}, req.body),
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
    updateScheme(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ais.scheme.update({
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
    deleteScheme(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ais.scheme.delete({
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
    /* Registrations */
    fetchRegistrationList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ais.activityRegister.findMany({
                    where: { session: { default: true } },
                    orderBy: { createdAt: 'desc' },
                    include: {
                        student: {
                            select: {
                                fname: true, mname: true, lname: true,
                                semesterNum: true, id: true,
                                program: { select: { longName: true } }
                            }
                        }
                    }
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
    fetchRegistrations(req, res) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const { page = 1, pageSize = 9, keyword = '' } = req.query;
            const offset = (page - 1) * pageSize;
            let searchCondition = {};
            try {
                if (keyword)
                    searchCondition = {
                        where: {
                            session: { default: true },
                            OR: [
                                { indexno: { contains: keyword } },
                                { student: { fname: { contains: keyword } } },
                                { student: { mname: { contains: keyword } } },
                                { student: { lname: { contains: keyword } } },
                                { student: { id: { contains: keyword } } },
                                { student: { program: { longName: { contains: keyword } } } },
                            ],
                        }
                    };
                const resp = yield ais.$transaction([
                    ais.activityRegister.count(Object.assign({}, (searchCondition))),
                    ais.activityRegister.findMany(Object.assign(Object.assign({}, (searchCondition)), { skip: offset, take: Number(pageSize), orderBy: { createdAt: 'desc' }, include: {
                            student: {
                                select: {
                                    fname: true, mname: true, lname: true, indexno: true,
                                    semesterNum: true, id: true, gender: true,
                                    program: { select: { longName: true } }
                                }
                            }
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
    fetchRegistration(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ais.assessment.findMany({
                    include: {
                        course: { select: { title: true, creditHour: true } },
                        student: { select: { id: true, indexno: true, fname: true, mname: true, lname: true, gender: true, semesterNum: true, program: { select: { longName: true, department: true } } } },
                        session: { select: { title: true } },
                    },
                    where: {
                        indexno: req.params.indexno,
                        session: { default: true }
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
    fetchRegistrationMount(req, res) {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const courses = [];
                const id = req.params.indexno;
                // Get Student Info
                const student = yield ais.student.findUnique({ include: { program: { select: { schemeId: true, hasMajor: true, } } }, where: { id } });
                const indexno = student === null || student === void 0 ? void 0 : student.indexno;
                // Get Active Sessions Info
                const sessions = yield ais.session.findMany({ where: { default: true } });
                // Get Session, If Student is Main(Sept)/Sub(Jan) for AUCC Only
                const session = sessions.find((row) => ((0, moment_1.default)(student === null || student === void 0 ? void 0 : student.entryDate).format("MM") == '01' && (student === null || student === void 0 ? void 0 : student.entrySemesterNum) <= 2) ? row.tag == 'sub' : row.tag == 'main');
                // Get Normal Courses with/without Majors
                const maincourses = yield ais.structure.findMany({
                    include: { course: { select: { title: true, creditHour: true } } },
                    where: { programId: student === null || student === void 0 ? void 0 : student.programId, semesterNum: student === null || student === void 0 ? void 0 : student.semesterNum },
                    orderBy: { type: 'asc' }
                });
                // Meta & Instructions
                const meta = yield ais.structmeta.findFirst({
                    where: { programId: student === null || student === void 0 ? void 0 : student.programId, majorId: student === null || student === void 0 ? void 0 : student.majorId, semesterNum: student === null || student === void 0 ? void 0 : student.semesterNum },
                });
                // Current Posted Bill 
                const groupCode = yield (0, helper_1.getBillCodePrisma)(student === null || student === void 0 ? void 0 : student.semesterNum);
                const bill = yield ais.bill.findFirst({
                    where: {
                        programId: student === null || student === void 0 ? void 0 : student.programId, sessionId: session === null || session === void 0 ? void 0 : session.id, residentialStatus: (student === null || student === void 0 ? void 0 : student.residentialStatus) || 'RESIDENTIAL',
                        OR: groupCode,
                    },
                });
                console.log("Bill", bill);
                // const meta:any = []
                if (student && maincourses.length) {
                    for (const course of maincourses) {
                        courses.push({
                            code: course.courseId,
                            course: (_a = course === null || course === void 0 ? void 0 : course.course) === null || _a === void 0 ? void 0 : _a.title,
                            credit: (_b = course === null || course === void 0 ? void 0 : course.course) === null || _b === void 0 ? void 0 : _b.creditHour,
                            type: course === null || course === void 0 ? void 0 : course.type,
                            lock: course === null || course === void 0 ? void 0 : course.lock,
                            sessionId: session === null || session === void 0 ? void 0 : session.id,
                            schemeId: (_c = student === null || student === void 0 ? void 0 : student.program) === null || _c === void 0 ? void 0 : _c.schemeId,
                            semesterNum: student === null || student === void 0 ? void 0 : student.semesterNum,
                            indexno
                        });
                    }
                }
                // Get Resit Courses
                const resitcourses = yield ais.resit.findMany({
                    include: { course: { select: { title: true, creditHour: true } } },
                    where: { indexno, taken: false, trailSession: { semester: session.semesterNum },
                    }
                });
                if (student && resitcourses.length) {
                    for (const course of resitcourses) {
                        courses.push({
                            code: course.courseId,
                            course: (_d = course === null || course === void 0 ? void 0 : course.course) === null || _d === void 0 ? void 0 : _d.title,
                            credit: (_e = course === null || course === void 0 ? void 0 : course.course) === null || _e === void 0 ? void 0 : _e.creditHour,
                            type: 'R',
                            lock: false,
                            sessionId: session.id,
                            schemeId: (_f = student === null || student === void 0 ? void 0 : student.program) === null || _f === void 0 ? void 0 : _f.schemeId,
                            semesterNum: student.semesterNum,
                            indexno
                        });
                    }
                }
                // Conditions
                let condition = true; // Allow Registration
                let message; // Reason attached
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
                if (courses.length) {
                    res.status(200).json({ session: session === null || session === void 0 ? void 0 : session.title, courses, meta, condition, message });
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
    postRegistration(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const courses = req.body;
                const data = [], rdata = [];
                const slip = yield ais.assessment.findMany({ where: { indexno: courses[0].indexno, session: { default: true } } });
                if (slip.length)
                    throw ("Registration already submitted!");
                const resitcourses = courses.filter((row) => row.type == 'R');
                const maincourses = courses.filter((row) => row.type != 'R');
                if (maincourses.length) {
                    for (const course of maincourses) {
                        data.push({
                            courseId: course.code,
                            sessionId: course.sessionId,
                            schemeId: course.schemeId,
                            credit: course.credit,
                            semesterNum: course.semesterNum,
                            indexno: course.indexno,
                            totalScore: 0,
                            type: 'N'
                        });
                    }
                }
                if (resitcourses.length) {
                    // Resit Session Info
                    const rsession = yield ais.resession.findFirst({ where: { default: true } });
                    // Save Resit Registration
                    for (const course of resitcourses) {
                        const ups = yield ais.resit.updateMany({
                            where: {
                                indexno: course === null || course === void 0 ? void 0 : course.indexno,
                                courseId: course === null || course === void 0 ? void 0 : course.code,
                                taken: false
                            },
                            data: {
                                registerSessionId: course === null || course === void 0 ? void 0 : course.sessionId,
                                resitSessionId: rsession === null || rsession === void 0 ? void 0 : rsession.id,
                                taken: true
                            }
                        });
                        if (ups)
                            rdata.push(ups);
                    }
                }
                // Log Registration
                const activityresp = yield ais.activityRegister.create({ data: {
                        indexno: maincourses[0].indexno,
                        sessionId: maincourses[0].sessionId,
                        courses: courses === null || courses === void 0 ? void 0 : courses.length,
                        credits: courses === null || courses === void 0 ? void 0 : courses.reduce((sum, cur) => sum + cur.credit, 0)
                    } });
                // Save Registration Courses
                const mainresp = yield ais.assessment.createMany({ data });
                if (mainresp) {
                    res.status(200).json({ courses: mainresp, resits: rdata, totalCourses: courses.length });
                }
                else {
                    res.status(204).json({ message: `no records found` });
                }
            }
            catch (error) {
                console.log(error);
                return res.status(202).json({ message: error });
            }
        });
    }
    updateRegistration(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const indexno = req.params.indexno;
                const courses = req.body;
                const data = [], rdata = [];
                const resitcourses = courses.filter((row) => row.type == 'R');
                const maincourses = courses.filter((row) => row.type != 'R');
                if (maincourses.length) {
                    for (const course of maincourses) {
                        data.push({
                            courseId: course.courseId,
                            sessionId: course.sessionId,
                            schemeId: course.schemeId,
                            credit: course.credit,
                            semesterNum: course.semesterNum,
                            indexno,
                            totalScore: 0
                        });
                    }
                }
                if (resitcourses.length) {
                    for (const course of resitcourses) {
                        const ups = yield ais.resit.updateMany({
                            where: {
                                indexno,
                                courseId: course.courseId,
                                taken: false
                            },
                            data: {
                                registerSessionId: course.sessionId,
                                resitSessionId: course.sessionId,
                                taken: true
                            }
                        });
                        if (ups)
                            rdata.push(ups);
                    }
                }
                const mainresp = yield ais.assessment.createMany({ data });
                if (mainresp) {
                    res.status(200).json({ courses: mainresp, resits: rdata });
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
    deleteRegistration(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Delete Courses Registration
                const resp = yield ais.assessment.deleteMany({
                    where: {
                        indexno: req.params.indexno,
                        session: { default: true }
                    }
                });
                // Delete Registration Log
                const log = yield ais.activityRegister.deleteMany({
                    where: {
                        indexno: req.params.indexno,
                        session: { default: true }
                    }
                });
                // Reset Resit Registration
                const resit = yield ais.resit.updateMany({
                    where: {
                        indexno: req.params.indexno,
                        registerSession: { default: true }
                    },
                    data: {
                        taken: false,
                        resitSessionId: null,
                        registerSessionId: null,
                    }
                });
                if (resp === null || resp === void 0 ? void 0 : resp.count) {
                    res.status(200).json(resp);
                }
                else {
                    res.status(204).json({ message: `Registration not deleted` });
                }
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ message: error.message });
            }
        });
    }
    /* programs */
    fetchProgramList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ais.program.findMany({
                    where: { status: true },
                    include: {
                        department: { select: { title: true } },
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
    fetchPrograms(req, res) {
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
                                { code: { contains: keyword } },
                                { shortName: { contains: keyword } },
                                { longName: { contains: keyword } },
                                { prefix: { contains: keyword } },
                            ],
                        }
                    };
                const resp = yield ais.$transaction([
                    ais.program.count(Object.assign({}, (searchCondition))),
                    ais.program.findMany(Object.assign(Object.assign({}, (searchCondition)), { skip: offset, take: Number(pageSize), include: {
                            department: { select: { title: true } },
                            student: { select: { _count: true } }
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
    fetchProgram(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ais.program.findUnique({
                    where: {
                        id: req.params.id
                    },
                    include: {
                        department: { select: { title: true } },
                        student: { select: { _count: true } }
                    }
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
    fetchProgramStructure(req, res) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ais.program.findUnique({
                    where: { id: req.params.id },
                    include: {
                        structure: {
                            select: {
                                id: true,
                                type: true,
                                semesterNum: true,
                                course: { select: { title: true, creditHour: true, id: true, practicalHour: true, theoryHour: true } }
                            },
                            orderBy: [{ semesterNum: 'asc' }, { type: 'asc' },]
                        },
                        structmeta: {
                            select: {
                                id: true,
                                minCredit: true,
                                maxCredit: true,
                                maxElectiveNum: true,
                                semesterNum: true,
                                major: { select: { longName: true } }
                            },
                            orderBy: [{ semesterNum: 'asc' },]
                        }
                    },
                });
                if ((_a = resp === null || resp === void 0 ? void 0 : resp.structure) === null || _a === void 0 ? void 0 : _a.length) {
                    var mdata = new Map(), sdata = new Map();
                    for (const sv of resp === null || resp === void 0 ? void 0 : resp.structure) {
                        const index = (_b = `LEVEL ${Math.ceil(sv.semesterNum / 2) * 100}, ${sv.semesterNum % 2 == 0 ? 'SEMESTER 2' : 'SEMESTER 1'}`) !== null && _b !== void 0 ? _b : 'none';
                        const zd = Object.assign(Object.assign({}, sv), { course: (_c = sv === null || sv === void 0 ? void 0 : sv.course) === null || _c === void 0 ? void 0 : _c.title, code: (_d = sv === null || sv === void 0 ? void 0 : sv.course) === null || _d === void 0 ? void 0 : _d.id, credit: (_e = sv === null || sv === void 0 ? void 0 : sv.course) === null || _e === void 0 ? void 0 : _e.creditHour, practical: (_f = sv === null || sv === void 0 ? void 0 : sv.course) === null || _f === void 0 ? void 0 : _f.practicalHour, theory: (_g = sv === null || sv === void 0 ? void 0 : sv.course) === null || _g === void 0 ? void 0 : _g.theoryHour, type: sv === null || sv === void 0 ? void 0 : sv.type });
                        // Data By Level - Semester
                        if (mdata.has(index)) {
                            mdata.set(index, [...mdata.get(index), Object.assign({}, zd)]);
                        }
                        else {
                            mdata.set(index, [Object.assign({}, zd)]);
                        }
                    }
                    for (const sv of resp === null || resp === void 0 ? void 0 : resp.structmeta) {
                        const index = (_h = `LEVEL ${Math.ceil(sv.semesterNum / 2) * 100}, ${sv.semesterNum % 2 == 0 ? 'SEMESTER 2' : 'SEMESTER 1'}`) !== null && _h !== void 0 ? _h : 'none';
                        const zd = Object.assign({}, sv);
                        // Data By Level - Semester
                        if (sdata.has(index)) {
                            sdata.set(index, [...sdata.get(index), Object.assign({}, zd)]);
                        }
                        else {
                            sdata.set(index, [Object.assign({}, zd)]);
                        }
                    }
                    console.log(Object.fromEntries(sdata));
                    res.status(200).json({ data: Array.from(mdata), meta: Object.fromEntries(sdata) });
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
    fetchProgramStudents(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ais.program.findUnique({
                    where: { id: req.params.id },
                    include: {
                        student: {
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
                            orderBy: { semesterNum: 'asc' }
                        }
                    },
                });
                if ((_a = resp === null || resp === void 0 ? void 0 : resp.student) === null || _a === void 0 ? void 0 : _a.length) {
                    var mdata = new Map();
                    for (const sv of resp === null || resp === void 0 ? void 0 : resp.student) {
                        const index = (_b = `LEVEL ${Math.ceil(sv.semesterNum / 2) * 100}`) !== null && _b !== void 0 ? _b : 'none';
                        const zd = Object.assign({}, sv);
                        // Data By Level - Semester
                        if (mdata.has(index)) {
                            mdata.set(index, [...mdata.get(index), Object.assign({}, zd)]);
                        }
                        else {
                            mdata.set(index, [Object.assign({}, zd)]);
                        }
                    }
                    console.log(Array.from(mdata));
                    res.status(200).json(Array.from(mdata));
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
    fetchProgramStatistics(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ais.program.findUnique({
                    where: {
                        id: req.params.id
                    },
                    include: {
                        department: { select: { title: true } },
                    }
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
    postProgram(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { unitId, schemeId } = req.body;
                delete req.body.schemeId;
                delete req.body.unitId;
                const resp = yield ais.program.create({
                    data: Object.assign(Object.assign(Object.assign({}, req.body), unitId && ({ department: { connect: { id: unitId } } })), schemeId && ({ scheme: { connect: { id: schemeId } } }))
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
    updateProgram(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { unitId, schemeId } = req.body;
                delete req.body.schemeId;
                delete req.body.unitId;
                console.log(req.body);
                const resp = yield ais.program.update({
                    where: { id: req.params.id },
                    data: Object.assign(Object.assign(Object.assign({}, req.body), unitId && ({ department: { connect: { id: unitId } } })), schemeId && ({ scheme: { connect: { id: schemeId } } }))
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
    deleteProgram(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ais.program.delete({
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
    /* Departments */
    fetchDepartments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ais.unit.findMany({
                    where: { status: true, levelNum: 2, type: 'ACADEMIC' },
                    include: {
                        level1: { select: { title: true, code: true } },
                        _count: {
                            select: {
                                staff: true,
                                program: true
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
    /* Faculties */
    fetchFaculties(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ais.unit.findMany({
                    where: { status: true, levelNum: 1, type: 'ACADEMIC' },
                    include: {
                        levelone: { select: { _count: { select: { program: true } } } },
                        _count: {
                            select: {
                                staff: true,
                                levelone: true
                            }
                        },
                    },
                });
                console.log(resp);
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
    /* Units */
    fetchUnits(req, res) {
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
                                { title: { contains: keyword } },
                                { id: { contains: keyword } },
                            ],
                        },
                        include: {
                            level1: { select: { title: true, code: true } }
                        },
                    };
                const resp = yield ais.$transaction([
                    ais.unit.count(Object.assign({}, (searchCondition))),
                    ais.unit.findMany(Object.assign(Object.assign({}, (searchCondition)), { skip: offset, take: Number(pageSize) }))
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
    fetchUnit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ais.unit.findUnique({
                    where: {
                        id: req.params.id
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
    postUnit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ais.unit.create({
                    data: Object.assign({}, req.body),
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
    updateUnit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ais.unit.update({
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
    deleteUnit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ais.unit.delete({
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
    /* Helpers */
    fetchCountries(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ais.country.findMany({
                    where: { status: true },
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
    fetchRegions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ais.region.findMany({
                    where: { status: true },
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
    fetchReligions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ais.religion.findMany({
                    where: { status: true },
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
    fetchDisabilities(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ais.disability.findMany({
                    where: { status: true },
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
    fetchCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ais.category.findMany({
                    where: { status: true },
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
    fetchRelations(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ais.relation.findMany({
                    where: { status: true },
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
    fetchMarital(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ais.marital.findMany({
                    where: { status: true },
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
    fetchTitles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ais.title.findMany({
                    where: { status: true },
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
    fetchVendors(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ais.vendor.findMany({
                    where: { status: true },
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
    fetchCollectors(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ais.collector.findMany();
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
    runData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let resp;
                const subjects = require('../../util/subjects.json');
                // const structure:any = require('../../util/structure.json');
                // const courses:any = require('../../util/courses2.json');
                // const students = require('../../util/students.json');
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
                if (subjects) {
                    res.status(200).json(subjects);
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
    runAccount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let resp = [];
                const students = yield ais.student.findMany();
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
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.default = AisController;

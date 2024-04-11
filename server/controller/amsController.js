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
const helper_1 = require("../util/helper");
const sha1 = require('sha1');
const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwzyx", 8);
const pwdgen = customAlphabet("1234567890abcdefghijklmnopqrstuvwzyx", 6);
const digit = customAlphabet("1234567890", 4);
const sms = require('../config/sms');
const evs = new evsModel_1.default();
const Auth = new authModel_1.default();
const ams = new ums_1.PrismaClient();
const SENDERID = process.env.UMS_SENDERID;
const DOMAIN = process.env.UMS_DOMAIN;
class AmsController {
    /* Session */
    fetchSessionList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ams.admission.findMany({ where: { status: true }, orderBy: { createdAt: 'asc' } });
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
    fetchSessions(req, res) {
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
                                { session: { title: { contains: keyword } } },
                            ],
                        }
                    };
                const resp = yield ams.$transaction([
                    ams.admission.count(Object.assign({}, (searchCondition))),
                    ams.admission.findMany(Object.assign(Object.assign({}, (searchCondition)), { skip: offset, take: Number(pageSize), include: {
                            _count: { select: { voucher: true, sortedApplicant: true, fresher: true } }
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
    fetchSession(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ams.admission.findUnique({
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
    ActivateSession(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ups = yield ams.admission.updateMany({
                    where: { id: { not: req.params.id } },
                    data: { default: false },
                });
                const resp = yield ams.admission.update({
                    where: { id: req.params.id },
                    data: { default: true },
                });
                if (ups && resp) {
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
    postSession(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { pgletterId, ugletterId, dpletterId, cpletterId, sessionId } = req.body;
                delete req.body.pgletterId;
                delete req.body.ugletterId;
                delete req.body.dpletterId;
                delete req.body.cpletterId;
                delete req.body.sessionId;
                const resp = yield ams.admission.create({
                    data: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, req.body), pgletterId && ({ pgletter: { connect: { id: pgletterId } } })), ugletterId && ({ ugletter: { connect: { id: ugletterId } } })), dpletterId && ({ dpletter: { connect: { id: dpletterId } } })), cpletterId && ({ cpletter: { connect: { id: cpletterId } } })), sessionId && ({ session: { connect: { id: sessionId } } })),
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
    updateSession(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { pgletterId, ugletterId, dpletterId, cpletterId, sessionId } = req.body;
                delete req.body.pgletterId;
                delete req.body.ugletterId;
                delete req.body.dpletterId;
                delete req.body.cpletterId;
                delete req.body.sessionId;
                const resp = yield ams.admission.update({
                    where: {
                        id: req.params.id
                    },
                    data: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, req.body), pgletterId && ({ pgletter: { connect: { id: pgletterId } } })), ugletterId && ({ ugletter: { connect: { id: ugletterId } } })), dpletterId && ({ dpletter: { connect: { id: dpletterId } } })), cpletterId && ({ cpletter: { connect: { id: cpletterId } } })), sessionId && ({ session: { connect: { id: sessionId } } })),
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
    deleteSession(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ams.admission.delete({
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
    /* Vouchers */
    fetchVoucherList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ams.voucher.findMany({ where: { status: true }, orderBy: { createdAt: 'asc' } });
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
    fetchVouchers(req, res) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const { page = 1, pageSize = 9, keyword = '' } = req.query;
            const offset = (page - 1) * pageSize;
            let searchCondition = {};
            try {
                if (keyword)
                    searchCondition = {
                        where: {
                            admission: { default: true },
                            OR: [
                                { category: { title: { contains: keyword } } },
                                { pin: { contains: keyword } },
                                { applicantName: { contains: keyword } },
                                { applicantPhone: { contains: keyword } },
                                { serial: { contains: keyword } },
                                { sellType: keyword == 'general' ? 0 : keyword == 'matured' ? 1 : keyword == 'international' ? 2 : null },
                            ],
                        }
                    };
                const resp = yield ams.$transaction([
                    ams.voucher.count(Object.assign({}, (searchCondition))),
                    ams.voucher.findMany(Object.assign(Object.assign({}, (searchCondition)), { skip: offset, take: Number(pageSize), include: {
                            vendor: true,
                            admission: true,
                            category: true
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
    fetchVoucher(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ams.voucher.findUnique({
                    where: {
                        serial: req.params.id
                    },
                    include: {
                        vendor: true,
                        admission: true,
                        category: true
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
    sellVoucher(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { applicantPhone, applicantName } = req.body;
                const resp = yield ams.voucher.update({
                    where: { serial: req.params.id },
                    data: { soldAt: new Date(), applicantName, applicantPhone },
                });
                if (resp) {
                    const msg = `Hi, Your Serial: ${resp.serial}, Pin: ${resp.pin}, Goto the Unified Portal to apply. Thank you.`;
                    const sent = yield sms(resp.applicantPhone, msg, SENDERID);
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
    recoverVoucher(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ams.voucher.findUnique({
                    where: { serial: req.params.id },
                });
                if (resp) {
                    const msg = `Hi, Your Serial: ${resp.serial}, Pin: ${resp.pin}, Goto the Unified Portal to apply. Thank you.`;
                    const sent = yield sms(resp.applicantPhone, msg, SENDERID);
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
    postVoucher(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const admission = yield ams.admission.findFirst({ where: { default: true } });
                const voucher = yield ams.voucher.findFirst({ where: { admission: { default: true } }, orderBy: { 'createdAt': 'desc' } });
                const { vendorId, categoryId, sellType, quantity } = req.body;
                const lastIndex = voucher ? Number(voucher.serial) : admission === null || admission === void 0 ? void 0 : admission.voucherIndex;
                const admissionId = admission === null || admission === void 0 ? void 0 : admission.id;
                const data = [];
                let count = 0;
                if (quantity > 0) {
                    for (var i = 1; i <= quantity; i++) {
                        let dt = Object.assign(Object.assign(Object.assign({ serial: lastIndex + i, pin: nanoid(), sellType }, vendorId && ({ vendor: { connect: { id: vendorId } } })), categoryId && ({ category: { connect: { id: categoryId } } })), admissionId && ({ admission: { connect: { id: admissionId } } }));
                        data.push(dt);
                        const resp = yield ams.voucher.create({ data: dt });
                        if (resp)
                            count += 1;
                    }
                }
                // const resp = await ams.voucher.createMany({ data })
                if (count) {
                    res.status(200).json(count);
                }
                else {
                    res.status(204).json({ message: `no records found` });
                }
                // if(resp){
                //    res.status(200).json(resp)
                // } else {
                //    res.status(204).json({ message: `no records found` })
                // }
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ message: error.message });
            }
        });
    }
    updateVoucher(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                delete req.body.action;
                delete req.body.id;
                const resp = yield ams.voucher.update({
                    where: { serial: req.params.id },
                    data: Object.assign({}, req.body),
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
    deleteVoucher(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ams.voucher.updateMany({
                    where: { serial: req.params.id },
                    data: {
                        soldAt: null,
                        applicantName: null,
                        applicantPhone: null
                    }
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
    /* Letters */
    fetchLetterList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ams.admissionLetter.findMany({ where: { status: true }, orderBy: { createdAt: 'asc' } });
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
    fetchLetters(req, res) {
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
                                { category: { title: { contains: keyword } } },
                            ],
                        }
                    };
                const resp = yield ams.$transaction([
                    ams.admissionLetter.count(Object.assign({}, (searchCondition))),
                    ams.admissionLetter.findMany(Object.assign(Object.assign({}, (searchCondition)), { skip: offset, take: Number(pageSize), include: {
                            category: true
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
    fetchLetter(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ams.admissionLetter.findUnique({
                    where: { id: req.params.id },
                    include: { category: true }
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
    postLetter(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { categoryId } = req.body;
                delete req.body.categoryId;
                const resp = yield ams.admissionLetter.create({
                    data: Object.assign(Object.assign({}, req.body), categoryId && ({ category: { connect: { id: categoryId } } })),
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
    updateLetter(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { categoryId } = req.body;
                delete req.body.categoryId;
                const resp = yield ams.admissionLetter.update({
                    where: { id: req.params.id },
                    data: Object.assign(Object.assign({}, req.body), categoryId && ({ category: { connect: { id: categoryId } } })),
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
    deleteLetter(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ams.admissionLetter.delete({
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
    /* Applicants */
    fetchApplicantList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ams.applicant.findMany({ where: { status: true }, orderBy: { createdAt: 'asc' } });
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
    fetchApplicants(req, res) {
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
                                { stage: { title: { contains: keyword } } },
                                { applyType: { title: { contains: keyword } } },
                            ],
                        }
                    };
                const resp = yield ams.$transaction([
                    ams.applicant.count(Object.assign({}, (searchCondition))),
                    ams.applicant.findMany(Object.assign(Object.assign({}, (searchCondition)), { skip: offset, take: Number(pageSize), include: {
                            stage: { include: { category: true } },
                            applyType: true,
                            profile: true,
                            choice: { include: { program: true } },
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
    fetchApplicant(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ams.applicant.findUnique({
                    where: { serial: req.params.id },
                    include: { stage: true, applyType: true, choice: { include: { program: true } }, profile: { include: { title: true, region: true, country: true, religion: true, disability: true, marital: true } } }
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
    fetchApplicantPreview(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Fetch Applicant Form Meta
                const applicant = yield ams.applicant.findUnique({ where: { serial: req.params.id } });
                const meta = applicant === null || applicant === void 0 ? void 0 : applicant.meta;
                const output = new Map();
                // Locate entities and Fetch Data
                if (meta === null || meta === void 0 ? void 0 : meta.length) {
                    for (const row of meta) {
                        if (row.tag == 'profile') {
                            const res = yield ams.stepProfile.findUnique({ where: { serial: req.params.id }, include: { title: true, disability: true, religion: true, region: true, country: true, nationality: true, marital: true } });
                            if (res)
                                output.set('profile', res);
                        }
                        if (row.tag == 'guardian') {
                            const res = yield ams.stepGuardian.findUnique({ where: { serial: req.params.id }, include: { title: true, relation: true } });
                            if (res)
                                output.set('guardian', res);
                        }
                        if (row.tag == 'education') {
                            const res = yield ams.stepEducation.findMany({ where: { serial: req.params.id }, include: { instituteCategory: true, certCategory: true } });
                            if (res === null || res === void 0 ? void 0 : res.length)
                                output.set('education', res);
                        }
                        if (row.tag == 'result') {
                            const res = yield ams.stepResult.findMany({ where: { serial: req.params.id }, include: { certCategory: true, grades: { select: { gradeWeight: true, subject: { select: { title: true } } } } } });
                            if (res === null || res === void 0 ? void 0 : res.length)
                                output.set('result', res);
                        }
                        if (row.tag == 'choice') {
                            const res = yield ams.stepChoice.findMany({ where: { serial: req.params.id }, include: { program: true, major: true } });
                            if (res === null || res === void 0 ? void 0 : res.length)
                                output.set('choice', res);
                        }
                        if (row.tag == 'document') {
                            const res = yield ams.stepDocument.findMany({ where: { serial: req.params.id }, include: { documentCategory: true } });
                            if (res === null || res === void 0 ? void 0 : res.length)
                                output.set('document', res);
                        }
                        if (row.tag == 'employment') {
                            const res = yield ams.stepEmployment.findMany({ where: { serial: req.params.id } });
                            if (res === null || res === void 0 ? void 0 : res.length)
                                output.set('employment', res);
                        }
                        if (row.tag == 'referee') {
                            const res = yield ams.stepReferee.findMany({ where: { serial: req.params.id }, include: { title: true } });
                            if (res === null || res === void 0 ? void 0 : res.length)
                                output.set('referee', res);
                        }
                    }
                    // Construct Output
                    res.status(200).json(Object.fromEntries(output));
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
    postApplicant(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { applyTypeId, stageId, choiceId } = req.body;
                delete req.body.stageId;
                delete req.body.applyTypeId;
                delete req.body.choiceId;
                const resp = yield ams.applicant.create({
                    data: Object.assign(Object.assign(Object.assign(Object.assign({}, req.body), stageId && ({ stage: { connect: { id: stageId } } })), applyTypeId && ({ applyType: { connect: { id: applyTypeId } } })), choiceId && ({ choice: { connect: { id: choiceId } } })),
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
    updateApplicant(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { applyTypeId, stageId, choiceId } = req.body;
                delete req.body.stageId;
                delete req.body.applyTypeId;
                delete req.body.choiceId;
                const resp = yield ams.applicant.update({
                    where: { serial: req.params.id },
                    data: Object.assign(Object.assign(Object.assign(Object.assign({}, req.body), stageId && ({ stage: { connect: { id: stageId } } })), applyTypeId && ({ applyType: { connect: { id: applyTypeId } } })), choiceId && ({ choice: { connect: { id: choiceId } } })),
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
    deleteApplicant(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ams.applicant.delete({
                    where: { serial: req.params.id }
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
    /* Shortlist */
    fetchShortlists(req, res) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const { page = 1, pageSize = 9, keyword = '' } = req.query;
            const offset = (page - 1) * pageSize;
            let searchCondition = {};
            try {
                if (keyword)
                    searchCondition = {
                        where: {
                            admission: { default: true },
                            OR: [
                                { serial: { contains: keyword } },
                                { choice1: { program: { longName: { contains: keyword } } } },
                                { choice2: { program: { longName: { contains: keyword } } } },
                            ],
                        }
                    };
                const resp = yield ams.$transaction([
                    ams.sortedApplicant.count(Object.assign({}, (searchCondition))),
                    ams.sortedApplicant.findMany(Object.assign(Object.assign({}, (searchCondition)), { skip: offset, take: Number(pageSize), include: {
                            admission: true, choice1: { include: { program: true } }, choice2: { include: { program: true } }, profile: true, stage: true, applyType: true, category: true
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
    fetchShortlist(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ams.sortedApplicant.findUnique({
                    where: { serial: req.params.id },
                    include: {
                        admission: true, choice1: { include: { program: true } }, choice2: { include: { program: true } }, profile: true, stage: true, applyType: true, category: true
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
    postShortlist(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { serial } = req.body;
                const sorted = yield ams.sortedApplicant.findFirst({ where: { serial } });
                if (sorted)
                    throw ("Applicant already shortlisted!");
                const voucher = yield ams.voucher.findFirst({ where: { serial } });
                const admission = yield ams.admission.findFirst({ where: { default: true } });
                const applicant = yield ams.applicant.findFirst({ where: { serial }, include: { stage: true } });
                const choice = yield ams.stepChoice.findFirst({ where: { serial, id: { not: applicant === null || applicant === void 0 ? void 0 : applicant.choiceId } } });
                //const education:any = await ams.stepEducation.findFirst({ where:{ serial  }})
                const { stageId, applyTypeId, classValue, gradeValue, stage: { categoryId }, choiceId: choice1Id } = applicant !== null && applicant !== void 0 ? applicant : null;
                const { id: admissionId } = admission !== null && admission !== void 0 ? admission : null;
                const { sellType } = voucher !== null && voucher !== void 0 ? voucher : null;
                const dt = { serial, sellType, classValue, gradeValue, admitted: false };
                const resp = yield ams.sortedApplicant.create({
                    data: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, dt), admissionId && ({ admission: { connect: { id: admissionId } } })), stageId && ({ stage: { connect: { id: stageId } } })), applyTypeId && ({ applyType: { connect: { id: applyTypeId } } })), choice1Id && ({ choice1: { connect: { id: choice1Id } } })), choice && ({ choice2: { connect: { id: choice === null || choice === void 0 ? void 0 : choice.id } } })), categoryId && ({ category: { connect: { id: categoryId } } })), serial && ({ profile: { connect: { serial } } })),
                });
                const ups = yield ams.applicant.update({
                    where: { serial },
                    data: { sorted: true }
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
                return res.status(500).json({ message: error });
            }
        });
    }
    updateShortlist(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { admissionId, stageId, applyTypeId, categoryId, choice1Id, choice2Id } = req.body;
                delete req.body.admissionId;
                delete req.body.stageId;
                delete req.body.applyTypeId;
                delete req.body.choice1Id;
                delete req.body.choice2Id;
                delete req.body.categoryId;
                const resp = yield ams.sortedApplicant.update({
                    where: { serial: req.params.id },
                    data: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, req.body), admissionId && ({ admission: { connect: { id: admissionId } } })), stageId && ({ stage: { connect: { id: stageId } } })), applyTypeId && ({ applyType: { connect: { id: applyTypeId } } })), choice1Id && ({ choice1: { connect: { id: choice1Id } } })), choice2Id && ({ choice2: { connect: { id: choice2Id } } })), categoryId && ({ category: { connect: { id: categoryId } } })),
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
    deleteShortlist(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ams.sortedApplicant.delete({
                    where: { serial: req.params.id }
                });
                if (resp) {
                    const ups = yield ams.applicant.update({
                        where: { serial: req.params.id },
                        data: { sorted: false }
                    });
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
    /* Matriculants */
    fetchMatriculantList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ams.fresher.findMany({ where: { admission: { default: true } }, orderBy: { createdAt: 'asc' } });
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
    fetchMatriculants(req, res) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const { page = 1, pageSize = 9, keyword = '' } = req.query;
            const offset = (page - 1) * pageSize;
            let searchCondition = {};
            try {
                if (keyword)
                    searchCondition = {
                        where: {
                            admission: { default: true },
                            OR: [
                                { serial: { contains: keyword } },
                                { sessionMode: { contains: keyword } },
                                { program: { title: { contains: keyword } } },
                                { category: { title: { contains: keyword } } },
                            ],
                        }
                    };
                const resp = yield ams.$transaction([
                    ams.fresher.count(Object.assign({}, (searchCondition))),
                    ams.fresher.findMany(Object.assign(Object.assign({}, (searchCondition)), { skip: offset, take: Number(pageSize), include: {
                            admission: true, program: true, major: true, category: true, student: true
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
    fetchMatriculant(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ams.fresher.findUnique({
                    where: { serial: req.params.id },
                    include: {
                        admission: { include: { sortedApplicant: { include: { applyType: true } } } }, student: true, program: true, bill: { include: { bankacc: true } }, session: true, major: true, category: { include: { admissionLetter: true } }
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
    postMatriculant(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { serial, programId, semesterNum, sessionMode } = req.body;
                const semcode = (0, helper_1.getBillCodePrisma)(Number(semesterNum));
                const sorted = yield ams.sortedApplicant.findFirst({ where: { serial }, include: { profile: true, admission: { include: { session: true } } } });
                const { sellType, admission: { id: admissionId, session: { id: sessionId } }, categoryId, profile: { titleId, countryId, regionId, religionId, disabilityId, maritalId, fname, lname, mname, gender, dob, hometown, phone, email, residentAddress } } = sorted !== null && sorted !== void 0 ? sorted : null;
                const bill = yield ams.bill.findFirst({ where: { programId, sessionId, type: countryId == '96b0a1d5-7899-4b9a-bcbe-7a72eee6572c' ? 'GH' : 'INT', OR: semcode } });
                const guardian = yield ams.stepGuardian.findFirst({ where: { serial } });
                // Check email 
                const emailUser = `${fname.trim().toLowerCase()}.${lname.trim().toLowerCase()}`;
                const fetchEmail = yield ams.student.findMany({ where: { instituteEmail: { contains: emailUser } } });
                // Data for Population
                const instituteEmail = `${fname}.${lname}${fetchEmail.length ? fetchEmail.length + 1 : ''}@${DOMAIN}`;
                const username = serial; /* const username = instituteEmail; // AUCC */
                const password = pwdgen();
                const studentData = { id: serial, fname, mname, lname, gender, dob, semesterNum, hometown, phone, email, address: residentAddress, instituteEmail, guardianName: `${guardian === null || guardian === void 0 ? void 0 : guardian.fname} ${(guardian === null || guardian === void 0 ? void 0 : guardian.mname) && (guardian === null || guardian === void 0 ? void 0 : guardian.mname) + ' '}${guardian === null || guardian === void 0 ? void 0 : guardian.lname}`, guardianPhone: guardian === null || guardian === void 0 ? void 0 : guardian.phone };
                const fresherData = { sellType, semesterNum, sessionMode, username, password };
                // const ssoData = { tag:serial, username:instituteEmail, password:sha1(), } // AUCC 
                const ssoData = { tag: serial, username, password: sha1(password) }; // Others
                // Populate Student Information
                const student = yield ams.student.create({
                    data: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, studentData), programId && ({ program: { connect: { id: programId } } })), titleId && ({ title: { connect: { id: titleId } } })), countryId && ({ country: { connect: { id: countryId } } })), regionId && ({ region: { connect: { id: regionId } } })), religionId && ({ religion: { connect: { id: religionId } } })), maritalId && ({ marital: { connect: { id: maritalId } } })), disabilityId && ({ disability: { connect: { id: disabilityId } } }))
                });
                // Populate Fresher Information
                const resp = yield ams.fresher.create({
                    data: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, fresherData), admissionId && ({ admission: { connect: { id: admissionId } } })), programId && ({ program: { connect: { id: programId } } })), bill && ({ bill: { connect: { id: bill === null || bill === void 0 ? void 0 : bill.id } } })), sessionId && ({ session: { connect: { id: sessionId } } })), categoryId && ({ category: { connect: { id: categoryId } } })), serial && ({ student: { connect: { serial } } })), student && ({ student: { connect: { id: student === null || student === void 0 ? void 0 : student.id } } })),
                });
                // Populate SSO Account
                const sso = yield ams.user.create({
                    data: Object.assign(Object.assign({}, ssoData), { group: { connect: { id: 1 } } }),
                });
                // Update Applicant Status 
                const ups = yield ams.sortedApplicant.update({
                    where: { serial },
                    data: { admitted: true },
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
    updateMatriculant(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { admissionId, sessionId, billId, categoryId, programId, majorId, } = req.body;
                delete req.body.admissionId;
                delete req.body.sessionId;
                delete req.body.billId;
                delete req.body.programId;
                delete req.body.majorId;
                delete req.body.categoryId;
                const resp = yield ams.sortedApplicant.update({
                    where: { serial: req.params.id },
                    data: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, req.body), admissionId && ({ admission: { connect: { id: admissionId } } })), sessionId && ({ session: { connect: { id: sessionId } } })), billId && ({ bill: { connect: { id: billId } } })), categoryId && ({ category: { connect: { id: categoryId } } })), programId && ({ program: { connect: { id: programId } } })), majorId && ({ major: { connect: { id: majorId } } })),
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
    deleteMatriculant(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const serial = req.params.id;
                // Remove Matriculant Data
                const resp = yield ams.fresher.delete({
                    where: { serial }
                });
                // Remove Student Data
                const student = yield ams.student.delete({
                    where: { id: serial }
                });
                // Remove SSO Account
                const sso = yield ams.user.deleteMany({
                    where: { tag: serial }
                });
                // Update Applicant Status 
                const ups = yield ams.sortedApplicant.update({
                    where: { serial },
                    data: { admitted: false },
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
    fetchSubjectList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ams.subject.findMany({
                    where: { status: true },
                    orderBy: { createdAt: 'asc' }
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
    fetchInstituteList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ams.instituteCategory.findMany({
                    where: { status: true },
                    orderBy: { createdAt: 'asc' }
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
    fetchCertList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ams.certCategory.findMany({
                    where: { status: true },
                    orderBy: { createdAt: 'asc' }
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
    fetchWeightList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ams.gradeWeight.findMany({
                    where: { status: true },
                    orderBy: { createdAt: 'asc' }
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
    fetchStageList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ams.stage.findMany({
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
    fetchApplytypeList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ams.applyType.findMany({
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
    fetchAmsPriceList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ams.amsPrice.findMany({
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
    fetchAmsDocList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ams.documentCategory.findMany({
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
    /* Step Applicant - Configuration */
    fetchStepApplicant(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ams.applicant.findUnique({
                    where: { serial: req.params.id },
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
    saveStepApplicant(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { serial, stageId, applyTypeId, categoryId } = req.body;
                delete req.body.stageId;
                delete req.body.serial;
                delete req.body.applyTypeId;
                delete req.body.categoryId;
                // Application Form Schema for Chosen Category
                const form = yield ams.amsForm.findFirst({ where: { categoryId } });
                if (form)
                    req.body.meta = form === null || form === void 0 ? void 0 : form.meta;
                const resp = yield ams.applicant.upsert({
                    where: { serial },
                    create: Object.assign(Object.assign(Object.assign(Object.assign({}, req.body), { serial }), stageId && ({ stage: { connect: { id: stageId } } })), applyTypeId && ({ applyType: { connect: { id: applyTypeId } } })),
                    update: Object.assign(Object.assign(Object.assign({}, req.body), stageId && ({ stage: { connect: { id: stageId } } })), applyTypeId && ({ applyType: { connect: { id: applyTypeId } } }))
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
    /* Step Profile */
    fetchStepProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ams.stepProfile.findUnique({
                    where: { serial: req.params.id },
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
    saveStepProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { serial, titleId, regionId, religionId, countryId, nationalityId, maritalId, disabilityId } = req.body;
                delete req.body.titleId;
                delete req.body.regionId;
                delete req.body.religionId;
                delete req.body.countryId;
                delete req.body.nationalityId;
                delete req.body.maritalId;
                delete req.body.disabilityId;
                delete req.body.serial;
                delete req.body.id;
                const resp = yield ams.stepProfile.upsert({
                    where: { serial },
                    create: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ serial }, req.body), titleId && ({ title: { connect: { id: titleId } } })), regionId && ({ region: { connect: { id: regionId } } })), religionId && ({ religion: { connect: { id: religionId } } })), countryId && ({ country: { connect: { id: countryId } } })), nationalityId && ({ nationality: { connect: { id: nationalityId } } })), maritalId && ({ marital: { connect: { id: maritalId } } })), disabilityId && ({ marital: { connect: { id: disabilityId } } })),
                    update: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, req.body), titleId && ({ title: { connect: { id: titleId } } })), regionId && ({ region: { connect: { id: regionId } } })), religionId && ({ religion: { connect: { id: religionId } } })), countryId && ({ country: { connect: { id: countryId } } })), nationalityId && ({ nationality: { connect: { id: nationalityId } } })), maritalId && ({ marital: { connect: { id: maritalId } } })), disabilityId && ({ marital: { connect: { id: disabilityId } } }))
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
    /* Step Guardian */
    fetchStepGuardian(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ams.stepGuardian.findUnique({
                    where: { serial: req.params.id },
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
    saveStepGuardian(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { serial, titleId, relationId } = req.body;
                delete req.body.titleId;
                delete req.body.serial;
                delete req.body.relationId;
                ;
                const resp = yield ams.stepGuardian.upsert({
                    where: { serial },
                    create: Object.assign(Object.assign(Object.assign(Object.assign({}, req.body), { serial }), titleId && ({ title: { connect: { id: titleId } } })), relationId && ({ relation: { connect: { id: relationId } } })),
                    update: Object.assign(Object.assign(Object.assign({}, req.body), titleId && ({ title: { connect: { id: titleId } } })), relationId && ({ relation: { connect: { id: relationId } } }))
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
    /* Step Education */
    fetchStepEducation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ams.stepEducation.findMany({
                    where: { serial: req.params.id },
                });
                if (resp === null || resp === void 0 ? void 0 : resp.length) {
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
    saveStepEducation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                yield ams.stepEducation.deleteMany({ where: { serial: req.body[0].serial } });
                const resp = yield Promise.all(data === null || data === void 0 ? void 0 : data.map((row) => __awaiter(this, void 0, void 0, function* () {
                    const { id, instituteCategoryId, certCategoryId } = row;
                    row === null || row === void 0 ? true : delete row.instituteCategoryId;
                    row === null || row === void 0 ? true : delete row.id;
                    row === null || row === void 0 ? true : delete row.certCategoryId;
                    return yield ams.stepEducation.upsert({
                        where: { id: (id || '') },
                        create: Object.assign(Object.assign(Object.assign({}, row), instituteCategoryId && ({ instituteCategory: { connect: { id: instituteCategoryId } } })), certCategoryId && ({ certCategory: { connect: { id: certCategoryId } } })),
                        update: Object.assign(Object.assign(Object.assign({}, row), instituteCategoryId && ({ instituteCategory: { connect: { id: instituteCategoryId } } })), certCategoryId && ({ certCategory: { connect: { id: certCategoryId } } }))
                    });
                })));
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
    /* Step Result */
    fetchStepResult(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ams.stepResult.findMany({
                    where: { serial: req.params.id },
                    include: { grades: true }
                });
                if (resp === null || resp === void 0 ? void 0 : resp.length) {
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
    saveStepResult(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                console.log(data);
                yield ams.stepResult.deleteMany({ where: { serial: req.body[0].serial } });
                yield ams.stepGrade.deleteMany({ where: { serial: req.body[0].serial } });
                // Results 
                const resp = yield Promise.all(data === null || data === void 0 ? void 0 : data.map((row) => __awaiter(this, void 0, void 0, function* () {
                    const { id, certCategoryId } = row;
                    row === null || row === void 0 ? true : delete row.id;
                    row === null || row === void 0 ? true : delete row.certCategoryId;
                    // Grades
                    const newGrades = row.grades.map((item) => {
                        const { resultId, gradeWeightId, subjectId } = item;
                        item === null || item === void 0 ? true : delete item.resultId;
                        item === null || item === void 0 ? true : delete item.gradeWeightId;
                        item === null || item === void 0 ? true : delete item.subjectId;
                        return (Object.assign(Object.assign(Object.assign(Object.assign({}, item), resultId && ({ result: { connect: { id: resultId } } })), gradeWeightId && ({ gradeWeight: { connect: { id: gradeWeightId } } })), subjectId && ({ subject: { connect: { id: subjectId } } })));
                    });
                    return yield ams.stepResult.upsert({
                        where: { id: (id || '') },
                        create: Object.assign(Object.assign(Object.assign({}, row), certCategoryId && ({ certCategory: { connect: { id: certCategoryId } } })), { grades: { create: newGrades } }),
                        update: Object.assign(Object.assign(Object.assign({}, row), certCategoryId && ({ certCategory: { connect: { id: certCategoryId } } })), { grades: { create: newGrades } })
                    });
                })));
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
    /* Step Employment */
    fetchStepEmployment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ams.stepEmployment.findMany({
                    where: { serial: req.params.id },
                });
                if (resp === null || resp === void 0 ? void 0 : resp.length) {
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
    saveStepEmployment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const resp = yield ams.stepEmployment.upsert(data === null || data === void 0 ? void 0 : data.map((row) => {
                    const { id } = row;
                    return ({
                        where: { id: (id || null) },
                        create: row,
                        update: row
                    });
                }));
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
    /* Step Document */
    fetchStepDocument(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ams.stepDocument.findMany({
                    where: { serial: req.params.id },
                });
                if (resp === null || resp === void 0 ? void 0 : resp.length) {
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
    saveStepDocument(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                yield ams.stepDocument.deleteMany({ where: { serial: req.body[0].serial } });
                const resp = yield Promise.all(data === null || data === void 0 ? void 0 : data.map((row) => __awaiter(this, void 0, void 0, function* () {
                    const { id, documentCategoryId } = row;
                    row === null || row === void 0 ? true : delete row.documentCategoryId;
                    row === null || row === void 0 ? true : delete row.id;
                    return yield ams.stepDocument.upsert({
                        where: { id: (id || '') },
                        create: Object.assign(Object.assign({}, row), documentCategoryId && ({ documentCategory: { connect: { id: documentCategoryId } } })),
                        update: Object.assign(Object.assign({}, row), documentCategoryId && ({ documentCategory: { connect: { id: documentCategoryId } } }))
                    });
                })));
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
    /* Step Choice */
    fetchStepChoice(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ams.stepChoice.findMany({
                    where: { serial: req.params.id },
                });
                if (resp === null || resp === void 0 ? void 0 : resp.length) {
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
    saveStepChoice(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                yield ams.stepChoice.deleteMany({ where: { serial: req.body[0].serial } });
                const resp = yield Promise.all(data === null || data === void 0 ? void 0 : data.map((row) => __awaiter(this, void 0, void 0, function* () {
                    const { id, programId, majorId } = row;
                    row === null || row === void 0 ? true : delete row.programId;
                    row === null || row === void 0 ? true : delete row.programId;
                    row === null || row === void 0 ? true : delete row.id;
                    return yield ams.stepChoice.upsert({
                        where: { id: (id || '') },
                        create: Object.assign(Object.assign(Object.assign({}, row), programId && ({ program: { connect: { id: programId } } })), majorId && ({ major: { connect: { id: majorId } } })),
                        update: Object.assign(Object.assign(Object.assign({}, row), programId && ({ program: { connect: { id: programId } } })), majorId && ({ major: { connect: { id: majorId } } }))
                    });
                })));
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
    /* Step Referee */
    fetchStepReferee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield ams.stepReferee.findMany({
                    where: { serial: req.params.id },
                });
                if (resp === null || resp === void 0 ? void 0 : resp.length) {
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
    saveStepReferee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const resp = yield ams.stepReferee.upsert(data === null || data === void 0 ? void 0 : data.map((row) => {
                    const { id, titleId } = row;
                    row === null || row === void 0 ? true : delete row.titleId;
                    row === null || row === void 0 ? true : delete row.id;
                    return ({
                        where: { id: (id || null) },
                        create: Object.assign(Object.assign({}, row), titleId && ({ title: { connect: { id: titleId } } })),
                        update: Object.assign(Object.assign({}, row), titleId && ({ title: { connect: { id: titleId } } }))
                    });
                }));
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
    /* Step Review */
    saveStepReview(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { serial, choiceId } = req.body;
                (_a = req.body) === null || _a === void 0 ? true : delete _a.choiceId;
                console.log(req.body);
                const resp = yield ams.applicant.update({
                    where: { serial },
                    data: Object.assign(Object.assign({}, req.body), choiceId && ({ choice: { connect: { id: choiceId } } })),
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
}
exports.default = AmsController;

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
const evsModel_1 = __importDefault(require("../model/evsModel"));
const ums_1 = require("../prisma/client/ums");
const helper_1 = require("../util/helper");
const sms = require('../config/sms');
const evs = new evsModel_1.default();
const Auth = new authModel_1.default();
const fms = new ums_1.PrismaClient();
const SENDERID = process.env.UMS_SENDERID;
const DOMAIN = process.env.UMS_DOMAIN;
class FmsController {
    /* Bills */
    fetchBillList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield fms.bill.findMany({
                    where: { status: true },
                    include: { session: true, program: true, bankacc: true },
                    orderBy: { createdAt: 'desc' }
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
    fetchBills(req, res) {
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
                                { narrative: { contains: keyword } },
                                { session: { title: { contains: keyword } } },
                                { program: { shortName: { contains: keyword } } },
                            ],
                        }
                    };
                const resp = yield fms.$transaction([
                    fms.bill.count(Object.assign({}, (searchCondition))),
                    fms.bill.findMany(Object.assign(Object.assign({}, (searchCondition)), { include: { session: true, program: true, bankacc: true }, skip: offset, take: Number(pageSize), orderBy: { createdAt: 'desc' } }))
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
    fetchBill(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield fms.bill.findUnique({
                    where: { id: req.params.id },
                    include: { session: true, program: true, bankacc: true },
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
    includeBill(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { tag, action } = req.body;
                let resp;
                const bs = yield fms.bill.findUnique({ where: { id: req.params.id } });
                if (action == 'create') {
                    const stdata = { studentId: tag, sessionId: bs === null || bs === void 0 ? void 0 : bs.sessionId, billId: bs === null || bs === void 0 ? void 0 : bs.id, type: 'BILL', narrative: bs === null || bs === void 0 ? void 0 : bs.narrative, currency: bs === null || bs === void 0 ? void 0 : bs.currency, amount: bs === null || bs === void 0 ? void 0 : bs.amount };
                    // Save into Student Account
                    const st = yield fms.studentAccount.findFirst({ where: { studentId: tag, billId: bs === null || bs === void 0 ? void 0 : bs.id } });
                    if (st)
                        yield fms.studentAccount.updateMany({ where: { studentId: tag, billId: bs === null || bs === void 0 ? void 0 : bs.id }, data: stdata });
                    else
                        yield fms.studentAccount.create({ data: stdata });
                    // Update Bill IncludeStudentIds Records
                    const includeStudentIds = (bs === null || bs === void 0 ? void 0 : bs.includeStudentIds) ? [tag, ...bs === null || bs === void 0 ? void 0 : bs.includeStudentIds] : [tag];
                    resp = yield fms.bill.update({ where: { id: req.params.id }, data: { includeStudentIds } });
                }
                else {
                    // Delete Bill from Student Account
                    yield fms.studentAccount.deleteMany({ where: { studentId: tag, billId: bs === null || bs === void 0 ? void 0 : bs.id } });
                    // Update Bill IncludeStudentIds Records
                    const includeStudentIds = (_a = bs === null || bs === void 0 ? void 0 : bs.includeStudentIds) === null || _a === void 0 ? void 0 : _a.filter((r) => r != tag);
                    resp = yield fms.bill.update({ where: { id: req.params.id }, data: { includeStudentIds } });
                }
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
    excludeBill(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { tag, action } = req.body;
                let resp;
                if (action == 'create')
                    resp = yield fms.bill.update({
                        where: { id: req.params.id },
                        data: { excludeStudentIds: { jsonb_set: { path: '$', value: { tag }, append: true } } }
                    });
                else
                    resp = yield fms.bill.update({
                        where: { id: req.params.id, excludeStudentIds: { path: '$', array_contains: tag } },
                        data: {
                            excludeStudentIds: { jsonb_remove: { path: '$' } }
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
    billReceivers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield fms.studentAccount.findMany({
                    where: {
                        billId: req.params.id
                    },
                    include: { student: true }
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
    billActivity(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield fms.activityBill.findMany({
                    where: { billId: req.params.id }
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
    activateBill(req, res) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bs = yield fms.bill.findUnique({ where: { id: req.params.id }, include: { session: true } });
                if (bs) {
                    let students = [];
                    // Locate Students that Bill should Apply
                    const semesters = yield (0, helper_1.getSemesterFromCode)((_a = bs.session) === null || _a === void 0 ? void 0 : _a.semester, bs.mainGroupCode);
                    console.log(semesters);
                    const st = (bs === null || bs === void 0 ? void 0 : bs.tag) == 'sub'
                        ? yield fms.$queryRaw `select id from ais_student where programId = ${bs === null || bs === void 0 ? void 0 : bs.programId} and ((date_format(entryDate,'%m') = '01' and semesterNum <= 2) or (date_format(entryDate,'%m') = '01' and semesterNum <= 4 and entrySemesterNum in (3))) and entryGroup = ${bs === null || bs === void 0 ? void 0 : bs.type} and semesterNum in (${semesters}) and deferStatus = 0 and completeStatus = 0`
                        : yield fms.$queryRaw `select id from ais_student where programId = ${bs === null || bs === void 0 ? void 0 : bs.programId} and ((date_format(entryDate,'%m') = '01' and semesterNum > 2) or (date_format(entryDate,'%m') = '01' and semesterNum <= 4 and entrySemesterNum not in (1,3)) or (date_format(entryDate,'%m') <> '01')) and entryGroup = ${bs === null || bs === void 0 ? void 0 : bs.type} and semesterNum in (${semesters}) and deferStatus = 0 and completeStatus = 0`;
                    if (st === null || st === void 0 ? void 0 : st.length)
                        students = [...st.map((r) => r.id)];
                    // Locate Included Students
                    if ((_b = bs === null || bs === void 0 ? void 0 : bs.includeStudentIds) === null || _b === void 0 ? void 0 : _b.length)
                        students = [...students, ...bs === null || bs === void 0 ? void 0 : bs.includeStudentIds];
                    // Remove Excluded Students
                    if ((_c = bs === null || bs === void 0 ? void 0 : bs.excludeStudentIds) === null || _c === void 0 ? void 0 : _c.length)
                        students = students === null || students === void 0 ? void 0 : students.filter((r) => !(bs === null || bs === void 0 ? void 0 : bs.excludeStudentIds.includes(r)));
                    // Insert bills in student accounts
                    if (students === null || students === void 0 ? void 0 : students.length) {
                        const stdata = yield Promise.all(students === null || students === void 0 ? void 0 : students.map((r) => __awaiter(this, void 0, void 0, function* () {
                            const ss = yield fms.student.findFirst({ where: { OR: [{ id: r }, { indexno: r }] } });
                            const studentId = ss === null || ss === void 0 ? void 0 : ss.id;
                            return ({
                                studentId,
                                sessionId: bs === null || bs === void 0 ? void 0 : bs.sessionId,
                                billId: bs === null || bs === void 0 ? void 0 : bs.id,
                                type: 'BILL',
                                narrative: bs === null || bs === void 0 ? void 0 : bs.narrative,
                                currency: bs === null || bs === void 0 ? void 0 : bs.currency,
                                amount: bs === null || bs === void 0 ? void 0 : bs.amount
                            });
                        })));
                        const ups = yield fms.studentAccount.createMany({ data: stdata });
                        if (ups === null || ups === void 0 ? void 0 : ups.count) {
                            // Retire Student Accounts
                            yield Promise.all(students === null || students === void 0 ? void 0 : students.map((studentId) => __awaiter(this, void 0, void 0, function* () {
                                var _d;
                                const bal = yield fms.studentAccount.aggregate({ _sum: { amount: true }, where: { studentId } });
                                yield fms.student.update({ where: { id: studentId }, data: { accountNet: (_d = bal === null || bal === void 0 ? void 0 : bal._sum) === null || _d === void 0 ? void 0 : _d.amount } });
                            })));
                            // Update bill Status
                            const bs = yield fms.bill.update({ where: { id: req.params.id }, data: { posted: true } });
                            // Log Publish Activity & Receipients
                            yield fms.activityBill.create({ data: { billId: bs === null || bs === void 0 ? void 0 : bs.id, amount: bs === null || bs === void 0 ? void 0 : bs.amount, discount: bs === null || bs === void 0 ? void 0 : bs.discount, receivers: students } });
                            // Return Response
                            res.status(200).json(bs);
                        }
                        else {
                            res.status(204).json({ message: `something happened, No bill created` });
                        }
                    }
                }
                else {
                    res.status(204).json({ message: `no bill found` });
                }
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ message: error.message });
            }
        });
    }
    revokeBill(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sts = yield fms.studentAccount.findMany({ where: { billId: req.params.id } });
                // Update Bill status
                const resp = yield fms.bill.update({ where: { id: req.params.id }, data: { posted: false } });
                if ((sts === null || sts === void 0 ? void 0 : sts.length) && resp) {
                    // Remove Bill from student accounts
                    yield fms.studentAccount.deleteMany({ where: { billId: req.params.id } });
                    // Retire Student Accounts
                    yield Promise.all(sts === null || sts === void 0 ? void 0 : sts.map((account) => __awaiter(this, void 0, void 0, function* () {
                        var _a;
                        const { studentId } = account;
                        const bal = yield fms.studentAccount.aggregate({ _sum: { amount: true }, where: { studentId } });
                        yield fms.student.update({ where: { id: studentId }, data: { accountNet: (_a = bal === null || bal === void 0 ? void 0 : bal._sum) === null || _a === void 0 ? void 0 : _a.amount } });
                    })));
                    // Return Response
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
    postBill(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { programId, bankaccId, sessionId } = req.body;
                delete req.body.sessionId;
                delete req.body.bankaccId;
                delete req.body.programId;
                const resp = yield fms.bill.create({
                    data: Object.assign(Object.assign(Object.assign(Object.assign({}, req.body), sessionId && ({ session: { connect: { id: sessionId } } })), bankaccId && ({ bankacc: { connect: { id: bankaccId } } })), programId && ({ program: { connect: { id: programId } } }))
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
    updateBill(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { programId, bankaccId, sessionId } = req.body;
                delete req.body.sessionId;
                delete req.body.bankaccId;
                delete req.body.programId;
                const resp = yield fms.bill.update({
                    where: {
                        id: req.params.id
                    },
                    data: Object.assign(Object.assign(Object.assign(Object.assign({}, req.body), sessionId && ({ session: { connect: { id: sessionId } } })), bankaccId && ({ bankacc: { connect: { id: bankaccId } } })), programId && ({ program: { connect: { id: programId } } }))
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
    deleteBill(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bs = yield fms.bill.update({
                    where: { id: req.params.id },
                    data: {
                        studentAccount: { deleteMany: { billId: req.params.id } }
                    }
                });
                if (bs) {
                    const resp = yield fms.bill.delete({ where: { id: req.params.id } });
                    res.status(200).json(resp);
                }
                else {
                    res.status(204).json({ message: `No records deleted` });
                }
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ message: error.message });
            }
        });
    }
    /* Charges */
    fetchCharges(req, res) {
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
                                { student: { id: { contains: keyword } } },
                                { student: { indexno: { contains: keyword } } },
                                { student: { fname: { contains: keyword } } },
                                { student: { lname: { contains: keyword } } },
                            ],
                        }
                    };
                const resp = yield fms.$transaction([
                    fms.charge.count(Object.assign({}, (searchCondition))),
                    fms.charge.findMany(Object.assign(Object.assign({}, (searchCondition)), { include: { student: { include: { program: true } } }, skip: offset, take: Number(pageSize), orderBy: { createdAt: 'desc' } }))
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
    fetchCharge(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield fms.charge.findUnique({
                    where: { id: req.params.id }
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
    lateCharge(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { studentId } = req.body;
                const st = yield fms.student.findUnique({ where: { id: studentId } });
                const charge = yield fms.transtype.findFirst({ where: { id: 8 } });
                if (st && charge) {
                    const fine = (st === null || st === void 0 ? void 0 : st.entryGroup) == 'GH' ? charge === null || charge === void 0 ? void 0 : charge.amountInGhc : charge === null || charge === void 0 ? void 0 : charge.amountInUsd;
                    const resp = yield fms.charge.create({
                        data: Object.assign(Object.assign({ title: `LATE REGISTRATION FINE`, type: 'FINE', currency: st.entryGroup == 'GH' ? 'GHC' : 'USD', amount: parseFloat(fine), posted: true }, studentId && ({ student: { connect: { id: studentId } } })), { studentAccount: {
                                createMany: {
                                    data: { studentId: st === null || st === void 0 ? void 0 : st.id, currency: st.entryGroup == 'GH' ? 'GHC' : 'USD', amount: parseFloat(fine), type: 'CHARGE', narrative: `LATE REGISTRATION FINE` }
                                }
                            } })
                    });
                    // Retire Accounts
                    const bal = yield fms.studentAccount.aggregate({ _sum: { amount: true }, where: { studentId } });
                    yield fms.student.update({ where: { id: studentId }, data: { accountNet: (_a = bal === null || bal === void 0 ? void 0 : bal._sum) === null || _a === void 0 ? void 0 : _a.amount } });
                    // Return Response
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
    postCharge(req, res) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { studentId } = req.body;
                delete req.body.studentId;
                const resp = yield fms.charge.create({
                    data: Object.assign(Object.assign(Object.assign({}, req.body), studentId && ({ student: { connect: { id: studentId } } })), { studentAccount: {
                            create: {
                                data: {
                                    studentId,
                                    narrative: (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.title,
                                    amount: (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.amount,
                                    type: 'CHARGE',
                                    currency: (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.currency,
                                }
                            }
                        } })
                });
                if (resp) {
                    // Retire Account
                    const bal = yield fms.studentAccount.aggregate({ _sum: { amount: true }, where: { studentId } });
                    yield fms.student.update({ where: { id: studentId }, data: { accountNet: (_d = bal === null || bal === void 0 ? void 0 : bal._sum) === null || _d === void 0 ? void 0 : _d.amount } });
                    // Create record in student account
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
    updateCharge(req, res) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { studentId } = req.body;
                delete req.body.studentId;
                const resp = yield fms.charge.update({
                    where: { id: req.params.id },
                    data: Object.assign(Object.assign(Object.assign({}, req.body), studentId && ({ student: { connect: { id: studentId } } })), { studentAccount: {
                            updateMany: {
                                where: { studentId },
                                data: {
                                    studentId,
                                    narrative: (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.title,
                                    amount: (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.amount,
                                    type: 'CHARGE',
                                    currency: (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.currency,
                                }
                            }
                        } })
                });
                if (resp) {
                    // Retire Accounts
                    const bal = yield fms.studentAccount.aggregate({ _sum: { amount: true }, where: { studentId } });
                    yield fms.student.update({ where: { id: studentId }, data: { accountNet: (_d = bal === null || bal === void 0 ? void 0 : bal._sum) === null || _d === void 0 ? void 0 : _d.amount } });
                    // Return Response
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
    deleteCharge(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bs = yield fms.charge.update({
                    where: { id: req.params.id },
                    data: { studentAccount: { deleteMany: { chargeId: req.params.id } } }
                });
                if (bs) {
                    const { studentId } = bs;
                    const resp = yield fms.charge.delete({ where: { id: req.params.id } });
                    // Retire Account
                    const bal = yield fms.studentAccount.aggregate({ _sum: { amount: true }, where: { studentId } });
                    yield fms.student.update({ where: { id: studentId }, data: { accountNet: (_a = bal === null || bal === void 0 ? void 0 : bal._sum) === null || _a === void 0 ? void 0 : _a.amount } });
                    // Return Response
                    res.status(200).json(resp);
                }
                else {
                    res.status(204).json({ message: `No records deleted` });
                }
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ message: error.message });
            }
        });
    }
    /* Payments */
    fetchPayments(req, res) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const { page = 1, pageSize = 9, keyword = '' } = req.query;
            const offset = (page - 1) * pageSize;
            let searchCondition = { where: { transtypeId: { in: [2] } } };
            try {
                if (keyword)
                    searchCondition = {
                        where: {
                            OR: [
                                { transtag: { contains: keyword } },
                                { student: { id: { contains: keyword } } },
                                { student: { indexno: { contains: keyword } } },
                                { student: { fname: { contains: keyword } } },
                                { student: { lname: { contains: keyword } } },
                            ],
                            AND: [
                                { transtypeId: { in: [2] } }
                            ]
                        }
                    };
                const resp = yield fms.$transaction([
                    fms.transaction.count(Object.assign({}, (searchCondition))),
                    fms.transaction.findMany(Object.assign(Object.assign({}, (searchCondition)), { include: { student: { include: { program: true } }, transtype: true }, skip: offset, take: Number(pageSize), orderBy: { createdAt: 'desc' } }))
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
    fetchPaymentOthers(req, res) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const { page = 1, pageSize = 9, keyword = '' } = req.query;
            const offset = (page - 1) * pageSize;
            let searchCondition = { where: { transtypeId: { notIn: [1, 2] } } };
            try {
                if (keyword)
                    searchCondition = {
                        where: {
                            OR: [
                                { transtag: { contains: keyword } },
                                { student: { id: { contains: keyword } } },
                                { student: { indexno: { contains: keyword } } },
                                { student: { fname: { contains: keyword } } },
                                { student: { lname: { contains: keyword } } },
                            ],
                            AND: [
                                { transtypeId: { notIn: [1, 2] } }
                            ]
                        }
                    };
                const resp = yield fms.$transaction([
                    fms.transaction.count(Object.assign({}, (searchCondition))),
                    fms.transaction.findMany(Object.assign(Object.assign({}, (searchCondition)), { include: { student: { include: { program: true } }, transtype: true }, skip: offset, take: Number(pageSize), orderBy: { createdAt: 'desc' } }))
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
    fetchPaymentVouchers(req, res) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const { page = 1, pageSize = 9, keyword = '' } = req.query;
            const offset = (page - 1) * pageSize;
            let searchCondition = { where: { transtypeId: { in: [1] } } };
            try {
                if (keyword)
                    searchCondition = {
                        where: {
                            OR: [
                                { transtag: { contains: keyword } },
                                { student: { id: { contains: keyword } } },
                                { student: { indexno: { contains: keyword } } },
                                { student: { fname: { contains: keyword } } },
                                { student: { lname: { contains: keyword } } },
                            ],
                            AND: [
                                { transtypeId: { in: [1] } }
                            ]
                        }
                    };
                const resp = yield fms.$transaction([
                    fms.transaction.count(Object.assign({}, (searchCondition))),
                    fms.transaction.findMany(Object.assign(Object.assign({}, (searchCondition)), { include: { transtype: true, activityFinanceVoucher: true }, skip: offset, take: Number(pageSize), orderBy: { createdAt: 'desc' } }))
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
    fetchPayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield fms.transaction.findUnique({
                    where: { id: req.params.id }
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
    convertPayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { transactId, transtypeId } = req.body;
                delete req.body.transactId;
                delete req.body.transactId;
                const narrative = `Payment of ${transtypeId == 8 ? 'Graduation' : transtypeId == 3 ? 'Resit' : transtypeId == 8 ? 'Late Registration' : 'Academic'} Fees`;
                const resp = yield fms.transaction.update({
                    where: { id: transactId },
                    data: Object.assign(Object.assign({}, transtypeId && ({ transtype: { connect: { id: transtypeId } } })), transtypeId && ['2', '3', '4', '8'].includes(transtypeId) && ({ studentAccount: { updateMany: { data: { narrative } } } }))
                });
                if (resp) {
                    // Return Response
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
    postPayment(req, res) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { studentId, transtypeId, bankaccId, collectorId } = req.body;
                delete req.body.studentId;
                delete req.body.transtypeId;
                delete req.body.bankaccId;
                delete req.body.collectorId;
                const narrative = `Payment of ${transtypeId == 8 ? 'Graduation' : transtypeId == 3 ? 'Resit' : transtypeId == 8 ? 'Late Registration' : 'Academic'} Fees`;
                const resp = yield fms.transaction.create({
                    data: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, req.body), collectorId && ({ collector: { connect: { id: collectorId } } })), bankaccId && ({ bankacc: { connect: { id: bankaccId } } })), studentId && ({ student: { connect: { id: studentId } } })), transtypeId && ({ transtype: { connect: { id: transtypeId } } })), transtypeId && ['2', '3', '4', '8'].includes(transtypeId) && ({ studentAccount: { createMany: { data: { studentId, narrative, amount: (-1 * ((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.amount)), type: 'PAYMENT', currency: (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.currency } } } }))
                });
                if (resp) {
                    // Retire Student Account Balance after Fees,Late,Resit,Graduation transaction
                    if (['2', '3', '4', '8'].includes(transtypeId)) {
                        const bal = yield fms.studentAccount.aggregate({ _sum: { amount: true }, where: { studentId } });
                        yield fms.student.update({ where: { id: studentId }, data: { accountNet: (_c = bal === null || bal === void 0 ? void 0 : bal._sum) === null || _c === void 0 ? void 0 : _c.amount } });
                    }
                    // Return Response
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
    updatePayment(req, res) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { studentId, transtypeId, bankaccId, collectorId } = req.body;
                delete req.body.studentId;
                delete req.body.transtypeId;
                delete req.body.bankaccId;
                delete req.body.collectorId;
                let voucher;
                const narrative = `Payment of ${transtypeId == 8 ? 'Graduation' : transtypeId == 3 ? 'Resit' : transtypeId == 8 ? 'Late Registration' : 'Academic'} Fees`;
                if (transtypeId == '1')
                    voucher = yield fms.voucher.findFirst({ where: {}, include: { admission: true } });
                const resp = yield fms.transaction.update({
                    where: { id: req.params.id },
                    data: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, req.body), collectorId && ({ collector: { connect: { id: collectorId } } })), bankaccId && ({ bankacc: { connect: { id: bankaccId } } })), studentId && ({ student: { connect: { id: studentId } } })), transtypeId && ({ transtype: { connect: { id: transtypeId } } })), transtypeId && ['2', '3', '4', '8'].includes(transtypeId) && ({ studentAccount: { updateMany: { data: { studentId, narrative, amount: (-1 * ((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.amount)), type: 'PAYMENT', currency: (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.currency } } } }))
                });
                if (resp) {
                    // Retire Student Account Balance after Fees,Late,Resit,Graduation transaction
                    if (['2', '3', '4', '8'].includes(transtypeId)) {
                        const bal = yield fms.studentAccount.aggregate({ _sum: { amount: true }, where: { studentId } });
                        yield fms.student.update({ where: { id: studentId }, data: { accountNet: (_c = bal === null || bal === void 0 ? void 0 : bal._sum) === null || _c === void 0 ? void 0 : _c.amount } });
                    }
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
    deletePayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bs = yield fms.transaction.update({
                    where: { id: req.params.id },
                    data: {
                        studentAccount: { deleteMany: { transactId: req.params.id } },
                        activityFinanceVoucher: { deleteMany: { transactId: req.params.id } }
                    }
                });
                if (bs) {
                    const resp = yield fms.transaction.delete({ where: { id: req.params.id } });
                    res.status(200).json(resp);
                }
                else {
                    res.status(204).json({ message: `No records deleted` });
                }
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ message: error.message });
            }
        });
    }
    /* Bank API Transactions  */
    loadPayServices(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // LOAD_API_SERVICES
            try {
                const resp = yield fms.transtype.findMany({
                    where: { status: true, visibility: 'PUBLIC' },
                });
                if (resp === null || resp === void 0 ? void 0 : resp.length) {
                    const data = resp === null || resp === void 0 ? void 0 : resp.map((row) => {
                        return ({ serviceId: row.id, serviceName: row.title, serviceChargeInGHC: row.amountInGhc || 0, serviceChargeInUSD: row.amountInUsd || 0 });
                    });
                    res.status(200).json({ success: true, data });
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
    loadPayService(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const type = req.params.type;
                const refno = req.params.refno;
                if (refno && type != 1) {
                    var dt, ft = 0;
                    const st = yield fms.student.findFirst({
                        where: { OR: [{ id: refno }, { indexno: refno }] },
                        include: { program: { select: { shortName: true } } }
                    });
                    if (st) {
                        dt = {
                            studentId: st.id,
                            indexno: st.indexno,
                            name: `${st.fname} ${st.mname && st.mname + ' '}${st.lname}`,
                            program: (_a = st === null || st === void 0 ? void 0 : st.program) === null || _a === void 0 ? void 0 : _a.shortName,
                            year: st.semesterNum ? Math.ceil(st.semesterNum / 2) : 'none',
                            serviceId: type
                        };
                        if (type == 2) { /* Student Account Balance */
                            ft = st === null || st === void 0 ? void 0 : st.accountNet;
                        }
                        else if ([4, 8].includes(type)) { /* Graduation, Late Fine  Charges */
                            const ac = yield fms.transtype.findUnique({ where: { id: Number(type) } });
                            if (ac)
                                ft = (st === null || st === void 0 ? void 0 : st.entryGroup) == 'INT' ? ((ac === null || ac === void 0 ? void 0 : ac.amountInUsd) || 0) : ((ac === null || ac === void 0 ? void 0 : ac.amountInGhc) || 0);
                        }
                        else if (type == 3) { /* Resit Charges */
                            const rs = yield fms.resit.count({ where: { paid: false, indexno: st === null || st === void 0 ? void 0 : st.indexno } });
                            const ac = yield fms.transtype.findUnique({ where: { id: Number(type) } });
                            if (ac && rs)
                                ft = st.entryGroup == 'INT' ? (rs === null || rs === void 0 ? void 0 : rs.count) * (ac.amountInUsd || 0) : (rs === null || rs === void 0 ? void 0 : rs.count) * (ac.amountInGhc || 0);
                        }
                        // Return Information
                        return res.status(200).json({ success: true, data: Object.assign(Object.assign({}, dt), { serviceCharge: ft }) });
                    }
                    else {
                        return res.status(200).json({ success: false, data: null, msg: "Invalid Student ID or Index Number" });
                    }
                }
                else if (type == 1) {
                    // LOAD_VOUCHER_FORMS
                    const pr = yield fms.amsPrice.findMany({ where: { status: true } });
                    const sm = yield fms.admission.findFirst({ where: { default: true } });
                    if (pr && sm) {
                        const forms = pr.map((r) => ({ formId: r.id, formName: r.title, currency: r.currency, serviceCharge: r.amount }));
                        return res.status(200).json({ success: true, data: Object.assign(Object.assign({ serviceId: type }, sm), { forms }) });
                    }
                    return res.status(403).json({ success: false, data: null, msg: "Invalid request" });
                }
                else {
                    return res.status(403).json({ success: false, data: null, msg: "Invalid request" });
                }
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ message: error.message });
            }
        });
    }
    payService(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const api = req.query.api;
                const cl = yield fms.vendor.findFirst();
                let { serviceId, amountPaid, currency, studentId, refNote, transRef, buyerName, buyerPhone, formId, sessionId } = req.body;
                serviceId = Number(serviceId);
                amountPaid = parseFloat(amountPaid.replace(",", ""));
                const tr = yield fms.transaction.findFirst({ where: { transtag: transRef } });
                let data = {
                    collectorId: cl.id,
                    transtypeId: serviceId,
                    currency,
                    amount: amountPaid,
                    reference: refNote,
                    studentId: studentId,
                    transtag: transRef,
                };
                /* BUY VOUCHER */
                if (serviceId == 1) {
                    if (!sessionId || sessionId == "")
                        return res.status(200).json({ success: false, data: null, msg: `No Admission Session indicated!` }); // Check for Required but Empty field and return error
                    // Create Transaction
                    if (!tr) {
                        const pr = yield fms.amsPrice.findUnique({ where: { id: formId } });
                        const vc = yield fms.voucher.findFirst({ where: { admissionId: sessionId, vendorId: cl === null || cl === void 0 ? void 0 : cl.id, categoryId: pr === null || pr === void 0 ? void 0 : pr.categoryId, sellType: pr === null || pr === void 0 ? void 0 : pr.sellType, soldAt: null } });
                        if (!vc)
                            return res.status(200).json({ success: false, data: null, msg: `Voucher quota exhausted` });
                        // Send SMS to Buyer
                        const msg = `Hi! AUCC Voucher info are, Serial: ${vc === null || vc === void 0 ? void 0 : vc.serial} Pin: ${vc === null || vc === void 0 ? void 0 : vc.pin} Goto https://portal.aucc.edu.gh to apply!`;
                        //const send = await sms(buyerPhone, msg);
                        let send = { code: 1001 };
                        const ins = yield fms.transaction.create({
                            data: Object.assign(Object.assign({}, data), { activityFinanceVoucher: {
                                    createMany: {
                                        data: { serial: vc.serial, pin: vc === null || vc === void 0 ? void 0 : vc.pin, buyerName, buyerPhone, admissionId: sessionId, smsCode: (send === null || send === void 0 ? void 0 : send.code) || '0000' }
                                    }
                                } })
                        });
                        if (ins) {
                            // Update Voucher with details
                            const vs = yield fms.voucher.update({
                                where: { serial: vc === null || vc === void 0 ? void 0 : vc.serial },
                                data: { applicantName: buyerName, applicantPhone: buyerPhone, soldAt: new Date() }
                            });
                            // Send Response
                            return res.status(200).json({ success: true, data: { voucherSerial: vc === null || vc === void 0 ? void 0 : vc.serial, voucherPin: vc === null || vc === void 0 ? void 0 : vc.pin, buyerName, buyerPhone, transId: ins === null || ins === void 0 ? void 0 : ins.id, serviceId } });
                        }
                    }
                    else {
                        const vc = yield fms.activityFinanceVoucher.findFirst({ where: { transactId: tr.id } });
                        if (vc) {
                            const msg = `Hi! AUCC Voucher info are, Serial: ${vc === null || vc === void 0 ? void 0 : vc.serial} Pin: ${vc === null || vc === void 0 ? void 0 : vc.pin} Goto https://portal.aucc.edu.gh to apply!`;
                            //const send = await sms(buyerPhone, msg);
                            let send = { code: 1001 };
                            yield fms.activityFinanceVoucher.update({ where: { id: vc.id }, data: { smsCode: send === null || send === void 0 ? void 0 : send.code } });
                            return res.status(200).json({
                                success: true,
                                data: {
                                    voucherSerial: vc === null || vc === void 0 ? void 0 : vc.serial,
                                    voucherPin: vc === null || vc === void 0 ? void 0 : vc.pin,
                                    buyerName,
                                    buyerPhone,
                                    transId: tr === null || tr === void 0 ? void 0 : tr.id,
                                    serviceId,
                                },
                            });
                        }
                        return res.status(200).json({ success: false, data: null, msg: `Transaction failed` });
                    }
                    /* OTHER PAYMENT SERVICE (ACADEMIC FEES, RESIT, GRADUATION, ATTESTATION, PROFICIENCY, TRANSCRIPT, LATE FINE ) */
                }
                else {
                    /* PAY FOR SERVICES */
                    const st = yield fms.student.findFirst({ where: { OR: [{ id: studentId }, { indexno: studentId }] } });
                    if (!tr) {
                        const narrative = `Payment of ${serviceId == 8 ? 'Graduation' : serviceId == 3 ? 'Resit' : serviceId == 8 ? 'Late Registration' : 'Academic'} Fees`;
                        data = Object.assign(Object.assign({}, data), { studentId: st === null || st === void 0 ? void 0 : st.id });
                        studentId = st === null || st === void 0 ? void 0 : st.id;
                        console.log(data);
                        const ins = yield fms.transaction.create({
                            data: Object.assign(Object.assign({}, data), serviceId && [2, 3, 4, 8].includes(serviceId) && ({ studentAccount: { createMany: { data: { studentId, narrative, currency, amount: (-1 * amountPaid), type: 'PAYMENT' } } } }))
                        });
                        if (ins) {
                            if ([2, 3, 4, 8].includes(serviceId)) {
                                const bal = yield fms.studentAccount.aggregate({ _sum: { amount: true }, where: { studentId } });
                                yield fms.student.update({ where: { id: studentId }, data: { accountNet: ((_a = bal === null || bal === void 0 ? void 0 : bal._sum) === null || _a === void 0 ? void 0 : _a.amount) || 0 } });
                            }
                            /* For Resit Payments */
                            if (serviceId == 3) {
                                // Retire Number of Resit Papers
                                const resit_charge = yield fms.transtype.findUnique({ where: { id: Number(serviceId) } });
                                const pay_count = Math.floor(((st === null || st === void 0 ? void 0 : st.entryGroup) == 'INT' ? resit_charge === null || resit_charge === void 0 ? void 0 : resit_charge.amountInUsd : resit_charge === null || resit_charge === void 0 ? void 0 : resit_charge.amountInGhc) % amountPaid);
                                const resits = yield fms.resit.findMany({ where: { indexno: st === null || st === void 0 ? void 0 : st.indexno }, take: pay_count });
                                const filters = resits === null || resits === void 0 ? void 0 : resits.map((r) => ({ indexno: r.indexno }));
                                // Update Paid Status of resit_data or papers
                                const ups = yield fms.resit.updateMany({ where: { OR: filters }, data: { paid: true } });
                            }
                            // Return Response
                            return res.status(200).json({ success: true, data: { transId: ins === null || ins === void 0 ? void 0 : ins.id, studentId, serviceId } });
                        }
                        else {
                            return res.status(200).json({ success: false, data: null, msg: `Transaction failed` });
                        }
                    }
                    else {
                        return res.status(200).json({ success: true, data: { transId: tr === null || tr === void 0 ? void 0 : tr.id, studentId: st === null || st === void 0 ? void 0 : st.id, serviceId } });
                    }
                }
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ message: error.message });
            }
        });
    }
    /* Student Accounts & Debtors */
    fetchAccounts(req, res) {
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
                                { id: { contains: keyword } },
                                { indexno: { contains: keyword } },
                                { fname: { contains: keyword } },
                                { lname: { contains: keyword } },
                            ]
                        }
                    };
                const resp = yield fms.$transaction([
                    fms.student.count(Object.assign({}, (searchCondition))),
                    fms.student.findMany(Object.assign(Object.assign({}, (searchCondition)), { include: { program: true }, skip: offset, take: Number(pageSize) }))
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
    fetchAccount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield fms.studentAccount.findMany({
                    where: { studentId: req.params.id },
                    include: {
                        student: { select: { fname: true, mname: true, lname: true, indexno: true, program: { select: { longName: true } } } },
                        bill: { select: { narrative: true } },
                        charge: { select: { title: true } },
                        session: { select: { title: true } },
                        transaction: { select: { transtag: true } },
                    },
                    orderBy: { createdAt: 'asc' }
                });
                if (resp.length) {
                    res.status(200).json(resp);
                }
                else {
                    res.status(202).json({ message: `no record found` });
                }
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ message: error.message });
            }
        });
    }
    fetchDebts(req, res) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Depts");
            const { page = 1, pageSize = 9, keyword = '' } = req.query;
            const offset = (page - 1) * pageSize;
            let searchCondition = { where: { accountNet: { gt: 0 } } };
            try {
                if (keyword)
                    searchCondition = {
                        where: {
                            OR: [
                                { id: { contains: keyword } },
                                { indexno: { contains: keyword } },
                                { fname: { contains: keyword } },
                                { lname: { contains: keyword } },
                            ],
                            AND: [{ accountNet: { gt: 0 } }]
                        }
                    };
                const resp = yield fms.$transaction([
                    fms.student.count(Object.assign({}, (searchCondition))),
                    fms.student.findMany(Object.assign(Object.assign({}, (searchCondition)), { include: { program: true }, skip: offset, take: Number(pageSize) }))
                ]);
                console.log(resp);
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
    retireAccount(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const st = yield fms.student.findFirst({
                    where: { OR: [{ id: req.params.id }, { indexno: req.params.id }] }
                });
                if (st) {
                    const bal = yield fms.studentAccount.aggregate({ _sum: { amount: true }, where: { studentId: st === null || st === void 0 ? void 0 : st.id } });
                    const ups = yield fms.student.update({ where: { id: st === null || st === void 0 ? void 0 : st.id }, data: { accountNet: (_a = bal === null || bal === void 0 ? void 0 : bal._sum) === null || _a === void 0 ? void 0 : _a.amount } });
                    // Return New Balance
                    res.status(200).json(ups === null || ups === void 0 ? void 0 : ups.accountNet);
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
    /* Service charges */
    fetchServiceList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield fms.transtype.findMany({
                    where: { status: true },
                    orderBy: { createdAt: 'desc' }
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
    fetchServices(req, res) {
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
                                { transtype: { title: { contains: keyword } } },
                            ],
                        }
                    };
                const resp = yield fms.$transaction([
                    fms.transtype.count(Object.assign({}, (searchCondition))),
                    fms.transtype.findMany(Object.assign(Object.assign({}, (searchCondition)), { skip: offset, take: Number(pageSize) }))
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
    fetchService(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield fms.transtype.findUnique({
                    where: { id: Number(req.params.id) }
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
    postService(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                delete req.body.transtypeId;
                const resp = yield fms.transtype.create({
                    data: Object.assign({}, req.body)
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
    updateService(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                delete req.body.transtypeId;
                const resp = yield fms.transtype.update({
                    where: {
                        id: Number(req.params.id)
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
    deleteService(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield fms.transtype.delete({ where: { id: Number(req.params.id) } });
                if (resp) {
                    res.status(200).json(resp);
                }
                else {
                    res.status(204).json({ message: `No records deleted` });
                }
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ message: error.message });
            }
        });
    }
    /* Voucher Costs */
    fetchVsales(req, res) {
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
                const resp = yield fms.$transaction([
                    fms.amsPrice.count(Object.assign({}, (searchCondition))),
                    fms.amsPrice.findMany(Object.assign(Object.assign({}, (searchCondition)), { include: { category: true }, skip: offset, take: Number(pageSize), orderBy: { createdAt: 'desc' } }))
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
    fetchVsale(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield fms.amsPrice.findUnique({
                    where: { id: req.params.id }
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
    postVsale(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { categoryId } = req.body;
                delete req.body.categoryId;
                const resp = yield fms.amsPrice.create({
                    data: Object.assign(Object.assign({}, req.body), categoryId && ({ category: { connect: { id: categoryId } } }))
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
    updateVsale(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { categoryId } = req.body;
                delete req.body.categoryId;
                const resp = yield fms.amsPrice.update({
                    where: { id: req.params.id },
                    data: Object.assign(Object.assign({}, req.body), categoryId && ({ category: { connect: { id: categoryId } } }))
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
    deleteVsale(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield fms.amsPrice.delete({ where: { id: req.params.id } });
                if (resp) {
                    res.status(200).json(resp);
                }
                else {
                    res.status(204).json({ message: `No records deleted` });
                }
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ message: error.message });
            }
        });
    }
    fetchBanks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield fms.bankacc.findMany({
                    where: { status: true },
                    orderBy: { createdAt: 'desc' }
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
}
exports.default = FmsController;

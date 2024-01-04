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
const dric_1 = require("../prisma/client/dric");
const uuid_1 = require("uuid");
const authModel_1 = __importDefault(require("../model/authModel"));
const dric = new dric_1.PrismaClient();
const Auth = new authModel_1.default();
class DricController {
    // Funders
    fetchFunders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield dric.funder.findMany({
                    include: {
                        country: true,
                        projects: true
                    },
                    orderBy: {
                        createdAt: 'asc'
                    }
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
    fetchFunder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield dric.funder.findUnique({
                    where: {
                        id: req.params.id
                    },
                    include: {
                        country: true,
                        projects: true
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
    postFunder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                delete req.body.id;
                const resp = yield dric.funder.create({
                    data: Object.assign({}, req.body),
                    include: {
                        projects: true
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
    updateFunder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield dric.funder.update({
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
    deleteFunder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield dric.funder.delete({
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
    // Projects
    fetchProjects(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield dric.project.findMany({
                    include: {
                        country: { select: { longName: true } },
                        funder: { select: { title: true } },
                        investigator: { select: { fname: true, mname: true, lname: true, staffNo: true } },
                        coinvestigator: { select: { fname: true, mname: true, lname: true, staffNo: true } },
                        phases: { select: { phaseAmount: true, title: true } },
                    }
                });
                if (resp.length > 0) {
                    res.status(200).json(resp);
                }
                else {
                    res.status(204).json({ message: `No record found` });
                }
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ message: error.message });
            }
        });
    }
    fetchProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield dric.project.findUnique({
                    where: { id: req.params.id },
                    include: {
                        country: { select: { longName: true } },
                        funder: true,
                        investigator: { select: { fname: true, mname: true, lname: true, staffNo: true } },
                        coinvestigator: { select: { fname: true, mname: true, lname: true, staffNo: true } },
                        phases: { select: { id: true, phaseAmount: true, title: true }, orderBy: { createdAt: 'asc' } }
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
    fetchProjectPhases(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield dric.phase.findMany({
                    where: { projectId: req.params.id }
                });
                if (resp.length > 0) {
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
    postProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                delete req.body.id;
                const resp = yield dric.project.create({
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
    updateProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield dric.project.update({
                    where: {
                        id: req.params.id
                    },
                    data: req.body,
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
    deleteProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield dric.project.delete({
                    where: {
                        id: req.params.id
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
    // Personels
    fetchPersonels(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield dric.personel.findMany();
                if (resp.length > 0) {
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
    fetchPersonel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield dric.personel.findUnique({
                    where: {
                        id: req.params.id
                    },
                    include: {
                        activities: true,
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
    postPersonel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                delete req.body.id;
                const resp = yield dric.personel.create({
                    data: req.body,
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
    updatePersonel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield dric.personel.update({
                    where: {
                        id: req.params.id
                    },
                    data: req.body
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
    deletePersonel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield dric.personel.delete({
                    where: {
                        id: req.params.id
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
    // Phases
    fetchPhases(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield dric.phase.findMany({
                    include: {
                        project: true,
                        activities: true
                    }
                });
                if (resp.length > 0) {
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
    fetchPhase(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield dric.phase.findUnique({
                    where: {
                        id: req.params.id
                    },
                    include: {
                        project: { select: { title: true } },
                        activities: true
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
    fetchPhaseActivities(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield dric.activity.findMany({
                    where: {
                        phaseId: req.params.id
                    }
                });
                if (resp.length > 0) {
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
    postPhase(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                delete req.body.id;
                const resp = yield dric.phase.create({
                    data: req.body,
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
    updatePhase(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield dric.phase.update({
                    where: {
                        id: req.params.id
                    },
                    data: req.body
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
    deletePhase(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield dric.phase.delete({
                    where: {
                        id: req.params.id
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
    // Activities
    fetchActivities(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield dric.activity.findMany();
                if (resp.length > 0) {
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
    fetchActivity(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield dric.activity.findUnique({
                    where: {
                        id: req.params.id
                    },
                    include: {
                        phase: { select: { title: true } },
                        personels: { select: { identity: true, fname: true, mname: true, lname: true } },
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
    postActivity(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const personels = req.body.personels;
                delete req.body.personels;
                delete req.body.id;
                const resp = yield dric.activity.create({
                    data: Object.assign(Object.assign({}, req.body), { personels: {
                            connect: {
                                id: personels
                            }
                        } }),
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
    updateActivity(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const personels = req.body.personels;
                delete req.body.personels;
                const resp = yield dric.activity.update({
                    where: {
                        id: req.params.id
                    },
                    data: Object.assign(Object.assign({}, req.body), { personels: {
                            connect: {
                                id: personels
                            }
                        } }),
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
    deleteActivity(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield dric.activity.delete({
                    where: {
                        id: req.params.id
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
    // Investigators
    fetchInvestigators(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield dric.investigator.findMany();
                if (resp.length > 0) {
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
    fetchInvestigator(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield dric.investigator.findUnique({
                    where: {
                        id: req.params.id
                    },
                    include: {
                        coInvestigator: true,
                        principalInvestigator: true
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
    postInvestigator(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                delete req.body.id;
                const resp = yield dric.investigator.create({
                    data: req.body,
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
    updateInvestigator(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield dric.investigator.update({
                    where: {
                        id: req.params.id
                    },
                    data: req.body
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
    deleteInvestigator(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield dric.investigator.delete({
                    where: {
                        id: req.params.id
                    },
                });
                console.log(resp);
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
    // Roles
    fetchRoles(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const appId = (_a = req.query.appId) !== null && _a !== void 0 ? _a : 6;
                const resp = yield Auth.fetchRolesByApp(parseInt(appId));
                if (resp.length > 0) {
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
    fetchRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield Auth.fetchRoleById(parseInt(req.params.id));
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
    postRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { uid } = yield Auth.fetchSSOUser(req.body.identity);
                const resp = yield Auth.insertSSORole({ uid, arole_id: req.body.arole_id });
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
    updateRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield Auth.updateSSORole(parseInt(req.params.id), { arole_id: req.body.arole_id, status: req.body.status });
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
    deleteRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield Auth.deleteSSORole(parseInt(req.params.id));
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
    // Countries
    fetchCountries(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield dric.country.findMany({ where: { status: true }, orderBy: { 'longName': 'asc' } });
                if (resp.length > 0) {
                    res.status(200).json(resp);
                }
                else {
                    res.status(204).json({ message: `No record found` });
                }
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ message: error.message });
            }
        });
    }
    // Dashboard Statistics
    fetchDashboard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // 
                const funders = yield dric.funder.findMany({ include: { projects: true } });
                const projects = yield dric.project.findMany({ include: { funder: true } });
                const investigators = yield dric.investigator.findMany();
                if (funders.length && projects.length && investigators.length) {
                    res.status(200).json({ funders, projects, investigators });
                }
                else {
                    res.status(204).json({ message: `No record found` });
                }
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ message: error.message });
            }
        });
    }
    // Dashboard Statistics
    runCountries(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(__dirname + '../util/countries.json');
                const data = require(__dirname + '/../../util/countries.json');
                let count = 0;
                if (data.length) {
                    for (const row of data) {
                        const dt = {
                            longName: row.long_name,
                            shortName: row.short_name.split('/')[0].trim(),
                            code: Number(row.code.split(',')[0].trim()),
                            id: (0, uuid_1.v4)()
                        };
                        const resp = yield dric.country.create({ data: dt });
                        if (resp)
                            count += 1;
                    }
                    res.json(count);
                }
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.default = DricController;

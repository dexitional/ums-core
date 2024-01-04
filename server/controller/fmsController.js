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
const evs = new evsModel_1.default();
const Auth = new authModel_1.default();
class FmsController {
    // Loaders
    fetchColleges(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield evs.fetchColleges();
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
    fetchFaculties(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield evs.fetchFaculties(Number(req.params.collegeId));
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
    fetchDepartments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield evs.fetchDepartments(Number(req.params.facultyId));
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
    fetchCandidates(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield evs.fetchCandidates(Number(req.params.deptId));
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
    fetchCandidate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const keyword = req.query.keyword;
                const resp = yield evs.fetchCandidate(keyword);
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
    // Submission
    fetchVoters(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield evs.fetchVotesByVoters();
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
    fetchVotes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield evs.fetchVotesByCandidates();
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
    fetchVote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield evs.fetchVote(req.params.regno);
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
    postVote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vote = yield evs.fetchVote(req.body.regno);
                if (!vote.length) {
                    const setting = yield evs.fetchActiveSetting();
                    const data = Object.assign(Object.assign({}, req.body), { setting_id: setting.id });
                    const resp = yield evs.postVote(data);
                    if (resp) {
                        res.status(200).json(resp);
                    }
                    else {
                        res.status(204).json({ message: `no records found` });
                    }
                }
                else {
                    res.status(202).json({ message: `You have already submitted a vote !` });
                }
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ message: error.message });
            }
        });
    }
    updateVote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield evs.updateVote(req.params.regno, req.body);
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
    // Roles
    fetchRoles(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const appId = (_a = req.query.appId) !== null && _a !== void 0 ? _a : 7;
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
                console.log(uid);
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
}
exports.default = FmsController;

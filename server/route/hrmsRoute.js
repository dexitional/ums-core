"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const evsController_1 = __importDefault(require("../controller/evsController"));
class HrsRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.controller = new evsController_1.default();
        this.initializeRoute();
    }
    initializeRoute() {
        // ***** Lecture Nomination System Route ****** //
        /* Filter Routes */
        this.router.get('/colleges', this.controller.fetchColleges);
        this.router.get('/colleges/:collegeId/faculties', this.controller.fetchFaculties);
        this.router.get('/faculties/:facultyId/departments', this.controller.fetchDepartments);
        this.router.get('/departments/:deptId/candidates', this.controller.fetchCandidates);
        this.router.get('/search', this.controller.fetchCandidate);
        /* Submission Routes */
        this.router.get('/voters', this.controller.fetchVoters);
        this.router.get('/votes', this.controller.fetchVotes);
        this.router.get('/votes/:regno', this.controller.fetchVote);
        this.router.post('/votes', this.controller.postVote);
        this.router.patch('/votes/:regno', this.controller.updateVote);
        /* roles */
        this.router.get('/roles', this.controller.fetchRoles);
        this.router.get('/roles/:id', this.controller.fetchRole);
        this.router.post('/roles', this.controller.postRole);
        this.router.patch('/roles/:id', this.controller.updateRole);
        this.router.delete('/roles/:id', this.controller.deleteRole);
    }
}
exports.default = new HrsRoute().router;

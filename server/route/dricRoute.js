"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dricController_1 = __importDefault(require("../controller/dricController"));
class DricRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.controller = new dricController_1.default();
        this.initializeRoute();
    }
    initializeRoute() {
        /* funders */
        this.router.get('/funders', this.controller.fetchFunders);
        this.router.get('/funders/:id', this.controller.fetchFunder);
        this.router.post('/funders', this.controller.postFunder);
        this.router.patch('/funders/:id', this.controller.updateFunder);
        this.router.delete('/funders/:id', this.controller.deleteFunder);
        /* project */
        this.router.get('/projects', this.controller.fetchProjects);
        this.router.get('/projects/:id', this.controller.fetchProject);
        this.router.get('/projects/:id/phases', this.controller.fetchProjectPhases);
        this.router.post('/projects', this.controller.postProject); // Needs funderId
        this.router.patch('/projects/:id', this.controller.updateProject);
        this.router.delete('/projects/:id', this.controller.deleteProject);
        /* personnel */
        this.router.get('/personels', this.controller.fetchPersonels);
        this.router.get('/personels/:id', this.controller.fetchPersonel);
        this.router.post('/personels', this.controller.postPersonel);
        this.router.patch('/personels/:id', this.controller.updatePersonel);
        this.router.delete('/personels/:id', this.controller.deletePersonel);
        /* investigator */
        this.router.get('/investigators', this.controller.fetchInvestigators);
        this.router.get('/investigators/:id', this.controller.fetchInvestigator);
        this.router.post('/investigators', this.controller.postInvestigator);
        this.router.patch('/investigators/:id', this.controller.updateInvestigator);
        this.router.delete('/investigators/:id', this.controller.deleteInvestigator);
        /* phase */
        this.router.get('/phases', this.controller.fetchPhases);
        this.router.get('/phases/:id', this.controller.fetchPhase);
        this.router.get('/phases/:id/activities', this.controller.fetchPhaseActivities);
        this.router.post('/phases', this.controller.postPhase); // Needs projectId
        this.router.patch('/phases/:id', this.controller.updatePhase);
        this.router.delete('/phases/:id', this.controller.deletePhase);
        /* activity */
        this.router.get('/activities', this.controller.fetchActivities);
        this.router.get('/activities/:id', this.controller.fetchActivity);
        this.router.post('/activities', this.controller.postActivity); // Needs phaseId
        this.router.patch('/activities/:id', this.controller.updateActivity);
        this.router.delete('/activities/:id', this.controller.deleteActivity);
        /* roles */
        this.router.get('/roles', this.controller.fetchRoles);
        this.router.get('/roles/:id', this.controller.fetchRole);
        this.router.post('/roles', this.controller.postRole);
        this.router.patch('/roles/:id', this.controller.updateRole);
        this.router.delete('/roles/:id', this.controller.deleteRole);
        /* Countries */
        this.router.get('/countries', this.controller.fetchCountries);
        /* Dashboard */
        this.router.get('/dashboard', this.controller.fetchDashboard);
        this.router.get('/run-countries', this.controller.runCountries);
    }
}
exports.default = new DricRoute().router;

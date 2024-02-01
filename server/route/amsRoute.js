"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const amsController_1 = __importDefault(require("../controller/amsController"));
class AmsRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.controller = new amsController_1.default();
        this.initializeRoute();
    }
    initializeRoute() {
        /* Session */
        this.router.get('/sessions', this.controller.fetchSessions);
        this.router.get('/sessions/list', this.controller.fetchSessionList);
        this.router.get('/sessions/:id', this.controller.fetchSession);
        this.router.get('/sessions/:id/activate', this.controller.ActivateSession);
        this.router.post('/sessions', this.controller.postSession);
        this.router.patch('/sessions/:id', this.controller.updateSession);
        this.router.delete('/sessions/:id', this.controller.deleteSession);
        /* Voucher */
        this.router.get('/vouchers', this.controller.fetchVouchers);
        this.router.get('/vouchers/list', this.controller.fetchVoucherList);
        this.router.get('/vouchers/:id', this.controller.fetchVoucher);
        this.router.post('/vouchers/:id/sell', this.controller.sellVoucher);
        this.router.post('/vouchers/:id/recover', this.controller.recoverVoucher);
        this.router.post('/vouchers', this.controller.postVoucher);
        this.router.patch('/vouchers/:id', this.controller.updateVoucher);
        this.router.delete('/vouchers/:id', this.controller.deleteVoucher);
        /* Letter */
        this.router.get('/letters', this.controller.fetchLetters);
        this.router.get('/letters/list', this.controller.fetchLetterList);
        this.router.get('/letters/:id', this.controller.fetchLetter);
        this.router.post('/letters', this.controller.postLetter);
        this.router.patch('/letters/:id', this.controller.updateLetter);
        this.router.delete('/letters/:id', this.controller.deleteLetter);
        /* Applicant */
        this.router.get('/applicants', this.controller.fetchApplicants);
        this.router.get('/applicants/:id', this.controller.fetchApplicant);
        this.router.get('/applicants/:id/preview', this.controller.fetchApplicantPreview);
        this.router.post('/applicants', this.controller.postApplicant);
        this.router.patch('/applicants/:id', this.controller.updateApplicant);
        this.router.delete('/applicants/:id', this.controller.deleteApplicant);
        /* Shortlist */
        this.router.get('/shortlists', this.controller.fetchShortlists);
        this.router.get('/shortlists/:id', this.controller.fetchShortlist);
        this.router.post('/shortlists', this.controller.postShortlist);
        this.router.patch('/shortlists/:id', this.controller.updateShortlist);
        this.router.delete('/shortlists/:id', this.controller.deleteShortlist);
        /* Matriculants */
        this.router.get('/matriculants', this.controller.fetchMatriculants);
        this.router.get('/matriculants/list', this.controller.fetchMatriculantList);
        this.router.get('/matriculants/:id', this.controller.fetchMatriculant);
        this.router.post('/matriculants', this.controller.postMatriculant);
        this.router.patch('/matriculants/:id', this.controller.updateMatriculant);
        this.router.delete('/matriculants/:id', this.controller.deleteMatriculant);
        /*  Helpers */
        this.router.get('/subjects/list', this.controller.fetchMatriculantList);
        this.router.get('/institutes/list', this.controller.fetchMatriculantList);
        this.router.get('/certificates/list', this.controller.fetchMatriculantList);
        this.router.get('/gradeweights/list', this.controller.fetchMatriculantList);
        this.router.get('/stages/list', this.controller.fetchMatriculantList);
        this.router.get('/applytypes/list', this.controller.fetchMatriculantList);
        this.router.get('/applytypes/list', this.controller.fetchMatriculantList);
    }
}
exports.default = new AmsRoute().router;

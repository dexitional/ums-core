"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const aisController_1 = __importDefault(require("../controller/aisController"));
class AisRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.controller = new aisController_1.default();
        this.initializeRoute();
    }
    initializeRoute() {
        /* Student */
        this.router.get('/students', this.controller.fetchStudents);
        this.router.get('/students/:id', this.controller.fetchStudent);
        this.router.post('/students', this.controller.postStudent);
        this.router.patch('/students/:id', this.controller.updateStudent);
        this.router.delete('/students/:id', this.controller.deleteStudent);
        /* Run Scripts */
        this.router.get('/run-data', this.controller.runData);
    }
}
exports.default = new AisRoute().router;

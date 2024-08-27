import { Router } from 'express';
import AisController from '../controller/aisController';

const { voteLimiter } = require("../middleware/rateLimitterFlexible");
const { verifyToken } = require("../middleware/verifyToken");

class AisRoute {
    
    router = Router();
    controller = new AisController();

    constructor(){
       this.initializeRoute();
    }

    initializeRoute(){
      this.router.get('/test', this.controller.fetchTest);
      /* Calendar Sessions */
      this.router.get('/sessions', [verifyToken], this.controller.fetchSessions);
      this.router.get('/sessions/list', [verifyToken], this.controller.fetchSessionList);
      this.router.get('/sessions/:id', [verifyToken], this.controller.fetchSession);
      // this.router.get('/students/:id/transcript', [verifyToken], this.controller.fetchStudentTranscript);
      // this.router.get('/students/:id/finance', [verifyToken], this.controller.fetchStudentFinance);
      // this.router.get('/students/:id/activity', [verifyToken], this.controller.fetchStudentActivity);
      this.router.post('/sessions/activate', [verifyToken], this.controller.activateSession);
      this.router.post('/sessions', [verifyToken], this.controller.postSession);
      this.router.patch('/sessions/:id', [verifyToken], this.controller.updateSession);
      this.router.delete('/sessions/:id', [verifyToken], this.controller.deleteSession);
       
      /* Student */
      this.router.get('/students', [verifyToken], this.controller.fetchStudents);
      this.router.get('/students/:id', [verifyToken], this.controller.fetchStudent);
      this.router.get('/students/:id/transcript', [verifyToken], this.controller.fetchStudentTranscript);
      this.router.get('/students/:id/finance', [verifyToken], this.controller.fetchStudentFinance);
      this.router.get('/students/:id/activity', [verifyToken], this.controller.fetchStudentActivity);
      this.router.post('/students/progress', [verifyToken], this.controller.postProgression);
      this.router.post('/students/stage', [verifyToken], this.controller.stageStudent);
      this.router.post('/students/reset', [verifyToken], this.controller.resetStudent);
      this.router.post('/students/photo', [verifyToken], this.controller.changePhoto);
      this.router.post('/students/indexgen', [verifyToken], this.controller.generateIndex);
      this.router.post('/students/mailgen', [verifyToken], this.controller.generateEmail);
      this.router.post('/students', [verifyToken], this.controller.postStudent);
      this.router.patch('/students/:id', [verifyToken], this.controller.updateStudent);
      this.router.delete('/students/:id', [verifyToken], this.controller.deleteStudent);
      
      /* Program */
      this.router.get('/programs', [verifyToken], this.controller.fetchPrograms);
      this.router.get('/programs/list', [verifyToken], this.controller.fetchProgramList);
      this.router.get('/programs/:id', [verifyToken], this.controller.fetchProgram);
      this.router.get('/programs/:id/curriculum', [verifyToken], this.controller.fetchProgramStructure);
      this.router.get('/programs/:id/students', [verifyToken], this.controller.fetchProgramStudents);
      this.router.get('/programs/:id/statistics', [verifyToken], this.controller.fetchProgramStatistics);
      this.router.post('/programs', [verifyToken], this.controller.postProgram);
      this.router.patch('/programs/:id', [verifyToken], this.controller.updateProgram);
      this.router.delete('/programs/:id', [verifyToken], this.controller.deleteProgram);

       /* Program */
       this.router.get('/majors/list', [verifyToken], this.controller.fetchMajorList);
     
      /* Course */
      this.router.get('/courses', [verifyToken], this.controller.fetchCourses);
      this.router.get('/courses/list', [verifyToken], this.controller.fetchCourseList);
      this.router.get('/courses/:id', [verifyToken], this.controller.fetchCourse);
      this.router.post('/courses', [verifyToken], this.controller.postCourse);
      this.router.patch('/courses/:id', [verifyToken], this.controller.updateCourse);
      this.router.delete('/courses/:id', [verifyToken], this.controller.deleteCourse);
      
      /* Scheme */
      this.router.get('/schemes', [verifyToken], this.controller.fetchSchemes);
      this.router.get('/schemes/list', [verifyToken], this.controller.fetchSchemeList);
      this.router.get('/schemes/:id', [verifyToken], this.controller.fetchScheme);
      this.router.post('/schemes', [verifyToken], this.controller.postScheme);
      this.router.patch('/schemes/:id', [verifyToken], this.controller.updateScheme);
      this.router.delete('/schemes/:id', [verifyToken], this.controller.deleteScheme);
      
      // /* Curriculum */
      this.router.get('/curriculums', [verifyToken], this.controller.fetchCurriculums);
      this.router.get('/curriculums/:id', [verifyToken], this.controller.fetchCurriculum);
      this.router.post('/curriculums', [verifyToken], this.controller.postCurriculum);
      this.router.patch('/curriculums/:id', [verifyToken], this.controller.updateCurriculum);
      this.router.delete('/curriculums/:id', [verifyToken], this.controller.deleteCurriculum);

      // /* Registration */
      this.router.get('/registrations', [verifyToken], this.controller.fetchRegistrations); // Registration Logs - only active semester
      this.router.get('/registrations/mount/:indexno', [verifyToken], this.controller.fetchRegistrationMount); // Fetch Mounted Courses
      this.router.get('/registrations/:indexno', [verifyToken], this.controller.fetchRegistration); // Fetch Registration Slip
      this.router.post('/registrations', [verifyToken], this.controller.postRegistration); // Send New Registration
      this.router.patch('/registrations/:indexno', [verifyToken], this.controller.updateRegistration); // Update Registration
      this.router.delete('/registrations/:indexno', [verifyToken], this.controller.deleteRegistration);

      /* Sheet */
      this.router.get('/sheets', [verifyToken], this.controller.fetchSheets);
      this.router.get('/sheets/my', [verifyToken], this.controller.fetchMySheets);
      this.router.get('/sheets/:id', [verifyToken], this.controller.fetchSheet);
      this.router.post('/sheets/stage', [verifyToken], this.controller.stageSheet);
      this.router.post('/sheets/load', [verifyToken], this.controller.loadSheet);
      this.router.post('/sheets/save', [verifyToken], this.controller.saveSheet);
      this.router.post('/sheets', [verifyToken], this.controller.postSheet);
      this.router.patch('/sheets/:id/submit', [verifyToken], this.controller.submitSheet);
      this.router.patch('/sheets/:id/close', [verifyToken], this.controller.closeSheet);
      this.router.patch('/sheets/:id/publish', [verifyToken], this.controller.publishSheet);
      this.router.patch('/sheets/:id/unpublish', [verifyToken], this.controller.unpublishSheet);
      this.router.patch('/sheets/:id', [verifyToken], this.controller.updateSheet);
      this.router.delete('/sheets/:id', [verifyToken], this.controller.deleteSheet);

       /* Backlog */
       this.router.get('/backlogs', [verifyToken], this.controller.fetchBacklogs);
       this.router.get('/backlogs/:id', [verifyToken], this.controller.fetchBacklog);
       this.router.post('/backlogs/approve', [verifyToken], this.controller.approveBacklog);
       this.router.post('/backlogs', [verifyToken], this.controller.postBacklog);
       this.router.patch('/backlogs/:id', [verifyToken], this.controller.updateBacklog);
       this.router.delete('/backlogs/:id', [verifyToken], this.controller.deleteBacklog);
       
      
       /* Progression */
       this.router.get('/progression', [verifyToken], this.controller.fetchProgressions);
       this.router.get('/progression/:id', [verifyToken], this.controller.fetchProgression);
       this.router.post('/progression', [verifyToken], this.controller.postAllProgression);
       this.router.post('/progression/student', [verifyToken], this.controller.postProgression);
      
       /* Deferment */
       this.router.get('/deferments', [verifyToken], this.controller.fetchDeferments);
       this.router.get('/deferments/list', [verifyToken], this.controller.fetchDefermentList);
       this.router.get('/deferments/:id', [verifyToken], this.controller.fetchDeferment);
       this.router.post('/deferments', [verifyToken], this.controller.postDeferment);
       this.router.patch('/deferments/:id', [verifyToken], this.controller.updateDeferment);
       this.router.delete('/deferments/:id', [verifyToken], this.controller.deleteDeferment);

      /* Transwift */
      this.router.get('/transwifts', [verifyToken], this.controller.fetchSchemes);
      this.router.get('/transwifts/list', [verifyToken], this.controller.fetchSchemeList);
      this.router.get('/transwifts/:id', [verifyToken], this.controller.fetchScheme);
      this.router.post('/transwifts', [verifyToken], this.controller.postScheme);
      this.router.patch('/transwifts/:id', [verifyToken], this.controller.updateScheme);
      this.router.delete('/transwifts/:id', [verifyToken], this.controller.deleteScheme);
       
      /* Circulars */
      this.router.get('/circulars', [verifyToken], this.controller.fetchSchemes);
      this.router.get('/circulars/list', [verifyToken], this.controller.fetchSchemeList);
      this.router.get('/circulars/:id', [verifyToken], this.controller.fetchScheme);
      this.router.post('/circulars', [verifyToken], this.controller.postScheme);
      this.router.patch('/circulars/:id', [verifyToken], this.controller.updateScheme);
      this.router.delete('/circulars/:id', [verifyToken], this.controller.deleteScheme);
       
      /* Resit */
      this.router.get('/resits', [verifyToken], this.controller.fetchSchemes);
      this.router.get('/resits/list', [verifyToken], this.controller.fetchSchemeList);
      this.router.get('/resits/:id', [verifyToken], this.controller.fetchScheme);
      this.router.post('/resits', [verifyToken], this.controller.postScheme);
      this.router.patch('/resits/:id', [verifyToken], this.controller.updateScheme);
      this.router.delete('/resits/:id', [verifyToken], this.controller.deleteScheme);
        

       /* Graduations */
       this.router.get('/graduations', [verifyToken], this.controller.fetchSchemes);
       this.router.get('/graduations/list', [verifyToken], this.controller.fetchSchemeList);
       this.router.get('/graduations/:id', [verifyToken], this.controller.fetchScheme);
       this.router.post('/graduations', [verifyToken], this.controller.postScheme);
       this.router.patch('/graduations/:id', [verifyToken], this.controller.updateScheme);
       this.router.delete('/graduations/:id', [verifyToken], this.controller.deleteScheme);
         
 

       /* Staff */
       this.router.get('/staff', [verifyToken], this.controller.fetchStaffs);
       this.router.get('/staff/:id', [verifyToken], this.controller.fetchStaff);
       this.router.post('/staff/stage', [verifyToken], this.controller.stageStaff);
       this.router.post('/staff/reset', [verifyToken], this.controller.resetStaff);
       this.router.post('/staff/photo', [verifyToken], this.controller.changeStaffPhoto);
       this.router.post('/staff/role', [verifyToken], this.controller.staffRole);
       this.router.post('/staff', [verifyToken], this.controller.postStaff);
       this.router.patch('/staff/:id', [verifyToken], this.controller.updateStaff);
       this.router.delete('/staff/:id', [verifyToken], this.controller.deleteStaff);
      
       
      /* Units  */
      this.router.get('/departments', [verifyToken], this.controller.fetchDepartments);
      this.router.get('/faculties', [verifyToken], this.controller.fetchFaculties);
      this.router.get('/units', [verifyToken], this.controller.fetchUnits);
      this.router.get('/units/list', [verifyToken], this.controller.fetchUnitList);
      this.router.get('/units/:id', [verifyToken], this.controller.fetchUnit);
      this.router.post('/units', [verifyToken], this.controller.postUnit);
      this.router.patch('/units/:id', [verifyToken], this.controller.updateUnit);
      this.router.delete('/units/:id', [verifyToken], this.controller.deleteUnit);

      /* Jobs */
      this.router.get('/jobs', [verifyToken], this.controller.fetchJobs);
      this.router.get('/jobs/list', [verifyToken], this.controller.fetchJobList);
      this.router.get('/jobs/:id', [verifyToken], this.controller.fetchJob);
      this.router.post('/jobs', [verifyToken], this.controller.postJob);
      this.router.patch('/jobs/:id', [verifyToken], this.controller.updateJob);
      this.router.delete('/jobs/:id', [verifyToken], this.controller.deleteJob);

       /* User Roles */
       this.router.get('/uroles', [verifyToken], this.controller.fetchURoles);
       this.router.get('/uroles/:id', [verifyToken], this.controller.fetchURole);
       this.router.post('/uroles/list', [verifyToken], this.controller.fetchURoleList);
       this.router.post('/uroles', [verifyToken], this.controller.postURole);
       this.router.patch('/uroles/:id', [verifyToken], this.controller.updateURole);
       this.router.delete('/uroles/:id', [verifyToken], this.controller.deleteURole);
       this.router.post('/checkuser', [verifyToken], this.controller.checkUser);
       

      /* App Roles */
      this.router.get('/aroles/list', [verifyToken], this.controller.fetchARoleList);

      /* Sheets */
      //  this.router.get('/sheets', [verifyToken], this.controller.fetchSheets);
      //  this.router.get('/sheets/stage', [verifyToken], this.controller.stageSheet); // Stage Sheet
      //  this.router.get('/sheets/my/:id', [verifyToken], this.controller.fetchMySheet); // By Assignee
      //  this.router.get('/sheets/:id', [verifyToken], this.controller.fetchSheet); // Open Sheet
      //  this.router.post('/sheets', [verifyToken], this.controller.postSheet); // Create Sheet
      //  this.router.patch('/sheets/:id', [verifyToken], this.controller.updateSheet); // Update Sheet
      //  this.router.delete('/sheets/:id', [verifyToken], this.controller.deleteSheet); // Delete Sheet

      /* Utility */
      this.router.get('/countries', [verifyToken], this.controller.fetchCountries);
      this.router.get('/regions', [verifyToken], this.controller.fetchRegions);
      this.router.get('/religions', [verifyToken], this.controller.fetchReligions);
      this.router.get('/disabilities', [verifyToken], this.controller.fetchDisabilities);
      this.router.get('/categories', [verifyToken], this.controller.fetchCategories);
      this.router.get('/relations', [verifyToken], this.controller.fetchRelations);
      this.router.get('/marital', [verifyToken], this.controller.fetchMarital);
      this.router.get('/titles', [verifyToken], this.controller.fetchTitles);
      this.router.get('/vendors', [verifyToken], this.controller.fetchVendors);
      this.router.get('/collectors', [verifyToken], this.controller.fetchCollectors);
     

      /* Run Scripts */
      this.router.get('/run-data',  this.controller.runData);
      this.router.get('/run-account', this.controller.runAccount);   
    }

}

export default new AisRoute().router;
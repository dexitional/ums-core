import { Router } from 'express'
import AisController from '../controller/aisController'

class AisRoute {
    
    router = Router();
    controller = new AisController();

    constructor(){
       this.initializeRoute();
    }

    initializeRoute(){
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

export default new AisRoute().router;
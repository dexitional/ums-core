import { Router } from 'express'
import AuthController from '../controller/authController'

class AuthRoute {
    
    router = Router();
    controller = new AuthController();

    constructor(){
       this.initializeRoute();
    }

    initializeRoute(){
      /* Authentication Providers */
       this.router.post('/credential', this.controller.authenticateWithCredential);
       this.router.post('/google', this.controller.authenticateWithGoogle);
      /* Account Management - Change Password */
       this.router.post('/password', this.controller.changePassword);
      /* Photo Management */
       this.router.get('/photos', this.controller.fetchPhoto);
       this.router.post('/photos', this.controller.postPhoto);
       this.router.post('/photos/rotate', this.controller.rotatePhoto);
       this.router.delete('/photos/:id', this.controller.removePhoto);
    }

}

export default new AuthRoute().router;
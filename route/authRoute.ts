import { Router } from 'express'
import AuthController from '../controller/authController'

class AuthRoute {
    
    router = Router();
    controller = new AuthController();

    constructor(){
       this.initializeRoute();
    }

    initializeRoute(){
       this.router.post('/credential', this.controller.authenticateWithCredential);
       this.router.post('/google', this.controller.authenticateWithGoogle);
      //  this.router.post('/appkey', this.controller.authenticateWithKey);
      /* Change Password */
      this.router.post('/password', this.controller.changePassword);
    
    }

}

export default new AuthRoute().router;
import { Router } from "express";

import AuthController from "../../controllers/auth.controller";
import { validateBodyMiddleware } from "../../middleware/validationMiddleware";
import Login from "../../validations/auth.validation";

export default class AuthRouter {
    private router = Router ();
    private readonly authController: AuthController;

    constructor () {
        this.authController = new AuthController();
        this.configureRoutes();
    }

    /**
     * 
     * @returns Router
     */
    public getRouter (): Router {
        return this.router;
    }

    /**
     * 
     * @param {Router} router -  
     */
    public setRouter (router: Router): void {
        this.router = router;
    }

    /**
     * 
     */
    private configureRoutes(): void {
        this.router.post('/login', validateBodyMiddleware(Login), this.authController.login);

    }

}

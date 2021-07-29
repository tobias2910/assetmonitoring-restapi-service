import { Router } from "express";

import AuthController from "../../controllers/auth.controller";
import { validateBodyMiddleware } from "../../middleware/validationMiddleware";
import { Login, Refresh } from "../../validations/auth.validation";

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

        /**
         * @swagger
         * tags:
         *   name: Auth
         *   description: The authentication endpoint
        */

        /**
         * @swagger
         * /auth/login:
         *   post:
         *     summary: Login to obtain an access bearer token that can be used for the main endpoints.
         *     tags: [Auth]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             required:
         *               - email
         *               - password
         *             properties:
         *               email:
         *                 type: string
         *                 format: email
         *               password:
         *                 type: string
         *                 format: password
         *             example:
         *               email: fake@example.com
         *               password: Password_1
         *     responses:
         *       "200":
         *         description: OK
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 tokens:
         *                   $ref: '#/components/schemas/AuthTokens'
         *       "401":
         *         description: Invalid email or password
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/Error'
         *             example:
         *               code: 401
         *               message: Invalid email or password
         */
        this.router.post('/login', validateBodyMiddleware(Login), this.authController.login);

        /**
         * @swagger
         * /auth/refresh:
         *   post:
         *     summary: Refreshes the access token by using the refresh token
         *     tags: [Auth]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             required:
         *               - refreshToken
         *             properties:
         *               refreshToken:
         *                 type: string
         *             example:
         *               refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTAxYTlkNWUzNzQ1YTA5NzUyMGUxYWIiLCJpYXQiOjE2Mjc1ODU2MzksImV4cCI6MTYyNzY3MjAzOSwidHlwZSI6InJlZnJlc2gifQ.doDWUHH0DDHN0_--VmQUHfnVPi3BsDdKJXLHeTYwkWU
         *     responses:
         *       "200":
         *         description: OK
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/AuthTokens'
         *       "401":
         *         $ref: '#/components/responses/Unauthorized'
         */
        this.router.post('/refresh', validateBodyMiddleware(Refresh) , this.authController.refresh);
    }

}

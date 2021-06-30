import { Router } from "express";
import { validateBodyMiddleware } from "../../middleware/validationMiddleware";
import { CreateUser } from "../../validations/user.validation";
import UserController from "../../controllers/user.controller";
import { registerLimiter } from "../../config/rateLimiter";

export default class UserRouter {
    private router: Router;
    private readonly userController: UserController;

    constructor () {
        this.router = Router();
        this.userController = new UserController();
        this.configureRouter();
    }

    public getRouter (): Router {
        return this.router;
    }

    public setRouter (router: Router): void {
        this.router = router;
    }

    private configureRouter (): void {
        this.router.use(registerLimiter);
        this.router.post('/', validateBodyMiddleware(CreateUser), this.userController.createNewUser);
        this.router.get('/');
        this.router.get('/:UserId');
    }

}
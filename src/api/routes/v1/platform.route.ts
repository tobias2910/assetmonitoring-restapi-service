import { Router } from "express";
import { validateQueryMiddleware } from "../../middleware/validationMiddleware";
import { Analysis, Asset } from "../../validations/analysis.validation";
import PlatformController from "../../controllers/platform.controller";

export default class PlatformRoute {
    private router: Router;
    private readonly platformController: PlatformController;

    constructor () {
        this.router = Router();
        this.platformController = new PlatformController();
        this.configureRouter();
    }

    public getRouter (): Router {
        return this.router;
    }

    public setRouter (router: Router): void {
        this.router = router;
    }

    private configureRouter (): void {
        this.router.get('/', validateQueryMiddleware(Asset), this.platformController.obtainPlatformInformation);
        this.router.get('/analysis', validateQueryMiddleware(Analysis), this.platformController.obtainAggregatedPlatformSentiment);
    }

}

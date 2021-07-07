import { Router } from "express";
import { validateQueryMiddleware } from "../../middleware/validationMiddleware";
import Analysis from "../../validations/analysis.validation";
import AnalysisController from "../../controllers/analysis.controller";

export default class AnalysisRoute {
    private router: Router;
    private readonly analysisController: AnalysisController;

    constructor () {
        this.router = Router();
        this.analysisController = new AnalysisController();
        this.configureRouter();
    }

    public getRouter (): Router {
        return this.router;
    }

    public setRouter (router: Router): void {
        this.router = router;
    }

    private configureRouter (): void {
        // this.router.use(generalLimiter);
        this.router.get('/', validateQueryMiddleware(Analysis), this.analysisController.obtainGeneralData);
        this.router.get('/aggregated', validateQueryMiddleware(Analysis), this.analysisController.obtainAggregatedData);
    }

}

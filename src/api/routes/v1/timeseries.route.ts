import { Router } from "express";
import TimeSeriesController from "../../controllers/timeseries.controller";
import { validateQueryMiddleware } from "../../middleware/validationMiddleware";
import { Analysis } from "../../validations/analysis.validation";
import { authorizeUser } from "../../middleware/authMiddleware";

class TimeSeriesRouter {
    private router: Router;
    private readonly timeSeriesController: TimeSeriesController;

    constructor () {
        this.router = Router();
        this.timeSeriesController= new TimeSeriesController();
        this.configureRouter();
    };

    public getRouter (): Router {
        return this.router;
    };

    public setRouter (router: Router): void {
        this.router = router;
    };

    private configureRouter (): void {
        /**
         * @swagger
         * tags:
         *   name: TimeSeries
         *   description: This endpoint provides aggregated time series information.
        */

        /**
         * @swagger
         * /timeseries:
         *   get:
         *     summary: Provides the information for the total mentions and average sentiment per day for the specified asset(s).
         *     tags: [TimeSeries]
         *     security:
         *      - bearerAuth: []
         *     parameters:
         *       - $ref: '#/components/parameters/AssetType'
         *       - $ref: '#/components/parameters/Name'
         *       - $ref: '#/components/parameters/Platform'
         *       - $ref: '#/components/parameters/Symbol'
         *       - $ref: '#/components/parameters/Source'
         *       - $ref: '#/components/parameters/StartDate'
         *       - $ref: '#/components/parameters/EndDate'
         *     responses:
         *       "200":
         *         description: OK
         *         content:
         *           application/json:
         *             schema:
         *               type: array
         *               items:
         *                  $ref: '#/components/schemas/TimeSeries'
         *       "400":
         *         $ref: '#/components/responses/WrongQuery' 
         *       "401":
         *         $ref: '#/components/responses/Unauthorized'
         */       
         this.router.get('/', authorizeUser(), validateQueryMiddleware(Analysis), this.timeSeriesController.obtainTimeSeriesData);
    };
}

export default TimeSeriesRouter;

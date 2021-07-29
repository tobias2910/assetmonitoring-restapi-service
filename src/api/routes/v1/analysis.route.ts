import { Router } from "express";
import { validateQueryMiddleware } from "../../middleware/validationMiddleware";
import { Analysis } from "../../validations/analysis.validation";
import AnalysisController from "../../controllers/analysis.controller";
import { authorizeUser } from "../../middleware/authMiddleware";

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
        /**
         * @swagger
         * tags:
         *   name: Analysis
         *   description: Provides the analysis information for the identified assets.
        */

        /**
         * @swagger
         * /analysis:
         *   get:
         *     summary: Provides the general analysis information including the timestamp as well as the sentiment that is based on the post where the asset was extracted.
         *     tags: [Analysis]
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
         *                  $ref: '#/components/schemas/Analysis'
         *       "400":
         *         $ref: '#/components/responses/WrongQuery' 
         *       "401":
         *         $ref: '#/components/responses/Unauthorized'
         */       
        this.router.get('/', authorizeUser(), validateQueryMiddleware(Analysis), this.analysisController.obtainGeneralData);

        /**
         * @swagger
         * /analysis/aggregated:
         *   get:
         *     summary: Provides the aggregated overview for the analysis including the total number of mentions as well as the average sentiment across all platforms and sources.
         *     tags: [Analysis]
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
         *                  $ref: '#/components/schemas/AggregatedAnalysis'
         *       "400":
         *         $ref: '#/components/responses/WrongQuery' 
         *       "401":
         *         $ref: '#/components/responses/Unauthorized'
         */   
        this.router.get('/aggregated', authorizeUser(), validateQueryMiddleware(Analysis), this.analysisController.obtainAggregatedData);
    }

}

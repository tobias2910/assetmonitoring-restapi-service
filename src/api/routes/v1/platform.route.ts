import { Router } from "express";
import { validateQueryMiddleware } from "../../middleware/validationMiddleware";
import { Analysis, Asset } from "../../validations/analysis.validation";
import PlatformController from "../../controllers/platform.controller";
import { authorizeUser } from "../../middleware/authMiddleware";

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

        /**
         * @swagger
         * tags:
         *   name: Platform
         *   description: Provides general platform as well as analysis relevant information
        */

        /**
         * @swagger
         * /platform:
         *   get:
         *     summary: Provides an overview of the monitored platforms and the corresponding channels.
         *     tags: [Platform]
         *     security:
         *      - bearerAuth: []
         *     parameters:
         *     - $ref: '#/components/parameters/AssetType'
         *     responses:
         *       "200":
         *         description: OK
         *         content:
         *           application/json:
         *             schema:
         *               type: array
         *               items:
         *                  $ref: '#/components/schemas/Platform'
         *       "400":
         *         $ref: '#/components/responses/WrongQuery' 
         *       "401":
         *         $ref: '#/components/responses/Unauthorized'
         */        
        this.router.get('/', authorizeUser(), validateQueryMiddleware(Asset), this.platformController.obtainPlatformInformation);
        /**
        * @swagger
        * /platform/analysis:
        *   get:
        *       summary: Provides an aggregated overview for all identified assets that matches the provided queries.
        *       tags: [Platform]
        *       security:
        *       - bearerAuth: []
        *       parameters:
        *       - $ref: '#/components/parameters/AssetType'
        *       - $ref: '#/components/parameters/Name'
        *       - $ref: '#/components/parameters/Platform'
        *       - $ref: '#/components/parameters/Symbol'
        *       - $ref: '#/components/parameters/Source'
        *       - $ref: '#/components/parameters/StartDate'
        *       - $ref: '#/components/parameters/EndDate'
        *       responses:
        *         "200":
        *           description: OK
        *           content:
        *             application/json:
        *               schema:
        *                 type: array
        *                 items:
        *                    $ref: '#/components/schemas/PlatformAnalysis'
        *         "400":
        *           $ref: '#/components/responses/WrongQuery' 
        *         "401":
        *           $ref: '#/components/responses/Unauthorized'
        */
        this.router.get('/analysis', authorizeUser(), validateQueryMiddleware(Analysis), this.platformController.obtainAggregatedPlatformSentiment);
    }

}

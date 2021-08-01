import { Router } from "express";
import { validateBodyMiddleware, validateQueryMiddleware } from "../../middleware/validationMiddleware";
import { CreateAsset, GetAsset, UpdateAssetBody, UpdateAssetQuery } from "../../validations/asset.validation";
import AssetController from "../../controllers/asset.controller";
import { authorizeUser, validatePermissions } from "../../middleware/authMiddleware";
import roles from '../../config/roles';

export default class AnalysisRoute {
    private router: Router;
    private readonly assetController: AssetController;

    constructor () {
        this.router = Router();
        this.assetController = new AssetController();
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
         *   name: Asset
         *   description: The endpoint for creating, updating and obtaining asset information.
        */

        /**
         * @swagger
         * /asset:
         *   get:
         *     summary: Provides the asset information that matches the provided query.
         *     tags: [Asset]
         *     security:
         *      - bearerAuth: []
         *     parameters:
         *     - $ref: '#/components/parameters/AssetType'
         *     - $ref: '#/components/parameters/Name'
         *     - $ref: '#/components/parameters/Symbol'
         *     responses:
         *       "200":
         *         description: OK
         *         content:
         *           application/json:
         *             schema:
         *               type: array
         *               items:
         *                  $ref: '#/components/schemas/Asset'
         *       "400":
         *         $ref: '#/components/responses/WrongQuery' 
         *       "401":
         *         $ref: '#/components/responses/Unauthorized'
         */       
        this.router.get('/', authorizeUser(), validateQueryMiddleware(GetAsset), this.assetController.obtainAssetData);
        
        /**
         * @swagger
         * /asset:
         *   put:
         *     summary: Updates the requested asset information that matches the provided query.
         *     tags: [Asset]
         *     security:
         *     - bearerAuth: []
         *     requestBody:
         *       $ref: '#/components/requestBodies/UpdateAsset'
         *     parameters:
         *     - $ref: '#/components/parameters/AssetType'
         *     - $ref: '#/components/parameters/Symbol'
         *     responses:
         *       "200":
         *         description: OK
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/UpdateAsset'
         *       "400":
         *         $ref: '#/components/responses/WrongQuery' 
         *       "401":
         *         $ref: '#/components/responses/Unauthorized'
         */
        this.router.put('/', authorizeUser(), validatePermissions(roles.getRoles()[1]), validateQueryMiddleware(UpdateAssetQuery), validateBodyMiddleware(UpdateAssetBody),this.assetController.updateAssetData);
        
        /**
         * @swagger
         * /asset:
         *   post:
         *     summary: Create a new asset in the asset collection.
         *     tags: [Asset]
         *     security:
         *     - bearerAuth: []
         *     requestBody:
         *      $ref: '#/components/requestBodies/CreateAsset'
         *     responses:
         *       "200":
         *         description: OK
         *         content:
         *           application/json:
         *             schema:
         *               type: array
         *               items:
         *                  $ref: '#/components/schemas/Asset'
         *       "400":
         *         $ref: '#/components/responses/MissingBodyInfo' 
         *       "401":
         *         $ref: '#/components/responses/Unauthorized'
         */
        this.router.post('/', authorizeUser(), validatePermissions(roles.getRoles()[1]), validateBodyMiddleware(CreateAsset), this.assetController.createNewAsset);
    }

}

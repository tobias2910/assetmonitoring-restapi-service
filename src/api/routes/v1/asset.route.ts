import { Router } from "express";
import { validateBodyMiddleware, validateQueryMiddleware } from "../../middleware/validationMiddleware";
import { CreateAsset, GetAsset, UpdateAssetBody, UpdateAssetQuery } from "../../validations/asset.validation";
import AssetController from "../../controllers/asset.controller";

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
        // this.router.use(generalLimiter);
        this.router.get('/', validateQueryMiddleware(GetAsset), this.assetController.obtainAssetData);
        this.router.put('/', validateQueryMiddleware(UpdateAssetQuery), validateBodyMiddleware(UpdateAssetBody),this.assetController.updateAssetData);
        this.router.post('/', validateBodyMiddleware(CreateAsset), this.assetController.createNewAsset);
    }

}

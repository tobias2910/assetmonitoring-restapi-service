import { Router } from 'express';
import AnalysisRoute from './analysis.route';
import AssetRoute from './asset.route';
import AuthRouter from './auth.route';
import PlatformRouter from './platform.route'
import SwaggerRouter from './docs.route';
import UserRouter from './user.route';

export const router = Router ();

// Create instances of the routers
const analysisRoute = new AnalysisRoute();
const assetRoute = new AssetRoute();
const authRouter = new AuthRouter();
const userRouter = new UserRouter();
const platformRouter = new PlatformRouter();
const swaggerRouter = new SwaggerRouter();
// Register the routers
router.use('/analysis', analysisRoute.getRouter());
router.use('/asset', assetRoute.getRouter());
router.use('/auth', authRouter.getRouter());
router.use('/platform', platformRouter.getRouter());
router.use('/user',userRouter.getRouter());
// Swagger documentation
router.use(`/swagger`, swaggerRouter.getRouter());

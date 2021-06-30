import { Router } from 'express';
import AnalysisRoute from './analysis.route';
import AuthRouter from './auth.route';
import SwaggerRouter from './docs.route';
import UserRouter from './user.route';

export const router = Router ();

// Create instances of the routers
const analysisRoute = new AnalysisRoute();
const authRouter = new AuthRouter();
const userRouter = new UserRouter();
const swaggerRouter = new SwaggerRouter();
// Register the routers
router.use('/analysis', analysisRoute.getRouter());
router.use('/auth', authRouter.getRouter());
router.use('/user',userRouter.getRouter());
// Swagger documentation
router.use(`/swagger`, swaggerRouter.getRouter());

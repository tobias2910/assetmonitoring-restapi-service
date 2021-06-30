import { Request, Response, Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

import config from '../../docs/swagger.json';
import HttpException from '../../utils/httpException';

export default class SwaggerRouter {
    private router = Router ();

    constructor () {
        this.configureRoutes();
    }

    /**
     * 
     * @returns Router
     */
    public getRouter (): Router {
        return this.router;
    }

    /**
     * 
     * @param {Router} router -  
     */
    public setRouter (router: Router): void {
        this.router = router;
    }

    /**
     * 
     */
    private configureRoutes(): void {
        this.router.use('/', swaggerUi.serve);
        this.router.get('/', swaggerUi.setup(config, {
            explorer: true
        }));
        
        // Handle all other Methods
        this.router.all('/', (req: Request, res: Response) => {
            throw new HttpException(405, `Method '${req.method}' not allowed.`);
        })
    }
}
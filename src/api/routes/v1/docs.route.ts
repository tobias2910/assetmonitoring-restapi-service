import { Request, Response, Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

import { swaggerDefinition } from '../../docs/swagger';
import HttpException from '../../utils/httpException';

export default class SwaggerRouter {
    private router = Router ();
    private readonly specification = swaggerJsdoc({
        swaggerDefinition: swaggerDefinition,
        apis: ['./dist/api/docs/components.yml', './dist/api/routes/v1/*.js']
    })

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
        this.router.get('/', swaggerUi.setup(this.specification, {
            explorer: true
        }));
        
        // Handle all other Methods
        this.router.all('/', (req: Request, res: Response) => {
            throw new HttpException(405, `Method '${req.method}' not allowed.`);
        })
    }
}
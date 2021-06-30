import {Request, Response} from 'express';
import { logger } from './logger';
import morgan from 'morgan';

// Define custom token
morgan.token('message', (req: Request, res: Response) => res.locals.errorMessage || '');

const successResponseFormat = `:method :url :status :res[content-length] - :response-time ms`;
const errorResponseFormat = `:method :url :status :res[content-length] - :response-time ms - message: :message`;

export const successHandler = morgan(successResponseFormat, {
    skip: (req: Request, res: Response) => res.statusCode >= 400,
    stream: { write: (message) => logger.info(message.trim()) }
});

export const errorHandler = morgan(errorResponseFormat, {
    skip: (req: Request, res: Response) => res.statusCode < 400,
    stream: { write: (message) => logger.error(message.trim()) }
});
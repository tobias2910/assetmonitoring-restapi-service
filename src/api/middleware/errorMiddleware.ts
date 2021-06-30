import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import HttpException from "../utils/httpException";

export default function exceptionMiddleware (error: HttpException, req: Request, res: Response, next: NextFunction) {
    const statusCode = error.status || httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
    // Store the error message for morgan
    res.locals.errorMessage = message;

    res.status(statusCode)
        .json({
            statusCode, message
        });
}

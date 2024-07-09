import { ErrorRequestHandler, Request, Response } from 'express';
import AppError from '../utils/app-error';
import { env } from '../config';
import httpStatus from 'http-status';

const handleDevelopmentError = (err: AppError, _req: Request, res: Response) => {
    res.status(err.statusCode || 500).json({
        status: err.status,
        message: err.message,
        stack: err.stack,
    });
};

const handleProductionError = (err: AppError, _req: Request, res: Response) => {
    //* Trusted Error send message
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }

    //! Untrusted error! Don't leak information
    res.status(500).json({
        status: 'error',
        message: 'Something want very wrong!',
    });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
    if (env.NODE_ENV === 'development') {
        handleDevelopmentError(error, req, res);
    } else if (env.NODE_ENV === 'production') {
        const err = { ...error };

        err.status = error.status || 'error';
        err.statusCode = error.StatusCode || httpStatus.INTERNAL_SERVER_ERROR;

        handleProductionError(err, req, res);
    }
};

export default globalErrorHandler;

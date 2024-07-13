import { ErrorRequestHandler, Request, Response } from 'express';
import AppError from '../utils/app-error';
import { env } from '../config';
import httpStatus from 'http-status';
import { ZodError, ZodIssue } from 'zod';
import mongoose from 'mongoose';

const handleZodError = (err: ZodError) => {
    const errorMessages = err.issues.map((issue: ZodIssue) => {
        return {
            path: String(issue?.path[issue.path.length - 1]),
            message: issue.message,
        };
    });

    return new AppError('Validation Error', httpStatus.BAD_REQUEST, errorMessages);
};

//* Handle validation error
const handleValidationError = (err: mongoose.Error.ValidationError) => {
    const errorMessages = Object.values(err.errors).map(
        (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
            return {
                path: val?.path,
                message: val?.message,
            };
        },
    );

    return new AppError('Validation Error', httpStatus.BAD_REQUEST, errorMessages);
};

//* handle cast error
const handleCastErrorError = (err: mongoose.Error.CastError) => {
    const errorMessages = [
        {
            path: err.path,
            message: err.message,
        },
    ];

    return new AppError('Validation Error', httpStatus.BAD_REQUEST, errorMessages);
};

//* handle duplicate error
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleDuplicateError = (err: any) => {
    const match = err.message.match(/"([^"]*)"/);

    const value = match && match[1];

    const errorMessages = [
        {
            path: '',
            message: `${value} is already exists`,
        },
    ];

    return new AppError('Validation Error', httpStatus.BAD_REQUEST, errorMessages);
};

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
        let err = { ...error };

        err.status = error.status || 'error';
        err.statusCode = error.StatusCode || httpStatus.INTERNAL_SERVER_ERROR;

        if (error instanceof ZodError) err = handleZodError(error);
        if (error?.name === 'ValidationError') err = handleValidationError(error);
        if (error?.name === 'CastError') err = handleCastErrorError(error);
        if (error?.code === '11000') err = handleDuplicateError(error);

        handleProductionError(err, req, res);
    }
};

export default globalErrorHandler;

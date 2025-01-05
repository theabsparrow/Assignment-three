/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { TErrorSource } from '../interface/error';
import config from '../config';
import handleZodError from '../error/handleZodError';
import handleValidationError from '../error/handleValidationError';
import handleCastError from '../error/handleCastError';
import handleDuplicateError from '../error/handleDuplicateError';
import AppError from '../error/AppError';

/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = 'something went wrong';

  let error: TErrorSource = [
    {
      path: '',
      message: 'something went wrong',
    },
  ];

  if (err instanceof ZodError) {
    const convertedError = handleZodError(err);
    statusCode = convertedError?.statusCode;
    message = convertedError?.message;
    error = convertedError?.error;
  } else if (err.name === 'ValidationError') {
    const convertedError = handleValidationError(err);
    statusCode = convertedError?.statusCode;
    message = convertedError?.message;
    error = convertedError?.error;
  } else if (err.name === 'CastError') {
    const convertedError = handleCastError(err);
    statusCode = convertedError?.statusCode;
    message = convertedError?.message;
    error = convertedError?.error;
  } else if (err.code === 11000) {
    const convertedError = handleDuplicateError(err);
    statusCode = convertedError?.statusCode;
    message = convertedError?.message;
    error = convertedError?.error;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    error = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err?.message;
    error = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }

  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    error,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  });
};

export default globalErrorHandler;

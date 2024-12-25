/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { TErrorSource } from '../interface/error';
import config from '../config';
import handleZodError from '../error/handleZodError';
import handleValidationError from '../error/handleValidationError';

/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err?.message || 'something went wrong';

  let errorSource: TErrorSource = [
    {
      path: '',
      message: 'something went wrong',
    },
  ];

  if (err instanceof ZodError) {
    const convertedError = handleZodError(err);
    statusCode = convertedError?.statusCode;
    message = convertedError?.message;
    errorSource = convertedError?.errorSource;
  } else if (err.name === 'ValidationError') {
    const convertedError = handleValidationError(err);
    statusCode = convertedError?.statusCode;
    message = convertedError?.message;
    errorSource = convertedError?.errorSource;
  }
  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    errorSource,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  });
};

export default globalErrorHandler;

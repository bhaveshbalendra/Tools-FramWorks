import { NextFunction, Request, Response } from "express";

// Custom Error Interface (Optional)
interface CustomError extends Error {
  status?: number;
}

// Error Handling Middleware
const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(`Error: ${err.message}`);

  const statusCode = err.status || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

export default errorHandler;

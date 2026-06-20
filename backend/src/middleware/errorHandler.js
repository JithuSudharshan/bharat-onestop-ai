const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Server Error';

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    message = 'Resource not found';
    statusCode = 404;
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    message = 'Duplicate field value entered';
    statusCode = 400;
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const fields = Object.values(err.errors).map((val) => val.message);
    message = `Validation Error: ${fields.join(', ')}`;
    statusCode = 400;
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    message = 'Invalid token';
    statusCode = 401;
  }

  if (err.name === 'TokenExpiredError') {
    message = 'Token expired';
    statusCode = 401;
  }

  // GCP Cloud Logging Integration (Structured Logging)
  if (process.env.NODE_ENV === 'production') {
    console.error(JSON.stringify({
      severity: statusCode >= 500 ? 'ERROR' : 'WARNING',
      message: err.message,
      stack_trace: err.stack,
      request_url: req.originalUrl,
      request_method: req.method,
      user: req.user ? req.user.id : 'unauthenticated'
    }));
  } else {
    // Local dev logging
    console.error(`[Error] ${statusCode} - ${message}`);
  }

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = errorHandler;

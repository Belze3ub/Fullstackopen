const jwt = require('jsonwebtoken');
const { SECRET } = require('../utils/config');
const User = require('../models/user');

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: error.message });
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired',
    });
  }

  next(error);
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');

  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '');
  } else {
    request.token = null;
  }

  next();
};

const userExtractor = async (request, response, next) => {
  const token = request.token;

  if (request.method === 'GET') {
    return next();
  }

  if (!token) {
    return response.status(401).json({ error: 'Token is missing or invalid' });
  }

  const decodedToken = jwt.verify(token, SECRET);
  const user = await User.findById(decodedToken.id);

  if (!user) {
    return response.status(401).json({ error: 'User not found' });
  }

  request.user = user;
  next();
};

module.exports = {
  errorHandler,
  tokenExtractor,
  userExtractor,
};

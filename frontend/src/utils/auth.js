import jwt from 'jsonwebtoken';

export const validateToken = (token) => {
  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    return decoded;
  } catch (error) {
    return null;
  }
};
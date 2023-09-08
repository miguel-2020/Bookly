import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import contants from '../contants.js';
import Jwt from 'jsonwebtoken';
import { Buffer } from 'buffer';
import axios from 'axios';

import base64 from 'base-64';
dotenv.config();

const auth = {
  createToken,
  protect,
  createHashPassword,
  verifyPassword,
  decodeBase64Header,
};

export default auth;

/**
 * Creates a signed token and executes the callback on completion.
 * @param {requestCallback} resolve - The callback that handles the response.
 * @param {string} id - The user id
 * @param {string} role - The role of the user
 * @param {string} username - the username of the user.
 */
function createToken({ id, role, username }, resolve) {
  const options = {
    issuer: process.env.ISSUER,
    algorithm: process.env.ALGORITHM,
    expiresIn: process.env.EXPIRY,
    subject: `${id}`,
    audience: role == 'admin' ? contants.ADMIN : contants.MEMBER,
  };

  Jwt.sign({ username: username }, process.env.JWT_SECRET, options, resolve);
}

/**
 * 
 * @param {Object} req - The request sent to our API
 * @param {Object} res - The response of our API. 
 * @param {requestCallback} next - the callback that allows future middlewares to execute if no error found.
 */
function protect(req, res, next) {
 
  if(req.headers.cookie){
    Jwt.verify(req.headers.cookie.split("=")[1], process.env.JWT_SECRET, function (error, decoded) {
      if (error) {
        res.clearCookie('token');
        res.status(401).json({
          status: 401,
          statusText: 'Unauthorized',
          message: 'you need to login',
        });
      } else {
        const { username, role, aud, sub } = decoded;
        req.user = { username, audience: aud, id: sub};
        next();
      }
    });
  }else{
    res.clearCookie('token');
    res.status(401).json({
      status: 401,
      statusText: 'Unauthorized',
      message: 'you need to login',
    });
  }
    
  
}

/**
 * Creates a hash string from the given plaintext.
 * @function createHashPassword
 * @param {string} plainTextPassword - The text that needs to be hashed.
 * @return {Promise<string>} The hashed text
 */
function createHashPassword(plainTextPassword) {
  return bcrypt.hash(plainTextPassword, Number(process.env.BCRYPT_SALT));
}

/**
 * Compare a plaintext against it's hashed value.
 * @function verifyPassword
 * @param {string} plainTextPassword - The text that needs to be hashed.
 * @param {string} hash - The hashed password.
 * @return {boolean} - returns true if match. Other wise false.
 */
function verifyPassword(plainTextPassword, hash) {
  return bcrypt.compare(plainTextPassword, hash);
}

/**
 * Decode header authorization string from a request.
 * @function decodeBase64Header
 * @param {Object} request - The request containing the credentials
 * @return {Promise<string>} The decoded credentials
 */
function decodeBase64Header(request) {
  return new Promise((resolve, reject) => {
    const encodedCredentials = request.headers.authorization?.split(' ')[1];
    const credentials = Buffer.from(encodedCredentials, 'base64').toString().split(':');
   
   
    if (credentials[0].trim() != '' && credentials[1].trim() != '') {
      resolve([...credentials]);
    } else {
      reject(['error', new Error('missing credentials')]);
    }
  });
}

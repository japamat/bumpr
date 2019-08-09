/**
 * HELPERS FOR ANYTHING TOKEN RELATED
 * i.e. local storage, etc.
 */

 import jwt from 'jsonwebtoken';

export const getToken = () => 
  JSON.parse(localStorage.getItem('bumprToken')) || null;

export const setToken = token =>
  localStorage.setItem('bumprToken', JSON.stringify(token));

export const getUsernameFromToken = token => jwt.decode(token).username;

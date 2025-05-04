import { InternalServerException } from 'common';
import * as jwt from 'jsonwebtoken';

export const generatePassword = () => {
  const specialChars = '!@#$%^&*()_+[]{}<>?';
  const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
  const numberChars = '0123456789';
  const allChars = lowerChars + upperChars + numberChars + specialChars;

  const length = 8; // đảm bảo > 8 ký tự
  let password = '';

  // Bắt buộc có ít nhất 1 ký tự đặc biệt và 1 ký tự hoa
  password += specialChars[Math.floor(Math.random() * specialChars.length)];
  password += upperChars[Math.floor(Math.random() * upperChars.length)];

  // Thêm các ký tự ngẫu nhiên còn lại
  for (let i = 2; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  // Shuffle chuỗi để tránh predictable pattern
  password = password
    .split('')
    .sort(() => 0.5 - Math.random())
    .join('');

  return password;
};

export const getEmailFromAccessToken = (token: string) => {
  const decodedToken = jwt.decode(token);
  const email = decodedToken['email'];
  return email;
};

export const getRolesFromAccessToken = (token: string) => {
  const decodedToken = jwt.decode(token);
  const resourceAccess = decodedToken['resource_access'];
  if (!resourceAccess)
    throw new InternalServerException(
      'Sign In Error',
      'Internal Server Error! Sign In Error',
    );

  const app = resourceAccess['hanoi-opera-app'];
  if (!app)
    throw new InternalServerException(
      'Sign In Error',
      'Internal Server Error! Sign In Error',
    );

  const roles: string[] = app['roles'];
  if (!roles)
    throw new InternalServerException(
      'Sign In Error',
      'Internal Server Error! Sign In Error',
    );

  return roles;
};

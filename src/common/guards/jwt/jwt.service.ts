import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  createToken = (payload: any) =>
    jwt.sign({ email: payload }, '123456', {
      expiresIn: '7d',
    });

  verifyToken = (token: string) => {
    if (!token) {
      throw new UnauthorizedException('Please login to get access');
    }

    const tokenArray = token.split(' ');
    if (tokenArray.length !== 2 || tokenArray[0] !== 'Bearer') {
      throw new UnauthorizedException('Invalid token format');
    }

    const tokenValue = tokenArray[1];

    try {
      const decoded = jwt.verify(tokenValue, '123456'); // تأكد من استخدام نفس السر
      return decoded;
    } catch (error) {
      console.error('Token verification failed :', error.message);
      throw new UnauthorizedException(
        'Token verification failed : ' + error.message,
      );
    }
  };

  decodeToken = (token: string) => jwt.decode(token);
}

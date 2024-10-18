import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from 'src/common/guards/jwt/jwt.service';
import { UserService } from '../users/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async protect(token: string) {
    // 1)check if token exist , if exist get
    if (!token) {
      throw new UnauthorizedException('Please login to get access');
    }

    // 2) verify token
    const decodedToken = this.jwtService.verifyToken(token);
    // 3) if token is not valid throw error
    if (!decodedToken) {
      throw new UnauthorizedException('Please login to get access');
    }

    // // 3)check if user exists
    // const tokenUser = decodedToken.userId;
    // const user = await this.userService.findUserById(tokenUser);
    // if (!user) {
    //   throw new UnauthorizedException('Please login to get access');
    // }
    return decodedToken;
  }

  matchRoles(requiredRoles: string[], userRoles: string[]) {
    return requiredRoles.some((role) => userRoles.includes(role));
  }

  async login(email: string) {
    // 1) check if user exists
    // const user = await this.userService.findUserByEmail(email);
    // if (!user) {
    //   throw new UnauthorizedException('Invalid credentials');
    // }

    // // 2) check if password is correct
    // const passwordMatch = await this.userService.comparePassword(
    //   password,
    //   user.password,
    // );

    // if (!passwordMatch) {
    //   throw new UnauthorizedException('Invalid credentials');
    // }

    // 3) create token
    const token = this.jwtService.createToken({ email: email });
    return token;
  }
}

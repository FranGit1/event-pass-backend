import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  generateJwt(id: string): Promise<string> {
    return this.jwtService.signAsync({ id });
  }

  generateVerificationToken(): string {
    return uuidv4();
  }

  generatePasswordResetToken(): string {
    return uuidv4();
  }

  generatePlaintextPassword(): string {
    return Math.random().toString(36).slice(2);
  }

  hashPassword(plaintextPassword: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(plaintextPassword, saltRounds);
  }

  comparePasswords(plaintextPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plaintextPassword, hashedPassword);
  }
}

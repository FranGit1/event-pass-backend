import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private jwtService;
    constructor(jwtService: JwtService);
    generateJwt(id: string): Promise<string>;
    generateVerificationToken(): string;
    generatePasswordResetToken(): string;
    generatePlaintextPassword(): string;
    hashPassword(plaintextPassword: string): Promise<string>;
    comparePasswords(plaintextPassword: string, hashedPassword: string): Promise<boolean>;
}

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const uuid_1 = require("uuid");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    generateJwt(id) {
        return this.jwtService.signAsync({ id });
    }
    generateVerificationToken() {
        return (0, uuid_1.v4)();
    }
    generatePasswordResetToken() {
        return (0, uuid_1.v4)();
    }
    generatePlaintextPassword() {
        return Math.random().toString(36).slice(2);
    }
    hashPassword(plaintextPassword) {
        const saltRounds = 10;
        return bcrypt.hash(plaintextPassword, saltRounds);
    }
    comparePasswords(plaintextPassword, hashedPassword) {
        return bcrypt.compare(plaintextPassword, hashedPassword);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map
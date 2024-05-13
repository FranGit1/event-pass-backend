import { Injectable, Res, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { v4 as uuidv4 } from "uuid";
import { compare, hash } from "bcrypt";
import { BuyerReqDto } from "./dto/request/buyer.req.dto";
import { validate } from "class-validator";
import { BuyerService } from "../buyer/buyer.service";
import { ConfigurationService } from "../configuration/configuration.service";
import { Role } from "src/shared/enums/Role";

import axios from "axios";

const SALT_ROUNDS = 10;

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private buyerService: BuyerService,
    private configurationService: ConfigurationService
  ) {}

  generateJwt(id: string, roles: string): Promise<string> {
    return this.jwtService.signAsync(
      { id, roles },
      {
        secret: this.configurationService.jwtSecret,
      }
    );
  }

  async hashPassword(password: string): Promise<string> {
    return await hash(password, SALT_ROUNDS);
  }

  async createUser(body: any): Promise<Record<string, any>> {
    const buyerDTO = new BuyerReqDto();
    buyerDTO.email = body.email;
    buyerDTO.firstName = body.firstName;
    buyerDTO.lastName = body.lastName;
    buyerDTO.username = body.username;
    buyerDTO.password = await hash(body.password, SALT_ROUNDS);
    buyerDTO.role = Role.buyer;

    const errors = await validate(buyerDTO);

    if (errors.length > 0) {
      return { isValid: false, buyerDTO };
    }

    try {
      await this.buyerService.create(buyerDTO);
      return { isValid: true, buyerDTO };
    } catch (error) {
      return { isValid: false, buyerDTO };
    }
  }

  async validatePassword(
    userPassword: string,
    password: string
  ): Promise<boolean> {
    return await compare(password, userPassword);
  }

  async authenticateUser(email: string, password: string) {
    const user = await this.buyerService.findBuyerByEmail(email);

    if (user) {
      const isAuthenticated = await this.validatePassword(
        user.password,
        password
      );
      if (isAuthenticated) return user;
      // if (!isAuthenticated) {
      //   user.role == Role.buyer
      //     ? await this.userLogsService.createBuyerEvent(
      //         //@ts-ignore
      //         user,
      //         UserLogsEvent.LOGIN_FAILED
      //       )
      //     : //@ts-ignore
      //       await this.userLogsService.createAdminEvent(user, LOGIN_FAILED);
      // } else {
      //   return user;
      // }
    }

    throw new UnauthorizedException("Invalid user credentials");
  }

  async login(body: any, @Res() res) {
    let token;
    const user = await this.authenticateUser(body.email, body.password);

    if (user) {
      token = await this.generateJwt(user.id.toString(), user.role);
    }

    return res.status(200).json({
      token,
      email: body.email,
      name: user.firstName,
      // id: user.id
    });
  }

  async verifyRecaptchaToken(token: string): Promise<boolean> {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${this.configurationService.recaptchaSecretKey}&response=${token}`
    );

    if (response.data.success) {
      return true;
    } else {
      return false;
    }
  }

  generateUUIDForFile(): string {
    return uuidv4();
  }

  generateResetPasswordToken(): string {
    return uuidv4();
  }

  generateVerifyAccountToken(): string {
    return uuidv4();
  }
}

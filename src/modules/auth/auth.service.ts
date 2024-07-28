import {ConflictException, Injectable, Res, UnauthorizedException} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { v4 as uuidv4 } from "uuid";
import { compare, hash } from "bcrypt";
import { OrganizerReqDto} from "./dto/request/organizer.req.dto";
import { validate } from "class-validator";
import { BuyerService } from "../buyer/buyer.service";
import { ConfigurationService } from "../configuration/configuration.service";
import { Role } from "src/shared/enums/Role";

import axios from "axios";
import {OrganizerService} from "../organizer/organizer.service";
import {UserLogsService} from "../user-logs/user-logs.service";
import {UserLogsEvent} from "../../shared/enums/UserLogsEvent";

const SALT_ROUNDS = 10;

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private buyerService: BuyerService,
    private organizerService: OrganizerService,
    private userLogsService: UserLogsService,
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
    const organizerDTO = new OrganizerReqDto();
    organizerDTO.email = body.email;
    organizerDTO.firstName = body.firstName;
    organizerDTO.lastName = body.lastName;
    organizerDTO.username = body.username;
    organizerDTO.companyName = body.companyName;
    organizerDTO.contactInformation = body.contactInfo;
    organizerDTO.password = await hash(body.password, SALT_ROUNDS);
    organizerDTO.role = Role.organizer;

    const errors = await validate(organizerDTO);
    if (errors.length > 0) {
      return { isValid: false, organizerDTO };
    }
    try {
      await this.organizerService.create(organizerDTO);
      return { isValid: true, organizerDTO };
    } catch (error) {
      return { isValid: false, organizerDTO };
    }
  }

  async validatePassword(
    userPassword: string,
    password: string
  ): Promise<boolean> {
    return await compare(password, userPassword);
  }

  async authenticateUser(email: string, password: string) {

    const [buyer, organizer] = await Promise.all([
      this.buyerService.findBuyerByEmail(email),
      this.organizerService.findOrganizerByEmail(email),
    ]);

    const user = buyer || organizer;

    if (user) {
      const isUserAccountBlocked =
          await this.userLogsService.isUserAccountBlocked(
              user.id,
              user.role === Role.buyer
          );
      if (isUserAccountBlocked) {
        throw new ConflictException(
            "This user account is locked. Please contact support for reactivation."
        );
      }

      const isAuthenticated = await this.validatePassword(
          user.password,
          password
      );
      if (!isAuthenticated) {
        user.role == Role.buyer
            ? await this.userLogsService.createBuyerEvent(
                //@ts-ignore
                user,
                UserLogsEvent.LOGIN_FAILED
            )
            : //@ts-ignore
            await this.userLogsService.createOrganizerEvent(user, LOGIN_FAILED);
      } else {
        return user;
      }
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

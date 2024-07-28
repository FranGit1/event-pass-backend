import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  Res, UseInterceptors,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiOperation } from "@nestjs/swagger";
import {
  LOGIN_DOCUMENTATION,
  REGISTER_DOCUMENTATION,
} from "./auth.documentation";
import {LoggerInterceptor} from "../../shared/interceptors/logger.interceptor";

@Controller("auth")
@UseInterceptors(LoggerInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation(LOGIN_DOCUMENTATION)
  @Post("login")
  async login(@Req() req, @Res() res, @Body() body) {
    return await this.authService.login(body, res);
  }

  @ApiOperation(REGISTER_DOCUMENTATION)
  @Post("register-organizer")
  async register(@Req() req, @Res() res, @Body() body) {
    const authResult = await this.authService.createUser(body);
    const { isValid, buyerDTO } = authResult;
    if (isValid) {
      res.status(201).json({
        success: true,
        msg: "Organizer created with success",
      });
    } else {
      res.status(400).json({
        success: false,
        buyerDTO: buyerDTO,
        msg: "Failed to create Organizer",
      });
    }
  }

  @Post("verify-recaptcha")
  async verifyRecaptcha(
    @Body("token") token: string
  ): Promise<{ success: boolean }> {
    const isValid = await this.authService.verifyRecaptchaToken(token);
    if (isValid) {
      return { success: true };
    } else {
      console.error("Invalid reCAPTCHA token");
      throw new BadRequestException("Invalid reCAPTCHA token");
    }
  }
}

import { Strategy, ExtractJwt } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { Request } from "express";

import { ConfigurationService } from "../configuration/configuration.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configurationService: ConfigurationService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configurationService.jwtSecret,
    });
  }

  private static extractJwtFromCookie(req: Request): string | null {
    if (req.cookies && req.cookies.token && req.cookies.token.length > 0) {
      return req.cookies.token;
    }
    return null;
  }

  async validate(payload) {
    return { id: payload.id, role: payload.roles };
  }
}

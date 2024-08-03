import { ApiOperationOptions } from "@nestjs/swagger";

export const LOGIN_DOCUMENTATION: Partial<ApiOperationOptions> = {
  summary: "User login",
  description: "Used for user authentication and login",
};

export const REGISTER_ORGANIZER_DOCUMENTATION: Partial<ApiOperationOptions> = {
  summary: "Organizer registration",
  description: "Used for organizer registration and creation",
};

export const REGISTER_BUYER_DOCUMENTATION: Partial<ApiOperationOptions> = {
  summary: "Buyer registration",
  description: "Used for buyer registration and creation",
};

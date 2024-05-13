import { ApiOperationOptions } from "@nestjs/swagger";

export const LOGIN_DOCUMENTATION: Partial<ApiOperationOptions> = {
  summary: "User login",
  description: "Used for user authentication and login",
};

export const REGISTER_DOCUMENTATION: Partial<ApiOperationOptions> = {
  summary: "User registration",
  description: "Used for user registration and creation",
};

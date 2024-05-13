import { ApiOperationOptions } from "@nestjs/swagger";

export const GET_ORGANIZATION_BY_ID_DOCUMENTATION: Partial<ApiOperationOptions> =
  {
    summary: "Get Organization by ID",
    description: "Retrieve details of a specific organization by its ID.",
  };

export const CREATE_ORGANIZATION_DOCUMENTATION: Partial<ApiOperationOptions> = {
  summary: "Create a new Organization",
  description: "Create a new organization with the provided data.",
};
export const UPDATE_ORGANIZATION_DOCUMENTATION: Partial<ApiOperationOptions> = {
  summary: "Update an existing Organization",
  description: "Update an existing organization with the provided data.",
};
export const DELETE_ORGANIZATION_BY_ID_DOCUMENTATION: Partial<ApiOperationOptions> =
  {
    summary: "Delete Organization by ID",
    description: "Delete an organization by its unique identifier.",
  };

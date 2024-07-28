import { ApiOperationOptions } from "@nestjs/swagger";

export const GET_ORGANIZATION_BY_ID_DOCUMENTATION: Partial<ApiOperationOptions> =
  {
    summary: "Get Organization by ID",
    description: "Retrieve details of a specific organization by its ID.",
  };
export const GET_ALL_ORGANIZATIONS_DOCUMENTATION: Partial<ApiOperationOptions> =
  {
    summary: "Get all Organizations",
    description: "Retrieve names and ids of all organizations.",
  };

export const POST_LEAVE_ORGANIZATION_DOCUMENTATION: Partial<ApiOperationOptions> =
  {
    summary: "Leave Organization",
    description: "Leave organization by organization id.",
  };

export const ADD_FAVORITE_DOCUMENTATION: Partial<ApiOperationOptions> = {
    summary: "Adds an organization to favorites",
    description:
        "Used to add an organization to the favorites list for the authenticated organizer",
};

export const REMOVE_FAVORITE_DOCUMENTATION: Partial<ApiOperationOptions> = {
    summary: "Removes an organization from favorites",
    description:
        "Used to remove an organization from the favorites list for the authenticated organizer",
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

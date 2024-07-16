import { ApiOperationOptions } from "@nestjs/swagger";

export const GET_ORGANIZER_BY_ID_DOCUMENTATION: Partial<ApiOperationOptions> = {
  summary: "Get Organizer by ID",
  description: "Retrieve details of a specific organizer by its ID.",
};

export const GET_ORGANIZERS_ORGANIZATIONS: Partial<ApiOperationOptions> = {
    summary: "Get organizations by organizer",
    description: "Retrieve organizations of a specific organizer by its ID.",
};

export const CREATE_ORGANIZER_DOCUMENTATION: Partial<ApiOperationOptions> = {
  summary: "Create a new Organizer",
  description: "Create a new organizer with the provided data.",
};

export const UPDATE_ORGANIZER_DOCUMENTATION: Partial<ApiOperationOptions> = {
  summary: "Update an existing Organizer",
  description: "Update an existing organizer with the provided data.",
};

export const DELETE_ORGANIZER_BY_ID_DOCUMENTATION: Partial<ApiOperationOptions> =
  {
    summary: "Delete Organizer by ID",
    description: "Delete an organizer by its unique identifier.",
  };

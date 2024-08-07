import { ApiOperationOptions } from "@nestjs/swagger";

export const GET_BUYER_BY_ID_DOCUMENTATION: Partial<ApiOperationOptions> = {
  summary: "Fetches details of a specific buyer",
  description:
    "Used to retrieve detailed information about a specific buyer by ID",
};

export const CREATE_BUYER_DOCUMENTATION: Partial<ApiOperationOptions> = {
  summary: "Creates a new buyer",
  description: "Used to create a new buyer with the provided data",
};

export const UPDATE_BUYER_DOCUMENTATION: Partial<ApiOperationOptions> = {
  summary: "Updates an existing buyer",
  description: "Used to update an existing buyer with the provided data",
};

export const DELETE_BUYER_BY_ID_DOCUMENTATION: Partial<ApiOperationOptions> = {
  summary: "Deletes a buyer",
  description: "Used to delete a buyer by its ID",
};


export const GET_FAVORITES_EVENTS_DOCUMENTATION: Partial<ApiOperationOptions> =
    {
      summary: "Get favorite events",
      description: "Retrieve favorites by buyer",
    };


export const GET_FAVOURITE_EVENT_IDS_BY_BUYER_DOCUMENTATION: Partial<ApiOperationOptions> = {
    summary: "Fetches favourites event ids by buyer",
    description:
        "Used to retrieve favourites event ids by buyer",
};

import { ApiOperationOptions } from "@nestjs/swagger";

export const GET_ALL_EVENTS_DOCUMENTATION: Partial<ApiOperationOptions> = {
  summary: "Fetches all events.",
  description: "Used for the retrieval of all events in the database",
};

export const GET_EVENT_BY_ID_DOCUMENTATION: Partial<ApiOperationOptions> = {
  summary: "Fetches details of a specific event",
  description:
    "Used to retrieve detailed information about a specific event by ID",
};

export const GET_LIVE_EVENTS_DOCUMENTATION: Partial<ApiOperationOptions> = {
  summary: "Fetches live events",
  description:
      "Used to retrieve all live events.",
};

export const ADD_FAVORITE_EVENT_DOCUMENTATION: Partial<ApiOperationOptions> = {
  summary: "Adds an event to favorites",
  description:
      "Used to add an event to the favorites list for the authenticated buyer",
};

export const REMOVE_FAVORITE_EVENT_DOCUMENTATION: Partial<ApiOperationOptions> = {
  summary: "Removes an event from favorites",
  description:
      "Used to remove an event from the favorites list for the authenticated buyer",
};


export const CREATE_EVENT_DOCUMENTATION: Partial<ApiOperationOptions> = {
  summary: "Creates a new event",
  description: "Used to create a new event with the provided data",
};
export const UPDATE_EVENT_DOCUMENTATION: Partial<ApiOperationOptions> = {
  summary: "Updates event",
  description: "Used to update event with the provided data",
};

export const DELETE_EVENT_BY_ID_DOCUMENTATION: Partial<ApiOperationOptions> = {
  summary: "Deletes an event by ID",
  description: "Used to delete an event by its ID",
};

export const UPDATE_EVENT_BY_ID_DOCUMENTATION: Partial<ApiOperationOptions> = {
  summary: "Updates an event by ID",
  description: "Used to update an event by its ID",
};

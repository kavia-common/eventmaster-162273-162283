/** Common API types shared across the frontend. */

export type ID = string;

export type Organizer = {
  id?: ID;
  name?: string;
  email?: string;
};

export type EventItem = {
  _id: ID;
  title: string;
  description?: string;
  location?: string;
  startTime?: string;
  endTime?: string;
  organizer?: Organizer;
};

export type Attendee = {
  id?: ID;
  name?: string;
  email?: string;
  status?: "yes" | "no" | "maybe";
};

export type LoginResponse = {
  token: string;
};

export type CurrentUser = {
  id: ID;
  name: string;
  email: string;
};

export type RsvpItem = {
  event: {
    _id: ID;
    title: string;
    startTime?: string;
    location?: string;
  };
  status: "yes" | "no" | "maybe";
};

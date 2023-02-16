import { ApplicationError } from "../protocols.js";

export function invalidEmailError(email: string): ApplicationEmailError {
  return {
    name: "InvalidEmailError",
    email: email,
    message: `"${email}" is not a valid email!`,
  };
}

export type ApplicationEmailError = ApplicationError & { email: string };
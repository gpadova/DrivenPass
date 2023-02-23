import { ApplicationError } from "../protocols";

export function invalidCredential(): ApplicationError {
  return {
    name: "InvalidCredential",
    message: "A credential with this title already exists",
  };
}
import { ApplicationError } from "../protocols.js";

export function invalidCredential(): ApplicationError {
  return {
    name: "InvalidCredential",
    message: "A credential with this title already exists",
  };
}
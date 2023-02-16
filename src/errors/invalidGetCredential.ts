import { ApplicationError } from "@/protocols";

export function invalidGetCredential(): ApplicationError {
  return {
    name: "InvalidGetCredential",
    message: "You either does not posses the credential or the id is invalid",
  };
}
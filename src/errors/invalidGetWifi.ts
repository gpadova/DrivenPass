import { ApplicationError } from "../protocols";

export function invalidGetWifi(): ApplicationError {
  return {
    name: "InvalidGetWifi",
    message: "You either does not posses the wifi or the id is invalid",
  };
}
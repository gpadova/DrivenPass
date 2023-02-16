import { authenticateToken } from "../Middlewares/authenticationMiddleware.js";
import { validateBody } from "../Middlewares/validationMiddleware.js";
import { Router } from "express";
import { WifiSchema } from "../Schemas/wifiSchema.js";
import {
  inserWifiDb,
  getSpecificWifi,
  getWifi,
  deleteWifi
} from "../Controllers/wifiController.js";

const wifiRouter = Router();

wifiRouter.all("/*", authenticateToken);
wifiRouter.post("/wifi", validateBody(WifiSchema), inserWifiDb);
wifiRouter.get("/wifi/:id", getSpecificWifi);
wifiRouter.get("/wifi", getWifi);
wifiRouter.delete("/wifi/:id", deleteWifi)

export default wifiRouter;

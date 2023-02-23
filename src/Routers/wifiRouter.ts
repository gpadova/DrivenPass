import { authenticateToken } from "../Middlewares/authenticationMiddleware";
import { validateBody } from "../Middlewares/validationMiddleware";
import { Router } from "express";
import { WifiSchema } from "../Schemas/wifiSchema";
import {
  inserWifiDb,
  getSpecificWifi,
  getWifi,
  deleteWifi
} from "../Controllers/wifiController";

const wifiRouter = Router();

wifiRouter.post("/wifi",authenticateToken, validateBody(WifiSchema), inserWifiDb);
wifiRouter.get("/wifi/:id",authenticateToken, getSpecificWifi);
wifiRouter.get("/wifi",authenticateToken, getWifi);
wifiRouter.delete("/wifi/:id",authenticateToken, deleteWifi)

export default wifiRouter;

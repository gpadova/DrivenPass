import { authenticateToken } from "@/Middlewares/authenticationMiddleware";
import { validateBody } from "@/Middlewares/validationMiddleware";
import { Router } from "express";
import { WifiSchema } from "@/Schemas/wifiSchema";
import {
  inserWifiDb,
  getSpecificWifi,
  getWifi,
  deleteWifi
} from "@/Controllers/wifiController";

const wifiRouter = Router();

wifiRouter.all("/*", authenticateToken);
wifiRouter.post("/wifi", validateBody(WifiSchema), inserWifiDb);
wifiRouter.get("/wifi/:id", getSpecificWifi);
wifiRouter.get("/wifi", getWifi);
wifiRouter.delete("/wifi/:id", deleteWifi)

export default wifiRouter;

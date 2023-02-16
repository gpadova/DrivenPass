import { validateBody } from "@/Middlewares/validationMiddleware";
import { credentialSchema } from "@/Schemas/credentialSchema";
import { Router } from "express";
import {
  inserCredentialDb,
  getSpecificCredential,
  getCredentials,
  deleteCredential,
} from "@/Controllers/credentialController";
import { authenticateToken } from "@/Middlewares/authenticationMiddleware";

const credentialRouter = Router();

credentialRouter.all("/*", authenticateToken);
credentialRouter.post(
  "/credential",
  validateBody(credentialSchema),
  inserCredentialDb
);
credentialRouter.get("/credential/:id", getSpecificCredential);
credentialRouter.get("/credential", getCredentials);
credentialRouter.delete("/credential/:id", deleteCredential);

export default credentialRouter;

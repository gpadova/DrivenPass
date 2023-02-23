import { validateBody } from "../Middlewares/validationMiddleware";
import { credentialSchema } from "../Schemas/credentialSchema";
import { Router } from "express";
import {
  inserCredentialDb,
  getSpecificCredential,
  getCredentials,
  deleteCredential,
} from "../Controllers/credentialController";
import { authenticateToken } from "../Middlewares/authenticationMiddleware";

const credentialRouter = Router();

credentialRouter.post(
  "/credential",
  authenticateToken,
  validateBody(credentialSchema), 
  inserCredentialDb
);
credentialRouter.get("/credential/:id",authenticateToken, getSpecificCredential);
credentialRouter.get("/credential",authenticateToken, getCredentials);
credentialRouter.delete("/credential/:id",authenticateToken, deleteCredential);

export default credentialRouter;

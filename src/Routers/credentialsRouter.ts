import { validateBody } from "../Middlewares/validationMiddleware.js";
import { credentialSchema } from "../Schemas/credentialSchema.js";
import { Router } from "express";
import {
  inserCredentialDb,
  getSpecificCredential,
  getCredentials,
  deleteCredential,
} from "../Controllers/credentialController.js";
import { authenticateToken } from "../Middlewares/authenticationMiddleware.js";

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

import { Router } from "express";
import { UserController } from "./controllers/user/CreateUserController";
import { validateSchema } from "./middlewares/validateSchema";
import { createUserSchema } from "./schemas/userSchema";
import { authUserSchema } from "./schemas/authUserSchema";
import { AuthUserController } from "./controllers/user/AuthUserController";
const router = Router();

router.post(
  "/users",
  validateSchema(createUserSchema),
  new UserController().handle,
);

router.post(
  "/session",
  validateSchema(authUserSchema),
  new AuthUserController().handle,
);

export { router };

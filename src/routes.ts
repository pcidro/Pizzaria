import { Router, Request, Response } from "express";
import { UserController } from "./controllers/user/CreateUserController";
import { validateSchema } from "./middlewares/validateSchema";
import { createUserSchema } from "./schemas/userSchema";

const router = Router();

router.post(
  "/users",
  validateSchema(createUserSchema),
  new UserController().handle,
);

export { router };

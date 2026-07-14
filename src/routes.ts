import { Router } from "express";

// Configurações
import multer from "multer";
import uploadConfig from "./config/multer";

// Middlewares
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { isAdmin } from "./middlewares/isAdmin";
import { validateSchema } from "./middlewares/validateSchema";

// Schemas
import { authUserSchema } from "./schemas/authUserSchema";
import { createCategorySchema } from "./schemas/categorySchema";
import {
  createProductSchema,
  listProductSchema,
  listProductByCategorySchema,
} from "./schemas/productSchema";
import { createUserSchema } from "./schemas/userSchema";

// Controllers - Usuários
import { UserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";

// Controllers - Categorias
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";

// Controllers - Produtos
import { CreateProductController } from "./controllers/product/CreateProductContoller";
import { ListProductController } from "./controllers/product/ListProductController";
import { DeleteProductController } from "./controllers/product/DeleteProductController";
import { ListProductByCategoryController } from "./controllers/product/ListProductByCategoryController";

const router = Router();
const upload = multer(uploadConfig);

// ====================
// Rotas de Usuários
// ====================

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

router.get("/me", isAuthenticated, new DetailUserController().handle);

// ====================
// Rotas de Categorias
// ====================

router.post(
  "/category",
  isAuthenticated,
  isAdmin,
  validateSchema(createCategorySchema),
  new CreateCategoryController().handle,
);

router.get("/category", isAuthenticated, new ListCategoryController().handle);

// ====================
// Rotas de Produtos
// ====================

router.post(
  "/product",
  isAuthenticated,
  isAdmin,
  upload.single("file"),
  validateSchema(createProductSchema),
  new CreateProductController().handle,
);

router.get(
  "/products",
  isAuthenticated,
  validateSchema(listProductSchema),
  new ListProductController().handle,
);

router.delete(
  "/product",
  isAuthenticated,
  isAdmin,
  new DeleteProductController().handle,
);

router.get(
  "/category/product",
  isAuthenticated,
  validateSchema(listProductByCategorySchema),
  new ListProductByCategoryController().handle,
);

export { router };

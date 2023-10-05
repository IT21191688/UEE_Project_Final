import { Router } from "express";
import authMiddleware from "../auth/auth.middleware";
import constants from "../constant";
import {
  CreateCategory,
  GetAllCategories,
  DeleteCategory,
  UpdateCategory,
} from "./category.controller";

const CategoryRouter = Router();

CategoryRouter.post(
  "/create",
  authMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  CreateCategory
);

//get All Categories related to specific type
CategoryRouter.get("/getAllCategories", GetAllCategories);

CategoryRouter.put(
  "/deleteCategory/:id",
  authMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  DeleteCategory
);

CategoryRouter.patch(
  "/updateCategory/:id",
  authMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  UpdateCategory
);

export default CategoryRouter;

import { Router } from "express";
import {
  CreateNews,
  GetAllActiveNews,
  DeleteNews,
  UpdateNews,
  GetNewsDetails
} from "./news.controller";
import authMiddleware from "../auth/auth.middleware";
import commonMiddleware from "../common/common.middleware";
import constants from "../constant";

const NewsRouter = Router();

NewsRouter.post(
  "/create",
  authMiddleware.authorize([constants.USER.ROLES.ADMIN]),
 // commonMiddleware.multerUploader.single("newsImage"),
  CreateNews
);

NewsRouter.get(
  "/getAllActiveNews",
  authMiddleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  GetAllActiveNews
);

NewsRouter.put(
  "/deleteNews/:id",
  authMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  DeleteNews
);

NewsRouter.patch(
  "/updateNews/:id",
  authMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  //commonMiddleware.multerUploader.single("newsImage"),
  UpdateNews
);


NewsRouter.get(
  "/getOneNews/:newsId",
  authMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  GetNewsDetails
);
export default NewsRouter;

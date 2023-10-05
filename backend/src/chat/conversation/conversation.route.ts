import { Router } from "express";
import {
  CreateConversation,
  GetAllConversations,
} from "./conversation.controller";
import authMiddleware from "../../auth/auth.middleware";
import constants from "../../constant";

const ConversationRouter = Router();

ConversationRouter.post(
  "/create",
  authMiddleware.authorize([constants.USER.ROLES.USER]),
  CreateConversation
);

ConversationRouter.get(
  "/all-conversations",
  authMiddleware.authorize([
    constants.USER.ROLES.USER,
    constants.USER.ROLES.ADMIN,
  ]),
  GetAllConversations
);

export default ConversationRouter;

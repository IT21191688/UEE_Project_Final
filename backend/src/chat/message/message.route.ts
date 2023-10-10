import { Router } from "express";
import authMiddleware from "../../auth/auth.middleware";
import constants from "../../constant";

import {
  SendMessage,
  GetAllMessages,
  DeleteMessage,
} from "./message.controller";

const MessageRouter = Router();

MessageRouter.post(
  "/send/:conversationId",
  authMiddleware.authorize([
    constants.USER.ROLES.USER,
    constants.USER.ROLES.ADMIN,
  ]),
  SendMessage
);

MessageRouter.get(
  "/all-messages/:conversationId",
  authMiddleware.authorize([
    constants.USER.ROLES.USER,
    constants.USER.ROLES.ADMIN,
  ]),
  GetAllMessages
);

MessageRouter.put(
  "/delete/:messageId",
  authMiddleware.authorize([
    constants.USER.ROLES.USER,
    constants.USER.ROLES.ADMIN,
  ]),
  DeleteMessage
);

export default MessageRouter;

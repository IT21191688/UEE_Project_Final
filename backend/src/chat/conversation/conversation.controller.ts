import { Request, Response } from "express";
import { startSession } from "mongoose";
import { StatusCodes } from "http-status-codes";

import conversation from "./conversation.model";
import conversationService from "./conversation.service";
import userService from "../../user/user.service";
import CustomResponse from "../../util/response";

import NotFoundError from "../../error/error.classes/NotFoundError";
import BadRequestError from "../../error/error.classes/BadRequestError";
import organizationService from "../../organization/organization.service";
import ConflictError from "../../error/error.classes/ConflictError";

const CreateConversation = async (req: Request, res: Response) => {
  const auth: any = req.auth;
  const body: any = req.body;

  const organization: any = await organizationService.findById(
    body.organization
  );

  if (!organization) throw new NotFoundError("Organization not found!");

  const memberTwo: any = await userService.findByOrganization(
    body.organization
  );

  if (!memberTwo) throw new NotFoundError("Member not found!");

  const conversationExists: any = await conversationService.findByMembers(
    auth._id,
    memberTwo._id
  );

  if (conversationExists)
    throw new ConflictError("Conversation already exists!");

  //construct conversation object
  const newConversation = new conversation({
    memberOne: auth._id,
    memberTwo: memberTwo._id,
    organization: organization._id,
  });

  const session = await startSession(); //start mongoose session

  let createdConversation = null;
  try {
    session.startTransaction(); //start transaction in session

    createdConversation = await conversationService.save(
      newConversation,
      session
    ); //save conversation

    await session.commitTransaction();
  } catch (e) {
    await session.abortTransaction();
    throw e;
  } finally {
    session.endSession();
  }

  CustomResponse(
    res,
    true,
    StatusCodes.CREATED,
    "Conversation created successfully!",
    createdConversation
  );
};

const GetAllConversations = async (req: Request, res: Response) => {
  const auth: any = req.auth;

  const conversations: any =
    await conversationService.findConversationsByMember(auth._id);

  CustomResponse(
    res,
    true,
    StatusCodes.OK,
    "Conversations fetched successfully!",
    conversations
  );
};

export { CreateConversation, GetAllConversations };

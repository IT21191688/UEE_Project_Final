import { Request, Response } from "express";
import { startSession } from "mongoose";
import conversationService from "../conversation/conversation.service";
import Message from "./message.model";

import NotFoundError from "../../error/error.classes/NotFoundError";
import messageService from "./message.service";
import CustomResponse from "../../util/response";
import { StatusCodes } from "http-status-codes";
import constants from "../../constant";

const SendMessage = async (req: Request, res: Response) => {
  const conversationId = req.params.conversationId;
  const auth: any = req.auth;
  const body: any = req.body;

  //check if conversation exists
  let conversation: any = await conversationService.findById(conversationId);

  if (!conversation) throw new NotFoundError("Conversation not found!");

  //construct message object
  const newMessage = new Message({
    conversation: conversation._id,
    sender: auth._id,
    message: body.message,
  });

  const session = await startSession(); //start mongoose session

  let createdMessage = null;
  try {
    session.startTransaction(); //start transaction in session

    //update conversation lastUpdated
    conversation.lastUpdated = new Date();

    await conversation.save({ session });

    createdMessage = await messageService.save(newMessage, session); //save message

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
    "Message sent successfully!",
    createdMessage
  );
};

const GetAllMessages = async (req: Request, res: Response) => {
  const conversationId = req.params.conversationId;

  //check if conversation exists
  let conversation: any = await conversationService.findById(conversationId);

  if (!conversation) throw new NotFoundError("Conversation not found!");

  const messages = await messageService.getAllMessagesByConversation(
    conversationId
  );

  CustomResponse(
    res,
    true,
    StatusCodes.OK,
    "Messages fetched successfully!",
    messages
  );
};

const DeleteMessage = async (req: Request, res: Response) => {
  const auth: any = req.auth;
  const messageId = req.params.messageId;

  const message: any = await messageService.findById(messageId);

  if (!message) throw new NotFoundError("Message not found!");

  if (auth._id != message.sender)
    throw new NotFoundError("You are not allowed to delete this message!");

  const session = await startSession(); //start mongoose session

  try {
    session.startTransaction(); //start transaction in session

    //update message status
    message.status = constants.WELLKNOWNSTATUS.DELETED;

    await message.save({ session });

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
    StatusCodes.OK,
    "Message deleted successfully!",
    {}
  );
};

export { SendMessage, GetAllMessages, DeleteMessage };

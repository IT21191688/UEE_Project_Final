import constants from "../../constant";
import Message from "./message.model";

const save = async (data: any, session: any) => {
  return await data.save({
    session,
  });
};

const getAllMessagesByConversation = async (conversation: string) => {
  return await Message.find({
    conversation: conversation,
    status: constants.WELLKNOWNSTATUS.ACTIVE,
  })
    .populate("sender", "fullName")
    .sort({ createdAt: 1 });
};

const findById = async (id: string) => {
  return await Message.findOne({
    _id: id,
    status: constants.WELLKNOWNSTATUS.ACTIVE,
  });
};

export default {
  save,
  getAllMessagesByConversation,
  findById,
};

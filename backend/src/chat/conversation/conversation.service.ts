import constants from "../../constant";
import Conversation from "./conversation.model";

const save = async (data: any, session: any) => {
  return await data.save({ session });
};

const findById = async (id: string) => {
  return await Conversation.findOne({
    _id: id,
    status: constants.WELLKNOWNSTATUS.ACTIVE,
  });
};

const findByMembers = async (memberOne: string, memberTwo: string) => {
  return await Conversation.findOne({
    $or: [
      { memberOne, memberTwo },
      { memberOne: memberTwo, memberTwo: memberOne },
    ],
    status: constants.WELLKNOWNSTATUS.ACTIVE,
  });
};

const findConversationsByMember = async (member: string) => {
  return await Conversation.find({
    $or: [{ memberOne: member }, { memberTwo: member }],
    status: constants.WELLKNOWNSTATUS.ACTIVE,
  })
    .populate("memberOne", "fullName email")
    .populate("memberTwo", "fullName email")
    .populate("organization", "orgName orgEmail orgImage")
    .sort({ lastUpdated: -1 });
};

export default {
  save,
  findById,
  findByMembers,
  findConversationsByMember,
};

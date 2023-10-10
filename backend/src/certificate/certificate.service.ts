import constants from "../constant";
import Certificate from "./certificate.model";

const save = async (certificate: any, session: any) => {
  if (session) {
    return await certificate.save({ session });
  } else {
    return await certificate.save();
  }
};

const findAllApproveAndPending = async () => {
  return await Certificate.find({
    status: {
      $in: [
        constants.WELLKNOWNSTATUS.APPROVE,
        constants.WELLKNOWNSTATUS.PENDING,
      ],
    },
  }).populate("certificate serviceType");
};

const findAllApprovePendingAndRejectByUser = async (userId: string) => {
  return await Certificate.find({
    status: {
      $in: [
        constants.WELLKNOWNSTATUS.APPROVE,
        constants.WELLKNOWNSTATUS.PENDING,
        constants.WELLKNOWNSTATUS.REJECT,
      ],
    },
    addedBy: userId,
  }).populate("certificate serviceType");
};

const findById = async (id: string) => {
  return await Certificate.findOne({
    _id: id,
    status: {
      $in: [
        constants.WELLKNOWNSTATUS.APPROVE,
        constants.WELLKNOWNSTATUS.PENDING,
        constants.WELLKNOWNSTATUS.REJECT,
      ],
    },
  });
};

export default {
  save,
  findAllApproveAndPending,
  findAllApprovePendingAndRejectByUser,
  findById,
};

import Job from "./job.model";
import constants from "../constant";

const save = async (job: any, session: any) => {
  if (session) {
    return await job.save({ session });
  } else {
    return await job.save();
  }
};

const findAllJobs = async () => {
  return await Job.find({
    status: constants.WELLKNOWNSTATUS.ACTIVE,
  })
    .populate("organization")
    .populate("type", "-createdAt -updatedAt -status")
    .sort({ createdAt: -1 });
};

const findAllJobsByAddedBy = async (addedBy: string) => {
  return await Job.find({
    addedBy: addedBy,
    status: constants.WELLKNOWNSTATUS.ACTIVE,
  })
    .populate("organization", "-createdAt -updatedAt -status")
    .populate("type", "-createdAt -updatedAt -status")
    .sort({ createdAt: -1 });
};

const findById = async (id: string) => {
  return Job.findOne({
    _id: id,
    status: constants.WELLKNOWNSTATUS.ACTIVE,
  }).populate("organization");
};

export default { save, findAllJobs, findAllJobsByAddedBy, findById };

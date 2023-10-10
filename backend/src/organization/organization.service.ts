import constants from "../constant";
import Organization from "./organization.model";

const save = async (org: any, session: any) => {
  return await org.save({ session });
};

const findById = async (id: string) => {
  return await Organization.findById(id);
};

const findAll = async () => {
  return await Organization.find({
    status: constants.WELLKNOWNSTATUS.ACTIVE,
  }).sort({ createdAt: 1 });
};
export default { save, findById, findAll };

import constants from "../constant";
import Category from "./category.model";

const save = async (category: any, session: any) => {
  if (session) {
    return await category.save({ session });
  } else {
    return await category.save();
  }
};

const findById = async (id: string) => {
  return await Category.findById(id);
};

const findAllByType = async (name: string) => {
  return await Category.find({
    categoryType: name,
    status: constants.WELLKNOWNSTATUS.ACTIVE,
  }).sort({ createdAt: -1 });
};

export default { save, findById, findAllByType };

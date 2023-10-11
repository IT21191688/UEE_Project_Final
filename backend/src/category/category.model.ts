import mongoose from "mongoose";
import constants from "../constant";

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },

    description: {
      type: String,
    },

    categoryType: {
      type: String,
      required: [true, "Category type is required"],
      enum: {
        values: [constants.CATEGORYTYPES.NEWS, constants.CATEGORYTYPES.JOB,constants.CATEGORYTYPES.CERTIFICATE,constants.CATEGORYTYPES.SERVICETYPE],
        message: "Valid category type required",
      },
    },

    status: {
      type: Number,
      default: constants.WELLKNOWNSTATUS.ACTIVE,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Category", CategorySchema);

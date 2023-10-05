import mongoose from "mongoose";
import constants from "../constant";

const JobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required!"],
    },

    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },

    avgAnnualSalary: {
      type: Number,
      required: [true, "Job average annual salary is required!"],
    },

    description: {
      type: String,
      required: [true, "Job description is required!"],
    },

    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
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

export default mongoose.model("Job", JobSchema);

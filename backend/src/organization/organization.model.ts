import mongoose from "mongoose";
import constants from "../constant";

const OrganizationSchema = new mongoose.Schema(
  {
    orgName: {
      type: String,
      required: [true, "Organization name is required"],
    },
    orgEmail: {
      type: String,
      required: [true, "Email is required"],
      validate: {
        validator: (value: string) => {
          return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            value
          );
        },
        message: (props: any) => `${props.value} is not a valid email`,
      },
    },
    orgAddress: {
      type: String,
      required: [true, "Address is required"],
    },

    country: {
      type: String,
      required: [true, "Country is required"],
    },
    orgImage: {
      type: String,
    },
    description: {
      type: String,
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

export default mongoose.model("Organization", OrganizationSchema);

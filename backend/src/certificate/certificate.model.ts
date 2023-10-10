import mongoose from "mongoose";
import constants from "../constant";

const CertificateSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Full name is required!"],
  },

  nic: {
    type: String,
    required: [true, "NIC is required!"],
  },

  email: {
    type: String,
    required: [true, "Email is required!"],
    validate: {
      validator: (value: string) => {
        return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          value
        );
      },
      message: (props: any) => `${props.value} is not a valid email`,
    },
  },

  address: {
    type: String,
    required: [true, "Address is required!"],
  },

  contactNumber: {
    type: String,
    required: [true, "Contact number is required!"],
  },

  certificate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },

  serviceType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },

  additionalDocuments: {
    type: [String],
  },

  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  status: {
    type: Number,
    default: constants.WELLKNOWNSTATUS.PENDING,
  },
});

export default mongoose.model("Certificate", CertificateSchema);

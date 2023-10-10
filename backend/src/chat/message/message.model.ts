import mongoose from "mongoose";
import constants from "../../constant";

const MessageSchema = new mongoose.Schema(
  {
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
    },

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    message: {
      type: String,
      required: [true, "Message is required"],
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

export default mongoose.model("Message", MessageSchema);

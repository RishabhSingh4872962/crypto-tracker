import mongoose from "mongoose";

const alertSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  cryptoName: {
    type: String,
    required: true,
  },
  triggerPrice: {
    type: String,
    required: true,
  },
  repeat: {
    type: String,
    required: true,
    default: "Once",
    enum: ["Once", "Everytime"],
  },
  expiry: {
    type: Date,
    required: true,
    default: new Date(Date.now() + 900000),
  },
  triggerCount: {
    type: Number,
    required: true,
    default: 0,
  },
  lastTriggered: {
    type: Date,
    required: true,
    default: null,
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date(),
  },
});

export const Alert = mongoose.model("Alert", alertSchema);

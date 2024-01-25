import mongoose from "mongoose";

export const TestSchema = mongoose.Schema(
  {
    encounterId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Encounter",
    },
    typeOfTest: {
      type: String,
      required: true,
    },
    testResult: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Test = mongoose.model("Test", TestSchema);

export default Test;

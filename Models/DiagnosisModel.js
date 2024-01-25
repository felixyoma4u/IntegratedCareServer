import mongoose from "mongoose";

export const DiagnosisSchema = mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Diagnosis = mongoose.model("Diagnosis", DiagnosisSchema);

export default Diagnosis;

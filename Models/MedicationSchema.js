import mongoose from "mongoose";

export const MedicationSchema = mongoose.Schema(
  {
    drugName: {
      type: String,
      required: true,
    },
    dosage: {
      type: String,
      required: true,
    },
    frequency: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Medication = mongoose.model("Medication", MedicationSchema);

export default Medication;

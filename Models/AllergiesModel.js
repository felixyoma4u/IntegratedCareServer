import mongoose from "mongoose";

export const AllergiesSchema = mongoose.Schema(
  {
    allergen: {
      type: String,
      required: true,
    },
    reaction: {
      type: String,
      required: true,
    },
    severity: {
      type: String,
      enum: ["moderate", "critical"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Allergies = mongoose.model("Allergies", AllergiesSchema);

export default Allergies;

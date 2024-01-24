import mongoose from "mongoose";

const practitionerSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
    },
    registrationNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    specialty: {
      type: String,
      required: true,
    },
    workAddress: {
      type: String,
      required: true,
    },
    workPhoneNumber: {
      type: Number,
      required: true,
    },
    emailAddress: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Practitioner = mongoose.model("Practitioner", practitionerSchema);

export default Practitioner;

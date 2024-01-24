import mongoose from "mongoose";

const practitionerSchema = mongoose.Schema(
  {
    firstName: {
      type: string,
      trim: true,
      required: true,
    },
    lastName: {
      type: string,
      trim: true,
      required: true,
    },
    registrationNumber: {
      type: number,
      required: true,
      unique: true,
    },
    specialty: {
      type: string,
      required: true,
    },
    workAddress: {
      type: string,
      required: true,
    },
    workPhoneNumber: {
      type: number,
      required: true,
    },
    emailAddress: {
      type: string,
      required: true,
    },
    password: {
      type: string,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Practitioner = mongoose.model("Practitioner", practitionerSchema);

export default Practitioner;

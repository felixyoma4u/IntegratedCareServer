import mongoose from "mongoose";

const patientSchema = mongoose.Schema(
  {
    userId: {
      type: string,
      required: true,
    },
    email: {
      type: string,
      required: true,
      unique: true,
    },
    password: {
      type: string,
      required: true,
    },
    firstName: {
      type: string,
      required: true,
      trim: true,
    },
    lastName: {
      type: string,
      required: true,
    },
    dob: {
      type: Date,
      default: null,
    },
    age: {
      type: Number,
      default: null,
    },
    location: {
      type: string,
      trim: true,
      default: null,
    },
    occupation: {
      type: string,
      trim: true,
      default: null,
    },
    gender: {
      type: string,
      enum: ["male", "female"],
      default: null,
    },
    maritalStatus: {
      type: string,
      enum: ["single", "married", "divorced"],
      default: null,
    },
    address: {
      type: string,
      default: null,
    },
    phoneNumber: {
      type: number,
      default: null,
    },
    nextOfKin: {
      type: string,
      default: null,
    },
    relationshipWithNextOfKin: {
      type: string,
      default: null,
    },
    contactOfNextOfKin: {
      type: number,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;

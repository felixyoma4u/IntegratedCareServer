import mongoose from "mongoose";

const patientSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
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
      type: String,
      trim: true,
      default: null,
    },
    occupation: {
      type: String,
      trim: true,
      default: null,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      default: null,
    },
    maritalStatus: {
      type: String,
      enum: ["single", "married", "divorced"],
      default: null,
    },
    address: {
      type: String,
      default: null,
    },
    phoneNumber: {
      type: Number,
      default: null,
    },
    nextOfKin: {
      type: String,
      default: null,
    },
    relationshipWithNextOfKin: {
      type: String,
      default: null,
    },
    contactOfNextOfKin: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;

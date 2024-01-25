import express from "express";
import asyncHandler from "express-async-handler";
import Patient from "../Models/PatientModel.js";
import ID from "nodejs-unique-numeric-id-generator";
import generateToken from "../Authentication/auth.js";

const patientRouter = express.Router();

//PATIENTS REGISTRATION
patientRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if (!email.includes("@")) {
      res.status(400);
      throw new Error("Invalid email");
    }

    const patientExists = await Patient.findOne({ email });

    if (patientExists) {
      res.status(400);
      throw new Error("Patient already exists");
    }

    const patient = await Patient.create({
      firstName,
      lastName,
      email,
      password,
      patientId: ID.generate(new Date().toJSON()),
    });

    if (patient) {
      res.status(201).json({
        patientId: patient.patientId,
        firstName: patient.firstName,
        lastName: patient.lastName,
        email: patient.email,
        token: generateToken(patient._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid Patient Data");
    }
  })
);

//PATIENTS LOGIN
patientRouter.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const patient = await Patient.findOne({ email });

    if (patient && (await patient.matchPassword(password))) {
      res.json({
        patientId: patient.patientId,
        firstName: patient.firstName,
        lastName: patient.lastName,
        email: patient.email,
        token: generateToken(patient._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  })
);

patientRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    res.json({
      message: "Hello patient",
    });
  })
);

export default patientRouter;

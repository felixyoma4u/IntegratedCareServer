import express from "express";
import asyncHandler from "express-async-handler";
import Patient from "../Models/PatientModel.js";
import ID from "nodejs-unique-numeric-id-generator";
import generateToken from "../utils/generateToken.js";
import { protect } from "../Middleware /AuthMiddleware.js";
import mailer from "../config/EmailService.js";
import jwt from "jsonwebtoken";

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

    // if (patientExists) {
    //   res.status(400);
    //   throw new Error("Patient already exists");
    // }

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
      });
      //TODO:Correct the url on deployment
      const confirmationUrl = "localhost:3000/api/patient/confirmation";
      mailer(patient, confirmationUrl);
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

    if (!patient) {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }

    if (!patient.confirmed) {
      throw new Error("Please confirm your email to login");
    }

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

//GET PATIENT BY PATIENT ID
patientRouter.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const patientId = req.query.patientId;
    if (!patientId) {
      res.status(400);
      throw new Error("Provide a valid patient id");
    }

    const patient = await Patient.findOne({ patientId });

    if (patient) {
      res.json({
        patientId: patient.patientId,
        firstName: patient.firstName,
        lastName: patient.lastName,
        email: patient.email,
      });
    } else {
      res.status(400);
      throw new Error("Patient does not exist");
    }
  })
);

//EMAIL CONFIRMATION
patientRouter.get(
  "/confirmation/:token",
  asyncHandler(async (req, res) => {
    const { id } = jwt.verify(req.params.token, process.env.JWT_SECRET);
    const patient = await Patient.findById(id);
    if (patient) {
      patient.confirmed = true;
      const confirmedPatient = await patient.save();
      res.json(confirmedPatient);
    } else {
      res.status(404);
      throw new Error("Patient not found");
    }
  })
);

export default patientRouter;

import express from "express";
import asyncHandler from "express-async-handler";
import Practitioner from "../Models/HealthCareProviderModel.js";
import generateToken from "../Authentication/auth.js";

const practitionerRouter = express.Router();

//PRACTITIONER REGISTRATION
practitionerRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const {
      firstName,
      lastName,
      registrationNumber,
      specialty,
      workAddress,
      workPhoneNumber,
      email,
      password,
    } = req.body;

    if (!email.includes("@")) {
      res.status(400);
      throw new Error("Invalid email");
    }

    const practitionerExists = await Practitioner.findOne({ email });

    if (practitionerExists) {
      res.status(400);
      throw new Error("Practitioner already exists");
    }

    const practitioner = await Practitioner.create({
      firstName,
      lastName,
      registrationNumber,
      specialty,
      workAddress,
      workPhoneNumber,
      email,
      password,
    });

    if (practitioner) {
      res.status(201).json({
        firstName: practitioner.firstName,
        lastName: practitioner.lastName,
        registrationNumber: practitioner.registrationNumber,
        specialty: practitioner.specialty,
        workAddress: practitioner.workAddress,
        workPhoneNumber: practitioner.workPhoneNumber,
        email: practitioner.email,
        token: generateToken(practitioner._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid Practitioner Data");
    }
  })
);

//PRACTITIONER LOGIN
practitionerRouter.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const practitioner = await Practitioner.findOne({ email });

    if (practitioner && (await practitioner.matchPassword(password))) {
      res.json({
        firstName: practitioner.firstName,
        lastName: practitioner.lastName,
        registrationNumber: practitioner.registrationNumber,
        specialty: practitioner.specialty,
        workAddress: practitioner.workAddress,
        workPhoneNumber: practitioner.workPhoneNumber,
        email: practitioner.email,
        token: generateToken(practitioner._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  })
);

export default practitionerRouter;

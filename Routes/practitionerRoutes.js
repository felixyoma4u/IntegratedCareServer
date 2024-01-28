import express from "express";
import asyncHandler from "express-async-handler";
import Practitioner from "../Models/HealthCareProviderModel.js";
import generateToken from "../utils/generateToken.js";
import { protect } from "../Middleware /AuthMiddleware.js";
import mailer from "../config/EmailService.js";
import jwt from "jsonwebtoken";

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
      });
      //TODO: Correct the url on deployment
      const confirmationUrl = "localhost:3000/api/practitioner/confirmation";
      mailer(practitioner, confirmationUrl);
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

    if (!practitioner) {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }

    if (!practitioner.confirmed) {
      throw new Error("Please confirm your email to login");
    }

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

practitionerRouter.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const email = req.query.email;
    if (!email) {
      res.status(400);
      throw new Error("Provide a valid email");
    }

    if (!email.includes("@")) {
      res.status(400);
      throw new Error("Provide a valid email");
    }

    const practitioner = await Practitioner.findOne({ email });

    if (practitioner) {
      res.json({
        firstName: practitioner.firstName,
        lastName: practitioner.lastName,
        registrationNumber: practitioner.registrationNumber,
        specialty: practitioner.specialty,
        workAddress: practitioner.workAddress,
        workPhoneNumber: practitioner.workPhoneNumber,
        email: practitioner.email,
      });
    } else {
      res.status(400);
      throw new Error("Practitioner does not exist");
    }
  })
);

//EMAIL CONFIRMATION
practitionerRouter.get(
  "/confirmation/:token",
  asyncHandler(async (req, res) => {
    const { id } = jwt.verify(req.params.token, process.env.JWT_SECRET);
    const practitioner = await Practitioner.findById(id);
    if (practitioner) {
      practitioner.confirmed = true;
      const confirmedPractitioner = await practitioner.save();
      res.json(confirmedPractitioner);
    } else {
      res.status(404);
      throw new Error("Practitioner not found");
    }
  })
);

export default practitionerRouter;

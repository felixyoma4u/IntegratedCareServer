import express from "express";
import asyncHandler from "express-async-handler";
import Patient from "../Models/PatientModel.js";

const patientRouter = express.Router();

patientRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    await Patient.create({
      firstName: "Ty",
      userId: "2",
      email: "ty2@ty.com",
    });
    res.json({
      message: "Hello patient",
    });
  })
);

export default patientRouter;

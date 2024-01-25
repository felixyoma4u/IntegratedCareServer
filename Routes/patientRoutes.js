import express from "express";
import asyncHandler from "express-async-handler";
import Encounter from "../Models/EncounterModel.js";
import Procedure from "../Models/ProcedureModel.js";

const patientRouter = express.Router();

patientRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    res.json({
      message: "Hello patient",
    });
  })
);

export default patientRouter;

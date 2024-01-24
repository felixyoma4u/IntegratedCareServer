import express from "express";
import asyncHandler from "express-async-handler";

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

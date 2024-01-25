import express from "express";
import asyncHandler from "express-async-handler";
import passport from "passport";
import jwt from "jsonwebtoken";

const authRouter = express.Router();

authRouter.post(
  "/login",
  passport.authenticate(
    "login",
    { session: false },
    asyncHandler(async (req, res) => {
      const token = jwt.sign({ email: req.user.email }, process.env.JWT_SECRET);
      res.json({ token });
    })
  )
);

export default authRouter;

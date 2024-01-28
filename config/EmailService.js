import nodemailer from "nodemailer";
import generateToken from "../utils/generateToken.js";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAILER_EMAIL,
    pass: process.env.MAILER_PASSWORD,
  },
});

const mailer = async ({ _id, email }, confirmationUrl) => {
  try {
    const emailToken = generateToken(_id);
    const url = `${confirmationUrl}/${emailToken}`;

    await transporter.sendMail({
      from: {
        name: "Integrated Care",
        address: process.env.MAILER_EMAIL,
      },
      to: email,
      subject: "Confirm Mail",
      html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
    });
  } catch (e) {
    console.log(e);
  }
};

export default mailer;

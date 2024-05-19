import _ from "lodash";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { handleStatus } from "./handleStatus/handle-status.js";
import dotenv from "dotenv";
dotenv.config();


export async function confirmation(user) {
  try {
    console.log(user.email);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const emailToken = jwt.sign({ user: _.pick(user, "id") }, process.env.EMAIL_SECRET, {
      expiresIn: "1d",
    });

    // const url = `http://localhost:5000/confirmation/${emailToken}`;
    const url = `https://quickquizb.onrender.com/confirmation/${emailToken}`;

    // console.log(emailToken);
    const info = await transporter.sendMail({
      from: "quizquick31@gmail.com",
      to: user.email,
      subject: "Quick Quiz",
      html: `Please click this email to confirm your email: <a href="${url}">Click here</a>`,
    });
    console.log("Message sent: %s", info.messageId);
    return { status: handleStatus.SUCCESS };
  } catch (err) {
    console.error("Error sending confirmation email:", err.message);
    return { status: handleStatus.FAil };
  }
}
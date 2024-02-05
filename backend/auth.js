import _ from "lodash";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

export async function confirmation(user) {
  try {
    console.log(user.email);
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      auth: {
        user: "quizquick31@gmail.com",
        pass: "UAJFMDn4mjQWwvcx",
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
  } catch (err) {
    console.error("Error sending confirmation email:", err.message);
  }
}
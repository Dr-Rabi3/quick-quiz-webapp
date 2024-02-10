import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import _ from "lodash";
import jwt from "jsonwebtoken";
import { confirmation } from "./auth.js";
import { generateToken, extractInfoFromToken } from "./createToken.js";
import { getURL } from "./CreateUrl.js";
import { handleStatus } from "./handleStatus/handle-status.js";
import { config } from "dotenv";
import mongoose from "mongoose";
import { User } from "./model/UsersAccount.js";
import { Exam } from "./model/Exam.js";
import { Question } from "./model/Questions.js";
import { UrlToken } from "./model/URL.js";
import { ExamSubmission } from "./model/Response.js";
config();
const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));
const corsOptions = {
  origin: "https://quickquiz-0f4n.onrender.com", // frontend URI (ReactJS)
  // origin: "http://localhost:3000", // frontend URI (ReactJS)
};
app.use(cors(corsOptions));

mongoose.connect(process.env.MONGO_URL).then(() => {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log("Server start and listening on port", port);
  });
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use((error, req, res, next) => {
  console.log(error.statusCode);
  res.status(error.statusCode || 500),
    json({ status: error.statusText, data: error.message });
});

// get user by email and password
app.post("/user", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: handleStatus.FAil,
        message: "Both username and password are required.",
      });
    }
    const user = await User.findOne({ email: email }, { _id: false });
    if (!user)
      return res.status(400).json({
        status: handleStatus.FAil,
        message: "The Email or Password is wrong",
      });
    if (!user.confirm)
      return res
        .status(400)
        .json({
          status: handleStatus.FAil,
          message: "The Email not confirmed",
        });
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(400).json({
        status: handleStatus.FAil,
        message: "The Email or Password is wrong",
      });
    }
    const token = generateToken({
      email,
      userId: user.id,
      userName: user["first-name"],
    });
    res.status(200).json({ status: handleStatus.SUCCESS, data: token });
  } catch (er) {
    res
      .status(404)
      .json({ status: handleStatus.FAil, message: "Failed to fetch data" });
  }
});

// get user by id
app.get("/user:uid", async (req, res) => {
  try {
    const token = extractInfoFromToken(req.params.uid.slice(1));
    const user = await User.findOne({ id: +token.userId });
    res.status(200).json({ status: handleStatus.SUCCESS, data: user });
  } catch (err) {
    res.status(401).json({ status: handleStatus.FAil, message: err.message });
  }
});
// get user name
app.get("/user:uid/exam", async (req, res) => {
  try {
    const user = await User.findOne({ id: +req.params.uid.slice(1) });
    res.status(200).json({
      status: handleStatus.SUCCESS,
      data: { first: user["first-name"], last: user["last-name"] },
    });
  } catch (err) {
    res.status(401).json({ status: handleStatus.FAil, message: err.message });
  }
});
// get users
app.get("/users", async (req, res) => {
  try {
    const data = await User.find();
    res
      .status(200)
      .json({ status: handleStatus.SUCCESS, data: JSON.parse(data) });
  } catch (er) {
    res.status(401).json({ status: handleStatus.FAil, data: err });
  }
});
// add user
app.post("/create-account", async (req, res) => {
  try {
    const password = await bcrypt.hash(req.body.password, 12);
    const allUsers = await User.countDocuments();
    const user = new User({
      ...req.body,
      password,
      id: allUsers + 1,
      confirm: false,
    });
    await confirmation(user);
    await user.save();
    res.status(201).json({ status: handleStatus.SUCCESS, data: user });
  } catch (err) {
    res.status(401).json({ status: handleStatus.FAil, message: err.message });
  }
});
// update confirm url frontend
app.get("/confirmation/:token", async (req, res) => {
  try {
    const {
      user: { id },
    } = jwt.verify(req.params.token, process.env.EMAIL_SECRET);
    const user = await User.findOne({ id: id });
    user.confirm = true;
    user.save();
    // return res.redirect("http://localhost:3000/login");
    return res.status(200).redirect("https://quickquiz-0f4n.onrender.com/login");
  } catch (e) {
    res.status(401).json({ status: handleStatus.FAil, message: e.message });
  }
});
// get user exams
app.get("/users:uid/exams", async (req, res) => {
  try {
    const user = extractInfoFromToken(req.params.uid.slice(1));
    const exams = await Exam.find({ userId: user.userId });
    res.status(200).json({
      status: handleStatus.SUCCESS,
      data: { user, exams: [...exams] },
    });
  } catch (err) {
    return res
      .status(404)
      .send({ status: handleStatus.ERROR, message: err.message });
  }
});
// add user exam
app.post("/users:uid/add-exam", async (req, res) => {
  try {
    if (
      req.body.title.trim() === "" ||
      req.body.duration.trim() === "" ||
      req.body.level.trim() === ""
    ) {
      return res
        .status(401)
        .json({ status: handleStatus.FAil, data: "All data are required" });
    }
    const uid = parseInt(req.params.uid.slice(1), 10);
    const count = await Exam.countDocuments();
    
    const exam = new Exam({
      ...req.body,
      id: `${uid}b${count + 1}`,
      userId: uid,
    });
    exam.save();
    res.status(201).json({ status: handleStatus.SUCCESS, data: "exam added!" });
  } catch (err) {
    return res
      .status(404)
      .send({ status: handleStatus.ERROR, message: err.message });
  }
});
app.get("/user/exam:eid", async (req, res) => {
  try {
    const exam = await Exam.findOne({ id: req.params.eid.slice(1) });
    res.status(200).json({ status: handleStatus.SUCCESS, data: exam });
  } catch (err) {
    return res
      .status(404)
      .send({ status: handleStatus.ERROR, message: err.message });
  }
});
// get token
app.get("/user/home/exam:eid/:token", async (req, res) => {
  try {
    const token = extractInfoFromToken(req.params.token.slice(1));
    delete token["iat"];
    delete token["exp"];
    const nwToken = generateToken({
      ...token,
      examId: req.params.eid.slice(1),
    });
    const count = await ExamSubmission.countDocuments({
      examId: req.params.eid.slice(1),
    });
    res.json({ status: handleStatus.SUCCESS, data: {count, nwToken} });
  } catch (err) {
    return res
      .status(404)
      .send({ status: handleStatus.ERROR, message: err.message });
  }
});
// get user exam question
app.get("/users/exams:eid/questions", async (req, res) => {
  try {
    const eid = req.params.eid.slice(1);
    const questions = await Question.find({ examId: eid });
    return res
      .status(200)
      .json({ status: handleStatus.SUCCESS, data: questions });
  } catch (err) {
    return res
      .status(404)
      .send({ status: handleStatus.ERROR, message: err.message });
  }
});
// add user exam question
app.post("/users:uid/exams:eid/add-questions", async (req, res) => {
  try {
    const eid = req.params.eid.slice(1);
    await Question.deleteMany({ examId: eid });
    const nwQuestions = [];
    const questions = req.body;
    for (let i = 0; i < questions.length; i++) {
      const question = {
        ...questions[i],
        id: `question${Math.floor(Math.random() * 1000000)}`,
        examId: eid,
      };
      nwQuestions.push(question);
    }
    Question.insertMany(nwQuestions)
      .then(() => {
        console.log("Questions inserted successfully");
      })
      .catch((error) => {
        console.error("Error inserting questions:", error);
      });
    res
      .status(201)
      .json({ status: handleStatus.SUCCESS, data: "questions added!" });
  } catch (err) {
    return res
      .status(404)
      .send({ status: handleStatus.ERROR, message: err.message });
  }
});
// create exam link
app.get("/user:uid/exam:eid/create-link", async (req, res) => {
  try {
    const token = generateToken({
      userId: req.params.uid.slice(1),
      examId: req.params.eid.slice(1),
    });
    let url = getURL();
    const isExist = await UrlToken.findOne({ url: url });
    if (isExist) {
      url = getURL();
    }
    const UT = new UrlToken({
      url,
      token,
    });
    UT.save();
    res.status(200).json({
      status: handleStatus.SUCCESS,
      // data: { Link: `http://localhost:5000/:${url}` },
      data: { Link: `https://quickquizb.onrender.com/:${url}` },
    });
  } catch (err) {
    return res
      .status(404)
      .send({ status: handleStatus.ERROR, message: err.message });
  }
});

app.get("/:token", async (req, res) => {
  try {
    const url = await UrlToken.findOne({ url: req.params.token.slice(1) });
    if (url) return res.status(200).redirect(
      `https://quickquiz-0f4n.onrender.com/exam/:${url.token}`
      // `http://localhost:3000/exam/:${url.token}`
    );
    res
      .status(404)
      .json({ status: handleStatus.ERROR, data: "Filed to fetch!" });
  } catch (err) {
    return res
      .status(404)
      .send({ status: handleStatus.FAil, message: err.message });
  }
});

app.get("/exam/:token", async (req, res) => {
  try {
    const token = extractInfoFromToken(req.params.token.slice(1));
    const questions = await Question.find({ examId: token.examId });
    const examData = {
      userId: token.userId,
      examId: token.examId,
      questions: questions,
    };
    return res
      .status(200)
      .json({ status: handleStatus.SUCCESS, data: examData });
  } catch (err) {
    return res
      .status(404)
      .json({ status: handleStatus.FAil, message: err.message });
  }
});
// add responses from students
// app.post("/exam/response", async (req, res) => {
//   try {
//     const isExist = await ExamSubmission.find({
//       'student.id': req.body.student.id,
//       examId: req.body.examId,
//     });
//     if (isExist.length > 0) {
//       console.log("ExamSubmission");
//       await ExamSubmission.deleteMany({
//         'student.id': req.body.student.id,
//         examId: req.body.examId,
//       });
//     }
//     const response = new ExamSubmission({
//       ...req.body,
//       id: Math.floor(Math.random() * 1000000),
//     });
//     // console.log(response);
//     await response.save();
//     return res
//       .status(201)
//       .json({ status: handleStatus.SUCCESS, data: "ok" });
//   } catch (err) {
//     console.log(err);
//     return res
//       .status(404)
//       .json({ status: handleStatus.FAil, data: err.message });
//   }
// });

app.post("/exam/response", async (req, res) => {
  try {
    const { student, examId } = req.body;

    // Check if the submission already exists for the student and exam
    const existingSubmission = await ExamSubmission.findOne({
      'student.id': student.id,
      examId: examId,
    });

    if (existingSubmission) {
      // If submission already exists, delete it
      await ExamSubmission.deleteMany({
        'student.id': student.id,
        examId: examId,
      });
    }
    // Create a new submission
    const response = new ExamSubmission({
      ...req.body,
      id: Math.floor(Math.random() * 1000000),
    });
    await response.save();

    // Remove duplicates based on student ID and exam ID
    await ExamSubmission.deleteMany({
      'student.id': student.id,
      examId: examId,
      _id: { $ne: response._id } // Exclude the newly inserted document
    });




    return res.status(201).json({ status: handleStatus.SUCCESS, data: "ok" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: handleStatus.FAil, message: err.message });
  }
});
// get responses from students
app.get("/exam/response/:token", async (req, res) => {
  try {
    const token = extractInfoFromToken(req.params.token.slice(1));
    const responses = await ExamSubmission.find({
      userId: token.userId,
      examId: token.examId,
    });
    return res
      .status(200)
      .json({ status: handleStatus.SUCCESS, data: responses });
  } catch (err) {
    return res.status(400).json({ status: handleStatus.FAil, message: err.message });
  }
});

// send notification to user
app.get("/notification/:eid/:rm", async (req, res) => {
  try {
    const { eid, rm } = req.params; // Assuming examId is stored in the token

    // Retrieve the exam from the database using examId
    const exam = await Exam.findOne({id: eid.slice(1)});
    if (!exam) {
      return res
        .status(404)
        .json({ status: handleStatus.FAil, message: "Exam not found" });
    }

    // Increase the number of notifications by one
    exam.notify = +rm.slice(1);

    // Save the updated exam
    await exam.save();
    // Return the updated exam data
    return res.status(200).json({ status: handleStatus.SUCCESS, data: exam });
    
  } catch (err) {
    return res
      .status(404)
      .json({ status: handleStatus.ERROR, message: err.message });
  }
});

app.use((req, res) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  res.status(404).json({ message: "Not found!" });
});

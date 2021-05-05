require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./authRouter");
const cors = require('cors')
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors())
app.use(express.json());
app.use("/auth", authRouter);
const start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.j5bqm.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
      },
      () => {
        console.log("Connected to DB");
      }
    );
  } catch (error) {
    console.log(error);
  }
  app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT}`);
  });
};
start();

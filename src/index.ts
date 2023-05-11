import express, { Application } from "express";
import cors from "cors";
import bodyParser from "body-parser";
const morgan = require("morgan");

const app: Application = express();
const PORT = process.env.PORT || 9987;

import { getWorkStatus, getResume } from "./modules";
import { verificationGetResume } from "./middleware";

// configuration
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev")); // logger

// common
app.get("/status", getWorkStatus);

// GET
app.get("/getResume", verificationGetResume, getResume);

// listener
app.listen(PORT, (): void => {
  console.log(`pdf-me running on port here 👉 ${PORT}`);
});

import express, { Application } from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app: Application = express();
const PORT = process.env.PORT || 9987;

import { getWorkStatus } from "./modules";

// configuration
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// common
app.get("/status", getWorkStatus);

// listener
app.listen(PORT, (): void => {
  console.log(`pdf-me running on port here 👉 ${PORT}`);
});

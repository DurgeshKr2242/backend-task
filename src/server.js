import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import morgan from "morgan";

import userRouter from "./routes/user.js";
export const USERS = [];

dotenv.config();
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded());

// app.use("/", (req, res) => {
//   res.send("Hello");
// });

app.use("/api/user", userRouter);

app.listen(3030, () => {
  console.log("Server running on port 3000");
});

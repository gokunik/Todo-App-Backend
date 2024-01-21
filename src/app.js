import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import Router from "./Routes/index.js";

const app = express();

app.use(
  cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", Router);

export { app };

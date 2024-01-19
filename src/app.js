import express from "express";
import cookieParser from "cookie-parser";
import Router from "./Routes/index.js";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", Router);

export { app };

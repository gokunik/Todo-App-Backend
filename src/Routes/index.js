import { Router as ExpressRouter } from "express";
import authRouter from "./auth.routes.js";
import todoRouter from "./todos.routes.js";

const Router = ExpressRouter();

Router.use("/todos", todoRouter);
Router.use("/auth", authRouter);

export default Router;

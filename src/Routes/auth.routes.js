import { Router as ExpressRouter } from "express";
import { signUp, userLogin } from "../Controller/auth.controller.js";

const Router = ExpressRouter();

Router.get("/login", userLogin);
Router.post("/signup", signUp);

export default Router;

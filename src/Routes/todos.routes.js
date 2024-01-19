import { Router as ExpressRouter } from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
} from "../Controller/todos.controller.js";
import { userJwtAuthorization } from "../Middleware/index.js";

const Router = ExpressRouter();

Router.use(userJwtAuthorization);

Router.route("/").get(getAllTodos).post(createTodo);
Router.route("/:todoId").get(getTodoById).put(updateTodo).delete(deleteTodo);

export default Router;

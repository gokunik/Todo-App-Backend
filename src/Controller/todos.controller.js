import { UserModel, todoModel } from "../Models/index.js";

import { ApiResponse, asyncHandler, todoSchema } from "../Utils/index.js";

const getAllTodos = asyncHandler(async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id).populate("todos");
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Todos fetched successfully!",
          { todos: user.todos },
          true
        )
      );
  } catch (error) {
    return res
      .status(50)
      .json(
        new ApiResponse(400, "Fetching todos failed!", {}, false, [
          error.name,
          error.message,
        ])
      );
  }
});

const getTodoById = asyncHandler(async (req, res) => {
  const todoId = req.params.todoId;
  if (!todoId) {
    return res.status(400).json(400, "Todo Id not provided!", {}, false);
  }

  try {
    const todo = await UserModel.findById(req.user._id)
      .populate({
        path: "todos",
        match: { _id: todoId },
      })
      .select("todos -_id");

    if (!todo) {
      return res
        .status(400)
        .json(new ApiResponse(400, "todo id does not exists", {}, false));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, "Todo fetched!", { todos: todo.todos }));
  } catch (error) {
    return res
      .status(500)
      .json(
        new ApiResponse(400, "Fetching todo failed!", {}, false, [
          error.name,
          error.message,
        ])
      );
  }
});

const createTodo = asyncHandler(async (req, res) => {
  const todo = todoSchema.safeParse(req.body);

  if (!todo.success) {
    return res
      .status(400)
      .json(
        new ApiResponse(400, "todo validation failed!", {}, false, todo.error)
      );
  }

  try {
    const createdTodo = await todoModel.create(todo.data);
    const user = await UserModel.updateOne(
      { _id: req.user._id },
      { $addToSet: { todos: createdTodo._id } }
    );

    if (user.modifiedCount === 1) {
      return res
        .status(201)
        .json(
          new ApiResponse(
            201,
            "Todo created successfully!",
            { id: createdTodo._id },
            true
          )
        );
    } else {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            "Failed to add todo id in user document",
            { todo },
            false
          )
        );
    }
  } catch (error) {
    return res
      .status(500)
      .json(
        new ApiResponse(400, "Creating todo failed!", {}, false, [
          error.name,
          error.message,
        ])
      );
  }
});

const updateTodo = asyncHandler(async (req, res) => {
  const todoId = req.params.todoId;

  if (!todoId) {
    return res.status(400).json(400, "Todo Id not provided!", {}, false);
  }

  const todo = todoSchema.safeParse(req.body);

  if (!todo.success) {
    return res
      .status(400)
      .json(
        new ApiResponse(400, "todo validation failed!", {}, false, todo.error)
      );
  }

  try {
    const user = await UserModel.findById(req.user._id);
    const isTodoIdValid = user.todos.includes(todoId);

    if (isTodoIdValid) {
      const updatedTodo = await todoModel.updateOne({ _id: todoId }, todo.data);
      if (updatedTodo.modifiedCount === 1) {
        return res
          .status(200)
          .json(new ApiResponse(200, "Todo updated sucessful!", {}));
      } else {
        throw new Error("todo can not be updated!");
      }
    } else {
      return res
        .status(400)
        .json(400, "You are not allowed to update this todo!", {}, false);
    }
  } catch (error) {
    return res
      .status(500)
      .json(
        new ApiResponse(400, "updating todo failed!", {}, false, [
          error.name,
          error.message,
        ])
      );
  }
});

const deleteTodo = asyncHandler(async (req, res) => {
  const todoId = req.params.todoId;
  if (!todoId) {
    return res.status(400).json(400, "Todo Id not provided!", {}, false);
  }

  try {
    const user = await UserModel.findById(req.user._id);
    const isTodoIdValid = user.todos.includes(todoId);

    if (isTodoIdValid) {
      const deleteTodoResult = await todoModel.deleteOne({ _id: todoId });

      if (deleteTodoResult.deletedCount === 1) {
        return res
          .status(200)
          .json(
            new ApiResponse(200, "Todo deleted sucessful!", { id: todoId })
          );
      } else {
        throw new Error("todo can not be deleted!");
      }
    } else {
      return res
        .status(400)
        .json(400, "You are not allowed to delete this todo!", {}, false);
    }
  } catch (error) {
    return res
      .status(500)
      .json(
        new ApiResponse(400, "deleting todo failed!", {}, false, [
          error.name,
          error.message,
        ])
      );
  }
});

export { getAllTodos, getTodoById, createTodo, updateTodo, deleteTodo };

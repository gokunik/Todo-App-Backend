import { UserModel } from "../Models/index.js";
import {
  ApiResponse,
  UserValidation,
  generateJWT,
  asyncHandler,
  passwordValidation,
} from "../Utils/index.js";

const signUp = asyncHandler(async (req, res) => {
  let { username, password } = req.body;

  username = UserValidation.safeParse(username);
  password = passwordValidation.safeParse(password);

  if (!username.success || !password.success) {
    const errors = {};
    if (!username?.success) {
      errors.username = [...username.error.issues];
    }

    if (!password?.success) {
      errors.password = [...password.error.issues];
    }

    return res.json(
      new ApiResponse(400, "Input validation failed", {}, false, errors)
    );
  }

  username = username.data;
  password = password.data;

  if (username === password) {
    return res.json(
      new ApiResponse(400, "Username and password must not be same!", {}, false)
    );
  }

  try {
    const user = await UserModel.findOne({ username });
    if (user) {
      return res.json(
        new ApiResponse(400, "User already exists!", { username }, false)
      );
    }

    const newUser = await UserModel.create({ username, password });
    const jwtToken = generateJWT({
      id: newUser._id,
      username: newUser.username,
    });
    const cookieOptions = {
      httpOnly: true,
      secure: true,
    };
    return res
      .cookie("jwt", jwtToken, cookieOptions)
      .status(201)
      .json(
        new ApiResponse(201, "User created successfully!", {
          user: {
            id: newUser._id,
            username: newUser.username,
          },
        })
      );
  } catch (error) {
    return res.json(
      new ApiResponse(
        500,
        "Internal Server Error!",
        {
          message: "Error occurred while creating new user",
        },
        false,
        [error.name, error.message]
      )
    );
  }
});

const userLogin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!(username && password)) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          "Username and password required",
          { username },
          false
        )
      );
  }

  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, "username does not exists!", { username }, false)
        );
    }
    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, "Password is incorrect!", { username }, false)
        );
    }

    const jwtToken = generateJWT({
      _id: user._id,
      username: user.username,
    });
    const cookieOptions = {
      httpOnly: true,
      secure: true,
    };
    res
      .cookie("jwt", jwtToken, cookieOptions)
      .status(200)
      .json(
        new ApiResponse(
          200,
          "User login successful!",
          { id: user._id, username: user.username, todos: user.todos },
          true
        )
      );
  } catch (error) {
    return res
      .status(500)
      .json(
        new ApiResponse(500, "User login failed!", {}, false, [
          error.name,
          error.message,
        ])
      );
  }
});

export { signUp, userLogin };

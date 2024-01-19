import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: 3,
      maxLength: 18,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      maxLength: 18,
    },
    todos: [{ type: Schema.Types.ObjectId, ref: "todos", default: [] }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const UserModel = new model("users", userSchema);

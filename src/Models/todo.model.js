import { Schema, model } from "mongoose";

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 200,
    },
    description: {
      type: String,
      default: "",
    },
    completed: {
      type: Boolean,
      default: false,
    },
    completedDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const todoModel = new model("todos", todoSchema);

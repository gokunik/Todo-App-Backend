import { z } from "zod";

export const UserValidation = z
  .string()
  .trim()
  .toLowerCase()
  .min(3, { message: "username must be at least 3 characters long!" })
  .max(18, { message: "username must not exceed 18 characters!" })
  .refine(
    (value) => {
      return /^[.,\-_a-zA-Z0-9]+$/.test(value) && !/\s/.test(value);
    },
    {
      message:
        'Username can only contain letters, numbers, ".", ",", "-", or "_" and must not contain spaces',
    }
  );

// todo: add conditions to inforce strong password
// for ex - password must have 1 capital letter, 1 special character
export const passwordValidation = z
  .string()
  .min(8, { message: "password must be at least 8 characters long!" })
  .max(18, { message: "password must not exceed 18 characters!" });

export const todoSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, { message: "Todo must be at least 3 characters long" })
    .max(200, { message: "Title must not exceed 200 characters" }),
  description: z.string().trim().optional(),
  completed: z.boolean().optional(),
  completedDate: z.date().nullable().optional(),
});

import { z } from "zod";

export const changePasswordSchema = z
  .object({
    oldPassword: z
      .string({ required_error: "Password is required" })
      .min(1, { message: "Password is required" }),
    newPassword: z
      .string({ required_error: "Password is required" })
      .regex(
        /((?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*\W)\w.{6,18}\w)/,
        "Password should have at least one upper and lowercase, a number and a special character"
      ),
    confirmPassword: z.string(),
  })
  .refine(
    (values) => {
      return values.newPassword === values.confirmPassword;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    }
  );

export const editProfileSchema = z.object({
  firstname: z.string({ required_error: "Full name is required" }).min(3, {
    message: "Full name must be at least 3 characters.",
  }),
  lastname: z.string({ required_error: "Full name is required" }).min(3, {
    message: "Full name must be at least 3 characters.",
  }),

  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Enter a valid email" })
    .min(3, {
      message: "Email must be at least 3 characters.",
    }),
  mobile: z
    .string({ required_error: "Phone number is required" })
    .min(11, {
      message: "Phone number must be at 11 characters.",
    })
    .max(11, { message: "Phone must be at 11 characters." }),
  username: z.string({ required_error: "Username is required" }).min(3, {
    message: "Username must be at least 3 characters.",
  }),
});

export const twoFactorAuthSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Enter a valid email" })
    .min(3, {
      message: "Email must be at least 3 characters.",
    }),
});
export const createPostSchema = z.object({
  title: z.string({ required_error: "Title is required" }).min(3, {
    message: "Title must be at least 3 characters.",
  }),
  category: z.string({ required_error: "Category is required" }).min(3, {
    message: "Category must be at least 3 characters.",
  }),
  location: z.string({ required_error: "Location is required" }).min(3, {
    message: "Location must be at least 3 characters.",
  }),
});

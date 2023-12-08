import * as z from "zod";

export const signupSchema = z.object({
  // firstName: z.string({ required_error: "First name is required" }).min(3, {
  //   message: "First name must be at least 3 characters.",
  // }),
  // lastName: z.string({ required_error: "Last name is required" }).min(3, {
  //   message: "Last name must be at least 3 characters.",
  // }),
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
  firstname: z.string({ required_error: "Username is required" }).min(3, {
    message: "Username must be at least 3 characters.",
  }),
  lastname: z.string({ required_error: "Username is required" }).min(3, {
    message: "Username must be at least 3 characters.",
  }),
  password: z
    .string({ required_error: "Password is required" })
    .regex(
      /((?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*\W)\w.{6,18}\w)/,
      "Password should have at least one upper and lowercase, a number and a special character"
    ),
});

export const loginSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .min(1, { message: "Username is required" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, { message: "Username is required" }),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Enter a valid email" })
    .min(3, {
      message: "Email must be at least 3 characters.",
    }),
});

export const newPasswordSchema = z
  .object({
    password: z
      .string({ required_error: "Password is required" })
      .regex(
        /((?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*\W)\w.{6,18}\w)/,
        "Password should have at least one upper and lowercase, a number and a special character"
      ),
    confirmPassword: z.string(),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    }
  );

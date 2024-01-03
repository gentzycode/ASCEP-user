import * as z from "zod";

export const createRequestSchema = z.object({
  summary: z
    .string({ required_error: "Please enter your request summary" })
    .refine((value) => value.trim() !== "", {
      message: "Please enter your request summary",
    }),
  request: z
    .string({ required_error: "Please enter your request" })
    .refine((value) => value.trim() !== "", {
      message: "Please enter your request",
    }),
});

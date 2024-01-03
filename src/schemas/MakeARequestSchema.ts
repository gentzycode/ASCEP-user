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

export const searchRequestSchema = z.object({
  words: z.string().optional(),
  authority: z.string().optional(),
  privacy: z.string().optional(),
  from: z.coerce
    .date({
      invalid_type_error: "That's not a date!",
    })
    .optional(),
  to: z.coerce
    .date({
      invalid_type_error: "That's not a date!",
    })
    .optional(),
});

import * as z from "zod";

export const createRequestSchema = z.object({
  title: z
    .string({ required_error: "Please enter your request title" })
    .refine((value) => value.trim() !== "", {
      message: "Please enter your request title",
    }),
  description: z
    .string({ required_error: "Please enter your request description" })
    .refine((value) => value.trim() !== "", {
      message: "Please enter your request description",
    }),
  authority_id: z.string({ required_error: "Please enter your Authority ID" }),
  public_identifier: z
    .string({ required_error: "Please select request type" })
    .refine((value) => value.trim() !== "", {
      message: "Please select request type",
    }),
});

export const searchRequestSchema = z.object({
  text: z.string().optional(),
  authority: z.number().optional(),
  privacy: z.string().optional(),
  datetimeRange: z
    .object({
      startDate: z.coerce
        .date({
          invalid_type_error: "That's not a date!",
        })
        .optional(),
      endDate: z.coerce
        .date({
          invalid_type_error: "That's not a date!",
        })
        .optional(),
    })
    .optional(),
  status: z.string().optional(),
});

export const getRequestsSchema = z.object({
  page: z.number(),
  perPage: z.number(),
  filter: z.object({
    text: z.string().optional(),
    status: z.string().optional(),
    authority: z.number().optional(),
    privacy: z.string().optional(),

    datetimeRange: z
      .object({
        startDate: z.coerce
          .date({
            invalid_type_error: "That's not a date!",
          })
          .optional(),
        endDate: z.coerce
          .date({
            invalid_type_error: "That's not a date!",
          })
          .optional(),
      })
      .optional(),
  }),
});

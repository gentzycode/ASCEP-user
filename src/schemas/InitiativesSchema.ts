import * as z from "zod";

export const startInitiativeSchema = z.object({
  title: z
    .string({ required_error: "Please enter a title for your initiative" })
    .refine((value) => value.trim() !== "", {
      message: "Please enter a title for your initiative  ",
    }),
  description: z
    .string({ required_error: "Initiative description is required" })
    .refine((value) => value.trim() !== "", {
      message: "Please enter a description of your initiative",
    }),
  ward_id: z.number({ required_error: "Please select a ward" }),
  tags: z.array(z.string()).optional(),
  categories: z.number().array().min(1, "Please select at least one category"),
  sdgs: z.array(z.number()).optional(),
  targets: z.array(z.number()).optional(),
  support_needed: z
    .number({ required_error: "Support needed is required" })
    .min(1000, "minimum of 1000 support is needed")
    .positive(),
  id: z.string().optional(),
});

export const initiativeCommentSchema = z.object({
  content: z
    .string({ required_error: "comment text is required" })
    .refine((data) => data.trim() !== "", {
      message: "comment text cannot be empty",
    }),
  initiative_id: z.string({ required_error: "Initiative id is required" }),
  comment_reference: z.string().optional(),
});

export const voteInitiativeCommentSchema = z.object({
  type: z.string({ required_error: "vote type is required" }),

  comment_id: z.string({ required_error: "proposal id is required" }),
});
export const followInitiativeSchema = z.object({
  initiative_id: z.string({ required_error: "initiative id is required" }),
});

export const getInitiativeSchema = z.object({
  page: z.number(),
  perPage: z.number(),
  filter: z.object({
    sdgs: z.array(z.number()).optional(),
    specificSDG: z.number().optional(),
    specificTarget: z.number().optional(),
    targets: z.array(z.number()).optional(),
    tags: z.array(z.string()).optional(),
    mostactive: z.boolean().optional(),
    text: z.string().optional(),
    highestrating: z.boolean().optional(),
    newest: z.boolean().optional(),
    datetimeSpecific: z.string().optional(),
    datetimeRange: z
      .object({
        startDate: z.string(),
        endDate: z.string(),
      })
      .optional(),
  }),
});

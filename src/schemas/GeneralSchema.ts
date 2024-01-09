import * as z from "zod";

export const filterSchema = z.object({
  sdgs: z.array(z.number()).optional(),
  specificSDG: z.string().optional(),
  specificTarget: z.number().optional(),
  targets: z.array(z.number()).optional(),
  tags: z.array(z.string()).optional(),
  mostactive: z.boolean().optional(),
  text: z.string().optional(),
  highestrating: z.boolean().optional(),
  newest: z.boolean().optional(),
  datetimeSpecific: z.string().optional(),
  status: z.string().optional(),
});

export const commentSchema = z.object({
  content: z
    .string({ required_error: "comment text is required" })
    .refine((data) => data.trim() !== "", {
      message: "comment text cannot be empty",
    }),
  debate_id: z.number({ required_error: "debate id is required" }),
  comment_reference: z.number().optional(),
});

export const commentInputSchema = z.object({
  content: z
    .string({ required_error: "Comment text is required" })
    .refine((data) => data.trim() !== "", {
      message: "Comment text cannot be empty",
    }),
});

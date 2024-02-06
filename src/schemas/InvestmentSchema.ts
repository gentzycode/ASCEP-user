import * as z from "zod";

export const investmentCommentSchema = z.object({
  content: z
    .string({ required_error: "comment text is required" })
    .refine((data) => data.trim() !== "", {
      message: "comment text cannot be empty",
    }),
  investment_id: z.string({ required_error: "Proposal id is required" }),
  comment_reference: z.string().optional(),
});

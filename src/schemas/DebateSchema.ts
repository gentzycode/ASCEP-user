import * as z from "zod";
export const startDebateSchema = z.object({
    title: z.string({ required_error: "Please enter a title for your debate" }).refine((value) => value.trim() !== "", {
        message: "Please enter a title for your debate",
    }),
    description: z.string({ required_error: "Please entern the description of your debate" }).min(20, {
        message: "Debate description must be at least 20 characters.",
    }),
    tags: z.array(z.string()).optional(),
    sdgs: z.array(z.number()).optional(),
    targets: z.array(z.number()).optional(),
    id: z.string().optional()
});

export const debateCommentSchema = z.object({
    content: z
        .string({ required_error: "comment text is required" })
        .refine((data) => data.trim() !== "", {
            message: "comment text cannot be empty",
        }),
    debate_id: z
        .string({ required_error: "debate id is required" }),
    comment_reference: z
        .string().optional()
});

export const voteDebateSchema = z.object({
    type: z
        .string({ required_error: "vote type is required" }),

    debate_id: z
        .string({ required_error: "debate id is required" }),
});

export const voteDebateCommentSchema = z.object({
    type: z
        .string({ required_error: "vote type is required" }),

    comment_id: z
        .string({ required_error: "debate id is required" }),
});

export const filterDebateSchema = z.object({
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
})
export const getDebateSchema = z.object({
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
        datetimeRange: z.object({
            startDate: z.string(),
            endDate: z.string(),
        }).optional(),
    }),
});
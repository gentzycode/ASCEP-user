import * as z from "zod";
export const startDebateSchema = z.object({
    title: z.string({ required_error: "Debate title is required" }).min(3, {
        message: "Debate title must be at least 3 characters.",
    }),
    text: z.string({ required_error: "Debate text is required" }).min(20, {
        message: "Debate text must be at least 20 characters.",
    }),
    topics: z
        .string()
        .min(4, "Please enter a valid value")
        .optional()
        .or(z.literal('')),
    sdg: z
        .string()
        .optional()
        .or(z.literal('')),
});
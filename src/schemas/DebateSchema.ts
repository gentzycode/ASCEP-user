import * as z from "zod";
export const startDebateSchema = z.object({
    title: z.string({ required_error: "Debate title is required" }).min(3, {
        message: "Debate title must be at least 3 characters.",
    }),
    description: z.string({ required_error: "Debate description is required" }).min(20, {
        message: "Debate description must be at least 20 characters.",
    }),
    tags: z.array(z.string()).optional(),
    sdgs: z.array(z.number()).optional(),
    targets: z.array(z.number()).optional(),

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
import * as z from "zod";
const MAX_FILE_SIZE = 1024 * 1024 * 1;
const ACCEPTED_IMAGE_MIME_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
];

const MAX_DOCUMENT_SIZE = 3000000; // 3MB
const MAX_DOCUMENT_COUNT = 3;
const ACCEPTED_DOCUMENT_MIME_TYPES = ["application/pdf"];

export const startProposalSchema = z.object({
    title: z.string({ required_error: "Debate title is required" })
        .min(3, {
            message: "Debate title must be at least 3 characters.",
        })
        .optional(),
    summary: z.string({ required_error: "Proposal summary is required" })
        .max(200, {
            message: "Proposal summary must be maximum of 200 characters.",
        })
        .optional(),
    content: z.string({ required_error: "Proposal description is required" })
        .min(20, {
            message: "Proposal description must be at least 20 characters.",
        })
        .optional(),
    external_video_url: z.string().optional(),
    ward_id: z.number().optional(),
    tags: z.array(z.string()).optional(),
    categories: z.array(z.number()).optional(),
    sdgs: z.array(z.number()).optional(),
    targets: z.array(z.number()).optional(),
    support_needed: z.number({ required_error: "Support needed is required" }),
    documents: z
        .array(z.any())
        .refine((files) => {
            return (
                files.every((file) => file?.size <= MAX_DOCUMENT_SIZE) &&
                files.length <= MAX_DOCUMENT_COUNT
            );
        }, `Max document size is 3MB and you can upload up to ${MAX_DOCUMENT_COUNT} documents.`)
        .refine(
            (files) =>
                files.every(
                    (file) => ACCEPTED_DOCUMENT_MIME_TYPES.includes(file?.type)
                ),
            "Only PDF files are supported for documents."
        ).optional(),
    image: z
        .any()
        .refine((files) => {
            return files?.size <= MAX_FILE_SIZE;
        }, `Max image size is 1MB.`)
        .refine(
            (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.type),
            "Only .jpg, .jpeg, .png and .webp formats are supported."
        ).optional(),
});
export const proposalCommentSchema = z.object({
    content: z
        .string({ required_error: "comment text is required" })
        .refine((data) => data.trim() !== "", {
            message: "comment text cannot be empty",
        }),
    proposal_id: z
        .number({ required_error: "Proposal_id id is required" }),
    comment_reference: z
        .number().optional()
});
export const getProposalSchema = z.object({
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
export const filterProposalSchema = z.object({
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
export const voteProposalCommentSchema = z.object({
    type: z
        .string({ required_error: "vote type is required" }),

    comment_id: z
        .number({ required_error: "proposal id is required" }),
});
export const proposalTopicSchema = z.object({
    title: z
        .string({ required_error: "Topic title is required" }).refine((value) => value.trim() !== "", {
            message: "Topic title is required",
        }),
    content: z
        .string({ required_error: "Topic content is required" }).refine((value) => value.trim() !== "", {
            message: "Topic content is required",
        }),
    proposal_id: z
        .number({ required_error: "Proposal id is required" })

});

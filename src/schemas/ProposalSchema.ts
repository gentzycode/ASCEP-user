import * as z from "zod";
const MAX_IMAGE_SIZE = 1024 * 1024 * 1;
const ACCEPTED_IMAGE_MIME_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
];

const MAX_DOCUMENT_SIZE = 1000000;
const MAX_DOCUMENT_COUNT = 3;
const ACCEPTED_DOCUMENT_MIME_TYPES = ["application/pdf"];

export const startProposalSchema = z.object({
    title: z.string({ required_error: "Please enter a title for your proposal" })
        .refine((value) => value.trim() !== "", {
            message: "Please enter a title for your proposal",
        }),
    summary: z.string({ required_error: "Proposal summary is required" })
        .max(200, {
            message: "Proposal summary must be maximum of 200 characters.",
        }).refine((value) => value.trim() !== "", {
            message: "Please enter a summary of your proposal",
        }),
    content: z.string({ required_error: "Proposal text is required" })
        .min(200, {
            message: "Proposal text must be at least 200 characters.",
        }).refine((value) => value.trim() !== "", {
            message: "Proposal text is required",
        }),
    external_video_url: z.string().optional(),
    ward_id: z.number({ required_error: "Please select a ward" }),
    tags: z.array(z.string()).optional(),
    categories: z.number().array().min(1, "Please select at least one category"),
    sdgs: z.array(z.number()).optional(),
    targets: z.array(z.number()).optional(),
    support_needed: z.number({ required_error: "Support needed is required" }).min(1000, "minimum of 1000 support is needed").positive(),
    documents: z
        .array(z.any())
        .refine((files) => {
            return (
                files.every((file) => file?.size <= MAX_DOCUMENT_SIZE) &&
                files.length <= MAX_DOCUMENT_COUNT
            );
        }, `Max document size is 1MB and you can upload up to ${MAX_DOCUMENT_COUNT} documents.`)
        .refine(
            (files) =>
                files.every(
                    (file) => ACCEPTED_DOCUMENT_MIME_TYPES.includes(file?.type)
                ),
            "Only PDF files are supported for documents."
        )
        .optional(),
    image: z
        .any()
        .refine((files) => {
            return files?.size <= MAX_IMAGE_SIZE;
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


export const proposalTopicCommentSchema = z.object({
    content: z
        .string({ required_error: "comment text is required" })
        .refine((data) => data.trim() !== "", {
            message: "comment text cannot be empty",
        }),
    proposal_topic_id: z
        .number({ required_error: "Proposal_id id is required" }),
    comment_reference: z
        .number().optional(),
    id: z
        .number().optional()
});
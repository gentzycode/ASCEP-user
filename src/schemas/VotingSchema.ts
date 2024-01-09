import * as z from "zod";
const MAX_IMAGE_SIZE = 1024 * 1024 * 1;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const publishPollingSchema = z.object({
  title: z
    .string({ required_error: "Please enter a title for your poll" })
    .refine((value) => value.trim() !== "", {
      message: "Please enter a title for your poll",
    }),
  summary: z
    .string({ required_error: "Poll summary is required" })
    .max(200, {
      message: "Poll summary must be maximum of 200 characters.",
    })
    .refine((value) => value.trim() !== "", {
      message: "Please enter a summary of your poll",
    }),
  description: z
    .string({ required_error: "Poll description is required" })
    .refine((value) => value.trim() !== "", {
      message: "Please enter a description of your poll",
    }),

  start_date: z.date({
    required_error: "Start date is required",
    invalid_type_error: "Please enter a valid date!",
  }),
  end_date: z.date({
    required_error: "Closing date is required",
    invalid_type_error: "Please enter a valid date!",
  }),

  wards: z.number().array().min(1, "Please select at least one ward"),
  sdgs: z.array(z.number()).optional(),
  targets: z.array(z.number()).optional(),
  image: z
    .any()
    .refine((files) => {
      return files?.size <= MAX_IMAGE_SIZE;
    }, `Max image size is 1MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    )
    .optional(),
  id: z.string().optional(),
});

export const getPollsSchema = z.object({
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
    status: z.string().optional(),
  }),
});

export const filterPollSchema = z.object({
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
  status: z.string().optional(),
});

export const pollCommentSchema = z.object({
  content: z
    .string({ required_error: "comment text is required" })
    .refine((data) => data.trim() !== "", {
      message: "comment text cannot be empty",
    }),
  voting_id: z.string({ required_error: "Voting id is required" }),
  comment_reference: z.string().optional(),
});

export const pollQuestionAnswerSchema = z.object({
  voting_id: z.string(),
  question_id: z.string(),
  selected_option: z.string().refine((value) => value.trim() !== "", {
    message: "Please select an question",
  }),
});

export const votePollCommentSchema = z.object({
  type: z.string({ required_error: "vote type is required" }),

  comment_id: z.string({ required_error: "proposal id is required" }),
});

export const publishPollingQuestionSchema = z.object({
  question: z
    .string({ required_error: "Please enter poll question" })
    .refine((value) => value.trim() !== "", {
      message: "Please enter poll question",
    }),
  voting_id: z.string({ required_error: "Voting id is required" }),
  response_type: z.enum(["single", "multi_choice"], {
    required_error: "Please select answer type",
  }),
  options: z.array(z.string()).min(2, "Please add at least two (2) Options"),
  id: z.string().optional(),
});

export const linkProposalSchema = z.object({
  proposals: z.array(z.string()).min(2, "Please add at least two (2) proposal"),
  voting_id: z.string({ required_error: "Voting id is required" }),
});

export const showResultsSchema = z.object({
  results: z.boolean().optional(),
  stats: z.boolean().optional(),
});

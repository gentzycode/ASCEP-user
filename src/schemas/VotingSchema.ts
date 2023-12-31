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
    .string({ required_error: "Please enter a title for your proposal" })
    .refine((value) => value.trim() !== "", {
      message: "Please enter a title for your proposal",
    }),
  summary: z
    .string({ required_error: "Proposal summary is required" })
    .max(200, {
      message: "Proposal summary must be maximum of 200 characters.",
    })
    .refine((value) => value.trim() !== "", {
      message: "Please enter a summary of your proposal",
    }),
  description: z
    .string({ required_error: "Voting description is required" })
    .refine((value) => value.trim() !== "", {
      message: "Please enter a summary of your proposal",
    }),
  start_date: z.coerce.date({
    required_error: "Start date is required",
    invalid_type_error: "That's not a date!",
  }),
  end_date: z.coerce.date({
    required_error: "Closing date is required",
    invalid_type_error: "That's not a date!",
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

export const singleAnswerQuestionSchema = z.object({
  voting_id: z.string(),
  question_id: z.string(),
  selected_option: z
    .string({ required_error: "select an answer" })
    .refine((value) => value.trim() !== "", {
      message: "Please select an answer",
    }),
});

export const multiAnswerQuestionSchema = z.object({
  voting_id: z.string(),
  question_id: z.string(),
  selected_option: z
    .array(z.string())
    .min(1, "Please select at least one answer"),
});

export const votePollCommentSchema = z.object({
  type: z.string({ required_error: "vote type is required" }),

  comment_id: z.string({ required_error: "proposal id is required" }),
});

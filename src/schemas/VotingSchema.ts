import * as z from "zod";
const MAX_IMAGE_SIZE = 1024 * 1024 * 1;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const startVotingSchema = z.object({
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
  more_info: z
    .string({ required_error: "Proposal summary is required" })
    .max(200, {
      message: "Proposal summary must be maximum of 200 characters.",
    })
    .refine((value) => value.trim() !== "", {
      message: "Please enter a summary of your proposal",
    }),
  start_date: z.coerce.date({
    required_error: "Start date is required",
    invalid_type_error: "That's not a date!",
  }),
  closing_date: z.coerce.date({
    required_error: "Closing date is required",
    invalid_type_error: "That's not a date!",
  }),
  ward_id: z.number({ required_error: "Please select a ward" }),
  tags: z.array(z.string()).optional(),
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
});

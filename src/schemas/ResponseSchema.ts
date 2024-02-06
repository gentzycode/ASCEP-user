import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string({ required_error: "Title is required" }).min(3, {
    message: "Title must be at least 3 characters.",
  }),
  //   category: z.string({ required_error: "Category is required" }).min(3, {
  //     message: "Category must be at least 3 characters.",
  //   }),
  // location_meta: z.string({ required_error: "Location is required" }).min(3, {
  //   message: "Location must be at least 3 characters.",
  // }),
  description: z.string({ required_error: "Pls add more details" }).min(3, {
    message: "Pls add more details",
  }),
});

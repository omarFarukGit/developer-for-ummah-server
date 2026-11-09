import z from "zod";

const createCourseSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Course title must be at least 3 characters")
    .max(100, "Course title cannot exceed 100 characters"),

  description: z
    .string()
    .trim()
    .max(1000, "Description cannot exceed 1000 characters")
    .optional(),

  thumbnail: z.url("Please provide a valid thumbnail URL").optional(),
});

const updateCourseSchema = z.object({
  title: z.string().trim().min(3).max(100).optional(),

  description: z.string().trim().max(1000).nullable().optional(),

  thumbnail: z
    .url("Please provide a valid thumbnail URL")
    .nullable()
    .optional(),
});

const courseIdSchema = z.object({
  id: z.string().min(1, "Course ID is required"),
});

export const courseValidation = {
  createCourseSchema,
  updateCourseSchema,
  courseIdSchema,
};

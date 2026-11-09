import z from "zod";

const createLessonSchema = z.object({
  title: z.string().trim().min(2, "Lesson title is required").max(150),

  videoId: z.string().trim().min(1, "YouTube video ID is required"),

  duration: z.string().trim().optional(),

  order: z.number().int().positive(),

  courseId: z.string().min(1, "Course ID is required"),
});

const updateLessonSchema = z.object({
  title: z.string().trim().min(2).max(150).optional(),

  videoId: z.string().trim().min(1).optional(),

  duration: z.string().trim().optional(),

  order: z.number().int().positive().optional(),
});

const lessonIdSchema = z.object({
  id: z.string().min(1, "Lesson ID is required"),
});

const courseLessonsSchema = z.object({
  courseId: z.string().min(1, "Course ID is required"),
});

export const lessonValidation = {
  createLessonSchema,
  updateLessonSchema,
  lessonIdSchema,
  courseLessonsSchema,
};

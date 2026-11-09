import { Router } from "express";
import { lessonController } from "./lesson.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { lessonValidation } from "./lesson.validataion";

const router = Router();

router.post(
  "/",
  validateRequest(lessonValidation.createLessonSchema),
  lessonController.createLesson,
);

router.get(
  "/course/:courseId",
  //   validateRequest(lessonValidation.courseLessonsSchema),
  lessonController.getLessonsByCourse,
);

router.get(
  "/:id",
  validateRequest(lessonValidation.lessonIdSchema),
  lessonController.getLessonById,
);

router.patch(
  "/:id",
  validateRequest(lessonValidation.updateLessonSchema),
  lessonController.updateLesson,
);

router.delete("/:id", lessonController.deleteLesson);

export const lessonRoutes = router;

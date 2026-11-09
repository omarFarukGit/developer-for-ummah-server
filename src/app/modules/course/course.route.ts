import { Router } from "express";
import { courseController } from "./course.controller";

import { courseValidation } from "./course.validation";
import { validateRequest } from "../../middleware/validateRequest";
import { upload } from "../../utils/multer";

const router = Router();

router.post("/", upload.single("thumbnail"), courseController.createCourse);


router.get("/", courseController.getAllCourses);

router.get(
  "/:id",
//   validateRequest(courseValidation.courseIdSchema),
  courseController.getCourseById,
);

router.patch("/:id", upload.single("thumbnail"), courseController.updateCourse);

router.delete(
  "/:id",
//   validateRequest(courseValidation.courseIdSchema),
  courseController.deleteCourse,
);

export const courseRoutes = router;

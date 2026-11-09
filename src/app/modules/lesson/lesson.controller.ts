import { Request, Response } from "express";
import httpStatus from "http-status";
import { lessonService } from "./lesson.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createLesson = catchAsync(async (req: Request, res: Response) => {
  const result = await lessonService.createLesson(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Lesson created successfully",
    data: result,
  });
});

const getLessonsByCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await lessonService.getLessonsByCourse(
    req.params.courseId as string,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Lessons retrieved successfully",
    data: result,
  });
});

const getLessonById = catchAsync(async (req: Request, res: Response) => {
  console.log(req.params.id);
  const result = await lessonService.getLessonById(req.params.id as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Lesson retrieved successfully",
    data: result,
  });
});

const updateLesson = catchAsync(async (req: Request, res: Response) => {
  const result = await lessonService.updateLesson(
    req.params.id as string,
    req.body,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Lesson updated successfully",
    data: result,
  });
});

const deleteLesson = catchAsync(async (req: Request, res: Response) => {
  await lessonService.deleteLesson(req.params.id as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Lesson deleted successfully",
    data: null,
  });
});

export const lessonController = {
  createLesson,
  getLessonsByCourse,
  getLessonById,
  updateLesson,
  deleteLesson,
};

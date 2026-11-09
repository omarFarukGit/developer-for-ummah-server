import { Request, Response } from "express";

import httpStatus from "http-status";
import { courseService } from "./course.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await courseService.createCourse(
    req.body,
    req.file?.buffer as Buffer,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Course created successfully",
    data: result,
  });
});

const getAllCourses = catchAsync(async (_req: Request, res: Response) => {
  const result = await courseService.getAllCourses();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Courses retrieved successfully",
    data: result,
  });
});

const getCourseById = catchAsync(async (req: Request, res: Response) => {
  const result = await courseService.getCourseById(req.params.id as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Course retrieved successfully",
    data: result,
  });
});

const updateCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await courseService.updateCourse(
    req.params.id as string,
    req.body,
    req.file?.buffer,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Course updated successfully",
    data: result,
  });
});

const deleteCourse = catchAsync(async (req: Request, res: Response) => {
  await courseService.deleteCourse(req.params.id as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Course deleted successfully",
    data: null,
  });
});

export const courseController = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};

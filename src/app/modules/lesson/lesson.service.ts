
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/appError";
import httpStatus from "http-status";

const createLesson = async (payload: {
  title: string;
  videoId: string;
  duration?: string;
  order: number;
  courseId: string;
}) => {
  const course = await prisma.course.findUnique({
    where: {
      id: payload.courseId,
    },
  });

  if (!course) {
    throw new AppError(httpStatus.NOT_FOUND, "Course not found");
  }

  return prisma.lesson.create({
    data: payload,
  });
};

const getLessonsByCourse = async (courseId: string) => {
  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
  });

  if (!course) {
    throw new AppError(httpStatus.NOT_FOUND, "Course not found");
  }

  return prisma.lesson.findMany({
    where: {
      courseId,
    },
    orderBy: {
      order: "asc",
    },
  });
};

const getLessonById = async (id: string) => {
  const lesson = await prisma.lesson.findUnique({
    where: {
      id,
    },
  });

  if (!lesson) {
    throw new AppError(httpStatus.NOT_FOUND, "Lesson not found");
  }

  return lesson;
};

const updateLesson = async (
  id: string,
  payload: {
    title?: string;
    videoId?: string;
    duration?: string;
    order?: number;
  },
) => {
  const lesson = await prisma.lesson.findUnique({
    where: {
      id,
    },
  });

  if (!lesson) {
    throw new AppError(httpStatus.NOT_FOUND, "Lesson not found");
  }

  return prisma.lesson.update({
    where: {
      id,
    },
    data: payload,
  });
};

const deleteLesson = async (id: string) => {
  const lesson = await prisma.lesson.findUnique({
    where: {
      id,
    },
  });

  if (!lesson) {
    throw new AppError(httpStatus.NOT_FOUND, "Lesson not found");
  }

  await prisma.lesson.delete({
    where: {
      id,
    },
  });

  return null;
};

export const lessonService = {
  createLesson,
  getLessonsByCourse,
  getLessonById,
  updateLesson,
  deleteLesson,
};

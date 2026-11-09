

import httpStatus from "http-status";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/appError";
import { UploadApiResponse } from "cloudinary";
import { cloudinary } from "../../utils/cloudinary";


const createCourse = async (
  payload: {
    title: string;
    description?: string;
  },
  thumbnailBuffer: Buffer,
  iconBuffer: Buffer,
) => {
  const thumbnailResult = await new Promise<UploadApiResponse>(
    (resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "image",
            folder: "developer-for-ummah/courses/thumbnails",
          },
          (error, result) => {
            if (error) {
              return reject(error);
            }

            if (!result) {
              return reject(
                new Error("No thumbnail result returned from Cloudinary"),
              );
            }

            resolve(result);
          },
        )
        .end(thumbnailBuffer);
    },
  );

  const iconResult = await new Promise<UploadApiResponse>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "image",
          folder: "developer-for-ummah/courses/icons",
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }

          if (!result) {
            return reject(new Error("No icon result returned from Cloudinary"));
          }

          resolve(result);
        },
      )
      .end(iconBuffer);
  });

  const course = await prisma.course.create({
    data: {
      title: payload.title,
      description: payload.description,

      thumbnail: thumbnailResult.secure_url,
      thumbnailPublicId: thumbnailResult.public_id,

      icon: iconResult.secure_url,
      iconPublicId: iconResult.public_id,
    },
  });

  return course;
};

const getAllCourses = async () => {
  const courses = await prisma.course.findMany({
    include: {
      lessons: {
        orderBy: {
          order: "asc",
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return courses;
};

const getCourseById = async (id: string) => {
  const course = await prisma.course.findUnique({
    where: {
      id,
    },
    include: {
      lessons: {
        orderBy: {
          order: "asc",
        },
      },
    },
  });

  if (!course) {
    throw new AppError(httpStatus.NOT_FOUND, "Course not found");
  }

  return course;
};

const updateCourse = async (
  id: string,
  payload: {
    title?: string;
    description?: string | null;
  },
  buffer?: Buffer,
) => {
  const course = await prisma.course.findUnique({
    where: { id },
  });

  if (!course) {
    throw new AppError(httpStatus.NOT_FOUND, "Course not found");
  }

  let thumbnailData = {};

  // New thumbnail uploaded
  if (buffer) {
    const cloudinaryResult = await new Promise<UploadApiResponse>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: "image",
              folder: "developer-for-ummah/courses",
            },
            (error, result) => {
              if (error) return reject(error);

              if (!result) {
                return reject(new Error("No result returned from Cloudinary"));
              }

              resolve(result);
            },
          )
          .end(buffer);
      },
    );

    thumbnailData = {
      thumbnail: cloudinaryResult.secure_url,
      thumbnailPublicId: cloudinaryResult.public_id,
    };

    // Delete old image from Cloudinary
    if (course.thumbnailPublicId) {
      await cloudinary.uploader.destroy(course.thumbnailPublicId);
    }
  }

  const updatedCourse = await prisma.course.update({
    where: {
      id,
    },

    data: {
      ...payload,
      ...thumbnailData,
    },
  });

  return updatedCourse;
};

const deleteCourse = async (id: string) => {
  const course = await prisma.course.findUnique({
    where: { id },
  });

  if (!course) {
    throw new AppError(httpStatus.NOT_FOUND, "Course not found");
  }

  await prisma.course.delete({
    where: {
      id,
    },
  });

  return null;
};

export const courseService = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};

import express from "express";
import cors from "cors";
import { courseRoutes } from "./app/modules/course/course.route";
import { lessonRoutes } from "./app/modules/lesson/lesson.route";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/courses", courseRoutes);
app.use("/api/v1/lessons", lessonRoutes);

export default app;


import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Courses
  app.get(api.courses.list.path, async (req, res) => {
    const courses = await storage.getCourses();
    res.json(courses);
  });

  app.get(api.courses.get.path, async (req, res) => {
    const course = await storage.getCourse(Number(req.params.id));
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  });

  app.post(api.courses.create.path, async (req, res) => {
    try {
      const input = api.courses.create.input.parse(req.body);
      const course = await storage.createCourse(input);
      res.status(201).json(course);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.delete(api.courses.delete.path, async (req, res) => {
    await storage.deleteCourse(Number(req.params.id));
    res.status(204).send();
  });

  // Lessons
  app.get(api.lessons.list.path, async (req, res) => {
    const lessons = await storage.getLessons(Number(req.params.courseId));
    res.json(lessons);
  });

  app.get(api.lessons.get.path, async (req, res) => {
    const lesson = await storage.getLesson(Number(req.params.id));
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }
    res.json(lesson);
  });

  app.post(api.lessons.create.path, async (req, res) => {
    try {
      console.log("Creating lesson. Body:", req.body, "Params:", req.params);
      const input = api.lessons.create.input.parse({
        ...req.body,
        type: req.body.type || 'text'
      });
      
      const lesson = await storage.createLesson({
        ...input,
        courseId: Number(req.params.courseId),
        type: input.type,
        videoUrl: input.videoUrl || null
      });
      
      res.status(201).json(lesson);
    } catch (err) {
      console.error("Error creating lesson:", err);
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete(api.lessons.delete.path, async (req, res) => {
    await storage.deleteLesson(Number(req.params.id));
    res.status(204).send();
  });

  return httpServer;
}

// Seed function
async function seedDatabase() {
  const courses = await storage.getCourses();
  if (courses.length === 0) {
    const course = await storage.createCourse({
      title: "Introduction to Web Development",
      description: "Learn the basics of HTML, CSS, and JavaScript.",
      category: "Programming",
    });

    await storage.createLesson({
      courseId: course.id,
      title: "HTML Basics",
      content: "HTML stands for HyperText Markup Language...",
      order: 1,
      duration: 10,
    });

    await storage.createLesson({
      courseId: course.id,
      title: "CSS Styling",
      content: "CSS allows you to style your HTML pages...",
      order: 2,
      duration: 15,
    });
    
    const mathCourse = await storage.createCourse({
      title: "Calculus I",
      description: "Fundamentals of limits, derivatives, and integrals.",
      category: "Mathematics",
    });
    
     await storage.createLesson({
      courseId: mathCourse.id,
      title: "Limits",
      content: "Introduction to the concept of a limit...",
      order: 1,
      duration: 45,
    });
  }
}

// Check for seed on startup (hacky, but simple for this env)
setTimeout(seedDatabase, 2000);

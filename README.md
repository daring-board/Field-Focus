# EduFlow - Course Management System

EduFlow is a modern, streamlined platform designed for managing educational content. Whether for online learning or internal training, it provides an intuitive interface for creating courses and organizing lessons.

## Features

- **Course Management**: 
  - Create new courses with titles, descriptions, and categories.
  - View a dashboard of all available courses with vibrant, unique gradients.
  - Delete courses that are no longer needed.
- **Lesson Management**:
  - Add multiple lessons to each course.
  - Organize content with details like duration (in minutes) and lesson order.
  - Easy lesson deletion and management within the course details view.
- **Modern User Interface**:
  - Clean, responsive design using Tailwind CSS and Radix UI.
  - Smooth animations powered by Framer Motion.
  - Intuitive navigation bar for quick access to course lists and creation tools.
- **Robust Tech Stack**:
  - **Frontend**: React with Vite, TanStack Query for state management, and Wouter for routing.
  - **Backend**: Express server with a PostgreSQL database (Neon-backed).
  - **Data Integrity**: Zod schema validation for both frontend forms and backend API routes.

## Project Structure

- `client/src/`: React frontend application.
  - `pages/`: Application views (Course List, Create, Details).
  - `components/`: Reusable UI components.
  - `hooks/`: Custom TanStack Query hooks for data fetching.
- `server/`: Express backend.
  - `routes.ts`: API endpoints for courses and lessons.
  - `storage.ts`: Data persistence layer (PostgreSQL).
- `shared/`: Shared TypeScript types and Zod schemas (`schema.ts`).

## Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS, Shadcn UI, Framer Motion, TanStack Query, Wouter.
- **Backend**: Node.js, Express, Drizzle ORM, PostgreSQL.
- **Validation**: Zod.

## Getting Started

1. The application starts automatically in the Replit environment.
2. The frontend is served on port 5000.
3. Use the "Start application" workflow to run the development server.

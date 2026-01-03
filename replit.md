# EduFlow - Course Management System

## Overview

EduFlow is a modern course management platform for creating and organizing educational content. It provides functionality for managing courses and lessons with an intuitive, responsive interface. The application supports creating courses with titles, descriptions, and categories, then adding ordered lessons with content and duration tracking.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript, built using Vite
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state, React Hook Form for form state
- **Styling**: Tailwind CSS with Shadcn UI component library (New York style)
- **Design System**: Notion-inspired productivity design with Inter font family, CSS custom properties for theming

### Backend Architecture
- **Runtime**: Node.js with Express
- **API Pattern**: RESTful endpoints defined in `shared/routes.ts` with Zod schema validation
- **Database ORM**: Drizzle ORM with PostgreSQL
- **Type Safety**: Shared types between frontend and backend via `shared/schema.ts`

### Data Layer
- **Database**: PostgreSQL (Neon-backed)
- **Schema**: Two main tables - `courses` and `lessons` with foreign key relationship
- **Migrations**: Managed via Drizzle Kit (`drizzle-kit push`)

### Key Design Patterns
- **Shared Schema**: Zod schemas in `shared/` validate both API requests and form inputs
- **API Route Definitions**: Centralized in `shared/routes.ts` with typed paths, methods, and response schemas
- **Component Architecture**: Reusable UI components in `client/src/components/ui/`, page components in `client/src/pages/`
- **Custom Hooks**: Data fetching logic abstracted into `client/src/hooks/use-courses.ts`

### Project Structure
```
client/src/
  ├── pages/         # Route components (course-list, course-create, course-details, lesson-create)
  ├── components/    # UI components and layout
  ├── hooks/         # TanStack Query hooks for data fetching
  ├── lib/           # Utilities and query client setup
server/
  ├── routes.ts      # API endpoint handlers
  ├── storage.ts     # Database operations layer
  ├── db.ts          # Database connection
shared/
  ├── schema.ts      # Drizzle tables and Zod schemas
  ├── routes.ts      # API route definitions with validation
```

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection via `DATABASE_URL` environment variable
- **Drizzle ORM**: Database operations and schema management

### UI Libraries
- **Radix UI**: Accessible primitive components (dialog, dropdown, tabs, etc.)
- **Shadcn UI**: Pre-styled component collection built on Radix
- **Lucide React**: Icon library

### Development Tools
- **Vite**: Build tool and dev server with HMR
- **TypeScript**: Full type coverage across frontend and backend
- **Tailwind CSS**: Utility-first styling with custom theme configuration

### Replit-Specific
- **@replit/vite-plugin-runtime-error-modal**: Error overlay for development
- **@replit/vite-plugin-cartographer**: Development tooling integration
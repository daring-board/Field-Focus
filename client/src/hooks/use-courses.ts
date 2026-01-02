import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl, type InsertCourse, type InsertLesson } from "@shared/routes";

// ============================================
// COURSES HOOKS
// ============================================

export function useCourses() {
  return useQuery({
    queryKey: [api.courses.list.path],
    queryFn: async () => {
      const res = await fetch(api.courses.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch courses");
      return api.courses.list.responses[200].parse(await res.json());
    },
  });
}

export function useCourse(id: number) {
  return useQuery({
    queryKey: [api.courses.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.courses.get.path, { id });
      const res = await fetch(url, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch course");
      return api.courses.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}

export function useCreateCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: InsertCourse) => {
      const validated = api.courses.create.input.parse(data);
      const res = await fetch(api.courses.create.path, {
        method: api.courses.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to create course");
      return api.courses.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.courses.list.path] });
    },
  });
}

export function useDeleteCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const url = buildUrl(api.courses.delete.path, { id });
      const res = await fetch(url, {
        method: api.courses.delete.method,
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete course");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.courses.list.path] });
    },
  });
}

// ============================================
// LESSONS HOOKS
// ============================================

export function useLessons(courseId: number) {
  return useQuery({
    queryKey: [api.lessons.list.path, courseId],
    queryFn: async () => {
      const url = buildUrl(api.lessons.list.path, { courseId });
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch lessons");
      return api.lessons.list.responses[200].parse(await res.json());
    },
    enabled: !!courseId,
  });
}

export function useCreateLesson() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ courseId, ...data }: InsertLesson & { courseId: number }) => {
      const url = buildUrl(api.lessons.create.path, { courseId });
      // Remove courseId from payload as it's in the URL/handled by backend logic mostly, 
      // but schema expects order/title/content/duration. 
      // The endpoint input schema omits courseId, so we shouldn't send it in body if strictly typed,
      // but let's just send the matching body.
      const payload = {
        title: data.title,
        content: data.content,
        order: data.order,
        duration: data.duration
      };
      
      const res = await fetch(url, {
        method: api.lessons.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });
      
      if (!res.ok) throw new Error("Failed to create lesson");
      return api.lessons.create.responses[201].parse(await res.json());
    },
    onSuccess: (_, variables) => {
      // Invalidate the lessons list for this specific course
      const url = buildUrl(api.lessons.list.path, { courseId: variables.courseId });
      queryClient.invalidateQueries({ queryKey: [api.lessons.list.path, variables.courseId] });
    },
  });
}

export function useDeleteLesson() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, courseId }: { id: number, courseId: number }) => {
      const url = buildUrl(api.lessons.delete.path, { id });
      const res = await fetch(url, {
        method: api.lessons.delete.method,
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete lesson");
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [api.lessons.list.path, variables.courseId] });
    },
  });
}

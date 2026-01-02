import { useCourse, useLessons, useCreateLesson, useDeleteLesson } from "@/hooks/use-courses";
import { Link, useRoute } from "wouter";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertLessonSchema, type InsertLesson } from "@shared/schema";
import { ArrowLeft, Clock, PlayCircle, Plus, Trash2, Video, FileText, Loader2 } from "lucide-react";
import { useState } from "react";

export default function CourseDetails() {
  const [, params] = useRoute("/course/:id");
  const id = params ? parseInt(params.id) : 0;
  
  const { data: course, isLoading: loadingCourse } = useCourse(id);
  const { data: lessons, isLoading: loadingLessons } = useLessons(id);
  const deleteLesson = useDeleteLesson();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Lesson Deletion Handler
  const handleDeleteLesson = async (lessonId: number) => {
    try {
      await deleteLesson.mutateAsync({ id: lessonId, courseId: id });
      toast({
        title: "Lesson deleted",
        description: "The lesson has been removed.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete lesson.",
      });
    }
  };

  if (loadingCourse || loadingLessons) {
    return (
      <Layout>
        <div className="mx-auto max-w-4xl space-y-8 animate-pulse">
          <div className="h-64 rounded-3xl bg-slate-200"></div>
          <div className="h-32 rounded-xl bg-slate-200"></div>
          <div className="h-32 rounded-xl bg-slate-200"></div>
        </div>
      </Layout>
    );
  }

  if (!course) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center pt-20">
          <h2 className="text-2xl font-bold">Course not found</h2>
          <Link href="/">
            <Button variant="link" className="mt-4">Back to Courses</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mx-auto max-w-4xl">
        <Link href="/">
          <Button variant="ghost" className="mb-6 gap-2 pl-0 hover:bg-transparent hover:text-primary">
            <ArrowLeft className="h-4 w-4" />
            Back to courses
          </Button>
        </Link>

        {/* Hero Section */}
        <div className="relative mb-12 overflow-hidden rounded-3xl bg-slate-900 px-8 py-12 text-white shadow-xl shadow-slate-200 sm:px-12 sm:py-16">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-violet-600 opacity-90"></div>
          {/* Decorative circles */}
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-indigo-400/20 blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="mb-6 inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-medium backdrop-blur-md">
              {course.category}
            </div>
            <h1 className="mb-6 text-4xl font-bold font-display leading-tight sm:text-5xl">
              {course.title}
            </h1>
            <p className="max-w-2xl text-lg text-indigo-100 leading-relaxed">
              {course.description}
            </p>
          </div>
        </div>

        {/* Lessons Section */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900 font-display">Course Content</h2>
          <CreateLessonDialog 
            courseId={id} 
            nextOrder={(lessons?.length || 0) + 1}
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
          />
        </div>

        <div className="space-y-4">
          {lessons && lessons.length > 0 ? (
            lessons.map((lesson, index) => (
              <div 
                key={lesson.id} 
                className="group flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 transition-all hover:border-primary/50 hover:shadow-md sm:flex-row sm:items-start"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-50 font-bold text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  {index + 1}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{lesson.title}</h3>
                      <div className="mt-1 flex items-center gap-4 text-xs font-medium text-slate-500">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{lesson.duration || 10} mins</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Video className="h-3.5 w-3.5" />
                          <span>Video Lesson</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-slate-400 opacity-0 group-hover:opacity-100 hover:text-destructive hover:bg-destructive/10"
                      onClick={() => handleDeleteLesson(lesson.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                    {lesson.content}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex h-40 flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 text-slate-500">
              <FileText className="mb-2 h-8 w-8 opacity-50" />
              <p>No lessons added yet.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

function CreateLessonDialog({ 
  courseId, 
  nextOrder,
  open,
  onOpenChange 
}: { 
  courseId: number; 
  nextOrder: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { toast } = useToast();
  const createLesson = useCreateLesson();

  const form = useForm<InsertLesson>({
    resolver: zodResolver(insertLessonSchema.omit({ courseId: true })),
    defaultValues: {
      title: "",
      content: "",
      duration: 15,
      order: nextOrder,
    },
  });

  // Update order when dialog opens
  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      form.setValue("order", nextOrder);
    }
    onOpenChange(newOpen);
  };

  const onSubmit = async (data: Omit<InsertLesson, "courseId">) => {
    try {
      await createLesson.mutateAsync({ ...data, courseId });
      toast({
        title: "Lesson added",
        description: "Your new lesson has been added to the course.",
      });
      form.reset();
      onOpenChange(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add lesson.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Lesson
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Lesson</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lesson Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Introduction to the topic" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration (min)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field} 
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="order"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Order</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field} 
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content / Summary</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Brief summary or content of the lesson..." 
                      className="min-h-[100px] resize-none" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end pt-2">
              <Button type="submit" disabled={createLesson.isPending}>
                {createLesson.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Add Lesson
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

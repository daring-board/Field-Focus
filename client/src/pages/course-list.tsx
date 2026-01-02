import { useCourses, useDeleteCourse } from "@/hooks/use-courses";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Trash2, Clock, Book, ArrowRight } from "lucide-react";
import { Layout } from "@/components/layout";
import { useToast } from "@/hooks/use-toast";

export default function CourseList() {
  const { data: courses, isLoading } = useCourses();
  const deleteCourse = useDeleteCourse();
  const { toast } = useToast();

  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      await deleteCourse.mutateAsync(id);
      toast({
        title: "Course deleted",
        description: "The course has been successfully removed.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete the course. Please try again.",
      });
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-64 animate-pulse rounded-2xl bg-slate-200/50" />
          ))}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-display">Explore Courses</h1>
          <p className="mt-2 text-slate-600">Discover new skills and expand your knowledge.</p>
        </div>
        <Link href="/create">
          <Button size="lg" className="gap-2">
            <Plus className="h-5 w-5" />
            Create New Course
          </Button>
        </Link>
      </div>

      {courses && courses.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Link key={course.id} href={`/course/${course.id}`}>
              <div className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
                <div className="absolute top-4 right-4 z-10 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button
                    variant="destructive"
                    size="icon"
                    className="h-8 w-8 rounded-full shadow-sm"
                    onClick={(e) => handleDelete(e, course.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className={`h-32 w-full bg-gradient-to-br ${getGradient(course.id)} p-6`}>
                  <div className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                    {course.category}
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mb-2 text-xl font-bold text-slate-900 font-display group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-600 line-clamp-3">
                    {course.description}
                  </p>
                  
                  <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                    <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                      <div className="flex items-center gap-1">
                        <Book className="h-3.5 w-3.5" />
                        <span>Modules</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        <span>Self-paced</span>
                      </div>
                    </div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-colors group-hover:bg-primary group-hover:text-white">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 p-12 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
            <Book className="h-8 w-8 text-slate-400" />
          </div>
          <h3 className="mb-2 text-xl font-bold text-slate-900">No courses yet</h3>
          <p className="mb-8 max-w-sm text-slate-500">
            Get started by creating your first course. Share your knowledge with the world.
          </p>
          <Link href="/create">
            <Button size="lg">Create Course</Button>
          </Link>
        </div>
      )}
    </Layout>
  );
}

// Helper to generate consistent but varied gradients
function getGradient(id: number) {
  const gradients = [
    "from-blue-500 to-violet-500",
    "from-emerald-500 to-teal-500",
    "from-orange-500 to-red-500",
    "from-pink-500 to-rose-500",
    "from-indigo-500 to-blue-500",
    "from-violet-500 to-fuchsia-500",
  ];
  return gradients[id % gradients.length];
}

import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import CourseList from "@/pages/course-list";
import CourseCreate from "@/pages/course-create";
import CourseDetails from "@/pages/course-details";
import LessonCreate from "@/pages/lesson-create";

function Router() {
  return (
    <Switch>
      <Route path="/" component={CourseList} />
      <Route path="/create" component={CourseCreate} />
      <Route path="/course/:id" component={CourseDetails} />
      <Route path="/course/:id/lesson/new" component={LessonCreate} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

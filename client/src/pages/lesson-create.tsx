import { useCourse } from "@/hooks/use-courses";
import { useRoute } from "wouter";
import { Layout } from "@/components/layout";
import { LessonEditor } from "@/components/lesson-editor";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function LessonCreate() {
  const [, params] = useRoute("/course/:id/lesson/new");
  const courseId = params ? parseInt(params.id) : 0;
  const { data: course, isLoading } = useCourse(courseId);

  if (isLoading) {
    return (
      <Layout>
        <div className="mx-auto max-w-4xl pt-10 animate-pulse">
          <div className="h-8 w-48 bg-muted rounded mb-8"></div>
          <div className="h-[600px] bg-muted rounded-xl"></div>
        </div>
      </Layout>
    );
  }

  if (!course) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center pt-20">
          <h2 className="text-2xl font-bold">コースが見つかりません</h2>
          <Link href="/">
            <Button variant="link" className="mt-4">コース一覧に戻る</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mx-auto max-w-4xl">
        <Link href={`/course/${courseId}`}>
          <Button variant="ghost" className="mb-6 gap-2 pl-0 hover:bg-transparent hover:text-primary">
            <ArrowLeft className="h-4 w-4" />
            コース詳細に戻る
          </Button>
        </Link>
        <LessonEditor courseId={courseId} />
      </div>
    </Layout>
  );
}

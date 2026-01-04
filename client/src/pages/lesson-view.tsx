import { useLesson, useCourse } from "@/hooks/use-courses";
import { Link, useRoute, useLocation } from "wouter";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, CheckCircle, Clock, PlayCircle } from "lucide-react";
import { useState } from "react";

export default function LessonView() {
  const [, params] = useRoute("/course/:courseId/lesson/:lessonId");
  const courseId = params ? parseInt(params.courseId) : 0;
  const lessonId = params ? parseInt(params.lessonId) : 0;
  const [, setLocation] = useLocation();

  const { data: course, isLoading: loadingCourse } = useCourse(courseId);
  const { data: lesson, isLoading: loadingLesson } = useLesson(lessonId);

  if (loadingCourse || loadingLesson) {
    return (
      <Layout>
        <div className="mx-auto max-w-4xl space-y-8 animate-pulse">
          <div className="h-10 w-1/4 rounded bg-slate-200"></div>
          <div className="h-64 rounded-3xl bg-slate-200"></div>
          <div className="space-y-4">
            <div className="h-4 w-full rounded bg-slate-200"></div>
            <div className="h-4 w-full rounded bg-slate-200"></div>
            <div className="h-4 w-3/4 rounded bg-slate-200"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!lesson || !course) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center pt-20">
          <h2 className="text-2xl font-bold">レッスンが見つかりません</h2>
          <Link href={`/course/${courseId}`}>
            <Button variant="link" className="mt-4">コース詳細に戻る</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mx-auto max-w-4xl pb-12">
        <Link href={`/course/${courseId}`}>
          <Button variant="ghost" className="mb-6 gap-2 pl-0 hover:bg-transparent hover:text-primary">
            <ArrowLeft className="h-4 w-4" />
            コース詳細に戻る
          </Button>
        </Link>

        <div className="mb-8">
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-primary">
            <span>{course.title}</span>
            <span>•</span>
            <span>レッスン {lesson.order}</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">{lesson.title}</h1>
        </div>

        {lesson.type === "video" && lesson.videoUrl ? (
          <Card className="mb-8 overflow-hidden border-none bg-slate-900 shadow-2xl">
            <div className="aspect-video relative flex items-center justify-center bg-slate-800">
              <iframe
                src={lesson.videoUrl.replace("watch?v=", "embed/")}
                className="absolute inset-0 w-full h-full"
                allowFullScreen
              />
            </div>
            <div className="p-4 flex items-center justify-between text-white/80 text-sm bg-slate-900">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{lesson.duration || 10} 分</span>
              </div>
              <div className="flex items-center gap-2 text-primary">
                <PlayCircle className="h-4 w-4" />
                <span>ビデオレッスン</span>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="mb-8 overflow-hidden border-none bg-slate-100 shadow-sm">
            <div className="p-6 flex items-center justify-between text-slate-600 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{lesson.duration || 10} 分</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>テキストレッスン</span>
              </div>
            </div>
          </Card>
        )}

        <div className="prose prose-slate max-w-none">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">レッスンの内容</h2>
          <div className="whitespace-pre-wrap text-lg text-slate-700 leading-relaxed">
            {lesson.content}
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between border-t border-slate-200 pt-8">
          <Button variant="outline" className="gap-2" onClick={() => window.history.back()}>
            前のレッスン
          </Button>
          <Button className="gap-2" onClick={() => setLocation(`/course/${courseId}`)}>
            完了して次へ
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Layout>
  );
}

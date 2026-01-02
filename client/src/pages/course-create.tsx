import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertCourseSchema, type InsertCourse } from "@shared/schema";
import { useCreateCourse } from "@/hooks/use-courses";
import { useLocation } from "wouter";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Link } from "wouter";

export default function CourseCreate() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const createCourse = useCreateCourse();

  const form = useForm<InsertCourse>({
    resolver: zodResolver(insertCourseSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
    },
  });

  const onSubmit = async (data: InsertCourse) => {
    try {
      await createCourse.mutateAsync(data);
      toast({
        title: "成功！",
        description: "コースが正常に作成されました。",
      });
      setLocation("/");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "エラー",
        description: "コースの作成に失敗しました。もう一度お試しください。",
      });
    }
  };

  return (
    <Layout>
      <div className="mx-auto max-w-2xl">
        <Link href="/">
          <Button variant="ghost" className="mb-8 gap-2 pl-0 hover:bg-transparent hover:text-primary">
            <ArrowLeft className="h-4 w-4" />
            コース一覧に戻る
          </Button>
        </Link>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 font-display">新規コース作成</h1>
          <p className="mt-2 text-slate-600">詳細を入力して新しいコースを公開しましょう。</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>コース名</FormLabel>
                    <FormControl>
                      <Input placeholder="例：高度なReactパターン" className="h-12 text-lg" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>カテゴリー</FormLabel>
                      <FormControl>
                        <Input placeholder="例：プログラミング" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>説明</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="このコースで学生は何を学びますか？" 
                        className="min-h-[150px] resize-none text-base" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end pt-4">
                <Button 
                  type="submit" 
                  size="lg" 
                  className="min-w-[150px]"
                  disabled={createCourse.isPending}
                >
                  {createCourse.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      作成中...
                    </>
                  ) : (
                    "コースを作成"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Layout>
  );
}

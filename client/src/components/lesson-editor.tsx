import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertLessonSchema, type InsertLesson } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCreateLesson } from "@/hooks/use-courses";
import { useLocation } from "wouter";
import { Loader2, Eye, PenLine } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface LessonEditorProps {
  courseId: number;
  initialData?: Partial<InsertLesson>;
  onSuccess?: () => void;
}

export function LessonEditor({ courseId, initialData, onSuccess }: LessonEditorProps) {
  const [, setLocation] = useLocation();
  const createLesson = useCreateLesson();
  const [previewMode, setPreviewMode] = useState(false);

  const form = useForm<InsertLesson>({
    resolver: zodResolver(insertLessonSchema),
    defaultValues: {
      courseId,
      title: initialData?.title || "",
      content: initialData?.content || "",
      order: initialData?.order || 1,
      duration: initialData?.duration || 10,
    },
  });

  const onSubmit = async (data: InsertLesson) => {
    try {
      await createLesson.mutateAsync({ ...data, courseId });
      if (onSuccess) onSuccess();
      setLocation(`/courses/${courseId}`);
    } catch (error) {
      console.error(error);
    }
  };

  const content = form.watch("content");

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">
          {initialData ? "レッスンを編集" : "新しいレッスンを作成"}
        </CardTitle>
        <Tabs value={previewMode ? "preview" : "edit"} onValueChange={(v) => setPreviewMode(v === "preview")}>
          <TabsList>
            <TabsTrigger value="edit" className="flex items-center gap-2">
              <PenLine className="h-4 w-4" />
              編集
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              プレビュー
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="pt-6">
        {previewMode ? (
          <div className="prose dark:prose-invert max-w-none min-h-[400px] border rounded-md p-6 bg-muted/20">
            <h1 data-testid="text-preview-title">{form.watch("title") || "タイトルなし"}</h1>
            <div className="whitespace-pre-wrap">{content || "コンテンツがありません"}</div>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>タイトル</FormLabel>
                      <FormControl>
                        <Input placeholder="レッスンのタイトルを入力" {...field} data-testid="input-lesson-title" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>所要時間 (分)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          {...field} 
                          onChange={(e) => field.onChange(parseInt(e.target.value))} 
                          data-testid="input-lesson-duration" 
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
                    <FormLabel>コンテンツ</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="レッスンの内容を記述してください..." 
                        className="min-h-[400px] resize-none" 
                        {...field} 
                        data-testid="textarea-lesson-content"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setLocation(`/courses/${courseId}`)}
                  data-testid="button-cancel"
                >
                  キャンセル
                </Button>
                <Button 
                  type="submit" 
                  disabled={createLesson.isPending}
                  data-testid="button-submit-lesson"
                >
                  {createLesson.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  保存
                </Button>
              </div>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
}

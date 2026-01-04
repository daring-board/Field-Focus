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
import { Loader2, Eye, PenLine, Video, FileText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
      type: initialData?.type || "text",
      content: initialData?.content || "",
      videoUrl: initialData?.videoUrl || "",
      order: initialData?.order || 1,
      duration: initialData?.duration || 10,
    },
  });

  const onSubmit = async (data: InsertLesson) => {
    try {
      const payload = {
        ...data,
        courseId,
        type: data.type,
        videoUrl: data.type === "video" ? (data.videoUrl || "") : ""
      };
      console.log("Submitting lesson data:", payload);
      await createLesson.mutateAsync(payload);
      if (onSuccess) onSuccess();
      setLocation(`/course/${courseId}`);
    } catch (error) {
      console.error(error);
    }
  };

  const content = form.watch("content");
  const lessonType = form.watch("type");
  const videoUrl = form.watch("videoUrl");

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
            {lessonType === "video" && videoUrl && (
              <div className="aspect-video mb-6 bg-black rounded-lg flex items-center justify-center text-white overflow-hidden">
                <iframe
                  src={videoUrl.replace("watch?v=", "embed/")}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
            )}
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
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>レッスン形式</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-lesson-type">
                            <SelectValue placeholder="形式を選択" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="text">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4" />
                              <span>テキスト</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="video">
                            <div className="flex items-center gap-2">
                              <Video className="h-4 w-4" />
                              <span>ビデオ</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                          value={field.value ?? 0}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)} 
                          data-testid="input-lesson-duration" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {lessonType === "video" && (
                  <FormField
                    control={form.control}
                    name="videoUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ビデオURL (YouTube等)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="https://www.youtube.com/watch?v=..." 
                            {...field} 
                            value={field.value ?? ""}
                            data-testid="input-lesson-video-url" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{lessonType === "video" ? "ビデオの説明" : "コンテンツ"}</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder={lessonType === "video" ? "ビデオの内容について説明してください..." : "レッスンの内容を記述してください..."} 
                        className="min-h-[300px] resize-none" 
                        {...field} 
                        value={field.value ?? ""}
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
                  onClick={() => setLocation(`/course/${courseId}`)}
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

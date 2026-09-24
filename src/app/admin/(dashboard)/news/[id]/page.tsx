import { notFound } from "next/navigation";
import { getNewsArticle } from "@/lib/dal/news-articles";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { Button, PageHeader } from "@/components/admin/ui";
import { ArticleForm } from "../article-form";
import { deleteNewsArticle, saveNewsArticle, setNewsStatus } from "../actions";

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const id = Number((await params).id);
  const article = await getNewsArticle(id);
  if (!article) notFound();

  return (
    <>
      <PageHeader
        eyebrow="Nội dung"
        title="Chỉnh sửa bài viết"
        actions={
          <>
            <form action={setNewsStatus.bind(null, id, "HIDDEN")}>
              <Button type="submit" variant="ghost">Ẩn bài viết</Button>
            </form>
            <ConfirmDialog description="Xóa vĩnh viễn bài viết này? Thao tác không thể hoàn tác.">
              <form action={deleteNewsArticle.bind(null, id)}>
                <Button type="submit" variant="danger">Xác nhận xóa</Button>
              </form>
            </ConfirmDialog>
          </>
        }
      />
      <ArticleForm action={saveNewsArticle} article={article} />
    </>
  );
}

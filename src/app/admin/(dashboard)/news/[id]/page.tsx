import { notFound } from "next/navigation";
import { getNewsArticle } from "@/lib/dal/news-articles";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { LinkButton, PageHeader } from "@/components/admin/ui";
import { SubmitButton } from "@/components/admin/submit-button";
import { Icon, ICON_PATHS } from "@/components/admin/icons";
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
            <LinkButton href="/admin/news" variant="ghost"><Icon path={ICON_PATHS.back} className="h-4 w-4" />Quay lại</LinkButton>
            <form action={setNewsStatus.bind(null, id, "HIDDEN")}>
              <SubmitButton variant="ghost" pendingText="Đang ẩn...">Ẩn bài viết</SubmitButton>
            </form>
            <ConfirmDialog description="Xóa vĩnh viễn bài viết này? Thao tác không thể hoàn tác.">
              <form action={deleteNewsArticle.bind(null, id)}>
                <SubmitButton variant="danger" pendingText="Đang xóa...">Xác nhận xóa</SubmitButton>
              </form>
            </ConfirmDialog>
          </>
        }
      />
      <ArticleForm action={saveNewsArticle} article={article} />
    </>
  );
}

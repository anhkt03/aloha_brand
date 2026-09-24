import { PageHeader } from "@/components/admin/ui";
import { ArticleForm } from "../article-form";
import { saveNewsArticle } from "../actions";

export default function NewArticlePage() {
  return (
    <>
      <PageHeader eyebrow="Nội dung" title="Thêm bài viết" />
      <ArticleForm action={saveNewsArticle} />
    </>
  );
}

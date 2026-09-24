import { LinkButton, PageHeader } from "@/components/admin/ui";
import { Icon, ICON_PATHS } from "@/components/admin/icons";
import { ArticleForm } from "../article-form";
import { saveNewsArticle } from "../actions";

export default function NewArticlePage() {
  return (
    <>
      <PageHeader
        eyebrow="Nội dung"
        title="Thêm bài viết"
        actions={<LinkButton href="/admin/news" variant="ghost"><Icon path={ICON_PATHS.back} className="h-4 w-4" />Quay lại</LinkButton>}
      />
      <ArticleForm action={saveNewsArticle} />
    </>
  );
}

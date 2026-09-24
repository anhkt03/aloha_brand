import { NewsStatus } from "@prisma/client";
import { listNewsArticles } from "@/lib/dal/news-articles";
import { deleteNewsArticle } from "./actions";
import { DataTable } from "@/components/admin/data-table";
import { Badge } from "@/components/admin/status-badge";
import { Button, LinkButton, PageHeader, inputClass } from "@/components/admin/ui";
import { SearchInput } from "@/components/admin/search-input";
import { Pagination } from "@/components/admin/pagination";
import { PageSizeSelect } from "@/components/admin/page-size-select";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { Icon, ICON_PATHS, IconLink } from "@/components/admin/icons";
import { PAGE_SIZE_OPTIONS } from "@/lib/dal/courses";
import { formatDate } from "@/lib/utils";

const STATUS_LABELS: Record<NewsStatus, string> = { HIDDEN: "Ẩn", PUBLISHED: "Công khai" };
const STATUS_TONE: Record<NewsStatus, "success" | "neutral"> = { HIDDEN: "neutral", PUBLISHED: "success" };

export default async function NewsPage({ searchParams }: { searchParams: Promise<{ q?: string; status?: NewsStatus; page?: string; pageSize?: string }> }) {
  const search = await searchParams;
  const page = Number(search.page) || 1;
  const pageSize = Number(search.pageSize) || 20;
  const { items, page: currentPage, totalPages, total } = await listNewsArticles({ query: search.q, status: search.status, page, pageSize });

  const makeHref = (overrides: { page?: number; pageSize?: number }) => {
    const params = new URLSearchParams();
    if (search.q) params.set("q", search.q);
    if (search.status) params.set("status", search.status);
    params.set("pageSize", String(overrides.pageSize ?? pageSize));
    params.set("page", String(overrides.page ?? currentPage));
    return `/admin/news?${params.toString()}`;
  };

  return (
    <>
      <PageHeader eyebrow="Nội dung" title="Bài viết" actions={<LinkButton href="/admin/news/new">+ Thêm bài viết</LinkButton>} />

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <form className="flex flex-wrap gap-2">
          <div className="w-full max-w-xs"><SearchInput defaultValue={search.q} placeholder="Tìm slug hoặc tên bài viết" /></div>
          <select name="status" defaultValue={search.status} className={`${inputClass} mt-0 w-auto`}>
            <option value="">Tất cả trạng thái</option>
            {Object.values(NewsStatus).map((status) => <option key={status} value={status}>{STATUS_LABELS[status]}</option>)}
          </select>
          <button className="rounded-md border border-slate-300 px-3.5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">Lọc</button>
        </form>
        <PageSizeSelect value={pageSize} options={PAGE_SIZE_OPTIONS} />
      </div>

      <DataTable headers={["Bài viết", "Ngày đăng", "Trạng thái", "Thao tác"]} isEmpty={!items.length} maxHeight="70vh">
        {items.map((item) => (
          <tr key={item.id}>
            <td className="px-4 py-3">
              <b className="text-slate-900">{item.translations[0]?.title ?? item.slug}</b>
              <small className="block text-slate-400">/{item.slug}</small>
            </td>
            <td className="px-4 py-3 text-sm text-slate-500">{formatDate(item.publishedAt)}</td>
            <td className="px-4 py-3"><Badge tone={STATUS_TONE[item.status]}>{STATUS_LABELS[item.status]}</Badge></td>
            <td className="px-4 py-3">
              <div className="flex items-center gap-1">
                <IconLink href={`/admin/news/${item.id}`} label="Chỉnh sửa" path={ICON_PATHS.edit} />
                <ConfirmDialog
                  trigger={<Icon path={ICON_PATHS.trash} />}
                  triggerLabel="Xóa bài viết"
                  triggerClassName="grid h-8 w-8 place-items-center rounded-md text-red-600 transition hover:bg-red-50"
                  description="Xóa vĩnh viễn bài viết này? Thao tác không thể hoàn tác."
                >
                  <form action={deleteNewsArticle.bind(null, item.id)}>
                    <Button type="submit" variant="danger">Xác nhận xóa</Button>
                  </form>
                </ConfirmDialog>
              </div>
            </td>
          </tr>
        ))}
      </DataTable>

      {items.length ? (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-400">
            Trang {currentPage}/{totalPages} — {total} bài viết
          </p>
          <Pagination page={currentPage} totalPages={totalPages} makeHref={(p) => makeHref({ page: p })} />
        </div>
      ) : null}
    </>
  );
}

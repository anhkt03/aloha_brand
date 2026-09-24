import { listCourseCategories } from "@/lib/dal/course-taxonomy";
import { DataTable } from "@/components/admin/data-table";
import { LinkButton, PageHeader } from "@/components/admin/ui";
import { IconLink, ICON_PATHS } from "@/components/admin/icons";

export default async function CourseCategoriesPage() {
  const categories = await listCourseCategories();
  return (
    <>
      <PageHeader eyebrow="Đào tạo" title="Danh mục khóa học" actions={<LinkButton href="/admin/courses/categories/new">+ Thêm danh mục</LinkButton>} />
      <DataTable headers={["Tên", "Khóa học", "Thao tác"]} isEmpty={!categories.length}>
        {categories.map((item) => (
          <tr key={item.id}>
            <td className="px-4 py-3 font-semibold text-slate-900">{item.translations[0]?.name ?? "—"}</td>
            <td className="px-4 py-3">{item._count.courses}</td>
            <td className="px-4 py-3"><IconLink href={`/admin/courses/categories/${item.id}`} label="Chỉnh sửa" path={ICON_PATHS.edit} /></td>
          </tr>
        ))}
      </DataTable>
    </>
  );
}

import { listCourseLevels } from "@/lib/dal/course-taxonomy";
import { DataTable } from "@/components/admin/data-table";
import { Button, LinkButton, PageHeader } from "@/components/admin/ui";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { Icon, IconLink, ICON_PATHS } from "@/components/admin/icons";
import { deleteCourseLevel } from "../taxonomy-actions";

export default async function CourseLevelsPage() {
  const levels = await listCourseLevels();
  return (
    <>
      <PageHeader eyebrow="Đào tạo" title="Cấp độ khóa học" actions={<LinkButton href="/admin/courses/levels/new">+ Thêm cấp độ</LinkButton>} />
      <DataTable headers={["Tên", "Khóa học", "Thao tác"]} isEmpty={!levels.length}>
        {levels.map((item) => (
          <tr key={item.id}>
            <td className="px-4 py-3 font-semibold text-slate-900">{item.translations[0]?.name ?? "—"}</td>
            <td className="px-4 py-3">{item._count.courses}</td>
            <td className="px-4 py-3">
              <div className="flex items-center gap-1">
                <IconLink href={`/admin/courses/levels/${item.id}`} label="Chỉnh sửa" path={ICON_PATHS.edit} />
                <ConfirmDialog
                  trigger={<Icon path={ICON_PATHS.trash} />}
                  triggerLabel="Xóa cấp độ"
                  triggerClassName="grid h-8 w-8 place-items-center rounded-md text-red-600 transition hover:bg-red-50"
                  description={
                    item._count.courses
                      ? "Cấp độ này đang có khóa học nên không thể xóa. Hãy chuyển hết khóa học sang cấp độ khác trước."
                      : "Xóa vĩnh viễn cấp độ này? Thao tác không thể hoàn tác."
                  }
                >
                  <form action={deleteCourseLevel.bind(null, item.id)}>
                    <Button type="submit" variant="danger" disabled={item._count.courses > 0}>Xác nhận xóa</Button>
                  </form>
                </ConfirmDialog>
              </div>
            </td>
          </tr>
        ))}
      </DataTable>
    </>
  );
}

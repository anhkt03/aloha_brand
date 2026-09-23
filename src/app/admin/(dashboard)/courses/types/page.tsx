import { listCourseTypes } from "@/lib/dal/course-taxonomy";
import { DataTable } from "@/components/admin/data-table";
import { StatusBadge } from "@/components/admin/status-badge";
import Link from "next/link";

export default async function CourseTypesPage() {
  const types = await listCourseTypes();
  return <><div className="mb-6 flex items-center justify-between"><h1 className="text-2xl font-bold">Loại khóa học</h1><Link href="/admin/courses/types/new" className="rounded bg-emerald-700 px-3 py-2 text-sm font-semibold text-white">Thêm loại</Link></div><DataTable headers={["Tên", "Thứ tự", "Trạng thái", "Cấp độ", "Khóa học", ""]} isEmpty={!types.length}>{types.map((item) => <tr key={item.id}><td className="px-4 py-3">{item.translations[0]?.name ?? "—"}</td><td className="px-4 py-3">{item.sortOrder}</td><td className="px-4 py-3"><StatusBadge active={item.active} /></td><td className="px-4 py-3">{item._count.levels}</td><td className="px-4 py-3">{item._count.courses}</td><td className="px-4 py-3"><Link className="text-emerald-700" href={`/admin/courses/types/${item.id}`}>Sửa</Link></td></tr>)}</DataTable></>;
}

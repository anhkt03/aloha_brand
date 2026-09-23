import Link from "next/link";
import { DataTable } from "@/components/admin/data-table";
import { StatusBadge } from "@/components/admin/status-badge";
import { prisma } from "@/lib/prisma";

export default async function CourseLevelsPage() {
  const [levels, types] = await Promise.all([
    prisma.courseLevel.findMany({
      include: {
        translations: { where: { locale: "vi" } },
        courseType: { include: { translations: { where: { locale: "vi" } } } },
        _count: { select: { courses: true } },
      },
      orderBy: [{ courseTypeId: "asc" }, { sortOrder: "asc" }, { id: "asc" }],
    }),
    prisma.courseType.findMany({
      where: { active: true },
      include: { translations: { where: { locale: "vi" } } },
      orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
    }),
  ]);

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div><h1 className="text-3xl font-black">Cấp độ khóa học</h1><p className="mt-1 text-sm text-slate-500">Cấp độ được quản lý theo từng loại khóa học.</p></div>
        <div className="flex flex-wrap gap-2">{types.map((type) => <Link key={type.id} href={`/admin/courses/types/${type.id}/levels/new`} className="btn btn-primary btn-sm">+ {type.translations[0]?.name ?? `Loại ${type.id}`}</Link>)}</div>
      </div>
      <DataTable headers={["Cấp độ", "Loại khóa học", "Thứ tự", "Khóa học", "Trạng thái", ""]} isEmpty={!levels.length}>
        {levels.map((level) => <tr key={level.id}><td className="px-4 py-3 font-bold">{level.translations[0]?.name ?? level.name}</td><td className="px-4 py-3">{level.courseType.translations[0]?.name ?? `Loại ${level.courseTypeId}`}</td><td className="px-4 py-3">{level.sortOrder}</td><td className="px-4 py-3">{level._count.courses}</td><td className="px-4 py-3"><StatusBadge active={level.active} /></td><td className="px-4 py-3"><Link className="font-bold text-brand" href={`/admin/courses/types/${level.courseTypeId}/levels/${level.id}`}>Sửa</Link></td></tr>)}
      </DataTable>
    </>
  );
}

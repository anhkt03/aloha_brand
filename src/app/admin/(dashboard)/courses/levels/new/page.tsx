import { PageHeader } from "@/components/admin/ui";
import { TaxonomyForm } from "../../taxonomy-form";
import { saveCourseLevel } from "../../taxonomy-actions";

export default function NewCourseLevelPage() {
  return (
    <>
      <PageHeader eyebrow="Đào tạo" title="Thêm cấp độ khóa học" />
      <TaxonomyForm action={saveCourseLevel} />
    </>
  );
}

import { PageHeader } from "@/components/admin/ui";
import { TaxonomyForm } from "../../taxonomy-form";
import { saveCourseCategory } from "../../taxonomy-actions";

export default function NewCourseCategoryPage() {
  return (
    <>
      <PageHeader eyebrow="Đào tạo" title="Thêm danh mục khóa học" />
      <TaxonomyForm action={saveCourseCategory} />
    </>
  );
}

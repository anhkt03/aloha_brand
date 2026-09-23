import { NewsCategoryForm } from "../form";
import { saveCategory } from "../../taxonomy-actions";
export default function NewCategoryPage() { return <><h1 className="mb-6 text-3xl font-black">Thêm danh mục</h1><NewsCategoryForm action={saveCategory} /></>; }

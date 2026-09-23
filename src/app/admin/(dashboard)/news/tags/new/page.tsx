import { NewsCategoryForm } from "../../categories/form";
import { saveTag } from "../../taxonomy-actions";
export default function NewTagPage() { return <><h1 className="mb-6 text-3xl font-black">Thêm thẻ</h1><NewsCategoryForm action={saveTag} /></>; }

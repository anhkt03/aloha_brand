import { BranchForm } from "../branch-form"; import { saveBranch } from "../actions";
export default function NewBranchPage() { return <><h1 className="mb-6 text-3xl font-black">Thêm cơ sở</h1><BranchForm action={saveBranch} /></>; }

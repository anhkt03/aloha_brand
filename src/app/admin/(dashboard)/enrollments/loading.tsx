import { SkeletonListPage } from "@/components/admin/skeleton";

export default function Loading() {
  return <SkeletonListPage columns={5} filters={1} createButtons={0} loadMore />;
}

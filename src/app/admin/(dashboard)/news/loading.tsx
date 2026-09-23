import { SkeletonListPage } from "@/components/admin/skeleton";

export default function Loading() {
  return <SkeletonListPage columns={5} filters={2} loadMore />;
}

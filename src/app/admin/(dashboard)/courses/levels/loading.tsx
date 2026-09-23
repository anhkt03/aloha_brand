import { SkeletonListPage } from "@/components/admin/skeleton";

export default function Loading() {
  return <SkeletonListPage columns={6} createButtons={2} />;
}

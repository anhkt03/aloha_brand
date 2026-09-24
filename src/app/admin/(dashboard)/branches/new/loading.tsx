import { SimpleFormSkeleton } from "@/components/admin/skeleton";

export default function Loading() {
  return <SimpleFormSkeleton fields={7} columns={2} bordered={false} />;
}

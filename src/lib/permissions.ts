import type { UserRole } from "@prisma/client";

export type AdminModule =
  | "dashboard"
  | "courses"
  | "news"
  | "enrollments"
  | "feedback"
  | "branches"
  | "users";

const staffModules: AdminModule[] = [
  "dashboard",
  "courses",
  "news",
  "enrollments",
  "feedback",
  "branches",
];

export const permissionMap: Record<UserRole, readonly AdminModule[]> = {
  ADMIN: [...staffModules, "users"],
  STAFF: staffModules,
};

export function canAccessModule(role: UserRole, module: AdminModule) {
  return permissionMap[role].includes(module);
}

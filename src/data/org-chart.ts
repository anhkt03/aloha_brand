/**
 * Organization chart structure for the About page ("Sơ đồ tổ chức").
 * Every role string is a key under `pages.about.org.roles` in messages/*.json,
 * so the labels are translated per locale while the hierarchy lives here.
 */

export type OrgBlockKey = "operations" | "sales" | "studyAbroad";

export interface OrgDepartment {
  head: string;
  staff: string[];
}

export interface OrgBlock {
  key: OrgBlockKey;
  /** OKLCH hue driving the block's colour ramp (`.org-hue` in globals.css). */
  hue: number;
  head: string;
  /** Departments reporting to the block head. */
  departments?: OrgDepartment[];
  /** Staff reporting straight to the block head (no departments in between). */
  staff?: string[];
}

export const orgRoot = "director";

export const orgBlocks: OrgBlock[] = [
  {
    key: "operations",
    hue: 250,
    head: "operationsDirector",
    departments: [
      { head: "hrAdmin", staff: ["recruiter", "compBen"] },
      { head: "finance", staff: ["generalAccountant", "taxAccountant", "internalAccountant"] },
      { head: "operations", staff: ["teacherManagement", "customerCare"] },
    ],
  },
  {
    key: "sales",
    hue: 155,
    head: "salesDirector",
    departments: [
      { head: "branchManager", staff: ["advisor", "classCare", "security", "janitor"] },
      { head: "marketing", staff: ["designer", "content", "digital"] },
    ],
  },
  {
    key: "studyAbroad",
    hue: 45,
    head: "studyAbroadDirector",
    staff: ["studyAbroadSales", "studyAbroadDocs"],
  },
];

/** Number of department columns a block spans in the wide (xl+) layout. */
export function orgBlockColumns(block: OrgBlock): number {
  return Math.max(block.departments?.length ?? 1, 1);
}

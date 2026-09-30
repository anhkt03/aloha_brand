"use client";

import type { CSSProperties, ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/common/Container";
import { SectionHead } from "@/components/common/Section";
import { orgBlockColumns, orgBlocks, orgRoot, type OrgBlock } from "@/data/org-chart";

type Tier = "root" | "head" | "dept" | "staff";

function hueStyle(block: OrgBlock) {
  return { "--h": block.hue } as CSSProperties;
}

// Full class names on purpose: Tailwind only keeps `@layer components` rules whose
// class appears literally in the source, so `org-node--${tier}` would be purged.
const NODE_CLASS: Record<Tier, string> = {
  root: "org-node org-node--root",
  head: "org-node org-node--head",
  dept: "org-node org-node--dept",
  staff: "org-node org-node--staff",
};

function OrgNode({ tier, children }: { tier: Tier; children: ReactNode }) {
  return <div className={NODE_CLASS[tier]}>{children}</div>;
}

/**
 * About page section 8 — organization chart. Director on top, three blocks
 * (operations / sales / study abroad) each with its own colour, departments
 * and staff. From xl it is drawn as a horizontal tree with connectors; below
 * that it collapses into indented vertical lists (3 columns on tablet, 1 on
 * phones). Both views render from the same data in `data/org-chart.ts`.
 */
export function AboutOrgChart() {
  const t = useTranslations("pages.about.org");
  const role = (key: string) => t(`roles.${key}`);

  return (
    <Container>
      <div className="section">
        <SectionHead eyebrow={t("eyebrow")} title={t("title")} />

        {/* xl+ — horizontal tree (on very wide screens it outgrows the container so no label wraps) */}
        <div className="org-wide hidden xl:block">
          <div className="org-tree" role="group" aria-label={t("title")}>
            <div className="mx-auto max-w-[320px]">
              <OrgNode tier="root">{role(orgRoot)}</OrgNode>
            </div>
            <ul
              className="org-tier"
              style={{
                "--org-cols": orgBlocks
                  .map((block) => `minmax(0, ${orgBlockColumns(block)}fr)`)
                  .join(" "),
              } as CSSProperties}
            >
              {orgBlocks.map((block) => (
                <li key={block.key} className="org-hue" style={hueStyle(block)}>
                  <div className="org-head-wrap">
                    <OrgNode tier="head">{role(block.head)}</OrgNode>
                  </div>
                  {block.departments ? (
                    <ul
                      className="org-tier"
                      style={{ "--org-cols": `repeat(${block.departments.length}, minmax(0, 1fr))` } as CSSProperties}
                    >
                      {block.departments.map((dept) => (
                        <li key={dept.head}>
                          <OrgNode tier="dept">{role(dept.head)}</OrgNode>
                          <StaffTree staff={dept.staff} role={role} />
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <StaffTree staff={block.staff ?? []} role={role} />
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-14 flex items-center justify-between gap-6 border-t border-line pt-6 text-[14px] text-ink-soft">
            <ul className="flex flex-wrap gap-x-8 gap-y-2">
              {orgBlocks.map((block) => (
                <li key={block.key} className="org-hue flex items-center gap-2.5" style={hueStyle(block)}>
                  <span className="org-dot" aria-hidden />
                  {t(`legend.${block.key}`)}
                </li>
              ))}
            </ul>
            <span>{t("updated")}</span>
          </div>
        </div>

        {/* below xl — stacked lists */}
        <div className="xl:hidden">
          <div className="mb-7 md:mx-auto md:max-w-[320px]">
            <OrgNode tier="root">{role(orgRoot)}</OrgNode>
          </div>
          <ul className="grid gap-7 md:grid-cols-3 md:items-start md:gap-6">
            {orgBlocks.map((block) => (
              <li key={block.key} className="org-hue org-branch" style={hueStyle(block)}>
                <OrgNode tier="head">{role(block.head)}</OrgNode>
                <div className="org-branch-body">
                  {block.departments ? (
                    block.departments.map((dept) => (
                      <div key={dept.head} className="org-branch-dept">
                        <OrgNode tier="dept">{role(dept.head)}</OrgNode>
                        <StaffList staff={dept.staff} role={role} indented />
                      </div>
                    ))
                  ) : (
                    <StaffList staff={block.staff ?? []} role={role} />
                  )}
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-7 text-[13px] text-ink-soft">{t("updated")}</p>
        </div>
      </div>
    </Container>
  );
}

/** Staff column with tick connectors — used by the wide tree. */
function StaffTree({ staff, role }: { staff: string[]; role: (key: string) => string }) {
  return (
    <ul className="org-staff">
      {staff.map((key) => (
        <li key={key}>
          <OrgNode tier="staff">{role(key)}</OrgNode>
        </li>
      ))}
    </ul>
  );
}

/** Plain indented staff list — used by the stacked layout. */
function StaffList({
  staff,
  role,
  indented,
}: {
  staff: string[];
  role: (key: string) => string;
  indented?: boolean;
}) {
  return (
    <ul className={indented ? "org-branch-staff org-branch-staff--indented" : "org-branch-staff"}>
      {staff.map((key) => (
        <li key={key}>
          <OrgNode tier="staff">{role(key)}</OrgNode>
        </li>
      ))}
    </ul>
  );
}

"use client";

import { useState } from "react";
import { experience, courses } from "@/lib/experience-data";
import { RoleCard } from "@/components/role-card";
import { CompanyGroup } from "@/components/company-group";
import { CoursesCard } from "@/components/courses-card";
import { FilterPills } from "@/components/filter-pills";
import { StripeNav } from "@/components/stripe-nav";

type FilterValue = "all" | "professional" | "personal";

interface Section {
  id: string;
  navLabel: string;
  category: "professional" | "personal";
  node: React.ReactNode;
}

function buildSections(): Section[] {
  const sections: Section[] = [];
  let sqInserted = false;

  const rostrRole = experience.find((r) => r.id === "rostr");
  const selectQuoteRoles = experience.filter((r) => r.group === "selectquote");

  // ROSTR first
  if (rostrRole) {
    sections.push({
      id: rostrRole.id,
      navLabel: rostrRole.navLabel,
      category: rostrRole.category,
      node: (
        <div key={rostrRole.id} id={rostrRole.id} className="scroll-mt-24">
          <RoleCard role={rostrRole} />
        </div>
      ),
    });
  }

  // Courses card second
  sections.push({
    id: "courses",
    navLabel: "AI Training",
    category: "personal",
    node: (
      <div id="courses" className="scroll-mt-24">
        <CoursesCard courses={courses} />
      </div>
    ),
  });

  for (const role of experience) {
    if (role.id === "rostr") continue;

    if (role.group === "selectquote") {
      if (!sqInserted) {
        sections.push({
          id: "sq-supervisor",
          navLabel: "SelectQuote",
          category: "professional",
          node: (
            <CompanyGroup
              key="selectquote"
              company="SelectQuote Insurance Services"
              roles={selectQuoteRoles}
            />
          ),
        });
        sqInserted = true;
      }
    } else {
      sections.push({
        id: role.id,
        navLabel: role.navLabel,
        category: role.category,
        node: (
          <div key={role.id} id={role.id} className="scroll-mt-24">
            <RoleCard role={role} />
          </div>
        ),
      });
    }
  }

  return sections;
}

export function ExperienceContent() {
  const [filter, setFilter] = useState<FilterValue>("all");

  const allSections = buildSections();

  const filtered =
    filter === "all"
      ? allSections
      : allSections.filter((s) => s.category === filter);

  const navItems = filtered.map((s) => ({ id: s.id, label: s.navLabel }));

  return (
    <main className="relative z-[1] min-h-screen">
      <StripeNav navItems={navItems} />

      <div className="mx-auto max-w-2xl px-6 py-24 lg:ml-52 lg:mr-auto lg:max-w-2xl lg:px-8">
        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Experience
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            A decade of building for the web.
          </p>
          <div className="mt-4">
            <FilterPills active={filter} onChange={setFilter} />
          </div>
        </header>

        <div className="space-y-6">
          {filtered.map((section) => (
            <div key={section.id}>{section.node}</div>
          ))}
        </div>
      </div>
    </main>
  );
}

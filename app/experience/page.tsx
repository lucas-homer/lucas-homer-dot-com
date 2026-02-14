import { experience } from "@/lib/experience-data";
import { RoleCard } from "@/components/role-card";
import { CompanyGroup } from "@/components/company-group";
import { StripeNav } from "@/components/stripe-nav";

export default function ExperiencePage() {
  // Group SelectQuote roles together
  const selectQuoteRoles = experience.filter((r) => r.group === "selectquote");
  const standAloneRoles = experience.filter((r) => !r.group);

  // Build ordered sections
  const sections: React.ReactNode[] = [];
  let sqInserted = false;

  for (const role of experience) {
    if (role.group === "selectquote") {
      if (!sqInserted) {
        sections.push(
          <CompanyGroup
            key="selectquote"
            company="SelectQuote Insurance Services"
            roles={selectQuoteRoles}
          />
        );
        sqInserted = true;
      }
    } else {
      sections.push(
        <div key={role.id} id={role.id} className="scroll-mt-24">
          <RoleCard role={role} />
        </div>
      );
    }
  }

  return (
    <main className="relative z-[1] min-h-screen">
      <StripeNav />

      <div className="mx-auto max-w-2xl px-6 py-24 lg:ml-52 lg:mr-auto lg:max-w-2xl lg:px-8">
        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Experience
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            A decade of building for the web.
          </p>
        </header>

        <div className="space-y-6">{sections}</div>
      </div>
    </main>
  );
}

import type { Role } from "@/lib/experience-data";

export function RoleCard({
  role,
  showCompany = true,
}: {
  role: Role;
  showCompany?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-black/85 px-6 py-5 backdrop-blur-xl sm:px-8 sm:py-6">
      <div className="mb-3 space-y-1">
        <h3 className="text-xl font-semibold text-foreground sm:text-2xl">
          {role.title}
        </h3>
        {showCompany && (
          <p className="text-sm font-medium text-sienna">{role.company}</p>
        )}
        <p className="text-xs text-muted-foreground">{role.dates}</p>
      </div>

      {role.bullets.length > 0 && (
        <ul className="mb-4 space-y-2">
          {role.bullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
              <span className="mt-2 block h-1 w-1 shrink-0 rounded-full bg-sienna" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      )}

      {role.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {role.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-0.5 text-xs text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {role.links && role.links.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-x-3 text-sm">
          {role.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground underline decoration-white/20 underline-offset-2 hover:text-foreground hover:decoration-white/40"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

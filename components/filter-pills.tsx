"use client";

type FilterValue = "all" | "professional" | "personal";

const filters: { label: string; value: FilterValue }[] = [
  { label: "All", value: "all" },
  { label: "Professional", value: "professional" },
  { label: "Personal", value: "personal" },
];

export function FilterPills({
  active,
  onChange,
}: {
  active: FilterValue;
  onChange: (value: FilterValue) => void;
}) {
  return (
    <div className="flex gap-2">
      {filters.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={`rounded-full px-3.5 py-1 text-xs font-medium transition-colors ${
            active === value
              ? "bg-sienna text-white"
              : "border border-white/[0.08] bg-white/[0.04] text-muted-foreground hover:bg-white/[0.08]"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

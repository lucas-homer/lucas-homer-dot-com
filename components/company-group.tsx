import type { Role } from "@/lib/experience-data";
import { RoleCard } from "./role-card";

export function CompanyGroup({
  company,
  roles,
}: {
  company: string;
  roles: Role[];
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-sm font-medium text-sienna">{company}</h2>
      {roles.map((role) => (
        <div key={role.id} id={role.id} className="scroll-mt-24">
          <RoleCard role={role} showCompany={false} />
        </div>
      ))}
    </div>
  );
}

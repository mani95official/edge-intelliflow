import { Link, useLocation } from "@tanstack/react-router";
import { services } from "@/lib/services-data";

export function ServicesSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="w-full md:sticky md:top-24 md:h-[calc(100vh-8rem)] md:overflow-y-auto border-r border-border pr-6 font-mono">
      <div className="text-xs uppercase tracking-widest text-muted-foreground mb-6">
        § Practice Areas
      </div>
      <ul className="space-y-1">
        {services.map((s) => {
          const path = `/services/${s.slug}`;
          const isActive = currentPath === path;
          return (
            <li key={s.slug}>
              <Link
                to={path as any}
                className={`group flex items-center justify-between py-2 text-xs border-b border-transparent transition-all ${
                  isActive
                    ? "text-brand font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:translate-x-1"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className={`text-[10px] ${isActive ? "text-brand" : "text-muted-foreground/50 group-hover:text-foreground"}`}>
                    {s.number}
                  </span>
                  <span className="text-left leading-snug">{s.title.replace(" Development", "").replace(" Solutions", "")}</span>
                </span>
                {isActive && <span className="size-1.5 rounded-full bg-brand animate-pulse" />}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

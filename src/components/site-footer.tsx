import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/logo";
import { services } from "@/lib/services-data";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-5 py-6 md:px-8">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo className="h-6 w-auto text-background" />
            <p className="mt-6 max-w-sm text-sm text-background/70">
              Intelligence at the Edge. Innovation Everywhere. Engineering connected, intelligent products from concept to deployment.
            </p>

          </div>
          <div className="md:col-span-2">
            <h4 className="text-xs font-mono uppercase tracking-widest text-background/50">Explore</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li><Link to="/" className="hover:text-brand">Home</Link></li>
              <li><Link to="/services" className="hover:text-brand">Services</Link></li>
              <li><Link to="/training" className="hover:text-brand">Training</Link></li>
              <li><Link to="/blog" className="hover:text-brand">Blog</Link></li>
              <li><Link to="/about" className="hover:text-brand">About</Link></li>
              <li><Link to="/contact" className="hover:text-brand">Contact</Link></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h4 className="text-xs font-mono uppercase tracking-widest text-background/50">Capabilities</h4>
            <ul className="mt-4 space-y-3 text-sm text-background/80">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    className="hover:text-brand"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-background/50">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm text-background/80">
              <li>hello@astrointelli.com</li>
              <li>Ramanys Mayuri, Saravanampatti, Coimbatore - 641035, Tamil Nadu, India</li>
            </ul>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 border border-background/20 px-4 py-2 text-sm hover:bg-brand hover:border-brand"
            >
              Start a project →
            </Link>
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-3 border-t border-background/10 pt-6 text-xs text-background/50 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} AstroIntelli Tech. All rights reserved.</span>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-brand transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-brand transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
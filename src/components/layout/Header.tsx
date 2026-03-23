import { useState, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BorderGlow from "@/components/BorderGlow";
import StaggeredMenu from "@/components/StaggeredMenu";
import { Home, Briefcase, FolderKanban, Award, Users, Handshake } from "lucide-react";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "How We Work", href: "/services", icon: Briefcase },
  { name: "Simulations", href: "/case-studies", icon: FolderKanban },
  { name: "Achievements", href: "/engagements", icon: Award },
  { name: "Jobs", href: "/jobs", icon: Users },
  { name: "Partners", href: "/partners", icon: Handshake },
];

const mobileMenuItems = navigation.map((item) => ({
  label: item.name,
  ariaLabel: `Go to ${item.name}`,
  link: item.href,
}));

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleMobileItemClick = useCallback((item: { link: string }) => {
    navigate(item.link);
  }, [navigate]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        <nav className="container mx-auto px-5 sm:px-6 lg:px-8 py-4 md:py-5">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className="flex flex-col pointer-events-auto transition-all duration-300 hover:-translate-y-0.5"
            >
              <span className="text-sm font-semibold tracking-tight text-foreground leading-none">Norfront Group</span>
              <span className="text-[10px] text-muted-foreground tracking-widest uppercase mt-0.5">AI Advisory</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8 pointer-events-auto">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`relative text-[13px] font-medium transition-all duration-300 hover:-translate-y-0.5 ${
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.name}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-px bg-foreground" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3 pointer-events-auto">
              <Button asChild variant="hero" size="sm" className="rounded-none text-xs tracking-wide">
                <Link to="/contact">Book a Call</Link>
              </Button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile StaggeredMenu — only visible on small screens */}
      <div className="md:hidden fixed inset-0 z-[60] pointer-events-none" style={{ height: '100vh' }}>
        <StaggeredMenu
          position="right"
          items={mobileMenuItems}
          socialItems={[]}
          displaySocials={false}
          displayItemNumbering={true}
          menuButtonColor="#ffffff"
          openMenuButtonColor="#fff"
          changeMenuColorOnOpen={true}
          colors={['#1a2332', '#243447']}
          accentColor="#7ec8e3"
          isFixed={true}
          onItemClick={handleMobileItemClick}
        />
      </div>

      {/* Header fade mask */}
      <div
        className="fixed top-0 left-0 right-0 z-40 h-24 md:h-28 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, hsl(var(--background)) 0%, hsl(var(--background)) 30%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, black 0%, black 40%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 40%, transparent 100%)',
        }}
      />
    </>
  );
}

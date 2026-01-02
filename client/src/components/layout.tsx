import { Link, useLocation } from "wouter";
import { BookOpen, LayoutGrid, GraduationCap } from "lucide-react";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Courses", icon: BookOpen },
    { href: "/create", label: "Create Course", icon: LayoutGrid },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/25">
              <GraduationCap className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 font-display">
              Edu<span className="text-primary">Flow</span>
            </span>
          </div>
          
          <div className="flex items-center gap-1 sm:gap-4">
            {navItems.map((item) => {
              const isActive = location === item.href;
              const Icon = item.icon;
              
              return (
                <Link key={item.href} href={item.href}>
                  <div className={`
                    group flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 cursor-pointer
                    ${isActive 
                      ? "bg-primary/10 text-primary ring-1 ring-primary/20" 
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}
                  `}>
                    <Icon className={`h-4 w-4 ${isActive ? "text-primary" : "text-slate-500 group-hover:text-slate-900"}`} />
                    <span>{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="animate-in">
          {children}
        </div>
      </main>
    </div>
  );
}

import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  ShieldCheck, 
  Settings, 
  Activity,
  LogOut,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { 
    group: "General", 
    items: [
      { name: "Dashboard", href: "/", icon: LayoutDashboard },
      { name: "Users", href: "/users", icon: Users },
    ]
  },
  { 
    group: "System", 
    items: [
      { name: "Security", href: "/security", icon: ShieldCheck },
      { name: "Activity", href: "/activity", icon: Activity },
    ]
  },
  { 
    group: "Config", 
    items: [
      { name: "Settings", href: "/settings", icon: Settings },
    ]
  },
];

interface SidebarProps {
  onNavClick?: () => void;
}

export function Sidebar({ onNavClick }: SidebarProps) {
  return (
    /* h-full and flex-col are essential here to make the 'mt-auto' work below */
    <aside className="flex h-full w-full flex-col bg-brand-charcoal border-r border-white/5 overflow-hidden">
      
      {/* 1. Brand Logo & Mobile Close */}
      <div className="flex h-24 items-center justify-between px-8 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-red shadow-[0_0_20px_rgba(220,38,38,0.4)]">
            <div className="h-5 w-5 border-2 border-white rounded-sm rotate-45" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tighter text-white leading-none uppercase">HOLCOMB</span>
            <span className="text-[10px] font-bold tracking-[0.3em] text-brand-red uppercase">Ray Admin</span>
          </div>
        </div>
        <button onClick={onNavClick} className="lg:hidden text-slate-500 hover:text-white transition-colors">
          <X size={20} />
        </button>
      </div>

      {/* 2. Navigation Area - flex-1 grows to fill all available vertical space */}
      <nav className="flex-1 px-4 space-y-8 mt-4 overflow-y-auto custom-scrollbar">
        {navigation.map((section) => (
          <div key={section.group}>
            <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4">
              {section.group}
            </p>
            <div className="space-y-1">
              {section.items.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  onClick={onNavClick}
                  className={({ isActive }) => cn(
                    "group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all duration-300",
                    isActive 
                      ? "bg-white/10 text-white shadow-sm ring-1 ring-white/10" 
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  )}
                >
                  {({ isActive }) => (
                    <>
                      <item.icon className={cn(
                        "h-5 w-5 transition-colors", 
                        isActive ? "text-brand-red" : "text-slate-500 group-hover:text-slate-300"
                      )} />
                      <span className="flex-1">{item.name}</span>
                      {isActive && (
                        <div className="h-1.5 w-1.5 rounded-full bg-brand-red shadow-[0_0_10px_#dc2626]" />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* 3. Bottom Profile Section - mt-auto pins this to the very bottom */}
      <div className="mt-auto shrink-0 border-t border-white/5 bg-black/20 p-4 pb-8 lg:pb-4">
        <div className="flex items-center gap-3 px-3 py-4 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer group">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-brand-red to-red-400 flex items-center justify-center text-white font-black text-sm shadow-lg">
            DB
          </div>
          <div className="flex flex-col flex-1 overflow-hidden">
            <span className="text-sm font-bold text-white truncate leading-tight">DevBlaze</span>
            <span className="text-[10px] font-medium text-slate-500 truncate uppercase tracking-wider">System Owner</span>
          </div>
          <Settings size={14} className="text-slate-600 group-hover:text-white transition-colors" />
        </div>

        <button className="mt-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-slate-400 hover:bg-brand-red/10 hover:text-brand-red transition-all duration-300 group">
          <LogOut className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
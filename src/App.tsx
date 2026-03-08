import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import { Menu, X } from "lucide-react";

const PagePlaceholder = ({ title }: { title: string }) => (
  <div className="p-4 md:p-8">
    <h1 className="text-2xl font-bold">{title}</h1>
    <div className="mt-10 h-64 w-full border-2 border-dashed border-slate-200 rounded-3xl flex items-center justify-center text-slate-400 font-medium text-center px-4">
      {title} Content Coming Soon...
    </div>
  </div>
);

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Router>
      {/* 1. h-screen is the 'Global Lock'. It prevents the body from growing longer than the screen. */}
      <div className="flex h-screen w-full bg-brand-ash overflow-hidden relative">
        
        {/* MOBILE OVERLAY */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* 2. SIDEBAR WRAPPER: Must be h-full to reach the bottom. */}
        <div className={`
          fixed inset-y-0 left-0 z-50 w-64 h-full shrink-0 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}>
          <Sidebar onNavClick={() => setIsSidebarOpen(false)} />
        </div>
        
        {/* 3. MAIN CONTENT AREA: flex-col + h-full allows the inner div to scroll. */}
        <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          
          {/* MOBILE TOP BAR */}
          <div className="lg:hidden flex items-center justify-between px-6 h-20 bg-brand-charcoal border-b border-white/5 shrink-0">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-brand-red rounded-lg flex items-center justify-center rotate-45">
                <div className="h-3 w-3 border-2 border-white -rotate-45" />
              </div>
              <span className="text-white font-black tracking-tighter">HOLCOMB</span>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 bg-white/5 rounded-xl text-white hover:bg-white/10 transition-colors"
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* 4. DASHBOARD AREA: This is the only part that should scroll. */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/users" element={<PagePlaceholder title="User Management" />} />
              <Route path="/security" element={<PagePlaceholder title="Security" />} />
              <Route path="/activity" element={<PagePlaceholder title="Activity" />} />
              <Route path="/settings" element={<PagePlaceholder title="Settings" />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
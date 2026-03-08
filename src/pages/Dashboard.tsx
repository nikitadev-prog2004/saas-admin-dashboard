import { motion } from "framer-motion";
import { 
  Activity, 
  ArrowUpRight, 
  ArrowDownRight, 
  Zap, 
  Globe, 
  Lock,
  type LucideIcon
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';

interface StatCardProps {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: LucideIcon;
}

const barData = [
  { name: 'Mon', active: 400 }, { name: 'Tue', active: 300 },
  { name: 'Wed', active: 600 }, { name: 'Thu', active: 800 },
  { name: 'Fri', active: 500 }, { name: 'Sat', active: 900 },
  { name: 'Sun', active: 700 },
];

const pieData = [
  { name: 'Admin', value: 400 },
  { name: 'Editor', value: 300 },
  { name: 'Viewer', value: 300 },
];

const COLORS = ['#DC2626', '#0F172A', '#64748B'];

const StatCard = ({ label, value, change, isPositive, icon: Icon }: StatCardProps) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white p-6 rounded-3xl border border-slate-100 shadow-premium flex justify-between items-start hover:shadow-lg transition-all duration-300"
  >
    <div>
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <h3 className="text-2xl md:text-3xl font-bold mt-2 text-brand-charcoal">{value}</h3>
      <div className={`flex items-center gap-1 mt-2 ${isPositive ? 'text-emerald-600' : 'text-brand-red'}`}>
        {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
        <span className="text-xs font-bold">{change}</span>
      </div>
    </div>
    <div className="p-3 md:p-4 bg-brand-ash rounded-2xl shrink-0">
      <Icon className="w-5 h-5 md:w-6 md:h-6 text-brand-red" />
    </div>
  </motion.div>
);

export default function Dashboard() {
  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8 max-w-[1600px] mx-auto w-full">
      
      {/* 1. Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-brand-charcoal leading-none">Global Overview</h1>
          <p className="text-sm md:text-base text-slate-500 font-medium mt-1">Real-time status of Axiom.</p>
        </div>
        <button className="w-full sm:w-auto px-5 py-3 bg-brand-charcoal text-white rounded-xl text-sm font-bold shadow-lg hover:bg-black transition-all flex items-center justify-center gap-2">
          <Zap size={16} className="text-brand-red fill-brand-red" /> Upgrade Plan
        </button>
      </div>

      {/* 2. Responsive Metric Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <StatCard label="Total Reach" value="2.4M" change="+14.2%" isPositive={true} icon={Globe} />
        <StatCard label="Security Rating" value="98.2%" change="-0.4%" isPositive={false} icon={Lock} />
        <StatCard label="Server Load" value="42%" change="+2.1%" isPositive={true} icon={Activity} />
      </div>

      {/* 3. Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-premium overflow-hidden">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-lg text-brand-charcoal">Engagement</h3>
            <select className="bg-slate-50 text-[10px] md:text-xs font-bold p-2 rounded-lg border-none focus:ring-2 focus:ring-brand-red">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[250px] md:h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 10}} dy={10} />
                <Tooltip cursor={{fill: '#F8FAFC'}} contentStyle={{ borderRadius: '12px', border: 'none' }} />
                <Bar dataKey="active" fill="#DC2626" radius={[4, 4, 0, 0]} barSize={25} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-premium flex flex-col items-center">
          <div className="w-full mb-8">
            <h3 className="font-bold text-lg text-brand-charcoal">Roles</h3>
          </div>
          <div className="h-[250px] md:h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={8} dataKey="value">
                  {pieData.map((_, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {pieData.map((entry, i) => (
              <div key={entry.name} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                <span className="text-[10px] font-bold text-slate-500 uppercase">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Activity Log */}
      <div className="bg-brand-charcoal rounded-[2rem] p-6 md:p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <h3 className="text-xl font-bold">Live System Audit</h3>
            <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/10">
              <div className="w-2 h-2 bg-brand-red rounded-full animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">Monitoring</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { event: 'Root Access', user: 'admin_01', time: '2m ago', color: 'bg-brand-red' },
              { event: 'API Key', user: 'system_bot', time: '14m ago', color: 'bg-slate-400' },
              { event: 'New IP', user: 'dev_9', time: '1h ago', color: 'bg-brand-red' },
              { event: 'Backup', user: 'automated', time: '3h ago', color: 'bg-slate-400' },
            ].map((log, i) => (
              <div key={i} className="bg-white/5 border border-white/5 p-4 rounded-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${log.color}`} />
                  <span className="text-xs font-bold">{log.event}</span>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>{log.user}</span>
                  <span className="italic">{log.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { Dumbbell, Utensils, TrendingUp, Settings } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, onOpenSettings, profile = {} }) {
  const navItems = [
    { id: 'workout', label: 'Workout', icon: Dumbbell },
    { id: 'nutrition', label: 'Nutrition', icon: Utensils },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
  ];

  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo / Title */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-950 font-black tracking-tighter">
            FP
          </div>
          <div>
            <h1 className="text-base font-extrabold text-white leading-none">fitpulse</h1>
            <p className="text-[10px] text-slate-400 mt-0.5">
              {profile?.name ? `${profile.name}'s Dashboard` : 'Personal Fitness Tracker'}
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  isActive
                    ? 'bg-emerald-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Stats Summary & Settings Trigger */}
        <div className="flex items-center gap-3">
          {profile?.currentWeight && (
            <div className="hidden md:flex flex-col items-end text-right">
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Current</span>
              <span className="text-xs font-bold text-emerald-400">{profile.currentWeight} lbs</span>
            </div>
          )}

          <button
            onClick={onOpenSettings}
            className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 transition cursor-pointer"
            title="Edit Profile Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
}
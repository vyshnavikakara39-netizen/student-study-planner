import React, { useState } from 'react';
import { ActiveTab } from '../types';
import { 
  BookOpen, 
  LayoutDashboard, 
  CheckSquare, 
  Calendar, 
  BarChart3, 
  Timer, 
  Code2, 
  Plus, 
  Menu, 
  X,
  RotateCcw
} from 'lucide-react';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenNewTask: () => void;
  onOpenCodeExport: () => void;
  onResetData: () => void;
  pendingCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenNewTask,
  onOpenCodeExport,
  onResetData,
  pendingCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: ActiveTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: BookOpen },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'timetable', label: 'Timetable', icon: Calendar },
    { id: 'analytics', label: 'Progress', icon: BarChart3 },
    { id: 'timer', label: 'Focus', icon: Timer },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-2.5 text-left group focus-visible:outline-none"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-xs group-hover:bg-blue-700 transition-colors">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                StudyFlow
              </span>
            </button>
            <span className="hidden sm:inline-block text-xs text-slate-400 font-mono tracking-wider uppercase ml-1">
              Student Edition
            </span>
          </div>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                    isActive 
                      ? 'text-blue-600 bg-blue-50 font-semibold' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                  {link.id === 'tasks' && pendingCount > 0 && (
                    <span className="ml-1 text-xs font-mono tabular-nums px-1.5 py-0.2 bg-slate-200 text-slate-700 rounded-sm">
                      {pendingCount}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenCodeExport}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors whitespace-nowrap"
              title="View standalone HTML/CSS/JS source code"
            >
              <Code2 className="w-3.5 h-3.5 text-slate-600" />
              <span>Portfolio Code</span>
            </button>

            <button
              onClick={onOpenNewTask}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span>Add Task</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus-visible:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 text-base font-medium rounded-lg text-left ${
                  isActive
                    ? 'text-blue-600 bg-blue-50 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                </div>
                {link.id === 'tasks' && pendingCount > 0 && (
                  <span className="text-xs font-mono tabular-nums px-2 py-0.5 bg-slate-200 text-slate-700 rounded-full">
                    {pendingCount}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenCodeExport();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
            >
              <Code2 className="w-4 h-4 text-slate-500" />
              <span>View HTML/CSS/JS Source Code</span>
            </button>

            <button
              onClick={() => {
                onResetData();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs text-slate-500 hover:text-slate-700"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Sample Data</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

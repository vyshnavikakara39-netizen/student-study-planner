import React, { useState } from 'react';
import { StudyTask, TimetableSlot, ActiveTab, CORE_SUBJECTS } from '../types';
import { getSubjectMeta } from '../utils/subjectStyles';
import { MOTIVATIONAL_QUOTES } from '../constants/initialData';
import { 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Plus, 
  Sparkles, 
  BookOpen, 
  CalendarDays, 
  CheckSquare, 
  Zap,
  Quote
} from 'lucide-react';

interface HomeViewProps {
  tasks: StudyTask[];
  timetable: TimetableSlot[];
  studentName: string;
  onUpdateStudentName: (name: string) => void;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenNewTask: () => void;
  onSelectSubjectFilter: (subject: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  tasks,
  timetable,
  studentName,
  onUpdateStudentName,
  setActiveTab,
  onOpenNewTask,
  onSelectSubjectFilter,
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(studentName);
  const [quoteIdx, setQuoteIdx] = useState(0);

  // Today's date calculations
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDayName = daysOfWeek[today.getDay()];

  const todayTasks = tasks.filter((t) => t.dueDate === todayStr);
  const todayCompleted = todayTasks.filter((t) => t.completed).length;
  const todayPercentage = todayTasks.length > 0 ? Math.round((todayCompleted / todayTasks.length) * 100) : 0;

  const totalTasks = tasks.length;
  const totalCompleted = tasks.filter((t) => t.completed).length;
  const overallPercentage = totalTasks > 0 ? Math.round((totalCompleted / totalTasks) * 100) : 0;

  const todayClasses = timetable.filter((s) => s.day === currentDayName);

  const greetingTime = (() => {
    const hr = today.getHours();
    if (hr < 12) return 'Good morning';
    if (hr < 17) return 'Good afternoon';
    return 'Good evening';
  })();

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempName.trim()) {
      onUpdateStudentName(tempName.trim());
      setIsEditingName(false);
    }
  };

  const handleNextQuote = () => {
    setQuoteIdx((prev) => (prev + 1) % MOTIVATIONAL_QUOTES.length);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Banner */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <span>{today.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
              <span aria-hidden="true">·</span>
              <span className="text-blue-600 font-semibold">{currentDayName} Schedule</span>
            </div>

            <div className="flex items-baseline gap-2 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {greetingTime},{' '}
                {isEditingName ? (
                  <form onSubmit={handleSaveName} className="inline-flex items-center gap-2">
                    <input
                      type="text"
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      className="px-2 py-1 text-xl font-bold border border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      autoFocus
                    />
                    <button type="submit" className="text-xs bg-blue-600 text-white px-2 py-1 rounded-md">
                      Save
                    </button>
                  </form>
                ) : (
                  <span 
                    onClick={() => { setTempName(studentName); setIsEditingName(true); }}
                    className="cursor-pointer hover:text-blue-600 transition-colors underline decoration-dotted decoration-slate-300"
                    title="Click to change your name"
                  >
                    {studentName}
                  </span>
                )}
              </h1>
            </div>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Welcome to your college study command center. Manage your coursework, practice coding across your 6 core technical subjects, and keep pace with your daily timetable.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={onOpenNewTask}
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Task</span>
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-medium border border-slate-200 rounded-lg transition-colors"
            >
              <span>Go to Dashboard</span>
              <ArrowRight className="w-4 h-4 text-slate-500" />
            </button>
          </div>
        </div>

        {/* Motivational quote kicker */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <Quote className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs sm:text-sm italic text-slate-700">
                "{MOTIVATIONAL_QUOTES[quoteIdx].quote}"
              </p>
              <span className="text-xs text-slate-400 mt-0.5 block">
                — {MOTIVATIONAL_QUOTES[quoteIdx].author}
              </span>
            </div>
          </div>
          <button
            onClick={handleNextQuote}
            className="text-xs text-slate-500 hover:text-blue-600 font-medium shrink-0 flex items-center gap-1 transition-colors"
            title="Read next quote"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">New Quote</span>
          </button>
        </div>
      </section>

      {/* Snapshot Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Today's Tasks */}
        <div 
          onClick={() => setActiveTab('dashboard')} 
          className="bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-300 transition-all cursor-pointer shadow-xs group"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-3">
            <span>Today's Tasks</span>
            <CheckSquare className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
              {todayCompleted}/{todayTasks.length}
            </span>
            <span className="text-xs text-slate-500">completed</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-emerald-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${todayPercentage}%` }}
            />
          </div>
          <div className="mt-2 text-xs text-slate-500 font-mono tabular-nums flex justify-between">
            <span>Progress</span>
            <span className="font-semibold text-slate-700">{todayPercentage}%</span>
          </div>
        </div>

        {/* Overall Completion */}
        <div 
          onClick={() => setActiveTab('analytics')} 
          className="bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-300 transition-all cursor-pointer shadow-xs group"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-3">
            <span>Overall Syllabus Tasks</span>
            <CheckCircle2 className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
              {overallPercentage}%
            </span>
            <span className="text-xs text-slate-500 font-mono tabular-nums">{totalCompleted} of {totalTasks} done</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-blue-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${overallPercentage}%` }}
            />
          </div>
          <div className="mt-2 text-xs text-slate-500 flex justify-between">
            <span>Active backlog</span>
            <span className="font-mono tabular-nums font-semibold text-slate-700">{totalTasks - totalCompleted} pending</span>
          </div>
        </div>

        {/* Classes Scheduled Today */}
        <div 
          onClick={() => setActiveTab('timetable')} 
          className="bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-300 transition-all cursor-pointer shadow-xs group"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-3">
            <span>Today's Classes</span>
            <CalendarDays className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
              {todayClasses.length}
            </span>
            <span className="text-xs text-slate-500">slots on {currentDayName}</span>
          </div>
          <p className="text-xs text-slate-500 line-clamp-1 mt-3">
            {todayClasses.length > 0 
              ? `Next: ${todayClasses[0].subject} at ${todayClasses[0].startTime}`
              : 'No scheduled classes today'}
          </p>
        </div>

        {/* Focus Study Tool */}
        <div 
          onClick={() => setActiveTab('timer')} 
          className="bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-300 transition-all cursor-pointer shadow-xs group"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-3">
            <span>Focus Mode</span>
            <Zap className="w-4 h-4 text-amber-500" />
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-2xl font-extrabold text-slate-900 font-mono">
              25:00
            </span>
            <span className="text-xs text-slate-500">Pomodoro</span>
          </div>
          <p className="text-xs text-blue-600 font-medium group-hover:underline flex items-center gap-1 mt-3">
            <span>Launch study timer</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </p>
        </div>
      </section>

      {/* Core Subjects Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Core CS Subjects</h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Quickly filter tasks and track syllabus coverage for your semester examinations.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('tasks')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
          >
            <span>View All Tasks</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CORE_SUBJECTS.map((subject) => {
            const meta = getSubjectMeta(subject);
            const subjectTasks = tasks.filter((t) => t.subject === subject);
            const completedCount = subjectTasks.filter((t) => t.completed).length;
            const totalCount = subjectTasks.length;
            const pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

            return (
              <div
                key={subject}
                onClick={() => {
                  onSelectSubjectFilter(subject);
                  setActiveTab('tasks');
                }}
                className="bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-300 hover:shadow-xs transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span 
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: meta.colorHex }}
                      aria-hidden="true"
                    />
                    <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {subject}
                    </h3>
                  </div>
                  <span className="text-xs font-mono tabular-nums font-semibold text-slate-600">
                    {pct}%
                  </span>
                </div>

                <p className="text-xs text-slate-500 mb-4 line-clamp-1">
                  {meta.description}
                </p>

                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{ 
                      width: `${pct}%`,
                      backgroundColor: meta.colorHex
                    }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 font-mono tabular-nums">
                  <span>{completedCount}/{totalCount} tasks completed</span>
                  <span className="text-blue-600 font-sans group-hover:underline">Filter &rarr;</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Quick Tips & Academic Best Practices */}
      <section className="bg-slate-50 border border-slate-200 rounded-xl p-6">
        <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-blue-600" />
          <span>Semester Study Strategy for CS Students</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600">
          <div className="space-y-1">
            <span className="font-semibold text-slate-800">1. Pair Theory with Code</span>
            <p>Don't just read about OS scheduling or DBMS locks—implement simulation scripts or run practical SQL queries.</p>
          </div>
          <div className="space-y-1">
            <span className="font-semibold text-slate-800">2. Consistent DSA Practice</span>
            <p>Solve at least 1–2 tree, graph, or DP problems daily to maintain interview readiness and spatial memory.</p>
          </div>
          <div className="space-y-1">
            <span className="font-semibold text-slate-800">3. Honor the Timetable</span>
            <p>Treat your lab sessions and self-study blocks as immovable meetings. Use the Focus Timer to prevent tab wandering.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

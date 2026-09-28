import React from 'react';
import { StudyTask, Subject, CORE_SUBJECTS, ActiveTab } from '../types';
import { getSubjectMeta } from '../utils/subjectStyles';
import { 
  BarChart3, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  BookOpen, 
  TrendingUp, 
  Target
} from 'lucide-react';

interface AnalyticsViewProps {
  tasks: StudyTask[];
  onSelectSubjectFilter: (subject: string) => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  tasks,
  onSelectSubjectFilter,
  setActiveTab,
}) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const overallPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Study hours calculation
  const totalHours = tasks.reduce((sum, t) => sum + (t.estimatedHours || 1), 0);
  const completedHours = tasks
    .filter((t) => t.completed)
    .reduce((sum, t) => sum + (t.estimatedHours || 1), 0);

  // High priority stats
  const highTasks = tasks.filter((t) => t.priority === 'high');
  const highCompleted = highTasks.filter((t) => t.completed).length;
  const highPct = highTasks.length > 0 ? Math.round((highCompleted / highTasks.length) * 100) : 0;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Study Progress & Syllabus Analytics
        </h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Detailed completion breakdown across your 6 core college computer science subjects.
        </p>
      </div>

      {/* Top 3 Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Progress Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-3">
            <span>Overall Coursework Completed</span>
            <Target className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-4xl font-extrabold text-slate-900 font-mono tabular-nums">
              {overallPercentage}%
            </span>
            <span className="text-xs text-slate-500 font-mono tabular-nums">
              {completedTasks} / {totalTasks} tasks
            </span>
          </div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-blue-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${overallPercentage}%` }}
            />
          </div>
          <p className="text-xs text-slate-400 mt-3">
            {totalTasks - completedTasks} remaining assignments & topics
          </p>
        </div>

        {/* Study Hours Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-3">
            <span>Study Hours Logged</span>
            <Clock className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-4xl font-extrabold text-slate-900 font-mono tabular-nums">
              {completedHours.toFixed(1)}
            </span>
            <span className="text-xs text-slate-500 font-mono tabular-nums">
              of {totalHours.toFixed(1)} planned hrs
            </span>
          </div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${totalHours > 0 ? (completedHours / totalHours) * 100 : 0}%` }}
            />
          </div>
          <p className="text-xs text-slate-400 mt-3 font-mono tabular-nums">
            {(totalHours - completedHours).toFixed(1)} study hours left in queue
          </p>
        </div>

        {/* High Priority Completion */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-3">
            <span>High-Priority Clearance</span>
            <TrendingUp className="w-4 h-4 text-red-600" />
          </div>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-4xl font-extrabold text-slate-900 font-mono tabular-nums">
              {highPct}%
            </span>
            <span className="text-xs text-slate-500 font-mono tabular-nums">
              {highCompleted} / {highTasks.length} urgent tasks
            </span>
          </div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-red-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${highPct}%` }}
            />
          </div>
          <p className="text-xs text-slate-400 mt-3">
            {highTasks.length - highCompleted} urgent milestones pending
          </p>
        </div>
      </div>

      {/* Subject-Wise Progress Grid */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="pb-4 border-b border-slate-100 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Subject Mastery & Coverage
            </h2>
            <p className="text-xs text-slate-500">
              Individual progress tracking for each of your college courses.
            </p>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            6 Core Engineering Subjects
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CORE_SUBJECTS.map((subject) => {
            const meta = getSubjectMeta(subject);
            const subjectTasks = tasks.filter((t) => t.subject === subject);
            const completedCount = subjectTasks.filter((t) => t.completed).length;
            const totalCount = subjectTasks.length;
            const pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
            const hours = subjectTasks.reduce((s, t) => s + (t.estimatedHours || 1), 0);

            return (
              <div
                key={subject}
                className="p-5 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-xs transition-all bg-white"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: meta.colorHex }}
                      aria-hidden="true"
                    />
                    <h3 className="font-bold text-slate-900 text-base">
                      {subject}
                    </h3>
                  </div>
                  <span className="text-lg font-extrabold font-mono tabular-nums text-slate-900">
                    {pct}%
                  </span>
                </div>

                <p className="text-xs text-slate-500 mb-4 line-clamp-1">
                  {meta.description}
                </p>

                {/* Progress Bar */}
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-3">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{ 
                      width: `${pct}%`,
                      backgroundColor: meta.colorHex 
                    }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 font-mono tabular-nums">
                  <span>
                    {completedCount} of {totalCount} tasks completed ({hours.toFixed(1)} hrs total)
                  </span>
                  <button
                    onClick={() => {
                      onSelectSubjectFilter(subject);
                      setActiveTab('tasks');
                    }}
                    className="font-sans font-medium text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <span>View Tasks</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

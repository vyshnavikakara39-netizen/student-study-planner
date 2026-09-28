import React from 'react';
import { StudyTask, TimetableSlot, ActiveTab } from '../types';
import { getSubjectMeta } from '../utils/subjectStyles';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Calendar, 
  AlertCircle, 
  Plus, 
  Edit3, 
  Trash2, 
  ArrowRight,
  Sparkles,
  BookOpen
} from 'lucide-react';

interface DashboardViewProps {
  tasks: StudyTask[];
  timetable: TimetableSlot[];
  onToggleTask: (id: string) => void;
  onEditTask: (task: StudyTask) => void;
  onDeleteTask: (id: string) => void;
  onOpenNewTask: () => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  tasks,
  timetable,
  onToggleTask,
  onEditTask,
  onDeleteTask,
  onOpenNewTask,
  setActiveTab,
}) => {
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDayName = daysOfWeek[today.getDay()];

  // Today's tasks (due today, or pending overdue tasks)
  const todayTasks = tasks.filter((t) => t.dueDate === todayStr);
  const overdueTasks = tasks.filter((t) => t.dueDate < todayStr && !t.completed);
  
  // Combine for today's focus queue
  const focusTasks = [...todayTasks, ...overdueTasks];
  const todayCompletedCount = todayTasks.filter((t) => t.completed).length;
  const todayPercentage = todayTasks.length > 0 ? Math.round((todayCompletedCount / todayTasks.length) * 100) : 0;

  // Overall statistics
  const totalTasks = tasks.length;
  const totalCompleted = tasks.filter((t) => t.completed).length;
  const overallPercentage = totalTasks > 0 ? Math.round((totalCompleted / totalTasks) * 100) : 0;
  const highPriorityPending = tasks.filter((t) => t.priority === 'high' && !t.completed).length;

  // Today's classes
  const todayClasses = timetable
    .filter((s) => s.day === currentDayName)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner / Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Study Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Today's coursework queue, completion rate, and scheduled classes for {currentDayName}.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenNewTask}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Study Task</span>
          </button>
        </div>
      </div>

      {/* Primary Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Today's Completion Metric */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <span className="text-xs font-medium text-slate-500 block mb-1">
            Today's Completion
          </span>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
              {todayPercentage}%
            </span>
            <span className="text-xs text-slate-500 font-mono tabular-nums">
              {todayCompletedCount} of {todayTasks.length} tasks
            </span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${todayPercentage}%` }}
            />
          </div>
          <div className="mt-2 text-xs text-slate-400">
            {todayTasks.length === 0 ? 'No tasks due today' : `${todayTasks.length - todayCompletedCount} remaining today`}
          </div>
        </div>

        {/* Overall Syllabus Metric */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <span className="text-xs font-medium text-slate-500 block mb-1">
            Overall Syllabus Tasks
          </span>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
              {overallPercentage}%
            </span>
            <span className="text-xs text-slate-500 font-mono tabular-nums">
              {totalCompleted} of {totalTasks} done
            </span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-blue-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${overallPercentage}%` }}
            />
          </div>
          <div className="mt-2 text-xs text-slate-400 font-mono tabular-nums">
            {totalTasks - totalCompleted} pending overall
          </div>
        </div>

        {/* High Priority Alerts */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <span className="text-xs font-medium text-slate-500 block mb-1">
            Urgent Priorities
          </span>
          <div className="flex items-baseline gap-2 mb-1">
            <span className={`text-3xl font-extrabold font-mono tabular-nums ${highPriorityPending > 0 ? 'text-red-600' : 'text-slate-900'}`}>
              {highPriorityPending}
            </span>
            <span className="text-xs text-slate-500">high-priority pending</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            {highPriorityPending > 0 
              ? 'Focus on your pending exams & project milestones first.' 
              : 'All high-priority study tasks are resolved! 🎉'}
          </p>
        </div>

        {/* Timetable Metric */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <span className="text-xs font-medium text-slate-500 block mb-1">
            Today's Timetable
          </span>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
              {todayClasses.length}
            </span>
            <span className="text-xs text-slate-500">sessions ({currentDayName})</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-slate-500">View weekly schedule</span>
            <button
              onClick={() => setActiveTab('timetable')}
              className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-0.5"
            >
              <span>Timetable</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Today's Tasks & Urgent Items (8 cols) */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 tracking-tight">
                  Today's Study Checklist
                </h2>
                <p className="text-xs text-slate-500">
                  Click the circle to mark tasks as completed.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('tasks')}
                className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
              >
                <span>All Tasks ({totalTasks})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {focusTasks.length === 0 ? (
              <div className="py-12 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-semibold text-slate-900 mb-1">
                  You're all caught up for today!
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                  No pending tasks due today. You can add a new study goal or review your upcoming coursework.
                </p>
                <button
                  onClick={onOpenNewTask}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Next Task</span>
                </button>
              </div>
            ) : (
              <div className="space-y-2.5">
                {focusTasks.map((task) => {
                  const meta = getSubjectMeta(task.subject);
                  const isOverdue = task.dueDate < todayStr && !task.completed;

                  return (
                    <div
                      key={task.id}
                      className={`group flex items-start gap-3 p-3.5 rounded-lg border transition-all ${
                        task.completed
                          ? 'bg-slate-50/70 border-slate-200 opacity-60'
                          : isOverdue
                          ? 'bg-red-50/40 border-red-200'
                          : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
                      }`}
                    >
                      {/* Checkbox */}
                      <button
                        onClick={() => onToggleTask(task.id)}
                        className="mt-0.5 shrink-0 text-slate-400 hover:text-blue-600 focus-visible:outline-none transition-colors"
                        aria-label={task.completed ? 'Mark task as incomplete' : 'Mark task as completed'}
                      >
                        {task.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-50" />
                        ) : (
                          <Circle className="w-5 h-5 hover:text-blue-600" />
                        )}
                      </button>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        {/* Metadata row: unboxed text with separators */}
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1 flex-wrap">
                          <span 
                            className="font-bold uppercase tracking-wider"
                            style={{ color: meta.colorHex }}
                          >
                            {task.subject}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className={
                            task.priority === 'high' 
                              ? 'text-red-600 font-semibold' 
                              : task.priority === 'medium' 
                              ? 'text-amber-600 font-medium' 
                              : 'text-emerald-600'
                          }>
                            {task.priority.toUpperCase()}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className={`font-mono tabular-nums ${isOverdue ? 'text-red-600 font-semibold' : ''}`}>
                            {isOverdue ? 'Overdue: ' : 'Due: '}{task.dueDate}
                          </span>
                          {task.estimatedHours && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span className="font-mono tabular-nums flex items-center gap-0.5">
                                <Clock className="w-3 h-3 text-slate-400 inline" />
                                {task.estimatedHours}h
                              </span>
                            </>
                          )}
                        </div>

                        {/* Title */}
                        <p className={`text-sm font-semibold text-slate-900 leading-snug ${
                          task.completed ? 'line-through text-slate-400' : ''
                        }`}>
                          {task.title}
                        </p>

                        {/* Notes */}
                        {task.notes && (
                          <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                            {task.notes}
                          </p>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => onEditTask(task)}
                          className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                          title="Edit task"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteTask(task.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          title="Delete task"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Today's Timetable & Quick Actions (4-5 cols) */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-6">
          {/* Today's Timetable Box */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {currentDayName}'s Timetable
                </h3>
                <span className="text-xs text-slate-400">
                  {todayClasses.length} sessions scheduled
                </span>
              </div>
              <button
                onClick={() => setActiveTab('timetable')}
                className="text-xs text-blue-600 hover:text-blue-700 font-medium"
              >
                View Week
              </button>
            </div>

            {todayClasses.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-500">
                <Calendar className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p>No lectures or labs scheduled for today.</p>
                <p className="text-slate-400 mt-1">Great day for self-study and revision!</p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {todayClasses.map((slot) => {
                  const meta = getSubjectMeta(slot.subject);
                  return (
                    <div
                      key={slot.id}
                      className="p-3 rounded-lg border border-slate-100 bg-slate-50/60 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <span 
                          className="text-xs font-bold uppercase tracking-wider"
                          style={{ color: meta.colorHex }}
                        >
                          {slot.subject}
                        </span>
                        <span className="text-xs font-mono tabular-nums text-slate-500 font-medium">
                          {slot.startTime} – {slot.endTime}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-800 line-clamp-1">
                        {slot.topic}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
                        <span>{slot.type}</span>
                        {slot.room && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span>{slot.room}</span>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick Focus Mode Card */}
          <div className="bg-linear-to-br from-blue-50 to-indigo-50/50 border border-blue-100 rounded-xl p-5">
            <div className="flex items-center gap-2 text-blue-900 font-bold text-sm mb-1">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Need Deep Concentration?</span>
            </div>
            <p className="text-xs text-slate-600 mb-3 leading-relaxed">
              Use the built-in 25-minute Pomodoro focus timer to tackle hard algorithms in DSA or debug Java code with zero distractions.
            </p>
            <button
              onClick={() => setActiveTab('timer')}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors"
            >
              <span>Start Study Session</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

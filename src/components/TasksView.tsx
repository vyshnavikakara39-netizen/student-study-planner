import React, { useState, useMemo } from 'react';
import { StudyTask, Subject, Priority, CORE_SUBJECTS } from '../types';
import { getSubjectMeta } from '../utils/subjectStyles';
import { 
  Search, 
  Filter, 
  Plus, 
  CheckCircle2, 
  Circle, 
  Edit3, 
  Trash2, 
  Clock, 
  Calendar, 
  ArrowUpDown,
  CheckCheck,
  AlertCircle
} from 'lucide-react';

interface TasksViewProps {
  tasks: StudyTask[];
  onToggleTask: (id: string) => void;
  onEditTask: (task: StudyTask) => void;
  onDeleteTask: (id: string) => void;
  onOpenNewTask: () => void;
  selectedSubjectFilter: string;
  onSelectSubjectFilter: (subj: string) => void;
}

export const TasksView: React.FC<TasksViewProps> = ({
  tasks,
  onToggleTask,
  onEditTask,
  onDeleteTask,
  onOpenNewTask,
  selectedSubjectFilter,
  onSelectSubjectFilter,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PENDING' | 'COMPLETED'>('ALL');
  const [priorityFilter, setPriorityFilter] = useState<'ALL' | Priority>('ALL');
  const [sortBy, setSortBy] = useState<'dueDate' | 'priority' | 'title'>('dueDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const todayStr = new Date().toISOString().split('T')[0];

  // Filtering and sorting
  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        // Search query
        const query = searchQuery.toLowerCase().trim();
        const matchesQuery = 
          !query || 
          task.title.toLowerCase().includes(query) || 
          (task.notes && task.notes.toLowerCase().includes(query));

        // Subject filter
        const matchesSubject = 
          selectedSubjectFilter === 'ALL' || 
          task.subject === selectedSubjectFilter;

        // Status filter
        const matchesStatus = 
          statusFilter === 'ALL' || 
          (statusFilter === 'COMPLETED' ? task.completed : !task.completed);

        // Priority filter
        const matchesPriority = 
          priorityFilter === 'ALL' || 
          task.priority === priorityFilter;

        return matchesQuery && matchesSubject && matchesStatus && matchesPriority;
      })
      .sort((a, b) => {
        let comparison = 0;
        if (sortBy === 'dueDate') {
          comparison = a.dueDate.localeCompare(b.dueDate);
        } else if (sortBy === 'title') {
          comparison = a.title.localeCompare(b.title);
        } else if (sortBy === 'priority') {
          const priorityScore = { high: 3, medium: 2, low: 1 };
          comparison = (priorityScore[b.priority] || 0) - (priorityScore[a.priority] || 0);
        }

        return sortOrder === 'asc' ? comparison : -comparison;
      });
  }, [tasks, searchQuery, selectedSubjectFilter, statusFilter, priorityFilter, sortBy, sortOrder]);

  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = tasks.length - completedCount;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Coursework Tasks
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Organize study objectives, coding challenges, and exam preparation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenNewTask}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Study Task</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tasks by title, topics, or notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
            />
          </div>

          {/* Quick Select Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Subject Select */}
            <select
              value={selectedSubjectFilter}
              onChange={(e) => onSelectSubjectFilter(e.target.value)}
              className="px-3 py-2 text-xs font-medium border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">All Subjects</option>
              {CORE_SUBJECTS.map((subj) => (
                <option key={subj} value={subj}>
                  {subj}
                </option>
              ))}
            </select>

            {/* Status Select */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-3 py-2 text-xs font-medium border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">All Status ({tasks.length})</option>
              <option value="PENDING">Pending ({pendingCount})</option>
              <option value="COMPLETED">Completed ({completedCount})</option>
            </select>

            {/* Priority Select */}
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value as any)}
              className="px-3 py-2 text-xs font-medium border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>

            {/* Sort Toggle */}
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
              title="Toggle sort direction"
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sort:</span>
              <span className="capitalize">{sortBy} ({sortOrder.toUpperCase()})</span>
            </button>
          </div>
        </div>

        {/* Subject Segmented Buttons for 1-click filtering */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-1 text-xs">
          <span className="text-slate-400 font-medium shrink-0 mr-1">Subject:</span>
          <button
            onClick={() => onSelectSubjectFilter('ALL')}
            className={`px-2.5 py-1 rounded-md font-medium transition-colors shrink-0 ${
              selectedSubjectFilter === 'ALL'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All
          </button>
          {CORE_SUBJECTS.map((subj) => {
            const isSelected = selectedSubjectFilter === subj;
            const count = tasks.filter((t) => t.subject === subj).length;
            return (
              <button
                key={subj}
                onClick={() => onSelectSubjectFilter(subj)}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors shrink-0 flex items-center gap-1 ${
                  isSelected
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>{subj}</span>
                <span className="font-mono tabular-nums opacity-60 text-[10px]">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Task List */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
          <span>Showing {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'}</span>
          <div className="flex items-center gap-3">
            <span>Pending: <strong className="font-mono tabular-nums text-slate-800">{filteredTasks.filter(t => !t.completed).length}</strong></span>
            <span>Completed: <strong className="font-mono tabular-nums text-emerald-600">{filteredTasks.filter(t => t.completed).length}</strong></span>
          </div>
        </div>

        {filteredTasks.length === 0 ? (
          <div className="py-16 text-center px-4">
            <AlertCircle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-slate-900 mb-1">
              No tasks found
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto mb-4">
              Try adjusting your search terms or filters, or add a new study goal for this subject.
            </p>
            <button
              onClick={onOpenNewTask}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Study Task</span>
            </button>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredTasks.map((task) => {
              const meta = getSubjectMeta(task.subject);
              const isOverdue = task.dueDate < todayStr && !task.completed;
              const isToday = task.dueDate === todayStr;

              return (
                <div
                  key={task.id}
                  className={`group flex items-start gap-4 p-4 hover:bg-slate-50/70 transition-all ${
                    task.completed ? 'bg-slate-50/40 opacity-60' : ''
                  }`}
                >
                  {/* Complete Toggle Checkbox */}
                  <button
                    onClick={() => onToggleTask(task.id)}
                    className="mt-1 shrink-0 text-slate-400 hover:text-blue-600 focus-visible:outline-none transition-colors"
                    aria-label={task.completed ? 'Mark task as incomplete' : 'Mark task as completed'}
                  >
                    {task.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-50" />
                    ) : (
                      <Circle className="w-5 h-5 hover:text-blue-600" />
                    )}
                  </button>

                  {/* Task Details */}
                  <div className="flex-1 min-w-0">
                    {/* Unboxed metadata line with typographic separators */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5 flex-wrap">
                      <span 
                        className="font-bold tracking-wider uppercase text-[11px]"
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
                        {task.priority.toUpperCase()} PRIORITY
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className={`font-mono tabular-nums ${isOverdue ? 'text-red-600 font-semibold' : isToday ? 'text-blue-600 font-semibold' : ''}`}>
                        {isOverdue ? 'Overdue: ' : isToday ? 'Today: ' : 'Due: '}{task.dueDate}
                      </span>
                      {task.estimatedHours && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono tabular-nums flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            {task.estimatedHours} hrs
                          </span>
                        </>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className={`text-base font-semibold text-slate-900 leading-snug ${
                      task.completed ? 'line-through text-slate-400' : ''
                    }`}>
                      {task.title}
                    </h3>

                    {/* Notes */}
                    {task.notes && (
                      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed bg-slate-50/80 p-2 rounded-md border border-slate-100">
                        {task.notes}
                      </p>
                    )}
                  </div>

                  {/* Quick Action Buttons */}
                  <div className="flex items-center gap-1 self-center shrink-0">
                    <button
                      onClick={() => onEditTask(task)}
                      className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                      title="Edit task"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteTask(task.id)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete task"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

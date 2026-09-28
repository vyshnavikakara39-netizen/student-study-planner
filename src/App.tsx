import React, { useState, useEffect } from 'react';
import { StudyTask, TimetableSlot, ActiveTab, DayOfWeek } from './types';
import { 
  getStoredTasks, 
  saveStoredTasks, 
  getStoredTimetable, 
  saveStoredTimetable, 
  getStoredStudentName, 
  saveStoredStudentName,
  resetAllDataToDefault
} from './utils/storage';
import { INITIAL_TIMETABLE } from './constants/initialData';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { DashboardView } from './components/DashboardView';
import { TasksView } from './components/TasksView';
import { TaskModal } from './components/TaskModal';
import { TimetableView } from './components/TimetableView';
import { TimetableModal } from './components/TimetableModal';
import { AnalyticsView } from './components/AnalyticsView';
import { FocusTimer } from './components/FocusTimer';
import { CodeExportModal } from './components/CodeExportModal';
import { CheckCircle2, RotateCcw } from 'lucide-react';

export default function App() {
  const [tasks, setTasks] = useState<StudyTask[]>(() => getStoredTasks());
  const [timetable, setTimetable] = useState<TimetableSlot[]>(() => getStoredTimetable());
  const [studentName, setStudentName] = useState<string>(() => getStoredStudentName());
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  
  // Modals state
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<StudyTask | null>(null);

  const [isTimetableModalOpen, setIsTimetableModalOpen] = useState(false);
  const [editingSlot, setEditingSlot] = useState<TimetableSlot | null>(null);

  const [isCodeExportOpen, setIsCodeExportOpen] = useState(false);
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('ALL');

  // Micro feedback toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Sync to local storage
  useEffect(() => {
    saveStoredTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    saveStoredTimetable(timetable);
  }, [timetable]);

  const handleUpdateStudentName = (name: string) => {
    setStudentName(name);
    saveStoredStudentName(name);
    showToast(`Name updated to ${name}`);
  };

  // Task Handlers
  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextCompleted = !t.completed;
          showToast(nextCompleted ? `Completed "${t.title}" 🎉` : `Marked "${t.title}" pending`);
          return {
            ...t,
            completed: nextCompleted,
            completedAt: nextCompleted ? new Date().toISOString() : undefined,
          };
        }
        return t;
      })
    );
  };

  const handleOpenNewTask = () => {
    setEditingTask(null);
    setIsTaskModalOpen(true);
  };

  const handleEditTask = (task: StudyTask) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  const handleDeleteTask = (id: string) => {
    const taskToDelete = tasks.find((t) => t.id === id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
    showToast(`Deleted "${taskToDelete?.title || 'task'}"`);
  };

  const handleSaveTask = (taskData: Omit<StudyTask, 'id' | 'createdAt' | 'completed'> & { id?: string }) => {
    if (taskData.id) {
      // Editing existing
      setTasks((prev) =>
        prev.map((t) =>
          t.id === taskData.id
            ? {
                ...t,
                ...taskData,
              }
            : t
        )
      );
      showToast(`Updated task details`);
    } else {
      // Create new
      const newTask: StudyTask = {
        id: `task-${Date.now()}`,
        title: taskData.title,
        subject: taskData.subject,
        dueDate: taskData.dueDate,
        priority: taskData.priority,
        estimatedHours: taskData.estimatedHours,
        notes: taskData.notes,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      setTasks((prev) => [newTask, ...prev]);
      showToast(`Added new task to ${newTask.subject}`);
    }
  };

  // Timetable Handlers
  const handleOpenNewTimetableSlot = () => {
    setEditingSlot(null);
    setIsTimetableModalOpen(true);
  };

  const handleEditTimetableSlot = (slot: TimetableSlot) => {
    setEditingSlot(slot);
    setIsTimetableModalOpen(true);
  };

  const handleDeleteTimetableSlot = (id: string) => {
    setTimetable((prev) => prev.filter((s) => s.id !== id));
    showToast('Removed class slot from timetable');
  };

  const handleSaveTimetableSlot = (slotData: Omit<TimetableSlot, 'id'> & { id?: string }) => {
    if (slotData.id) {
      setTimetable((prev) =>
        prev.map((s) =>
          s.id === slotData.id
            ? {
                ...s,
                ...slotData,
              }
            : s
        )
      );
      showToast('Timetable slot updated');
    } else {
      const newSlot: TimetableSlot = {
        id: `tt-${Date.now()}`,
        ...slotData,
      };
      setTimetable((prev) => [...prev, newSlot]);
      showToast(`Scheduled ${newSlot.subject} for ${newSlot.day}`);
    }
  };

  const handleResetTimetable = () => {
    setTimetable(INITIAL_TIMETABLE);
    saveStoredTimetable(INITIAL_TIMETABLE);
    showToast('Restored default weekly college timetable');
  };

  const handleResetAllData = () => {
    const res = resetAllDataToDefault();
    setTasks(res.tasks);
    setTimetable(res.timetable);
    showToast('Reset all planner data to initial college template');
  };

  const pendingCount = tasks.filter((t) => !t.completed).length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenNewTask={handleOpenNewTask}
        onOpenCodeExport={() => setIsCodeExportOpen(true)}
        onResetData={handleResetAllData}
        pendingCount={pendingCount}
      />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'home' && (
          <HomeView
            tasks={tasks}
            timetable={timetable}
            studentName={studentName}
            onUpdateStudentName={handleUpdateStudentName}
            setActiveTab={setActiveTab}
            onOpenNewTask={handleOpenNewTask}
            onSelectSubjectFilter={(subj) => setSelectedSubjectFilter(subj)}
          />
        )}

        {activeTab === 'dashboard' && (
          <DashboardView
            tasks={tasks}
            timetable={timetable}
            onToggleTask={handleToggleTask}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
            onOpenNewTask={handleOpenNewTask}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'tasks' && (
          <TasksView
            tasks={tasks}
            onToggleTask={handleToggleTask}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
            onOpenNewTask={handleOpenNewTask}
            selectedSubjectFilter={selectedSubjectFilter}
            onSelectSubjectFilter={setSelectedSubjectFilter}
          />
        )}

        {activeTab === 'timetable' && (
          <TimetableView
            timetable={timetable}
            onAddSlot={handleOpenNewTimetableSlot}
            onEditSlot={handleEditTimetableSlot}
            onDeleteSlot={handleDeleteTimetableSlot}
            onResetTimetable={handleResetTimetable}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsView
            tasks={tasks}
            onSelectSubjectFilter={(subj) => {
              setSelectedSubjectFilter(subj);
              setActiveTab('tasks');
            }}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'timer' && (
          <FocusTimer />
        )}
      </main>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-slate-900 text-white text-xs sm:text-sm font-medium rounded-xl shadow-lg border border-slate-700 animate-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Task Modal */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSave={handleSaveTask}
        editingTask={editingTask}
      />

      {/* Timetable Modal */}
      <TimetableModal
        isOpen={isTimetableModalOpen}
        onClose={() => setIsTimetableModalOpen(false)}
        onSave={handleSaveTimetableSlot}
        editingSlot={editingSlot}
        defaultDay="Monday"
      />

      {/* Standalone HTML/CSS/JS Source Code Exporter */}
      <CodeExportModal
        isOpen={isCodeExportOpen}
        onClose={() => setIsCodeExportOpen(false)}
      />

      {/* Quiet Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800">StudyFlow</span>
            <span>—</span>
            <span>Student Study Planner Portfolio Project</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsCodeExportOpen(true)}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Get HTML/CSS/JS Source
            </button>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <button
              onClick={() => {
                if (window.confirm('Reset all tasks and timetable to default college schedule?')) {
                  handleResetAllData();
                }
              }}
              className="hover:text-slate-800 transition-colors flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Data</span>
            </button>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="font-mono tabular-nums">Local Storage Sync</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

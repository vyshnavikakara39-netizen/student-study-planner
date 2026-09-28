import React, { useState, useEffect } from 'react';
import { TimetableSlot, Subject, DayOfWeek, CORE_SUBJECTS, DAYS_OF_WEEK } from '../types';
import { X, AlertCircle } from 'lucide-react';

interface TimetableModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (slotData: Omit<TimetableSlot, 'id'> & { id?: string }) => void;
  editingSlot: TimetableSlot | null;
  defaultDay: DayOfWeek;
}

export const TimetableModal: React.FC<TimetableModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingSlot,
  defaultDay,
}) => {
  const [day, setDay] = useState<DayOfWeek>(defaultDay);
  const [subject, setSubject] = useState<Subject>('DSA');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:30');
  const [topic, setTopic] = useState('');
  const [room, setRoom] = useState('');
  const [type, setType] = useState<'Lecture' | 'Lab' | 'Self Study' | 'Revision'>('Lecture');
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingSlot) {
      setDay(editingSlot.day);
      setSubject(editingSlot.subject);
      setStartTime(editingSlot.startTime);
      setEndTime(editingSlot.endTime);
      setTopic(editingSlot.topic);
      setRoom(editingSlot.room || '');
      setType(editingSlot.type);
    } else {
      setDay(defaultDay);
      setSubject('DSA');
      setStartTime('09:00');
      setEndTime('10:30');
      setTopic('');
      setRoom('Hall 302');
      setType('Lecture');
    }
    setError('');
  }, [editingSlot, isOpen, defaultDay]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      setError('Please provide a class topic or title.');
      return;
    }

    if (startTime >= endTime) {
      setError('End time must be after start time.');
      return;
    }

    onSave({
      id: editingSlot?.id,
      day,
      subject,
      startTime,
      endTime,
      topic: topic.trim(),
      room: room.trim() || undefined,
      type,
    });

    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-md w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {editingSlot ? 'Edit Timetable Slot' : 'Add Timetable Class'}
            </h2>
            <p className="text-xs text-slate-500">
              Schedule a lecture, lab, or self-study period
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          {/* Day & Subject Row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Day *
              </label>
              <select
                value={day}
                onChange={(e) => setDay(e.target.value as DayOfWeek)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                {DAYS_OF_WEEK.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Subject *
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value as Subject)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                {CORE_SUBJECTS.map((subj) => (
                  <option key={subj} value={subj}>
                    {subj}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Time Row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Start Time *
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                End Time *
              </label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Topic / Class Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Topic / Chapter Name *
            </label>
            <input
              type="text"
              placeholder="e.g. Graph Algorithms & MST (Kruskal, Prim)"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Type & Room */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Session Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="Lecture">Lecture</option>
                <option value="Lab">Lab Session</option>
                <option value="Self Study">Self Study</option>
                <option value="Revision">Revision</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Room / Lab No.
              </label>
              <input
                type="text"
                placeholder="e.g. Hall 302 / Lab 2"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors"
            >
              {editingSlot ? 'Save Changes' : 'Add to Timetable'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

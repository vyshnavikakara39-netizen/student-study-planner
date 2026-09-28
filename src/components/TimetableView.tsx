import React, { useState } from 'react';
import { TimetableSlot, DayOfWeek, DAYS_OF_WEEK } from '../types';
import { getSubjectMeta } from '../utils/subjectStyles';
import { 
  Calendar, 
  Clock, 
  Plus, 
  MapPin, 
  Edit3, 
  Trash2, 
  RotateCcw,
  BookOpen,
  GraduationCap
} from 'lucide-react';

interface TimetableViewProps {
  timetable: TimetableSlot[];
  onAddSlot: () => void;
  onEditSlot: (slot: TimetableSlot) => void;
  onDeleteSlot: (id: string) => void;
  onResetTimetable: () => void;
}

export const TimetableView: React.FC<TimetableViewProps> = ({
  timetable,
  onAddSlot,
  onEditSlot,
  onDeleteSlot,
  onResetTimetable,
}) => {
  // Determine current day of week
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayName = days[new Date().getDay()] as DayOfWeek;

  const [selectedDay, setSelectedDay] = useState<DayOfWeek>(todayName);

  const activeSlots = timetable
    .filter((slot) => slot.day === selectedDay)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  const totalClassesForWeek = timetable.length;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Daily Timetable
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Your weekly schedule for lectures, computer labs, and designated study blocks.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onResetTimetable}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            title="Reset to default college schedule"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Load Sample Schedule</span>
          </button>

          <button
            onClick={onAddSlot}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Class Slot</span>
          </button>
        </div>
      </div>

      {/* Day Selector Tabs */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {DAYS_OF_WEEK.map((day) => {
            const isSelected = selectedDay === day;
            const isToday = todayName === day;
            const daySlotCount = timetable.filter((s) => s.day === day).length;

            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`flex-1 min-w-[100px] py-2.5 px-3 rounded-lg text-center transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-xs font-semibold'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium'
                }`}
              >
                <div className="text-xs uppercase tracking-wider mb-0.5 flex items-center justify-center gap-1">
                  <span>{day.substring(0, 3)}</span>
                  {isToday && (
                    <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-blue-400' : 'bg-blue-600'}`} />
                  )}
                </div>
                <div className="text-[11px] font-mono tabular-nums opacity-75">
                  {daySlotCount} {daySlotCount === 1 ? 'class' : 'classes'}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Day Schedule View */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <div className="flex items-center gap-2.5">
            <h2 className="text-lg font-bold text-slate-900">
              {selectedDay}'s Classes
            </h2>
            {todayName === selectedDay && (
              <span className="text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md">
                Today
              </span>
            )}
          </div>
          <span className="text-xs text-slate-500 font-mono tabular-nums">
            {activeSlots.length} sessions planned
          </span>
        </div>

        {activeSlots.length === 0 ? (
          <div className="py-16 text-center">
            <GraduationCap className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-slate-900 mb-1">
              No classes scheduled for {selectedDay}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto mb-5">
              Enjoy your free time, catch up on LeetCode questions, or add a study session.
            </p>
            <button
              onClick={onAddSlot}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Schedule Class for {selectedDay}</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {activeSlots.map((slot, index) => {
              const meta = getSubjectMeta(slot.subject);

              return (
                <div
                  key={slot.id}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-xs transition-all gap-4 bg-white"
                >
                  {/* Left: Time and Subject */}
                  <div className="flex items-start gap-4">
                    {/* Time block */}
                    <div className="w-28 shrink-0 text-left pt-0.5">
                      <div className="flex items-center gap-1.5 text-xs font-mono tabular-nums font-semibold text-slate-900">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{slot.startTime}</span>
                      </div>
                      <span className="text-[11px] font-mono tabular-nums text-slate-400 block pl-5">
                        to {slot.endTime}
                      </span>
                    </div>

                    {/* Class Details */}
                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span 
                          className="text-xs font-extrabold uppercase tracking-wider"
                          style={{ color: meta.colorHex }}
                        >
                          {slot.subject}
                        </span>
                        <span aria-hidden="true" className="text-slate-300">·</span>
                        <span className="text-xs font-medium text-slate-600">
                          {slot.type}
                        </span>
                        {slot.room && (
                          <>
                            <span aria-hidden="true" className="text-slate-300">·</span>
                            <span className="text-xs text-slate-500 flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-slate-400 inline" />
                              {slot.room}
                            </span>
                          </>
                        )}
                      </div>

                      <h3 className="text-sm sm:text-base font-semibold text-slate-900">
                        {slot.topic}
                      </h3>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 sm:self-center self-end border-t sm:border-t-0 pt-2 sm:pt-0 w-full sm:w-auto justify-end">
                    <button
                      onClick={() => onEditSlot(slot)}
                      className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                      title="Edit timetable slot"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteSlot(slot.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete slot"
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

      {/* Weekly Quick Overview Matrix */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
          Weekly Schedule Distribution
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {DAYS_OF_WEEK.map((day) => {
            const count = timetable.filter((s) => s.day === day).length;
            const isToday = todayName === day;
            return (
              <div 
                key={day} 
                onClick={() => setSelectedDay(day)}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  selectedDay === day 
                    ? 'bg-white border-blue-500 shadow-xs' 
                    : 'bg-white/80 border-slate-200 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>{day.substring(0, 3)}</span>
                  {isToday && <span className="text-[10px] text-blue-600 font-bold">TODAY</span>}
                </div>
                <div className="text-lg font-bold font-mono tabular-nums text-slate-900">
                  {count}
                </div>
                <div className="text-[11px] text-slate-400">
                  {count === 1 ? 'session' : 'sessions'}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

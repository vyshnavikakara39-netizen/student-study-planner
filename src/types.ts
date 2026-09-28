export type Subject = 
  | 'Java' 
  | 'DSA' 
  | 'SQL' 
  | 'DBMS' 
  | 'OS' 
  | 'Computer Networks'
  | 'Other';

export const CORE_SUBJECTS: Subject[] = [
  'Java',
  'DSA',
  'SQL',
  'DBMS',
  'OS',
  'Computer Networks',
];

export type Priority = 'low' | 'medium' | 'high';

export interface StudyTask {
  id: string;
  title: string;
  subject: Subject;
  dueDate: string; // YYYY-MM-DD
  priority: Priority;
  estimatedHours: number;
  notes?: string;
  completed: boolean;
  createdAt: string;
  completedAt?: string;
}

export type DayOfWeek = 
  | 'Monday' 
  | 'Tuesday' 
  | 'Wednesday' 
  | 'Thursday' 
  | 'Friday' 
  | 'Saturday' 
  | 'Sunday';

export const DAYS_OF_WEEK: DayOfWeek[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export interface TimetableSlot {
  id: string;
  day: DayOfWeek;
  startTime: string; // e.g. "09:00"
  endTime: string;   // e.g. "10:30"
  subject: Subject;
  topic: string;
  room?: string;
  type: 'Lecture' | 'Lab' | 'Self Study' | 'Revision';
}

export type ActiveTab = 'home' | 'dashboard' | 'tasks' | 'timetable' | 'analytics' | 'timer';

import { StudyTask, TimetableSlot } from '../types';
import { INITIAL_TASKS, INITIAL_TIMETABLE } from '../constants/initialData';

const TASKS_STORAGE_KEY = 'studyflow_tasks_v1';
const TIMETABLE_STORAGE_KEY = 'studyflow_timetable_v1';
const STUDENT_NAME_KEY = 'studyflow_student_name_v1';

export function getStoredTasks(): StudyTask[] {
  try {
    const data = localStorage.getItem(TASKS_STORAGE_KEY);
    if (!data) {
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(INITIAL_TASKS));
      return INITIAL_TASKS;
    }
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : INITIAL_TASKS;
  } catch (error) {
    console.error('Failed to read tasks from localStorage', error);
    return INITIAL_TASKS;
  }
}

export function saveStoredTasks(tasks: StudyTask[]): void {
  try {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Failed to save tasks to localStorage', error);
  }
}

export function getStoredTimetable(): TimetableSlot[] {
  try {
    const data = localStorage.getItem(TIMETABLE_STORAGE_KEY);
    if (!data) {
      localStorage.setItem(TIMETABLE_STORAGE_KEY, JSON.stringify(INITIAL_TIMETABLE));
      return INITIAL_TIMETABLE;
    }
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : INITIAL_TIMETABLE;
  } catch (error) {
    console.error('Failed to read timetable from localStorage', error);
    return INITIAL_TIMETABLE;
  }
}

export function saveStoredTimetable(slots: TimetableSlot[]): void {
  try {
    localStorage.setItem(TIMETABLE_STORAGE_KEY, JSON.stringify(slots));
  } catch (error) {
    console.error('Failed to save timetable to localStorage', error);
  }
}

export function getStoredStudentName(): string {
  try {
    return localStorage.getItem(STUDENT_NAME_KEY) || 'Alex Rivera';
  } catch {
    return 'Alex Rivera';
  }
}

export function saveStoredStudentName(name: string): void {
  try {
    localStorage.setItem(STUDENT_NAME_KEY, name);
  } catch (error) {
    console.error('Failed to save student name to localStorage', error);
  }
}

export function resetAllDataToDefault(): { tasks: StudyTask[]; timetable: TimetableSlot[] } {
  localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(INITIAL_TASKS));
  localStorage.setItem(TIMETABLE_STORAGE_KEY, JSON.stringify(INITIAL_TIMETABLE));
  return {
    tasks: INITIAL_TASKS,
    timetable: INITIAL_TIMETABLE,
  };
}

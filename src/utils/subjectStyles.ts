import { Subject } from '../types';

export interface SubjectMeta {
  name: Subject;
  shortCode: string;
  colorHex: string;
  textClass: string;
  borderClass: string;
  bgLightClass: string;
  description: string;
}

export const SUBJECT_METADATA: Record<Subject, SubjectMeta> = {
  'Java': {
    name: 'Java',
    shortCode: 'JAVA',
    colorHex: '#ea580c', // Orange-600
    textClass: 'text-orange-700 dark:text-orange-400',
    borderClass: 'border-orange-200 dark:border-orange-900/40',
    bgLightClass: 'bg-orange-50 dark:bg-orange-950/20',
    description: 'OOP, Collections, Threads, Generics & Core Java',
  },
  'DSA': {
    name: 'DSA',
    shortCode: 'DSA',
    colorHex: '#4f46e5', // Indigo-600
    textClass: 'text-indigo-700 dark:text-indigo-400',
    borderClass: 'border-indigo-200 dark:border-indigo-900/40',
    bgLightClass: 'bg-indigo-50 dark:bg-indigo-950/20',
    description: 'Arrays, Trees, Graphs, DP & Algorithmic Complexity',
  },
  'SQL': {
    name: 'SQL',
    shortCode: 'SQL',
    colorHex: '#059669', // Emerald-600
    textClass: 'text-emerald-700 dark:text-emerald-400',
    borderClass: 'border-emerald-200 dark:border-emerald-900/40',
    bgLightClass: 'bg-emerald-50 dark:bg-emerald-950/20',
    description: 'Queries, Joins, Triggers, Views & Optimization',
  },
  'DBMS': {
    name: 'DBMS',
    shortCode: 'DBMS',
    colorHex: '#0284c7', // Sky-600
    textClass: 'text-sky-700 dark:text-sky-400',
    borderClass: 'border-sky-200 dark:border-sky-900/40',
    bgLightClass: 'bg-sky-50 dark:bg-sky-950/20',
    description: 'ER Modeling, Relational Schema, Normalization & ACID',
  },
  'OS': {
    name: 'OS',
    shortCode: 'OS',
    colorHex: '#7c3aed', // Violet-600
    textClass: 'text-violet-700 dark:text-violet-400',
    borderClass: 'border-violet-200 dark:border-violet-900/40',
    bgLightClass: 'bg-violet-50 dark:bg-violet-950/20',
    description: 'Processes, CPU Scheduling, Deadlocks & Virtual Memory',
  },
  'Computer Networks': {
    name: 'Computer Networks',
    shortCode: 'CN',
    colorHex: '#0d9488', // Teal-600
    textClass: 'text-teal-700 dark:text-teal-400',
    borderClass: 'border-teal-200 dark:border-teal-900/40',
    bgLightClass: 'bg-teal-50 dark:bg-teal-950/20',
    description: 'OSI, TCP/IP, Routing Protocols, Sockets & Security',
  },
  'Other': {
    name: 'Other',
    shortCode: 'GEN',
    colorHex: '#64748b', // Slate-500
    textClass: 'text-slate-700 dark:text-slate-400',
    borderClass: 'border-slate-200 dark:border-slate-800',
    bgLightClass: 'bg-slate-50 dark:bg-slate-900/40',
    description: 'General Engineering & Electives',
  },
};

export function getSubjectMeta(subject: Subject): SubjectMeta {
  return SUBJECT_METADATA[subject] || SUBJECT_METADATA['Other'];
}

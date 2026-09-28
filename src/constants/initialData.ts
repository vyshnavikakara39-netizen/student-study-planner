import { StudyTask, TimetableSlot } from '../types';

// Helper to get formatted date string YYYY-MM-DD
export function getRelativeDate(offsetDays: number = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const INITIAL_TASKS: StudyTask[] = [
  {
    id: 'task-1',
    title: 'Solve Binary Tree Traversals & LCA Problems',
    subject: 'DSA',
    dueDate: getRelativeDate(0), // Today
    priority: 'high',
    estimatedHours: 2,
    notes: 'Focus on Inorder, Preorder, Postorder and Morris traversal. Implement in Java.',
    completed: true,
    createdAt: new Date().toISOString(),
    completedAt: new Date().toISOString(),
  },
  {
    id: 'task-2',
    title: 'Implement Multithreading & Synchronization in Java',
    subject: 'Java',
    dueDate: getRelativeDate(0), // Today
    priority: 'high',
    estimatedHours: 2.5,
    notes: 'Create Producer-Consumer problem using wait() and notifyAll().',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'task-3',
    title: 'Practice SQL Window Functions & Aggregations',
    subject: 'SQL',
    dueDate: getRelativeDate(0), // Today
    priority: 'medium',
    estimatedHours: 1.5,
    notes: 'Solve RANK(), DENSE_RANK(), and PARTITION BY queries on University schema.',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'task-4',
    title: 'Revise ACID Properties & Transaction States',
    subject: 'DBMS',
    dueDate: getRelativeDate(1), // Tomorrow
    priority: 'medium',
    estimatedHours: 1.5,
    notes: 'Understand serializability, two-phase locking (2PL) and log-based recovery.',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'task-5',
    title: 'Solve CPU Scheduling Numericals (Round Robin & SJF)',
    subject: 'OS',
    dueDate: getRelativeDate(2),
    priority: 'high',
    estimatedHours: 2,
    notes: 'Calculate average waiting time and turnaround time for preemptive cases.',
    completed: true,
    createdAt: new Date().toISOString(),
    completedAt: new Date().toISOString(),
  },
  {
    id: 'task-6',
    title: 'Trace TCP 3-Way Handshake and Subnetting IP Masking',
    subject: 'Computer Networks',
    dueDate: getRelativeDate(3),
    priority: 'medium',
    estimatedHours: 2,
    notes: 'Review Classless Inter-Domain Routing (CIDR) and packet headers.',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'task-7',
    title: 'Implement LRU Cache using Doubly Linked List & HashMap',
    subject: 'DSA',
    dueDate: getRelativeDate(4),
    priority: 'high',
    estimatedHours: 3,
    notes: 'Standard technical interview problem. Ensure O(1) get and put time complexity.',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'task-8',
    title: 'Prepare Java Collections Framework Cheat Sheet',
    subject: 'Java',
    dueDate: getRelativeDate(-1), // Yesterday / Done
    priority: 'low',
    estimatedHours: 1,
    notes: 'ArrayList vs LinkedList, HashSet vs TreeSet, HashMap vs ConcurrentHashMap.',
    completed: true,
    createdAt: new Date().toISOString(),
    completedAt: new Date().toISOString(),
  },
];

export const INITIAL_TIMETABLE: TimetableSlot[] = [
  // Monday
  {
    id: 'tt-1',
    day: 'Monday',
    startTime: '09:00',
    endTime: '10:15',
    subject: 'DSA',
    topic: 'Graph Algorithms & Minimum Spanning Trees',
    room: 'Hall 302',
    type: 'Lecture',
  },
  {
    id: 'tt-2',
    day: 'Monday',
    startTime: '10:30',
    endTime: '12:00',
    subject: 'Java',
    topic: 'Advanced OOP & Generics Workshop',
    room: 'Computer Lab 2',
    type: 'Lab',
  },
  {
    id: 'tt-3',
    day: 'Monday',
    startTime: '14:00',
    endTime: '15:30',
    subject: 'DBMS',
    topic: 'Relational Algebra & Normalization (1NF to BCNF)',
    room: 'Hall 204',
    type: 'Lecture',
  },

  // Tuesday
  {
    id: 'tt-4',
    day: 'Tuesday',
    startTime: '09:30',
    endTime: '11:00',
    subject: 'OS',
    topic: 'Deadlock Detection & Banker Algorithm',
    room: 'Hall 108',
    type: 'Lecture',
  },
  {
    id: 'tt-5',
    day: 'Tuesday',
    startTime: '11:30',
    endTime: '13:00',
    subject: 'SQL',
    topic: 'Stored Procedures & Triggers Hands-on',
    room: 'DB Lab 4',
    type: 'Lab',
  },
  {
    id: 'tt-6',
    day: 'Tuesday',
    startTime: '16:00',
    endTime: '17:30',
    subject: 'DSA',
    topic: 'Self-Paced LeetCode Practice',
    room: 'Library',
    type: 'Self Study',
  },

  // Wednesday
  {
    id: 'tt-7',
    day: 'Wednesday',
    startTime: '09:00',
    endTime: '10:30',
    subject: 'Computer Networks',
    topic: 'Data Link Layer & Error Detection (CRC, Hamming)',
    room: 'Hall 302',
    type: 'Lecture',
  },
  {
    id: 'tt-8',
    day: 'Wednesday',
    startTime: '11:00',
    endTime: '12:30',
    subject: 'Java',
    topic: 'Stream API & Lambda Expressions',
    room: 'Hall 105',
    type: 'Lecture',
  },
  {
    id: 'tt-9',
    day: 'Wednesday',
    startTime: '14:30',
    endTime: '16:00',
    subject: 'OS',
    topic: 'Virtual Memory & Page Replacement Simulations',
    room: 'OS Lab 1',
    type: 'Lab',
  },

  // Thursday
  {
    id: 'tt-10',
    day: 'Thursday',
    startTime: '10:00',
    endTime: '11:30',
    subject: 'SQL',
    topic: 'Query Optimization & Indexing Strategies',
    room: 'Hall 204',
    type: 'Lecture',
  },
  {
    id: 'tt-11',
    day: 'Thursday',
    startTime: '13:00',
    endTime: '14:30',
    subject: 'DSA',
    topic: 'Dynamic Programming Patterns',
    room: 'Hall 302',
    type: 'Lecture',
  },

  // Friday
  {
    id: 'tt-12',
    day: 'Friday',
    startTime: '09:00',
    endTime: '10:30',
    subject: 'Computer Networks',
    topic: 'Cisco Packet Tracer Lab & Routing Protocols',
    room: 'Networks Lab',
    type: 'Lab',
  },
  {
    id: 'tt-13',
    day: 'Friday',
    startTime: '11:00',
    endTime: '12:30',
    subject: 'DBMS',
    topic: 'NoSQL vs RDBMS & Cap Theorem',
    room: 'Hall 108',
    type: 'Lecture',
  },
  {
    id: 'tt-14',
    day: 'Friday',
    startTime: '15:00',
    endTime: '17:00',
    subject: 'Java',
    topic: 'Mini Project Coding Session',
    room: 'Lab 2',
    type: 'Self Study',
  },

  // Saturday
  {
    id: 'tt-15',
    day: 'Saturday',
    startTime: '10:00',
    endTime: '12:00',
    subject: 'DSA',
    topic: 'Weekly Contest & Mock Interview Practice',
    room: 'Study Room',
    type: 'Revision',
  },
  {
    id: 'tt-16',
    day: 'Saturday',
    startTime: '14:00',
    endTime: '16:00',
    subject: 'OS',
    topic: 'Operating Systems Gate Exam Question Solving',
    room: 'Study Room',
    type: 'Revision',
  },

  // Sunday
  {
    id: 'tt-17',
    day: 'Sunday',
    startTime: '10:30',
    endTime: '12:30',
    subject: 'Computer Networks',
    topic: 'Socket Programming & HTTP/HTTPS Protocols',
    room: 'Dorm Desk',
    type: 'Self Study',
  },
];

export const MOTIVATIONAL_QUOTES = [
  {
    quote: "Small daily improvements over time lead to stunning results in your coding journey.",
    author: "Robin Sharma",
  },
  {
    quote: "First, solve the problem. Then, write the code.",
    author: "John Johnson",
  },
  {
    quote: "Consistency is what transforms average into excellence.",
    author: "Unknown",
  },
  {
    quote: "Talk is cheap. Show me the code.",
    author: "Linus Torvalds",
  },
  {
    quote: "Success is the sum of small efforts, repeated day in and day out.",
    author: "Robert Collier",
  },
];

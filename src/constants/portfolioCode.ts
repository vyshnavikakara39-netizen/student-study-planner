// Standalone beginner-friendly HTML, CSS, and JavaScript code for college submissions

export const STANDALONE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Student Study Planner</title>
  <link rel="stylesheet" href="style.css">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
</head>
<body>
  <!-- Navigation Bar -->
  <header class="navbar">
    <div class="nav-container">
      <div class="brand">
        <span class="brand-icon">📚</span>
        <span class="brand-title">StudyFlow</span>
      </div>
      <nav class="nav-links">
        <button class="nav-btn active" data-tab="dashboard">Dashboard</button>
        <button class="nav-btn" data-tab="tasks">Tasks</button>
        <button class="nav-btn" data-tab="timetable">Timetable</button>
        <button class="nav-btn" data-tab="progress">Progress</button>
      </nav>
      <div class="nav-action">
        <button id="quick-add-btn" class="btn btn-primary">+ Add Task</button>
      </div>
    </div>
  </header>

  <!-- Main Container -->
  <main class="main-content">
    <!-- Welcome Header -->
    <section class="welcome-section">
      <div class="welcome-text">
        <h1 id="greeting-title">Welcome back, College Scholar! 🎓</h1>
        <p class="subtitle">Keep track of your Java, DSA, SQL, DBMS, OS & Computer Networks coursework.</p>
      </div>
      <div class="date-badge" id="current-date-badge"></div>
    </section>

    <!-- Tab 1: Dashboard -->
    <section id="tab-dashboard" class="tab-content active">
      <!-- Metric Cards -->
      <div class="stats-grid">
        <div class="stat-card">
          <span class="stat-label">Today's Progress</span>
          <div class="stat-value-group">
            <span class="stat-number tabular-nums" id="stat-today-pct">0%</span>
            <span class="stat-subtext" id="stat-today-ratio">0 of 0 completed</span>
          </div>
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" id="stat-today-bar" style="width: 0%"></div>
          </div>
        </div>

        <div class="stat-card">
          <span class="stat-label">Overall Completion</span>
          <div class="stat-value-group">
            <span class="stat-number tabular-nums" id="stat-overall-pct">0%</span>
            <span class="stat-subtext" id="stat-overall-ratio">0 of 0 tasks</span>
          </div>
          <div class="progress-bar-bg">
            <div class="progress-bar-fill accent" id="stat-overall-bar" style="width: 0%"></div>
          </div>
        </div>

        <div class="stat-card">
          <span class="stat-label">High Priority Due</span>
          <div class="stat-value-group">
            <span class="stat-number tabular-nums" id="stat-high-priority">0</span>
            <span class="stat-subtext">Immediate focus required</span>
          </div>
        </div>

        <div class="stat-card">
          <span class="stat-label">Classes Scheduled Today</span>
          <div class="stat-value-group">
            <span class="stat-number tabular-nums" id="stat-today-classes">0</span>
            <span class="stat-subtext" id="stat-current-day-label">Monday</span>
          </div>
        </div>
      </div>

      <!-- Dashboard 2-Column Section -->
      <div class="dashboard-split">
        <!-- Today's Tasks -->
        <div class="panel">
          <div class="panel-header">
            <h2>Today's Priority Tasks</h2>
            <button class="btn btn-outline btn-sm" onclick="switchTab('tasks')">View All</button>
          </div>
          <div id="today-task-list" class="task-list">
            <!-- Dynamic task items injected by JS -->
          </div>
        </div>

        <!-- Today's Schedule -->
        <div class="panel">
          <div class="panel-header">
            <h2>Today's Timetable</h2>
            <button class="btn btn-outline btn-sm" onclick="switchTab('timetable')">Full Timetable</button>
          </div>
          <div id="today-timetable-list" class="timetable-list">
            <!-- Dynamic schedule items injected by JS -->
          </div>
        </div>
      </div>
    </section>

    <!-- Tab 2: Task Management -->
    <section id="tab-tasks" class="tab-content">
      <div class="panel">
        <div class="panel-header flex-between">
          <div>
            <h2>Manage Study Tasks</h2>
            <p class="panel-subtitle">Create, update, and prioritize coursework across your core engineering subjects.</p>
          </div>
          <button id="open-task-modal-btn" class="btn btn-primary">+ Add New Task</button>
        </div>

        <!-- Filters & Search Toolbar -->
        <div class="filter-toolbar">
          <div class="search-box">
            <input type="text" id="task-search-input" placeholder="Search tasks by title or notes..." autocomplete="off">
          </div>
          <div class="filter-group">
            <select id="filter-subject" class="select-input">
              <option value="ALL">All Subjects</option>
              <option value="Java">Java</option>
              <option value="DSA">DSA</option>
              <option value="SQL">SQL</option>
              <option value="DBMS">DBMS</option>
              <option value="OS">OS</option>
              <option value="Computer Networks">Computer Networks</option>
            </select>

            <select id="filter-status" class="select-input">
              <option value="ALL">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="COMPLETED">Completed</option>
            </select>

            <select id="filter-priority" class="select-input">
              <option value="ALL">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
          </div>
        </div>

        <!-- Full Task List -->
        <div id="all-tasks-list" class="task-list full-list">
          <!-- Injected dynamically -->
        </div>
      </div>
    </section>

    <!-- Tab 3: Daily Timetable -->
    <section id="tab-timetable" class="tab-content">
      <div class="panel">
        <div class="panel-header flex-between">
          <div>
            <h2>Daily College Timetable</h2>
            <p class="panel-subtitle">Weekly lecture, lab, and self-study schedule.</p>
          </div>
          <button id="open-timetable-modal-btn" class="btn btn-primary">+ Add Class Slot</button>
        </div>

        <!-- Day Selector Buttons -->
        <div class="day-selector" id="day-selector-group">
          <button class="day-btn" data-day="Monday">Monday</button>
          <button class="day-btn" data-day="Tuesday">Tuesday</button>
          <button class="day-btn" data-day="Wednesday">Wednesday</button>
          <button class="day-btn" data-day="Thursday">Thursday</button>
          <button class="day-btn" data-day="Friday">Friday</button>
          <button class="day-btn" data-day="Saturday">Saturday</button>
          <button class="day-btn" data-day="Sunday">Sunday</button>
        </div>

        <!-- Timetable Slots for Selected Day -->
        <div id="active-day-timetable" class="timetable-slot-container">
          <!-- Injected dynamically -->
        </div>
      </div>
    </section>

    <!-- Tab 4: Progress & Subject Breakdown -->
    <section id="tab-progress" class="tab-content">
      <div class="panel">
        <div class="panel-header">
          <h2>Subject Progress & Analytics</h2>
          <p class="panel-subtitle">Monitor syllabus completion across your 6 key technical subjects.</p>
        </div>
        <div id="subject-progress-grid" class="subject-progress-grid">
          <!-- Injected dynamically -->
        </div>
      </div>
    </section>
  </main>

  <!-- Modal: Add / Edit Task -->
  <div id="task-modal" class="modal-backdrop hidden">
    <div class="modal-card">
      <div class="modal-header">
        <h3 id="modal-task-title">Add Study Task</h3>
        <button id="close-task-modal-btn" class="btn-close">&times;</button>
      </div>
      <form id="task-form">
        <input type="hidden" id="edit-task-id">
        <div class="form-group">
          <label for="task-title-input">Task Title *</label>
          <input type="text" id="task-title-input" placeholder="e.g. Implement Binary Search Tree in Java" required>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="task-subject-select">Subject *</label>
            <select id="task-subject-select" required>
              <option value="Java">Java</option>
              <option value="DSA">DSA</option>
              <option value="SQL">SQL</option>
              <option value="DBMS">DBMS</option>
              <option value="OS">OS</option>
              <option value="Computer Networks">Computer Networks</option>
            </select>
          </div>
          <div class="form-group">
            <label for="task-priority-select">Priority *</label>
            <select id="task-priority-select">
              <option value="high">High</option>
              <option value="medium" selected>Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="task-due-date-input">Due Date *</label>
            <input type="date" id="task-due-date-input" required>
          </div>
          <div class="form-group">
            <label for="task-hours-input">Estimated Hours</label>
            <input type="number" id="task-hours-input" min="0.5" step="0.5" value="1.5">
          </div>
        </div>
        <div class="form-group">
          <label for="task-notes-input">Study Notes / Topics</label>
          <textarea id="task-notes-input" rows="3" placeholder="Key concepts, page numbers, problem links..."></textarea>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline" id="cancel-task-btn">Cancel</button>
          <button type="submit" class="btn btn-primary" id="save-task-btn">Save Task</button>
        </div>
      </form>
    </div>
  </div>

  <!-- JavaScript -->
  <script src="app.js"></script>
</body>
</html>`;

export const STANDALONE_CSS = `/* ========================================================
   Student Study Planner - Clean Responsive CSS
   ======================================================== */

:root {
  --font-sans: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* 60-30-10 Palette */
  --bg-main: #f8fafc;
  --bg-surface: #ffffff;
  --bg-subtle: #f1f5f9;
  --border-color: #e2e8f0;
  --border-subtle: #cbd5e1;

  --text-primary: #0f172a;
  --text-secondary: #475569;
  --text-muted: #64748b;

  --accent-primary: #2563eb;
  --accent-hover: #1d4ed8;
  --success: #16a34a;
  --warning: #d97706;
  --danger: #dc2626;

  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.07);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-sans);
  background-color: var(--bg-main);
  color: var(--text-primary);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

.tabular-nums {
  font-variant-numeric: tabular-nums;
  font-family: var(--font-mono);
}

/* Navbar */
.navbar {
  background: var(--bg-surface);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 50;
}

.nav-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0.85rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.brand-icon {
  font-size: 1.25rem;
}

.brand-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.02em;
}

.nav-links {
  display: flex;
  gap: 0.5rem;
  background: var(--bg-subtle);
  padding: 0.25rem;
  border-radius: var(--radius-md);
}

.nav-btn {
  background: none;
  border: none;
  font-family: var(--font-sans);
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.45rem 1rem;
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.15s ease;
}

.nav-btn:hover {
  color: var(--text-primary);
}

.nav-btn.active {
  background: var(--bg-surface);
  color: var(--text-primary);
  box-shadow: var(--shadow-sm);
  font-weight: 600;
}

/* Buttons */
.btn {
  font-family: var(--font-sans);
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-md);
  cursor: pointer;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.15s ease;
}

.btn-primary {
  background: var(--accent-primary);
  color: #ffffff;
}

.btn-primary:hover {
  background: var(--accent-hover);
}

.btn-outline {
  background: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
}

.btn-outline:hover {
  background: var(--bg-subtle);
  color: var(--text-primary);
}

.btn-sm {
  padding: 0.35rem 0.75rem;
  font-size: 0.8rem;
}

/* Main Content */
.main-content {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.welcome-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.welcome-text h1 {
  font-size: 1.65rem;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.02em;
}

.subtitle {
  color: var(--text-muted);
  font-size: 0.95rem;
  margin-top: 0.25rem;
}

.date-badge {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-secondary);
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  padding: 0.4rem 0.85rem;
  border-radius: var(--radius-md);
}

/* Tab Management */
.tab-content {
  display: none;
}

.tab-content.active {
  display: block;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.25rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 1.25rem;
  box-shadow: var(--shadow-sm);
}

.stat-label {
  font-size: 0.8rem;
  color: var(--text-muted);
  font-weight: 500;
  display: block;
  margin-bottom: 0.4rem;
}

.stat-value-group {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.stat-number {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-primary);
}

.stat-subtext {
  font-size: 0.8rem;
  color: var(--text-muted);
}

.progress-bar-bg {
  width: 100%;
  height: 6px;
  background: var(--bg-subtle);
  border-radius: 999px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background: var(--success);
  border-radius: 999px;
  transition: width 0.3s ease;
}

.progress-bar-fill.accent {
  background: var(--accent-primary);
}

/* Panels */
.panel {
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
  margin-bottom: 1.5rem;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
}

.panel-header h2 {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-primary);
}

.panel-subtitle {
  font-size: 0.875rem;
  color: var(--text-muted);
  margin-top: 0.2rem;
}

.dashboard-split {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 1.5rem;
}

/* Tasks */
.task-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.task-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  transition: all 0.15s ease;
}

.task-item:hover {
  border-color: var(--border-subtle);
  box-shadow: var(--shadow-sm);
}

.task-item.completed {
  opacity: 0.7;
  background: var(--bg-subtle);
}

.task-item.completed .task-title {
  text-decoration: line-through;
  color: var(--text-muted);
}

.task-checkbox {
  width: 1.15rem;
  height: 1.15rem;
  cursor: pointer;
  margin-top: 0.2rem;
  accent-color: var(--accent-primary);
}

.task-content {
  flex: 1;
}

.task-header-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
  flex-wrap: wrap;
}

.task-subject {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--accent-primary);
}

.task-priority {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--text-muted);
}

.task-priority.high { color: var(--danger); font-weight: 600; }
.task-priority.medium { color: var(--warning); }
.task-priority.low { color: var(--success); }

.task-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-primary);
}

.task-notes {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-top: 0.25rem;
}

.task-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: var(--text-muted);
}

.task-actions {
  display: flex;
  gap: 0.35rem;
}

.btn-icon {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-sm);
  color: var(--text-muted);
  font-size: 0.9rem;
}

.btn-icon:hover {
  background: var(--bg-subtle);
  color: var(--text-primary);
}

.btn-icon.delete:hover {
  color: var(--danger);
}

/* Toolbar */
.filter-toolbar {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.search-box {
  flex: 1;
  min-width: 240px;
}

.search-box input, .select-input {
  width: 100%;
  padding: 0.55rem 0.85rem;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background: var(--bg-surface);
  font-family: var(--font-sans);
  font-size: 0.875rem;
  color: var(--text-primary);
}

.filter-group {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

/* Timetable */
.day-selector {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  margin-bottom: 1.25rem;
}

.day-btn {
  background: var(--bg-subtle);
  border: 1px solid var(--border-color);
  padding: 0.45rem 1rem;
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  font-family: var(--font-sans);
}

.day-btn.active {
  background: var(--text-primary);
  color: #ffffff;
  border-color: var(--text-primary);
}

.timetable-list, .timetable-slot-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.schedule-card {
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 1rem;
  background: var(--bg-surface);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.schedule-time {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-muted);
}

.schedule-subject {
  font-weight: 700;
  color: var(--text-primary);
  font-size: 1rem;
}

.schedule-topic {
  font-size: 0.85rem;
  color: var(--text-secondary);
}

/* Subject Progress Grid */
.subject-progress-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}

.subject-card {
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 1.25rem;
  background: var(--bg-surface);
}

.subject-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.subject-title {
  font-weight: 700;
  font-size: 1.05rem;
}

/* Modal */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: 100;
}

.modal-backdrop.hidden {
  display: none;
}

.modal-card {
  background: var(--bg-surface);
  border-radius: var(--radius-lg);
  width: 100%;
  max-width: 520px;
  padding: 1.5rem;
  box-shadow: var(--shadow-md);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
}

.modal-header h3 {
  font-size: 1.2rem;
  font-weight: 600;
}

.btn-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--text-muted);
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 0.35rem;
}

.form-group input, .form-group select, .form-group textarea {
  width: 100%;
  padding: 0.55rem 0.85rem;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-family: var(--font-sans);
  font-size: 0.875rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

/* Responsive */
@media (max-width: 900px) {
  .dashboard-split {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .nav-links {
    display: none;
  }
  .form-row {
    grid-template-columns: 1fr;
  }
}
`;

export const STANDALONE_JS = `/* ========================================================
   Student Study Planner - Core JavaScript (app.js)
   Covers: Add, Edit, Delete, Toggle Complete, Filters,
   Daily Timetable, Subject Progress, LocalStorage
   ======================================================== */

// Subject definitions
const CORE_SUBJECTS = ['Java', 'DSA', 'SQL', 'DBMS', 'OS', 'Computer Networks'];

// Initial sample data
const DEFAULT_TASKS = [
  {
    id: 't-1',
    title: 'Solve Binary Tree Traversals & LCA',
    subject: 'DSA',
    priority: 'high',
    dueDate: new Date().toISOString().split('T')[0],
    estimatedHours: 2,
    notes: 'Inorder, Preorder, Postorder & iterative implementations.',
    completed: true
  },
  {
    id: 't-2',
    title: 'Java Multithreading & Synchronization Project',
    subject: 'Java',
    priority: 'high',
    dueDate: new Date().toISOString().split('T')[0],
    estimatedHours: 2.5,
    notes: 'Producer-Consumer problem with wait() and notify().',
    completed: false
  },
  {
    id: 't-3',
    title: 'SQL Window Functions & Aggregations',
    subject: 'SQL',
    priority: 'medium',
    dueDate: new Date().toISOString().split('T')[0],
    estimatedHours: 1.5,
    notes: 'RANK(), DENSE_RANK() practice questions.',
    completed: false
  },
  {
    id: 't-4',
    title: 'ACID Properties & Transaction States in DBMS',
    subject: 'DBMS',
    priority: 'medium',
    dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    estimatedHours: 1.5,
    notes: 'Serializability, 2-Phase Locking (2PL).',
    completed: false
  },
  {
    id: 't-5',
    title: 'CPU Scheduling Algorithms Numericals',
    subject: 'OS',
    priority: 'high',
    dueDate: new Date(Date.now() + 172800000).toISOString().split('T')[0],
    estimatedHours: 2,
    notes: 'Round Robin, SJF preemptive calculations.',
    completed: true
  },
  {
    id: 't-6',
    title: 'TCP 3-Way Handshake & Subnetting CIDR',
    subject: 'Computer Networks',
    priority: 'medium',
    dueDate: new Date(Date.now() + 259200000).toISOString().split('T')[0],
    estimatedHours: 2,
    notes: 'Packet tracer analysis and layer protocols.',
    completed: false
  }
];

const DEFAULT_TIMETABLE = [
  { id: 'tt-1', day: 'Monday', startTime: '09:00', endTime: '10:15', subject: 'DSA', topic: 'Graphs & MST', room: 'Hall 302', type: 'Lecture' },
  { id: 'tt-2', day: 'Monday', startTime: '10:30', endTime: '12:00', subject: 'Java', topic: 'OOP Lab', room: 'Lab 2', type: 'Lab' },
  { id: 'tt-3', day: 'Tuesday', startTime: '09:30', endTime: '11:00', subject: 'OS', topic: 'Banker Algorithm', room: 'Hall 108', type: 'Lecture' },
  { id: 'tt-4', day: 'Tuesday', startTime: '11:30', endTime: '13:00', subject: 'SQL', topic: 'Queries & Triggers', room: 'Lab 4', type: 'Lab' },
  { id: 'tt-5', day: 'Wednesday', startTime: '09:00', endTime: '10:30', subject: 'Computer Networks', topic: 'Data Link Layer', room: 'Hall 302', type: 'Lecture' },
  { id: 'tt-6', day: 'Thursday', startTime: '10:00', endTime: '11:30', subject: 'DBMS', topic: 'Normalization BCNF', room: 'Hall 204', type: 'Lecture' },
  { id: 'tt-7', day: 'Friday', startTime: '09:00', endTime: '10:30', subject: 'Computer Networks', topic: 'Packet Tracer Lab', room: 'Networks Lab', type: 'Lab' }
];

// App State
let tasks = [];
let timetable = [];
let activeDay = 'Monday';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  setupEventListeners();
  renderDateBadge();
  renderAllViews();
});

// Load from LocalStorage
function loadData() {
  const savedTasks = localStorage.getItem('studyflow_tasks');
  tasks = savedTasks ? JSON.parse(savedTasks) : DEFAULT_TASKS;

  const savedTimetable = localStorage.getItem('studyflow_timetable');
  timetable = savedTimetable ? JSON.parse(savedTimetable) : DEFAULT_TIMETABLE;

  // Set today's day of week
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = days[new Date().getDay()];
  activeDay = (today === 'Sunday' || today === 'Saturday') ? 'Monday' : today;
}

// Save to LocalStorage
function saveData() {
  localStorage.setItem('studyflow_tasks', JSON.stringify(tasks));
  localStorage.setItem('studyflow_timetable', JSON.stringify(timetable));
}

// Navigation & Tab Switching
function switchTab(tabName) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));

  const targetTab = document.getElementById(\`tab-\${tabName}\`);
  const targetBtn = document.querySelector(\`[data-tab="\${tabName}"]\`);

  if (targetTab) targetTab.classList.add('active');
  if (targetBtn) targetBtn.classList.add('active');
}

// Event Listeners
function setupEventListeners() {
  // Nav buttons
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      switchTab(e.target.dataset.tab);
    });
  });

  // Quick Add Button
  document.getElementById('quick-add-btn').addEventListener('click', () => openTaskModal());
  document.getElementById('open-task-modal-btn').addEventListener('click', () => openTaskModal());
  document.getElementById('close-task-modal-btn').addEventListener('click', closeTaskModal);
  document.getElementById('cancel-task-btn').addEventListener('click', closeTaskModal);

  // Task Form Submit
  document.getElementById('task-form').addEventListener('submit', handleTaskFormSubmit);

  // Filter Listeners
  document.getElementById('task-search-input').addEventListener('input', renderTasksList);
  document.getElementById('filter-subject').addEventListener('change', renderTasksList);
  document.getElementById('filter-status').addEventListener('change', renderTasksList);
  document.getElementById('filter-priority').addEventListener('change', renderTasksList);

  // Day selector for timetable
  document.querySelectorAll('.day-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.day-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      activeDay = e.target.dataset.day;
      renderTimetable();
    });
  });
}

function renderDateBadge() {
  const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
  const formatted = new Date().toLocaleDateString(undefined, options);
  document.getElementById('current-date-badge').innerText = formatted;
}

// Render All Views
function renderAllViews() {
  renderStats();
  renderTodayTasks();
  renderTodaySchedule();
  renderTasksList();
  renderTimetable();
  renderSubjectProgress();
}

// Calculate Progress Metrics
function renderStats() {
  const todayStr = new Date().toISOString().split('T')[0];
  const todayTasks = tasks.filter(t => t.dueDate === todayStr);
  const todayCompleted = todayTasks.filter(t => t.completed).length;
  const todayPct = todayTasks.length > 0 ? Math.round((todayCompleted / todayTasks.length) * 100) : 0;

  document.getElementById('stat-today-pct').innerText = \`\${todayPct}%\`;
  document.getElementById('stat-today-ratio').innerText = \`\${todayCompleted} of \${todayTasks.length} completed\`;
  document.getElementById('stat-today-bar').style.width = \`\${todayPct}%\`;

  const totalCompleted = tasks.filter(t => t.completed).length;
  const overallPct = tasks.length > 0 ? Math.round((totalCompleted / tasks.length) * 100) : 0;

  document.getElementById('stat-overall-pct').innerText = \`\${overallPct}%\`;
  document.getElementById('stat-overall-ratio').innerText = \`\${totalCompleted} of \${tasks.length} total\`;
  document.getElementById('stat-overall-bar').style.width = \`\${overallPct}%\`;

  const highPriorityPending = tasks.filter(t => t.priority === 'high' && !t.completed).length;
  document.getElementById('stat-high-priority').innerText = highPriorityPending;

  const todaySlots = timetable.filter(s => s.day === activeDay);
  document.getElementById('stat-today-classes').innerText = todaySlots.length;
  document.getElementById('stat-current-day-label').innerText = activeDay;
}

// Render Today's Tasks in Dashboard
function renderTodayTasks() {
  const container = document.getElementById('today-task-list');
  const todayStr = new Date().toISOString().split('T')[0];
  const todayTasks = tasks.filter(t => t.dueDate === todayStr);

  if (todayTasks.length === 0) {
    container.innerHTML = '<p class="text-muted" style="padding: 1rem; text-align: center;">No tasks scheduled for today. Great job or add a task!</p>';
    return;
  }

  container.innerHTML = todayTasks.map(task => \`
    <div class="task-item \${task.completed ? 'completed' : ''}">
      <input type="checkbox" class="task-checkbox" \${task.completed ? 'checked' : ''} onchange="toggleTask('\${task.id}')">
      <div class="task-content">
        <div class="task-header-row">
          <span class="task-subject">\${task.subject}</span>
          <span class="task-priority \${task.priority}">· \${task.priority.toUpperCase()}</span>
        </div>
        <div class="task-title">\${task.title}</div>
        \${task.notes ? \`<div class="task-notes">\${task.notes}</div>\` : ''}
      </div>
    </div>
  \`).join('');
}

// Render Today's Timetable in Dashboard
function renderTodaySchedule() {
  const container = document.getElementById('today-timetable-list');
  const slots = timetable.filter(s => s.day === activeDay);

  if (slots.length === 0) {
    container.innerHTML = '<p class="text-muted" style="padding: 1rem; text-align: center;">No classes scheduled for today.</p>';
    return;
  }

  container.innerHTML = slots.map(slot => \`
    <div class="schedule-card">
      <div>
        <div class="schedule-subject">\${slot.subject}</div>
        <div class="schedule-topic">\${slot.topic} \${slot.room ? '· ' + slot.room : ''}</div>
      </div>
      <div class="schedule-time">\${slot.startTime} - \${slot.endTime}</div>
    </div>
  \`).join('');
}

// Render Tasks Tab with Search & Filters
function renderTasksList() {
  const container = document.getElementById('all-tasks-list');
  const searchVal = document.getElementById('task-search-input').value.toLowerCase();
  const subjectVal = document.getElementById('filter-subject').value;
  const statusVal = document.getElementById('filter-status').value;
  const priorityVal = document.getElementById('filter-priority').value;

  const filtered = tasks.filter(t => {
    const matchSearch = t.title.toLowerCase().includes(searchVal) || (t.notes && t.notes.toLowerCase().includes(searchVal));
    const matchSubject = subjectVal === 'ALL' || t.subject === subjectVal;
    const matchStatus = statusVal === 'ALL' || (statusVal === 'COMPLETED' ? t.completed : !t.completed);
    const matchPriority = priorityVal === 'ALL' || t.priority === priorityVal;
    return matchSearch && matchSubject && matchStatus && matchPriority;
  });

  if (filtered.length === 0) {
    container.innerHTML = '<p class="text-muted" style="padding: 2rem; text-align: center;">No tasks match your filters.</p>';
    return;
  }

  container.innerHTML = filtered.map(task => \`
    <div class="task-item \${task.completed ? 'completed' : ''}">
      <input type="checkbox" class="task-checkbox" \${task.completed ? 'checked' : ''} onchange="toggleTask('\${task.id}')">
      <div class="task-content">
        <div class="task-header-row">
          <span class="task-subject">\${task.subject}</span>
          <span class="task-priority \${task.priority}">· \${task.priority.toUpperCase()}</span>
          <span class="stat-subtext">· Due: \${task.dueDate}</span>
        </div>
        <div class="task-title">\${task.title}</div>
        \${task.notes ? \`<div class="task-notes">\${task.notes}</div>\` : ''}
      </div>
      <div class="task-actions">
        <button class="btn-icon" onclick="openTaskModal('\${task.id}')" title="Edit">✏️</button>
        <button class="btn-icon delete" onclick="deleteTask('\${task.id}')" title="Delete">🗑️</button>
      </div>
    </div>
  \`).join('');
}

// Render Timetable Tab
function renderTimetable() {
  const container = document.getElementById('active-day-timetable');
  const slots = timetable.filter(s => s.day === activeDay);

  // Update active day button
  document.querySelectorAll('.day-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.day === activeDay);
  });

  if (slots.length === 0) {
    container.innerHTML = \`<p class="text-muted" style="padding: 2rem; text-align: center;">No schedule added for \${activeDay}.</p>\`;
    return;
  }

  container.innerHTML = slots.map(slot => \`
    <div class="schedule-card">
      <div>
        <div class="schedule-subject">\${slot.subject} (\${slot.type})</div>
        <div class="schedule-topic">\${slot.topic} \${slot.room ? '· ' + slot.room : ''}</div>
      </div>
      <div class="schedule-time">\${slot.startTime} - \${slot.endTime}</div>
    </div>
  \`).join('');
}

// Render Subject Progress
function renderSubjectProgress() {
  const container = document.getElementById('subject-progress-grid');

  container.innerHTML = CORE_SUBJECTS.map(subj => {
    const subjTasks = tasks.filter(t => t.subject === subj);
    const completed = subjTasks.filter(t => t.completed).length;
    const total = subjTasks.length;
    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

    return \`
      <div class="subject-card">
        <div class="subject-card-header">
          <span class="subject-title">\${subj}</span>
          <span class="stat-number tabular-nums" style="font-size: 1.25rem;">\${pct}%</span>
        </div>
        <div class="progress-bar-bg" style="margin-bottom: 0.5rem;">
          <div class="progress-bar-fill accent" style="width: \${pct}%"></div>
        </div>
        <div class="stat-subtext">\${completed} of \${total} tasks completed</div>
      </div>
    \`;
  }).join('');
}

// Task CRUD Operations
function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    saveData();
    renderAllViews();
  }
}

function deleteTask(id) {
  if (confirm('Are you sure you want to delete this task?')) {
    tasks = tasks.filter(t => t.id !== id);
    saveData();
    renderAllViews();
  }
}

function openTaskModal(editId = null) {
  const modal = document.getElementById('task-modal');
  const form = document.getElementById('task-form');

  if (editId) {
    const task = tasks.find(t => t.id === editId);
    if (!task) return;
    document.getElementById('modal-task-title').innerText = 'Edit Study Task';
    document.getElementById('edit-task-id').value = task.id;
    document.getElementById('task-title-input').value = task.title;
    document.getElementById('task-subject-select').value = task.subject;
    document.getElementById('task-priority-select').value = task.priority;
    document.getElementById('task-due-date-input').value = task.dueDate;
    document.getElementById('task-hours-input').value = task.estimatedHours || 1.5;
    document.getElementById('task-notes-input').value = task.notes || '';
  } else {
    document.getElementById('modal-task-title').innerText = 'Add Study Task';
    form.reset();
    document.getElementById('edit-task-id').value = '';
    document.getElementById('task-due-date-input').value = new Date().toISOString().split('T')[0];
  }

  modal.classList.remove('hidden');
}

function closeTaskModal() {
  document.getElementById('task-modal').classList.add('hidden');
}

function handleTaskFormSubmit(e) {
  e.preventDefault();
  const editId = document.getElementById('edit-task-id').value;
  const title = document.getElementById('task-title-input').value.trim();
  const subject = document.getElementById('task-subject-select').value;
  const priority = document.getElementById('task-priority-select').value;
  const dueDate = document.getElementById('task-due-date-input').value;
  const estimatedHours = parseFloat(document.getElementById('task-hours-input').value) || 1.5;
  const notes = document.getElementById('task-notes-input').value.trim();

  if (editId) {
    // Update existing
    tasks = tasks.map(t => t.id === editId ? {
      ...t,
      title,
      subject,
      priority,
      dueDate,
      estimatedHours,
      notes
    } : t);
  } else {
    // Create new
    const newTask = {
      id: 'task-' + Date.now(),
      title,
      subject,
      priority,
      dueDate,
      estimatedHours,
      notes,
      completed: false
    };
    tasks.unshift(newTask);
  }

  saveData();
  closeTaskModal();
  renderAllViews();
}
`;

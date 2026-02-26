/**
 * Creates a new task object.
 * @param {string} title - The task title.
 * @returns {{ id: string, title: string, completed: boolean, createdAt: string }}
 */
export function createTask(title) {
  return {
    id: crypto.randomUUID(),
    title: title.trim(),
    completed: false,
    createdAt: new Date().toISOString(),
  };
}

/**
 * Toggles the completed status of a task.
 * @param {Array} tasks - The current tasks array.
 * @param {string} id - The task id to toggle.
 * @returns {Array} New array with the toggled task.
 */
export function toggleTask(tasks, id) {
  return tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task,
  );
}

/**
 * Deletes a task by id.
 * @param {Array} tasks - The current tasks array.
 * @param {string} id - The task id to delete.
 * @returns {Array} New array without the deleted task.
 */
export function deleteTask(tasks, id) {
  return tasks.filter((task) => task.id !== id);
}

/**
 * Filters tasks by status.
 * @param {Array} tasks - The tasks to filter.
 * @param {'all' | 'active' | 'completed'} filter - The filter to apply.
 * @returns {Array} Filtered tasks.
 */
export function filterTasks(tasks, filter) {
  switch (filter) {
    case 'active':
      return tasks.filter((task) => !task.completed);
    case 'completed':
      return tasks.filter((task) => task.completed);
    case 'all':
    default:
      return tasks;
  }
}

/**
 * Returns the count of active (incomplete) tasks.
 * @param {Array} tasks - The tasks array.
 * @returns {number}
 */
export function getActiveCount(tasks) {
  return tasks.filter((task) => !task.completed).length;
}

const STORAGE_KEY = 'taskflow-tasks';

/**
 * Saves tasks to localStorage.
 * @param {Array} tasks
 */
export function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

/**
 * Loads tasks from localStorage.
 * @returns {Array}
 */
export function loadTasks() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

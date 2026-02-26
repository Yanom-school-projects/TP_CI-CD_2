import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  createTask,
  toggleTask,
  deleteTask,
  filterTasks,
  getActiveCount,
  saveTasks,
  loadTasks,
} from '../taskHelpers';

describe('createTask', () => {
  it('creates a task with the given title', () => {
    const title = 'Buy groceries';

    const task = createTask(title);

    expect(task.title).toBe('Buy groceries');
  });

  it('trims whitespace from the title', () => {
    const title = '  Buy groceries  ';

    const task = createTask(title);

    expect(task.title).toBe('Buy groceries');
  });

  it('creates a task that is not completed by default', () => {
    const title = 'Buy groceries';

    const task = createTask(title);

    expect(task.completed).toBe(false);
  });

  it('creates a task with a unique id', () => {
    const task1 = createTask('Task 1');
    const task2 = createTask('Task 2');

    expect(task1.id).not.toBe(task2.id);
  });

  it('creates a task with a valid createdAt timestamp', () => {
    const title = 'Buy groceries';

    const task = createTask(title);

    expect(task.createdAt).toBeDefined();
    expect(new Date(task.createdAt).getTime()).not.toBeNaN();
  });
});

describe('toggleTask', () => {
  it('toggles a task from incomplete to complete', () => {
    const tasks = [
      { id: '1', title: 'Task 1', completed: false },
      { id: '2', title: 'Task 2', completed: false },
    ];

    const result = toggleTask(tasks, '1');

    expect(result.find((t) => t.id === '1').completed).toBe(true);
  });

  it('toggles a task from complete to incomplete', () => {
    const tasks = [
      { id: '1', title: 'Task 1', completed: true },
      { id: '2', title: 'Task 2', completed: false },
    ];

    const result = toggleTask(tasks, '1');

    expect(result.find((t) => t.id === '1').completed).toBe(false);
  });

  it('does not modify other tasks', () => {
    const tasks = [
      { id: '1', title: 'Task 1', completed: false },
      { id: '2', title: 'Task 2', completed: true },
      { id: '3', title: 'Task 3', completed: false },
    ];

    const result = toggleTask(tasks, '1');

    expect(result.find((t) => t.id === '2').completed).toBe(true);
    expect(result.find((t) => t.id === '3').completed).toBe(false);
  });

  it('returns a new array (immutability)', () => {
    const tasks = [{ id: '1', title: 'Task 1', completed: false }];

    const result = toggleTask(tasks, '1');

    expect(result).not.toBe(tasks);
  });
});

 describe('deleteTask', () => {
  it('removes the task with the given id', () => {
    const tasks = [
      { id: '1', title: 'Task 1', completed: false },
      { id: '2', title: 'Task 2', completed: true },
    ];

    const result = deleteTask(tasks, '1');

    expect(result).toHaveLength(1);
    expect(result.find((t) => t.id === '1')).toBeUndefined();
  });

 it('keeps other tasks unchanged', () => {
    const tasks = [
      { id: '1', title: 'Task 1', completed: false },
      { id: '2', title: 'Task 2', completed: true },
    ];

    const result = deleteTask(tasks, '1');

    expect(result[0]).toEqual(tasks[1]);
  });

  it('returns all tasks when id is not found', () => {
    const tasks = [
      { id: '1', title: 'Task 1', completed: false },
      { id: '2', title: 'Task 2', completed: true },
    ];

    const result = deleteTask(tasks, 'nonexistent');

    expect(result).toHaveLength(2);
  });
});

describe('filterTasks', () => {
  const tasks = [
    { id: '1', title: 'Active task', completed: false },
    { id: '2', title: 'Completed task', completed: true },
    { id: '3', title: 'Another active', completed: false },
  ];

  it('returns all tasks when filter is "all"', () => {
    const result = filterTasks(tasks, 'all');

    expect(result).toHaveLength(3);
  });

  it('returns only active tasks when filter is "active"', () => {
    const result = filterTasks(tasks, 'active');

    expect(result).toHaveLength(2);
    expect(result.every((t) => !t.completed)).toBe(true);
  });

  it('returns only completed tasks when filter is "completed"', () => {
    const result = filterTasks(tasks, 'completed');

    expect(result).toHaveLength(1);
    expect(result.every((t) => t.completed)).toBe(true);
  });

  it('returns all tasks for an unknown filter', () => {
    const result = filterTasks(tasks, 'unknown');

    expect(result).toHaveLength(3);
  });
});

describe('getActiveCount', () => {
  it('returns the number of active tasks', () => {
    const tasks = [
      { id: '1', completed: false },
      { id: '2', completed: true },
      { id: '3', completed: false },
    ];

    const count = getActiveCount(tasks);

    expect(count).toBe(2);
  });

  it('returns 0 when all tasks are completed', () => {
    const tasks = [
      { id: '1', completed: true },
      { id: '2', completed: true },
    ];

    const count = getActiveCount(tasks);

    expect(count).toBe(0);
  });

  it('returns 0 for an empty array', () => {
    const tasks = [];

    const count = getActiveCount(tasks);

    expect(count).toBe(0);
  });
});

describe('saveTasks / loadTasks', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('saves and loads tasks from localStorage', () => {
    const tasks = [
      { id: '1', title: 'Test', completed: false, createdAt: '2024-01-01' },
    ];

    saveTasks(tasks);
    const loaded = loadTasks();

    expect(loaded).toEqual(tasks);
  });

  it('returns an empty array when localStorage is empty', () => {

    const loaded = loadTasks();

    expect(loaded).toEqual([]);
  });

  it('returns an empty array when localStorage contains invalid JSON', () => {
    localStorage.setItem('taskflow-tasks', 'not-json');

    const loaded = loadTasks();

    expect(loaded).toEqual([]);
  });
});

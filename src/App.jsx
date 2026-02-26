import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilters from './components/TaskFilters';
import {
  createTask,
  toggleTask,
  deleteTask,
  filterTasks,
  getActiveCount,
  saveTasks,
  loadTasks,
} from './utils/taskHelpers';

export default function App() {
  const [tasks, setTasks] = useState(() => loadTasks());
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const handleAdd = (title) => {
    setTasks((prev) => [createTask(title), ...prev]);
  };

  const handleToggle = (id) => {
    setTasks((prev) => toggleTask(prev, id));
  };

  const handleDelete = (id) => {
    setTasks((prev) => deleteTask(prev, id));
  };

  const visibleTasks = filterTasks(tasks, filter);
  const activeCount = getActiveCount(tasks);

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">TaskFlow</h1>
        <p className="app-subtitle">Organize your day, one task at a time</p>
      </header>

      <main className="app-main">
        <div className="app-card">
          <TaskForm onAdd={handleAdd} />
          <TaskFilters
            currentFilter={filter}
            onFilterChange={setFilter}
            activeCount={activeCount}
          />
          <TaskList
            tasks={visibleTasks}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        </div>
      </main>
    </div>
  );
}

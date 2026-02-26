import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import TaskList from '../TaskList';

describe('TaskList', () => {
  it('renders empty state when there are no tasks', () => {
    render(<TaskList tasks={[]} onToggle={() => {}} onDelete={() => {}} />);

    expect(screen.getByText('No tasks to show')).toBeInTheDocument();
  });

  it('renders a list of tasks', () => {
    const tasks = [
      { id: '1', title: 'Task One', completed: false },
      { id: '2', title: 'Task Two', completed: true },
    ];

    render(<TaskList tasks={tasks} onToggle={() => {}} onDelete={() => {}} />);

    expect(screen.getByText('Task One')).toBeInTheDocument();
    expect(screen.getByText('Task Two')).toBeInTheDocument();
  });

  it('renders the correct number of task items', () => {
    const tasks = [
      { id: '1', title: 'Task One', completed: false },
      { id: '2', title: 'Task Two', completed: false },
      { id: '3', title: 'Task Three', completed: true },
    ];

    render(<TaskList tasks={tasks} onToggle={() => {}} onDelete={() => {}} />);

    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  it('does not render a list when tasks are empty', () => {
    render(<TaskList tasks={[]} onToggle={() => {}} onDelete={() => {}} />);

    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });
});

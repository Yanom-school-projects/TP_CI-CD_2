import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskItem from '../TaskItem';

const baseTask = {
  id: '1',
  title: 'Buy groceries',
  completed: false,
  createdAt: '2024-01-01T00:00:00.000Z',
};

describe('TaskItem', () => {
  it('renders the task title', () => {
    render(<TaskItem task={baseTask} onToggle={() => {}} onDelete={() => {}} />);


    expect(screen.getByText('Buy groceries')).toBeInTheDocument();
  });

  it('renders an unchecked checkbox for an active task', () => {
    const activeTask = { ...baseTask, completed: false };

    render(<TaskItem task={activeTask} onToggle={() => {}} onDelete={() => {}} />);

    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('renders a checked checkbox for a completed task', () => {
    const completedTask = { ...baseTask, completed: true };

    render(<TaskItem task={completedTask} onToggle={() => {}} onDelete={() => {}} />);

    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('calls onToggle with the task id when checkbox is clicked', async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    render(<TaskItem task={baseTask} onToggle={onToggle} onDelete={() => {}} />);

    await user.click(screen.getByRole('checkbox'));

    expect(onToggle).toHaveBeenCalledWith('1');
  });

  it('calls onDelete with the task id when delete button is clicked', async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();
    render(<TaskItem task={baseTask} onToggle={() => {}} onDelete={onDelete} />);

    await user.click(screen.getByRole('button', { name: /delete/i }));

    expect(onDelete).toHaveBeenCalledWith('1');
  });

  it('applies the completed CSS class when task is completed', () => {
    const completedTask = { ...baseTask, completed: true };

    const { container } = render(
      <TaskItem task={completedTask} onToggle={() => {}} onDelete={() => {}} />,
    );

    expect(container.querySelector('.task-item--completed')).toBeInTheDocument();
  });

  it('does not apply the completed CSS class when task is active', () => {
    const activeTask = { ...baseTask, completed: false };

    const { container } = render(
      <TaskItem task={activeTask} onToggle={() => {}} onDelete={() => {}} />,
    );

    expect(container.querySelector('.task-item--completed')).not.toBeInTheDocument();
  });
});

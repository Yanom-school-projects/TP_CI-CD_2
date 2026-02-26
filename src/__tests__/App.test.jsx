import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders the header with title and subtitle', () => {
    render(<App />);

    expect(screen.getByText('TaskFlow')).toBeInTheDocument();
    expect(screen.getByText('Organize your day, one task at a time')).toBeInTheDocument();
  });

  it('renders TaskForm, TaskFilters, and TaskList', () => {
    render(<App />);

    expect(screen.getByLabelText('Task title')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
    expect(screen.getByText('0 items left')).toBeInTheDocument();
    expect(screen.getByText('No tasks to show')).toBeInTheDocument();
  });

  it('adds a new task when the form is submitted', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText('Task title'), 'New task');
    await user.click(screen.getByRole('button', { name: /add/i }));

    expect(screen.getByText('New task')).toBeInTheDocument();
    expect(screen.getByText('1 item left')).toBeInTheDocument();
  });

  it('toggles a task between completed and active', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText('Task title'), 'Toggle me');
    await user.click(screen.getByRole('button', { name: /add/i }));

    await user.click(screen.getByRole('checkbox'));

    expect(screen.getByRole('checkbox')).toBeChecked();
    expect(screen.getByText('0 items left')).toBeInTheDocument();
  });

  it('deletes a task from the list', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText('Task title'), 'Delete me');
    await user.click(screen.getByRole('button', { name: /add/i }));

    await user.click(screen.getByRole('button', { name: /delete/i }));

    expect(screen.queryByText('Delete me')).not.toBeInTheDocument();
  });

  it('filters tasks by active and completed', async () => {
    const user = userEvent.setup();
    render(<App />);
    const input = screen.getByLabelText('Task title');

    await user.type(input, 'Active task');
    await user.click(screen.getByRole('button', { name: /add/i }));
    await user.type(input, 'Done task');
    await user.click(screen.getByRole('button', { name: /add/i }));

    const checkboxes = screen.getAllByRole('checkbox');
    await user.click(checkboxes[1]);

    await user.click(screen.getByRole('button', { name: /^active$/i }));
    expect(screen.getByText('Done task')).toBeInTheDocument();
    expect(screen.queryByText('Active task')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /completed/i }));
    expect(screen.getByText('Active task')).toBeInTheDocument();
    expect(screen.queryByText('Done task')).not.toBeInTheDocument();
  });
});

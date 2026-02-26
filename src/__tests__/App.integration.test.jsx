import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('App Integration Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders the app with header and empty state', () => {
    render(<App />);

    expect(screen.getByText('TaskFlow')).toBeInTheDocument();
    expect(screen.getByText('No tasks to show')).toBeInTheDocument();
    expect(screen.getByText('0 items left')).toBeInTheDocument();
  });

  it('adds a task and displays it in the list', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText('Task title'), 'Buy groceries');
    await user.click(screen.getByRole('button', { name: /add/i }));

    expect(screen.getByText('Buy groceries')).toBeInTheDocument();
    expect(screen.getByText('1 item left')).toBeInTheDocument();
    expect(screen.queryByText('No tasks to show')).not.toBeInTheDocument();
  });

  it('toggles a task to completed', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(screen.getByLabelText('Task title'), 'Buy groceries');
    await user.click(screen.getByRole('button', { name: /add/i }));

    await user.click(screen.getByRole('checkbox'));

    expect(screen.getByRole('checkbox')).toBeChecked();
    expect(screen.getByText('0 items left')).toBeInTheDocument();
  });

  it('deletes a task from the list', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(screen.getByLabelText('Task title'), 'Buy groceries');
    await user.click(screen.getByRole('button', { name: /add/i }));

    await user.click(screen.getByRole('button', { name: /delete/i }));

    expect(screen.queryByText('Buy groceries')).not.toBeInTheDocument();
    expect(screen.getByText('No tasks to show')).toBeInTheDocument();
    expect(screen.getByText('0 items left')).toBeInTheDocument();
  });

  it('filters tasks by active and completed', async () => {
    const user = userEvent.setup();
    render(<App />);
    const input = screen.getByLabelText('Task title');

    await user.type(input, 'Task One');
    await user.click(screen.getByRole('button', { name: /add/i }));
    await user.type(input, 'Task Two');
    await user.click(screen.getByRole('button', { name: /add/i }));

    const checkboxes = screen.getAllByRole('checkbox');
    await user.click(checkboxes[1]); // Complete "Task One" (oldest, last in list)

    await user.click(screen.getByRole('button', { name: /^active$/i }));

    expect(screen.getByText('Task Two')).toBeInTheDocument();
    expect(screen.queryByText('Task One')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /completed/i }));

    expect(screen.getByText('Task One')).toBeInTheDocument();
    expect(screen.queryByText('Task Two')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /^all$/i }));

    expect(screen.getByText('Task One')).toBeInTheDocument();
    expect(screen.getByText('Task Two')).toBeInTheDocument();
  });

  it('cannot add a task with an empty title', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /add/i }));

    expect(screen.getByText('No tasks to show')).toBeInTheDocument();
    expect(screen.getByText('0 items left')).toBeInTheDocument();
  });

  it('handles a full workflow: add, toggle, filter, delete', async () => {
    const user = userEvent.setup();
    render(<App />);
    const input = screen.getByLabelText('Task title');

    await user.type(input, 'Learn React');
    await user.click(screen.getByRole('button', { name: /add/i }));
    await user.type(input, 'Write tests');
    await user.click(screen.getByRole('button', { name: /add/i }));
    await user.type(input, 'Setup CI/CD');
    await user.click(screen.getByRole('button', { name: /add/i }));

    expect(screen.getByText('3 items left')).toBeInTheDocument();

    const checkboxes = screen.getAllByRole('checkbox');
    await user.click(checkboxes[1]);

    expect(screen.getByText('2 items left')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /completed/i }));

    expect(screen.getByText('Write tests')).toBeInTheDocument();
    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
    expect(screen.queryByText('Setup CI/CD')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /^all$/i }));
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    await user.click(deleteButtons[2]);

    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
    expect(screen.getByText('Write tests')).toBeInTheDocument();
    expect(screen.getByText('Setup CI/CD')).toBeInTheDocument();
    expect(screen.getByText('1 item left')).toBeInTheDocument();
  });

  it('counter shows correct singular/plural forms', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByText('0 items left')).toBeInTheDocument();

    await user.type(screen.getByLabelText('Task title'), 'Only task');
    await user.click(screen.getByRole('button', { name: /add/i }));

    expect(screen.getByText('1 item left')).toBeInTheDocument();

    await user.type(screen.getByLabelText('Task title'), 'Another task');
    await user.click(screen.getByRole('button', { name: /add/i }));

    expect(screen.getByText('2 items left')).toBeInTheDocument();
  });
});

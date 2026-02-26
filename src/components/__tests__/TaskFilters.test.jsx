import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskFilters from '../TaskFilters';

describe('TaskFilters', () => {
  it('renders all three filter buttons', () => {
    render(
      <TaskFilters currentFilter="all" onFilterChange={() => {}} activeCount={0} />,
    );


    expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /active/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /completed/i })).toBeInTheDocument();
  });

  it('highlights the active filter button', () => {
    render(
      <TaskFilters currentFilter="active" onFilterChange={() => {}} activeCount={0} />,
    );

    const activeBtn = screen.getByRole('button', { name: /^active$/i });
    expect(activeBtn.className).toContain('filter-btn--active');
  });

  it('calls onFilterChange when a filter button is clicked', async () => {
    const user = userEvent.setup();
    const onFilterChange = vi.fn();
    render(
      <TaskFilters currentFilter="all" onFilterChange={onFilterChange} activeCount={0} />,
    );

    await user.click(screen.getByRole('button', { name: /completed/i }));

    expect(onFilterChange).toHaveBeenCalledWith('completed');
  });

  it('displays the active count with correct singular form', () => {
    render(
      <TaskFilters currentFilter="all" onFilterChange={() => {}} activeCount={1} />,
    );

    expect(screen.getByText('1 item left')).toBeInTheDocument();
  });

  it('displays the active count with correct plural form', () => {
    render(
      <TaskFilters currentFilter="all" onFilterChange={() => {}} activeCount={3} />,
    );

    expect(screen.getByText('3 items left')).toBeInTheDocument();
  });

  it('displays 0 items left', () => {
    render(
      <TaskFilters currentFilter="all" onFilterChange={() => {}} activeCount={0} />,
    );

    expect(screen.getByText('0 items left')).toBeInTheDocument();
  });
});

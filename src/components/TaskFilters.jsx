const FILTERS = ['all', 'active', 'completed'];

export default function TaskFilters({ currentFilter, onFilterChange, activeCount }) {
  return (
    <div className="task-filters">
      <span className="task-count">
        {activeCount} {activeCount === 1 ? 'item' : 'items'} left
      </span>
      <div className="filter-buttons">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            className={`filter-btn ${currentFilter === filter ? 'filter-btn--active' : ''}`}
            onClick={() => onFilterChange(filter)}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}

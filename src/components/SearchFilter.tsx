"use client";

import { useState, useMemo, useCallback } from "react";
import styles from "./SearchFilter.module.scss";

export type ViewMode = "list" | "grid";

export interface FilterConfig {
  /** Label displayed next to the filter row */
  label: string;
  /** Unique key for this filter */
  key: string;
  /** Available options */
  options: string[];
  /** Multi-select or single-select */
  multiSelect?: boolean;
  /** Icon emoji */
  icon?: string;
}

export interface SearchFilterProps {
  /** Placeholder text for search input */
  searchPlaceholder?: string;
  /** Filter configuration array  */
  filters: FilterConfig[];
  /** Callback when search/filters change */
  onFilterChange: (params: {
    search: string;
    filters: Record<string, string[]>;
    sortNewest: boolean;
  }) => void;
  /** Total results count */
  totalResults?: number;
  /** Filtered results count */
  filteredResults?: number;
  /** Enable view mode toggle */
  showViewToggle?: boolean;
  /** Current view mode */
  viewMode?: ViewMode;
  /** Callback when view mode changes */
  onViewModeChange?: (mode: ViewMode) => void;
}

export function SearchFilter({
  searchPlaceholder = "Search...",
  filters,
  onFilterChange,
  totalResults = 0,
  filteredResults = 0,
  showViewToggle = false,
  viewMode = "list",
  onViewModeChange,
}: SearchFilterProps) {
  const [search, setSearch] = useState("");
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [sortNewest, setSortNewest] = useState(true);
  const [filtersExpanded, setFiltersExpanded] = useState(true);

  const hasActiveFilters = useMemo(() => {
    return search.trim() !== "" || Object.values(activeFilters).some((v) => v.length > 0);
  }, [search, activeFilters]);

  const notify = useCallback(
    (newSearch: string, newFilters: Record<string, string[]>, newSort: boolean) => {
      onFilterChange({ search: newSearch, filters: newFilters, sortNewest: newSort });
    },
    [onFilterChange]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    notify(value, activeFilters, sortNewest);
  };

  const handleChipClick = (filterKey: string, option: string, multiSelect: boolean) => {
    const current = activeFilters[filterKey] || [];
    let next: string[];

    if (multiSelect) {
      next = current.includes(option) ? current.filter((o) => o !== option) : [...current, option];
    } else {
      next = current.includes(option) ? [] : [option];
    }

    const newFilters = { ...activeFilters, [filterKey]: next };
    
    // Perform both updates side-by-side in the event handler, not inside a setState functional updater
    setActiveFilters(newFilters);
    notify(search, newFilters, sortNewest);
  };

  const handleSortToggle = () => {
    const newSort = !sortNewest;
    setSortNewest(newSort);
    notify(search, activeFilters, newSort);
  };

  const handleClearAll = () => {
    setSearch("");
    setActiveFilters({});
    setSortNewest(true);
    notify("", {}, true);
  };

  const activeCount = useMemo(() => {
    return Object.values(activeFilters).reduce((sum, arr) => sum + arr.length, 0) + (search.trim() ? 1 : 0);
  }, [activeFilters, search]);

  return (
    <div className={styles.searchFilterContainer}>
      {/* Search Bar */}
      <div className={styles.searchWrapper}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder={searchPlaceholder}
          value={search}
          onChange={handleSearchChange}
          id="search-filter-input"
        />
        <span className={styles.searchIcon}>🔍</span>
      </div>

      {/* Filter Toggle */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button
          className={styles.filterToggle}
          onClick={() => setFiltersExpanded(!filtersExpanded)}
          type="button"
        >
          <span>Filters{activeCount > 0 ? ` (${activeCount})` : ""}</span>
          <span
            className={`${styles.filterToggleIcon} ${filtersExpanded ? styles.filterToggleIconExpanded : ""}`}
          >
            ▼
          </span>
        </button>

        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          {/* View Toggle */}
          {showViewToggle && (
            <div className={styles.viewToggle} id="view-mode-toggle">
              <button
                className={`${styles.viewToggleBtn} ${viewMode === "list" ? styles.viewToggleBtnActive : ""}`}
                onClick={() => onViewModeChange?.("list")}
                type="button"
                aria-label="List view"
                id="view-toggle-list"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1" y="2" width="14" height="2.5" rx="0.75" fill="currentColor" />
                  <rect x="1" y="6.75" width="14" height="2.5" rx="0.75" fill="currentColor" />
                  <rect x="1" y="11.5" width="14" height="2.5" rx="0.75" fill="currentColor" />
                </svg>
              </button>
              <button
                className={`${styles.viewToggleBtn} ${viewMode === "grid" ? styles.viewToggleBtnActive : ""}`}
                onClick={() => onViewModeChange?.("grid")}
                type="button"
                aria-label="Grid view"
                id="view-toggle-grid"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1" y="1" width="6" height="6" rx="1.25" fill="currentColor" />
                  <rect x="9" y="1" width="6" height="6" rx="1.25" fill="currentColor" />
                  <rect x="1" y="9" width="6" height="6" rx="1.25" fill="currentColor" />
                  <rect x="9" y="9" width="6" height="6" rx="1.25" fill="currentColor" />
                </svg>
              </button>
            </div>
          )}

          {/* Sort */}
          <button className={styles.sortButton} onClick={handleSortToggle} type="button">
            <span className={`${styles.sortIcon} ${!sortNewest ? styles.sortIconFlipped : ""}`}>↓</span>
            {sortNewest ? "Newest" : "Oldest"}
          </button>

          {/* Clear All */}
          {hasActiveFilters && (
            <button className={styles.clearAll} onClick={handleClearAll} type="button">
              ✕ Clear
            </button>
          )}
        </div>
      </div>

      {/* Filter Chips */}
      <div
        className={`${styles.filterContent} ${filtersExpanded ? styles.filterContentExpanded : ""}`}
      >
        <div className={styles.filterSection}>
          {filters.map((filter) => (
            <div key={filter.key} className={styles.filterRow}>
              <span className={styles.filterLabel}>
                {filter.icon && <span className={styles.chipIcon}>{filter.icon} </span>}
                {filter.label}
              </span>
              <div className={styles.chipsContainer}>
                {filter.options.map((option) => {
                  const isActive = (activeFilters[filter.key] || []).includes(option);
                  return (
                    <button
                      key={option}
                      type="button"
                      className={`${styles.chip} ${isActive ? styles.chipActive : ""}`}
                      onClick={() =>
                        handleChipClick(filter.key, option, filter.multiSelect ?? false)
                      }
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Results Count */}
      {hasActiveFilters && (
        <div className={styles.resultsCount}>
          Showing <span className={styles.resultsHighlight}>{filteredResults}</span> of{" "}
          {totalResults} results
        </div>
      )}
    </div>
  );
}

/* Empty State Component */
export function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className={styles.emptyState}>
      <div className={styles.emptyIcon}>🔎</div>
      <div className={styles.emptyTitle}>No results found</div>
      <div className={styles.emptyDescription}>
        Try adjusting your search or filters to find what you&apos;re looking for.
      </div>
      <button className={styles.emptyButton} onClick={onClear} type="button">
        Clear all filters
      </button>
    </div>
  );
}

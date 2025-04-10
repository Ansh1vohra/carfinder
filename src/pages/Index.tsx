
import React, { useState } from 'react';
import SearchFilters from '../components/SearchFilters';
import Pagination from '../components/Pagination';
import SearchHeader from '../components/SearchHeader';
import ViewModeToggle from '../components/ViewModeToggle';
import SearchResults from '../components/SearchResults';
import { useCarSearch } from '../hooks/useCarSearch';

const Index = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const {
    cars,
    loading,
    error,
    currentPage,
    totalPages,
    filters,
    sortBy,
    handleFilterChange,
    handleSortChange,
    handlePageChange,
    resetFilters
  } = useCarSearch();
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Find Your Perfect Car</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Browse our selection of cars and filter by brand, price, and more.
        </p>
      </div>
      
      <SearchFilters 
        onFilterChange={handleFilterChange} 
        onSortChange={handleSortChange} 
      />
      
      <div className="flex justify-between items-center mb-4">
        <SearchHeader 
          resultCount={cars.length} 
          hasFilters={Object.keys(filters).length > 0}
          loading={loading}
          error={error}
        />
        
        <ViewModeToggle 
          viewMode={viewMode} 
          onViewModeChange={setViewMode} 
        />
      </div>
      
      <SearchResults
        loading={loading}
        error={error}
        cars={cars}
        viewMode={viewMode}
        filters={filters}
        onResetFilters={resetFilters}
      />
      
      {totalPages > 1 && !loading && !error && cars.length > 0 && (
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={handlePageChange} 
        />
      )}
    </div>
  );
};

export default Index;


import React from 'react';

interface SearchHeaderProps {
  resultCount: number;
  hasFilters: boolean;
  loading: boolean;
  error: string | null;
}

const SearchHeader = ({ resultCount, hasFilters, loading, error }: SearchHeaderProps) => {
  if (loading || error) return null;
  
  return (
    <div>
      <p className="text-sm text-gray-500">
        Showing {resultCount} {resultCount === 1 ? 'car' : 'cars'}
        {hasFilters ? ' with selected filters' : ''}
      </p>
    </div>
  );
};

export default SearchHeader;

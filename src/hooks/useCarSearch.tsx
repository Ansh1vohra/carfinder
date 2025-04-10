
import { useState, useEffect, useCallback } from 'react';
import { getCars } from '../services/carService';
import { Car, CarFilters } from '../types/car';

export const useCarSearch = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState<CarFilters>({});
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await getCars(currentPage, 10, filters, sortBy);
        
        setCars(response.cars);
        setTotalPages(response.totalPages);
        
        // Reset to page 1 if filters change and current page is out of bounds
        if (currentPage > response.totalPages) {
          setCurrentPage(1);
        }
      } catch (err) {
        setError('Failed to load cars. Please try again later.');
        console.error('Error fetching cars:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCars();
  }, [currentPage, filters, sortBy]);

  const handleFilterChange = useCallback((newFilters: CarFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  }, []);
  
  const handleSortChange = useCallback((sort: string) => {
    setSortBy(sort);
  }, []);
  
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    // Scroll back to top when changing page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const resetFilters = useCallback(() => {
    setCurrentPage(1);
    setFilters({});
    setSortBy('default');
  }, []);

  return {
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
  };
};

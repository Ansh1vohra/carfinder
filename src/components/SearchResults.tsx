
import React from 'react';
import CarCard from './CarCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Car } from '../types/car';
import { Heart } from 'lucide-react';

interface SearchResultsProps {
  loading: boolean;
  error: string | null;
  cars: Car[];
  viewMode: 'grid' | 'list';
  filters: any;
  onResetFilters: () => void;
}

const SearchResults = ({ 
  loading, 
  error, 
  cars, 
  viewMode, 
  filters, 
  onResetFilters 
}: SearchResultsProps) => {

  if (loading) {
    return (
      <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'grid-cols-1 gap-4'}`}>
        {[...Array(6)].map((_, index) => (
          <div key={index} className="rounded-lg overflow-hidden">
            <Skeleton className="h-48 w-full" />
            <div className="p-4">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-4" />
              <div className="flex justify-between mb-2">
                <Skeleton className="h-5 w-1/4" />
                <Skeleton className="h-5 w-1/4" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg text-center">
        <p className="text-red-600 dark:text-red-400">{error}</p>
        <button 
          className="mt-4 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700"
          onClick={onResetFilters}
        >
          Reset and try again
        </button>
      </div>
    );
  }

  if (cars.length === 0) {
    return (
      <div className="bg-muted/50 p-6 rounded-lg text-center">
        <p className="text-lg mb-2">No cars found with the selected filters.</p>
        <p className="text-gray-500 mb-4">Try adjusting your search criteria.</p>
        <button 
          className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700"
          onClick={onResetFilters}
        >
          Clear all filters
        </button>
      </div>
    );
  }

  return viewMode === 'grid' ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
      {cars.map(car => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  ) : (
    <div className="space-y-4 animate-fade-in">
      {cars.map(car => (
        <div key={car.id} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex flex-col sm:flex-row">
            <div className="relative w-full sm:w-48 sm:h-auto">
              <img 
                src={car.imageUrl} 
                alt={`${car.brand} ${car.model}`} 
                className="h-48 sm:h-full w-full object-cover"
              />
              <button 
                className="wishlist-button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  // The wishlist toggle is handled in CarCard
                }}
              >
                <Heart size={20} />
              </button>
            </div>
            <div className="p-4 flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{car.brand} {car.model}</h3>
                  <p className="text-sm text-gray-500">{car.year}</p>
                </div>
                <span className="font-bold text-car-primary">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(car.price)}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">{car.description}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4 text-sm text-gray-600 dark:text-gray-400">
                <div>
                  <span className="font-medium">{car.fuelType}</span>
                </div>
                <div>
                  <span className="font-medium">{car.transmission}</span>
                </div>
                <div>
                  <span className="font-medium">{car.seatingCapacity} seats</span>
                </div>
                <div>
                  <span className="font-medium">{car.color}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;

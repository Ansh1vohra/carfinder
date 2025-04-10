
import React, { useState, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { CarFilters, CarFilterOptions } from '../types/car';
import { getFilterOptions } from '../services/carService';
import { formatPrice } from '../utils/formatters';

interface SearchFiltersProps {
  onFilterChange: (filters: CarFilters) => void;
  onSortChange: (sortOption: string) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ onFilterChange, onSortChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [brand, setBrand] = useState('all');
  const [fuelType, setFuelType] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [seatingCapacity, setSeatingCapacity] = useState('any');
  const [sortBy, setSortBy] = useState('default');
  const [showFilters, setShowFilters] = useState(false);
  const [filterOptions, setFilterOptions] = useState<CarFilterOptions | null>(null);
  const [filters, setFilters] = useState<CarFilters>({});
  
  useEffect(() => {
    const loadFilterOptions = async () => {
      const options = await getFilterOptions();
      setFilterOptions(options);
      setPriceRange([options.minPrice, options.maxPrice]);
    };
    
    loadFilterOptions();
  }, []);
  
  // Create filters object when filter values change
  useEffect(() => {
    const newFilters: CarFilters = {
      searchQuery: searchQuery || undefined,
      brand: brand !== 'all' ? brand : undefined,
      fuelType: fuelType !== 'all' ? fuelType : undefined,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      seatingCapacity: seatingCapacity !== 'any' ? parseInt(seatingCapacity) : undefined,
    };
    
    setFilters(newFilters);
  }, [searchQuery, brand, fuelType, priceRange, seatingCapacity]);
  
  // Only call the parent onFilterChange when our local filters state changes
  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);
  
  // Only call the parent onSortChange when sortBy changes
  useEffect(() => {
    onSortChange(sortBy);
  }, [sortBy, onSortChange]);
  
  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };
  
  const resetFilters = () => {
    setSearchQuery('');
    setBrand('all');
    setFuelType('all');
    if (filterOptions) {
      setPriceRange([filterOptions.minPrice, filterOptions.maxPrice]);
    }
    setSeatingCapacity('any');
    setSortBy('default');
  };
  
  if (!filterOptions) {
    return <div className="flex justify-center p-4">Loading filters...</div>;
  }
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search cars by brand, model or features..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-4 py-2"
        />
      </div>
      
      <div className="flex justify-between mt-4">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <Filter size={16} />
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </Button>
        
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="price-low-high">Price: Low to High</SelectItem>
            <SelectItem value="price-high-low">Price: High to Low</SelectItem>
            <SelectItem value="newest">Newest First</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 animate-fade-in">
          <div>
            <label className="block text-sm font-medium mb-1">Brand</label>
            <Select value={brand} onValueChange={setBrand}>
              <SelectTrigger>
                <SelectValue placeholder="All Brands" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Brands</SelectItem>
                {filterOptions.brands.map((brand) => (
                  <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Fuel Type</label>
            <Select value={fuelType} onValueChange={setFuelType}>
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {filterOptions.fuelTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Seating Capacity</label>
            <Select value={seatingCapacity} onValueChange={setSeatingCapacity}>
              <SelectTrigger>
                <SelectValue placeholder="Any Capacity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Capacity</SelectItem>
                {filterOptions.seatingCapacities.map((capacity) => (
                  <SelectItem key={capacity} value={capacity.toString()}>
                    {capacity}+ seats
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <label className="block text-sm font-medium mb-4">
              Price Range: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
            </label>
            <Slider
              min={filterOptions.minPrice}
              max={filterOptions.maxPrice}
              step={(filterOptions.maxPrice - filterOptions.minPrice) / 100}
              value={[priceRange[0], priceRange[1]]}
              onValueChange={handlePriceChange}
              className="my-6"
            />
          </div>
          
          <div className="col-span-1 md:col-span-2 lg:col-span-4 flex justify-end">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={resetFilters}
              className="flex items-center gap-2"
            >
              <X size={16} />
              Reset Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;

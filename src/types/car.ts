
export interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: number;
  fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
  transmission: 'Manual' | 'Automatic';
  mileage: number; // km/L
  seatingCapacity: number;
  color: string;
  imageUrl: string;
  features: string[];
  description: string;
}

export interface CarFilterOptions {
  brands: string[];
  fuelTypes: string[];
  seatingCapacities: number[];
  minPrice: number;
  maxPrice: number;
}

export interface CarFilters {
  brand?: string;
  fuelType?: string;
  minPrice?: number;
  maxPrice?: number;
  seatingCapacity?: number;
  searchQuery?: string;
}

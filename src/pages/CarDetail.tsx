import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCarById } from '../services/carService';
import { Car } from '../types/car';
import { useWishlist } from '../context/WishlistContext';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Heart, ChevronLeft, Check } from 'lucide-react';
import { formatPrice } from '../utils/formatters';

const CarDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  
  useEffect(() => {
    const fetchCar = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        
        const carId = parseInt(id);
        const carData = await getCarById(carId);
        
        if (!carData) {
          setError('Car not found.');
        } else {
          setCar(carData);
        }
      } catch (err) {
        setError('Failed to load car details. Please try again later.');
        console.error('Error fetching car:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCar();
  }, [id]);
  
  const handleWishlistToggle = () => {
    if (!car) return;
    
    if (isInWishlist(car.id)) {
      removeFromWishlist(car.id);
    } else {
      addToWishlist(car);
    }
  };
  
  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/" className="text-car-primary flex items-center gap-1 hover:underline mb-4">
            <ChevronLeft size={16} />
            <span>Back to search</span>
          </Link>
          
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-6 w-1/2" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <Skeleton className="h-80 w-full rounded-lg" />
          </div>
          
          <div className="lg:col-span-2">
            <Skeleton className="h-10 w-full mb-4" />
            <Skeleton className="h-24 w-full mb-4" />
            <Skeleton className="h-12 w-full mb-4" />
            <Skeleton className="h-8 w-3/4 mb-2" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error || !car) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Link to="/" className="text-car-primary flex items-center gap-1 hover:underline mb-4">
          <ChevronLeft size={16} />
          <span>Back to search</span>
        </Link>
        
        <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg text-center">
          <p className="text-red-600 dark:text-red-400">{error || 'Car not found.'}</p>
          <Button 
            variant="outline" 
            className="mt-4"
            asChild
          >
            <Link to="/">Return to search</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  const inWishlist = isInWishlist(car.id);
  
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-fade-in">
      <Link to="/" className="text-car-primary flex items-center gap-1 hover:underline mb-4">
        <ChevronLeft size={16} />
        <span>Back to search</span>
      </Link>
      
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1">{car.brand} {car.model}</h1>
        <div className="flex items-center gap-2 text-gray-500">
          <span>{car.year}</span>
          <span>•</span>
          <span>{car.color}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <div className="relative overflow-hidden rounded-lg">
            <img 
              src={car.imageUrl} 
              alt={`${car.brand} ${car.model}`} 
              className="w-full object-cover rounded-lg"
            />
          </div>
          
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Overview</h2>
            <p className="text-gray-600 dark:text-gray-300">{car.description}</p>
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {car.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check size={16} className="text-car-secondary" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="mb-4">
              <span className="text-3xl font-bold text-car-primary">{formatPrice(car.price)}</span>
            </div>
            
            <Button
              className="w-full mb-4 gap-2"
              variant={inWishlist ? "outline" : "default"}
              onClick={handleWishlistToggle}
            >
              <Heart fill={inWishlist ? "currentColor" : "none"} size={18} />
              {inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </Button>
            
            <h3 className="font-semibold mb-4">Specifications</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Fuel Type</p>
                <p className="font-medium">{car.fuelType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Transmission</p>
                <p className="font-medium">{car.transmission}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Seating</p>
                <p className="font-medium">{car.seatingCapacity} seats</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Mileage</p>
                <p className="font-medium">
                  {car.mileage > 0 ? `${car.mileage} km/l` : 'Electric'}
                </p>
              </div>
            </div>
          </div>
          
          {/* Additional sections like financing calculator or contact form could go here */}
        </div>
      </div>
    </div>
  );
};

export default CarDetail;


import React from 'react';
import { Car } from '../types/car';
import { useWishlist } from '../context/WishlistContext';
import { Heart, HeartOff } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/formatters';

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const inWishlist = isInWishlist(car.id);
  
  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (inWishlist) {
      removeFromWishlist(car.id);
    } else {
      addToWishlist(car);
    }
  };
  
  return (
    <Link to={`/car/${car.id}`}>
      <Card className="card-hover overflow-hidden h-full">
        <div className="relative">
          <img 
            src={car.imageUrl} 
            alt={`${car.brand} ${car.model}`}
            className="h-48 w-full object-cover"
          />
          <button 
            className={`wishlist-button ${inWishlist ? 'wishlist-button-active' : ''}`}
            onClick={handleWishlistToggle}
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            {inWishlist ? <Heart fill="currentColor" size={20} /> : <Heart size={20} />}
          </button>
        </div>
        <CardContent className="p-4">
          <div className="mb-2">
            <h3 className="text-lg font-semibold">{car.brand} {car.model}</h3>
            <p className="text-sm text-gray-500">{car.year}</p>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-bold text-car-primary">{formatPrice(car.price)}</span>
            <span className="text-sm bg-car-light px-2 py-0.5 rounded-full">{car.fuelType}</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <span>Seats:</span>
              <span className="font-medium">{car.seatingCapacity}</span>
            </div>
            <div className="flex items-center gap-1">
              <span>Trans:</span>
              <span className="font-medium">{car.transmission}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CarCard;

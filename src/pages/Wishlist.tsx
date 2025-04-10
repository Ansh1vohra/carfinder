
import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import CarCard from '../components/CarCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';

const Wishlist = () => {
  const { wishlist, clearWishlist } = useWishlist();
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <Heart className="text-car-primary" />
            Your Wishlist
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {wishlist.length > 0
              ? `You have ${wishlist.length} ${wishlist.length === 1 ? 'car' : 'cars'} in your wishlist.`
              : 'Your wishlist is empty.'}
          </p>
        </div>
        
        {wishlist.length > 0 && (
          <Button 
            variant="outline" 
            onClick={clearWishlist}
            className="flex items-center gap-2"
          >
            <Trash2 size={16} />
            Clear Wishlist
          </Button>
        )}
      </div>
      
      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {wishlist.map(car => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      ) : (
        <div className="bg-muted/50 rounded-lg p-12 text-center animate-fade-in">
          <div className="flex justify-center mb-4">
            <Heart size={48} className="text-gray-300" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-6">
            Start adding cars to your wishlist to keep track of your favorite vehicles.
          </p>
          <Button asChild>
            <Link to="/" className="flex items-center gap-2">
              <ShoppingBag size={16} />
              Browse Cars
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Wishlist;

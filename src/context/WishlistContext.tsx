
import React, { createContext, useState, useEffect, useContext } from 'react';
import { Car } from '../types/car';
import { toast } from '../components/ui/use-toast';

interface WishlistContextType {
  wishlist: Car[];
  addToWishlist: (car: Car) => void;
  removeFromWishlist: (carId: number) => void;
  isInWishlist: (carId: number) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<Car[]>([]);

  // Load wishlist from localStorage on initial load
  useEffect(() => {
    const savedWishlist = localStorage.getItem('carWishlist');
    if (savedWishlist) {
      try {
        const parsedWishlist = JSON.parse(savedWishlist);
        setWishlist(parsedWishlist);
      } catch (error) {
        console.error('Failed to parse wishlist from localStorage', error);
        localStorage.removeItem('carWishlist');
      }
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('carWishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (car: Car) => {
    setWishlist(prev => {
      if (prev.some(item => item.id === car.id)) {
        return prev;
      }
      toast({
        title: "Added to wishlist",
        description: `${car.brand} ${car.model} has been added to your wishlist.`,
      });
      return [...prev, car];
    });
  };

  const removeFromWishlist = (carId: number) => {
    setWishlist(prev => {
      const car = prev.find(item => item.id === carId);
      if (car) {
        toast({
          title: "Removed from wishlist",
          description: `${car.brand} ${car.model} has been removed from your wishlist.`,
        });
      }
      return prev.filter(item => item.id !== carId);
    });
  };

  const isInWishlist = (carId: number): boolean => {
    return wishlist.some(car => car.id === carId);
  };

  const clearWishlist = () => {
    setWishlist([]);
    toast({
      title: "Wishlist cleared",
      description: "All cars have been removed from your wishlist.",
    });
  };

  return (
    <WishlistContext.Provider 
      value={{ 
        wishlist, 
        addToWishlist, 
        removeFromWishlist, 
        isInWishlist,
        clearWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

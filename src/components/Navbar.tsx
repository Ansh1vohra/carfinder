
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { Button } from '@/components/ui/button';
import { Heart, Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navbar: React.FC = () => {
  const { wishlist } = useWishlist();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-car-primary text-xl font-bold">CarFinder</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden sm:flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link to="/">Home</Link>
            </Button>
            
            <Button variant="ghost" asChild>
              <Link to="/wishlist" className="relative">
                <Heart size={20} className="mr-2" />
                Wishlist
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-car-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {wishlist.length}
                  </span>
                )}
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="icon"
              onClick={toggleTheme}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <Button 
              variant="ghost" 
              size="sm"
              className="relative mr-2"
              asChild
            >
              <Link to="/wishlist">
                <Heart size={20} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-car-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {wishlist.length}
                  </span>
                )}
              </Link>
            </Button>
            
            <Button 
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => setIsOpen(false)}
              asChild
            >
              <Link to="/">Home</Link>
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => setIsOpen(false)}
              asChild
            >
              <Link to="/wishlist">
                <Heart size={20} className="mr-2" />
                Wishlist ({wishlist.length})
              </Link>
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => {
                toggleTheme();
                setIsOpen(false);
              }}
            >
              {theme === 'dark' ? <Sun size={20} className="mr-2" /> : <Moon size={20} className="mr-2" />}
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

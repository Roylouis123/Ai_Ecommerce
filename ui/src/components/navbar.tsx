import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, Headphones } from 'lucide-react';
import { Button } from './ui/button';
import VoiceAssistant from './voice-assistant';
import { useCart } from '../hooks/use-cart';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const { totalItems } = useCart();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleAssistant = () => setIsAssistantOpen(!isAssistantOpen);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <div className="bg-gradient-to-r from-purple-600 to-blue-500 p-2 rounded-full">
                  <Headphones className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
                  FutureMart
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-purple-600 transition-colors">
                Home
              </Link>
              <Link to="/products" className="text-gray-700 hover:text-purple-600 transition-colors">
                Products
              </Link>
              <Link to="/categories" className="text-gray-700 hover:text-purple-600 transition-colors">
                Categories
              </Link>
              <Link to="/deals" className="text-gray-700 hover:text-purple-600 transition-colors">
                Deals
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>

              <Button 
                variant="ghost" 
                size="icon" 
                className="relative text-gray-700 hover:text-purple-600"
                onClick={toggleAssistant}
              >
                <Headphones className="h-6 w-6" />
                <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-[10px] font-bold text-white">
                  AI
                </span>
              </Button>

              <Link to="/account">
                <Button variant="ghost" size="icon" className="text-gray-700 hover:text-purple-600">
                  <User className="h-6 w-6" />
                </Button>
              </Link>

              <Link to="/cart">
                <Button variant="ghost" size="icon" className="relative text-gray-700 hover:text-purple-600">
                  <ShoppingCart className="h-6 w-6" />
                  {totalItems() > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-[10px] font-bold text-white">
                      {totalItems()}
                    </span>
                  )}
                </Button>
              </Link>

              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden text-gray-700"
                onClick={toggleMenu}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-30 bg-white pt-16">
          <nav className="container mx-auto px-4 py-6 flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-lg font-medium p-3 rounded-lg hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className="text-lg font-medium p-3 rounded-lg hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link 
              to="/categories" 
              className="text-lg font-medium p-3 rounded-lg hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
            </Link>
            <Link 
              to="/deals" 
              className="text-lg font-medium p-3 rounded-lg hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Deals
            </Link>
            
            <div className="relative mt-4">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            </div>
          </nav>
        </div>
      )}

      {/* Voice Assistant Dialog */}
      <VoiceAssistant isOpen={isAssistantOpen} onClose={() => setIsAssistantOpen(false)} />
    </>
  );
};

export default Navbar;
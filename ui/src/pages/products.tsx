import React, { useState } from 'react';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { Button } from '../components/ui/button';
import ProductCard from '../components/product-card';

// Mock data
const allProducts = [
  {
    id: 1,
    name: 'Organic Free-Range Eggs',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1598965675045-45c5e72c7d05?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    category: 'Dairy & Eggs',
    rating: 4.5,
  },
  {
    id: 2,
    name: 'Pasture-Raised Brown Eggs',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1569127959161-2b1297b2d9a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    category: 'Dairy & Eggs',
    rating: 4.2,
    discount: 15,
  },
  {
    id: 3,
    name: 'Omega-3 Enriched Eggs',
    price: 7.49,
    image: 'https://images.unsplash.com/photo-1607690424560-8e10faf12075?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    category: 'Dairy & Eggs',
    rating: 4.8,
  },
  {
    id: 4,
    name: 'Organic Avocados',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    category: 'Fruits & Vegetables',
    rating: 4.6,
    discount: 10,
  },
  {
    id: 5,
    name: 'Fresh Strawberries',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    category: 'Fruits & Vegetables',
    rating: 4.3,
  },
  {
    id: 6,
    name: 'Organic Bananas',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    category: 'Fruits & Vegetables',
    rating: 4.1,
    discount: 5,
  },
  {
    id: 7,
    name: 'Grass-Fed Ground Beef',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    category: 'Meat & Seafood',
    rating: 4.7,
  },
  {
    id: 8,
    name: 'Wild-Caught Salmon',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    category: 'Meat & Seafood',
    rating: 4.9,
    discount: 8,
  },
];

const categories = [
  'All Categories',
  'Fruits & Vegetables',
  'Dairy & Eggs',
  'Meat & Seafood',
  'Bakery',
  'Beverages',
  'Snacks',
];

const ProductsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  
  const filteredProducts = selectedCategory === 'All Categories'
    ? allProducts
    : allProducts.filter(product => product.category === selectedCategory);
    
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // featured - no sorting
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">All Products</h1>
        
        <Button 
          variant="outline" 
          className="md:hidden"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Filters - Desktop */}
        <div className="hidden md:block">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="font-semibold mb-4 flex items-center">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </h2>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center">
                    <button
                      className={`text-sm ${selectedCategory === category ? 'text-purple-600 font-medium' : 'text-gray-600'}`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-3">Price Range</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    className="w-full accent-purple-600" 
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">$0</span>
                  <span className="text-sm text-gray-600">$100</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Filters - Mobile */}
        {showFilters && (
          <div className="md:hidden fixed inset-0 z-50 bg-white p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold">Filters</h2>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setShowFilters(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">Categories</h3>
              <div className="space-y-3">
                {categories.map((category) => (
                  <div key={category} className="flex items-center">
                    <button
                      className={`text-sm ${selectedCategory === category ? 'text-purple-600 font-medium' : 'text-gray-600'}`}
                      onClick={() => {
                        setSelectedCategory(category);
                        setShowFilters(false);
                      }}
                    >
                      {category}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">Price Range</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    className="w-full accent-purple-600" 
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">$0</span>
                  <span className="text-sm text-gray-600">$100</span>
                </div>
              </div>
            </div>
            
            <Button 
              className="w-full"
              onClick={() => setShowFilters(false)}
            >
              Apply Filters
            </Button>
          </div>
        )}
        
        {/* Products */}
        <div className="md:col-span-3">
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <p className="text-sm text-gray-600 mb-3 sm:mb-0">
              Showing <span className="font-medium">{sortedProducts.length}</span> products
            </p>
            
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-2">Sort by:</span>
              <select 
                className="text-sm border-gray-300 rounded-md focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
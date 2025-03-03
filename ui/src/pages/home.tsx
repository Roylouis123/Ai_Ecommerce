import React from 'react';
import HeroSection from '../components/hero-section';
import ProductCard from '../components/product-card';
import { ArrowRight, Zap, ShieldCheck, Truck, Headphones } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

// Mock data
const featuredProducts = [
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
];

const categories = [
  { name: 'Fruits & Vegetables', icon: '🥑', color: 'bg-green-100 text-green-800' },
  { name: 'Dairy & Eggs', icon: '🥚', color: 'bg-yellow-100 text-yellow-800' },
  { name: 'Meat & Seafood', icon: '🍗', color: 'bg-red-100 text-red-800' },
  { name: 'Bakery', icon: '🍞', color: 'bg-amber-100 text-amber-800' },
  { name: 'Beverages', icon: '🥤', color: 'bg-blue-100 text-blue-800' },
  { name: 'Snacks', icon: '🍿', color: 'bg-purple-100 text-purple-800' },
];

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />
      
      {/* Categories */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Shop by Category</h2>
            <Link to="/categories" className="text-purple-600 hover:text-purple-700 font-medium flex items-center">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link 
                key={category.name} 
                to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="flex flex-col items-center p-4 rounded-xl hover:shadow-md transition-shadow duration-300"
              >
                <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center text-2xl mb-3`}>
                  {category.icon}
                </div>
                <span className="text-sm font-medium text-gray-700 text-center">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
            <Link to="/products" className="text-purple-600 hover:text-purple-700 font-medium flex items-center">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* AI Assistant Promo */}
      <section className="py-12 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Shop Smarter with AI Voice Assistant</h2>
              <p className="text-purple-100 mb-6">
                Our AI-powered voice assistant helps you find products, compare prices, and checkout faster than ever before.
              </p>
              <Button 
                className="bg-white text-purple-700 hover:bg-gray-100"
                asChild
              >
                <Link to="/assistant">
                  <Headphones className="mr-2 h-5 w-5" />
                  Try Voice Shopping
                </Link>
              </Button>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-white rounded-2xl blur-xl opacity-20"></div>
              <div className="relative bg-gradient-to-br from-purple-900 to-indigo-900 rounded-xl p-6 border border-white/10">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                    <Headphones className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">AI Voice Assistant</h3>
                    <p className="text-sm text-purple-200">Always ready to help</p>
                  </div>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="bg-white/10 p-3 rounded-lg">
                    <p className="text-sm">How can I help you today?</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-lg ml-auto max-w-[80%]">
                    <p className="text-sm">I want to buy some eggs</p>
                  </div>
                  <div className="bg-white/10 p-3 rounded-lg">
                    <p className="text-sm">I found several types of eggs for you. Would you like organic free-range eggs, pasture-raised brown eggs, or omega-3 enriched eggs?</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full mx-1 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">Why Shop With Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Zap className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Get your products delivered to your doorstep within 24 hours.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure Payments</h3>
              <p className="text-gray-600">All transactions are secure and encrypted for your safety.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Truck className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Free Returns</h3>
              <p className="text-gray-600">Not satisfied with your purchase? Return it for free within 30 days.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-gray-600 mb-6">Get the latest updates on new products and upcoming sales.</p>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <Button className="bg-purple-600 hover:bg-purple-700">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
import React from 'react';
import { ArrowRight, ShoppingBag, Headphones } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 text-white">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00eiIvPjwvZz48L2c+PC9zdmc+')]"></div>
      </div>

      <div className="container mx-auto px-4 py-16 sm:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium mb-6">
              <span className="flex h-2 w-2 rounded-full bg-green-400 mr-2"></span>
              New AI Shopping Experience
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
              Shop Smarter with <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Voice AI</span> Assistant
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-300 mb-8">
              Experience the future of shopping with our AI-powered voice assistant. Find products, compare prices, and checkout - all with simple voice commands.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-white text-purple-900 hover:bg-gray-100 font-semibold"
                asChild
              >
                <Link to="/products">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Shop Now
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white/10"
                asChild
              >
                <Link to="/assistant">
                  <Headphones className="mr-2 h-5 w-5" />
                  Try Voice Assistant
                </Link>
              </Button>
            </div>
            
            <div className="mt-12 flex items-center space-x-6">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-purple-900 overflow-hidden">
                    <img 
                      src={`https://randomuser.me/api/portraits/men/${i + 20}.jpg`} 
                      alt="User" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <span className="font-bold">2,000+</span> happy customers
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-xl opacity-30 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden border border-white/10">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="bg-purple-600 p-2 rounded-full">
                      <Headphones className="h-5 w-5" />
                    </div>
                    <span className="font-semibold">AI Assistant</span>
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white/5 p-3 rounded-lg">
                    <p className="text-sm text-gray-300">How can I help you today?</p>
                  </div>
                  
                  <div className="bg-white/5 p-3 rounded-lg ml-auto max-w-[80%]">
                    <p className="text-sm">I want to buy some eggs</p>
                  </div>
                  
                  <div className="bg-white/5 p-3 rounded-lg">
                    <p className="text-sm text-gray-300">I found several types of eggs for you. Would you like organic free-range eggs, pasture-raised brown eggs, or omega-3 enriched eggs?</p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-white/10 p-2 rounded-lg text-center hover:bg-white/20 cursor-pointer transition-colors">
                      <div className="w-full h-12 bg-gray-800 rounded mb-2"></div>
                      <p className="text-xs">Organic Eggs</p>
                      <p className="text-xs text-blue-400">$5.99</p>
                    </div>
                    <div className="bg-white/10 p-2 rounded-lg text-center hover:bg-white/20 cursor-pointer transition-colors">
                      <div className="w-full h-12 bg-gray-800 rounded mb-2"></div>
                      <p className="text-xs">Brown Eggs</p>
                      <p className="text-xs text-blue-400">$6.99</p>
                    </div>
                    <div className="bg-purple-600/30 p-2 rounded-lg text-center border border-purple-500/50">
                      <div className="w-full h-12 bg-gray-800 rounded mb-2"></div>
                      <p className="text-xs">Omega-3 Eggs</p>
                      <p className="text-xs text-blue-400">$7.49</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex items-center">
                  <div className="flex-1">
                    <div className="h-10 bg-white/5 rounded-full px-4 flex items-center">
                      <span className="text-gray-400 text-sm">Ask something...</span>
                    </div>
                  </div>
                  <Button size="icon" className="ml-2 rounded-full bg-purple-600 hover:bg-purple-700">
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
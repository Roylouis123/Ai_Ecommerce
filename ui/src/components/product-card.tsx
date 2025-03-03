import React from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { useCart } from '../hooks/use-cart';
import { useToast } from '../hooks/use-toast';
import { formatPrice } from '../lib/utils';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
    rating: number;
    discount?: number;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addItem(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const discountedPrice = product.discount 
    ? product.price * (1 - product.discount / 100) 
    : product.price;

  return (
    <div className="group relative bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
      {product.discount && (
        <div className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          {product.discount}% OFF
        </div>
      )}
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute top-2 right-2 z-10 bg-white/80 backdrop-blur-sm text-gray-600 hover:text-red-500 hover:bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <Heart className="h-5 w-5" />
      </Button>
      
      <div className="aspect-square overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="p-4">
        <div className="text-xs text-gray-500 mb-1">{product.category}</div>
        <h3 className="font-medium text-gray-900 mb-1 truncate">{product.name}</h3>
        
        <div className="flex items-center mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg 
              key={i} 
              className={`w-4 h-4 ${i < product.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            {product.discount ? (
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-gray-900">{formatPrice(discountedPrice)}</span>
                <span className="text-sm text-gray-500 line-through">{formatPrice(product.price)}</span>
              </div>
            ) : (
              <span className="font-bold text-gray-900">{formatPrice(product.price)}</span>
            )}
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-gray-700 hover:text-purple-600 hover:bg-purple-50"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
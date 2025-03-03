import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Volume2, ChevronLeft, ChevronRight, ShoppingCart, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { useToast } from '../hooks/use-toast';
import { useCart } from '../hooks/use-cart';
import { useNavigate } from 'react-router-dom';

const VoiceAssistant = ({ isOpen, onClose }) => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [response, setResponse] = useState('Hello, how can I assist you?');
    const [isProcessing, setIsProcessing] = useState(false);
    const [products, setProducts] = useState([]);
    const [currentProductIndex, setCurrentProductIndex] = useState(0);
    const [addedToCartItems, setAddedToCartItems] = useState(new Set());
    const { toast } = useToast();
    const { addItem } = useCart();
    const navigate = useNavigate();
    const recognitionRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            resetState();
        }
    }, [isOpen]);

    const resetState = () => {
        setTranscript('');
        setResponse('Hello, how can I assist you?');
        setProducts([]);
        setCurrentProductIndex(0);
        setAddedToCartItems(new Set());
        setIsListening(false);
        setIsProcessing(false);
    };

    const startListening = () => {
        resetState();
        setIsListening(true);
        if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
            toast({ title: 'Not Supported', description: 'Speech recognition is not supported in your browser.', variant: 'destructive' });
            return;
        }
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'en-US';
        recognitionRef.current.onresult = (event) => {
            const text = event.results[0][0].transcript;
            setTranscript(text);
            setIsListening(false);
            processVoiceCommand(text);
        };
        recognitionRef.current.start();
    };

    const processVoiceCommand = async (command) => {
        setIsProcessing(true);
        setResponse('Getting products...');
        try {
            const res = await fetch('http://localhost:5000/api/search/ai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: command })
            });
            const data = await res.json();
            const foundProducts = (data.results || []).map(product => ({
                id: product._id || product.id,
                name: product.name,
                price: product.price,
                image: product.thumbnail || product.image,
            }));
            setProducts(foundProducts);
            setResponse(foundProducts.length ? `Found ${foundProducts.length} products.` : `No products found for "${command}".`);
        } catch {
            setResponse('Error fetching products, please try again.');
        }
        setIsProcessing(false);
    };

    const addToCart = (product) => {
        addItem({ id: product.id, name: product.name, price: product.price, image: product.image });
        setAddedToCartItems(prev => new Set([...prev, product.id]));
        toast({ title: 'Added to Cart', description: `${product.name} added.` });
    };

    const addAllToCart = () => {
        products.forEach(product => addToCart(product));
        onClose();
        navigate('/cart');
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px] bg-gradient-to-br from-indigo-900 to-purple-900 text-white border-none">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold flex items-center gap-2">
                        <Volume2 className="h-5 w-5" /> AI Voice Assistant
                    </DialogTitle>
                    <DialogDescription className="text-gray-300 text-sm">{response}</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col items-center py-4">
                    <Button variant="outline" size="icon" className={`h-14 w-14 rounded-full ${isListening ? 'bg-blue-600' : 'bg-indigo-600'}`} onClick={startListening}>
                        {isListening ? <Mic className="h-6 w-6 text-white" /> : <MicOff className="h-6 w-6 text-white" />}
                    </Button>
                    {isProcessing && <p className="text-blue-300 animate-pulse text-sm mt-2">Getting products...</p>}
                </div>
                {products.length > 0 && (
                    <div className="overflow-y-auto max-h-64 scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-transparent">
                        {products.map(product => (
                            <div key={product.id} className="flex items-center gap-3 p-3 border-b border-white/20">
                                <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                                <div className="flex-1">
                                    <h3 className="text-sm font-medium">{product.name}</h3>
                                    <p className="text-blue-300 text-sm font-bold">${product.price.toFixed(2)}</p>
                                    <Button size="sm" className="mt-1" onClick={() => addToCart(product)}>
                                        {addedToCartItems.has(product.id) ? <Check className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />} Add to Cart
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {products.length > 0 && (
                    <div className="flex justify-between mt-3">
                        <Button variant="outline" onClick={addAllToCart}>Add All to Cart & Close</Button>
                        <Button variant="outline" onClick={() => navigate('/cart')}>Go to Cart</Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default VoiceAssistant;

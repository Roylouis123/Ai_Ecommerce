// File: routes/searchRoutes.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function processQueryWithGemini(query) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // Detect if this might be a recipe request
    const isRecipeRequest = /create|make|cook|prepare|recipe for|how to make/i.test(query);
    
    let prompt;
    
    if (isRecipeRequest) {
      // Specialized prompt for recipe queries
      prompt = `
        The user wants to make or create a dish. Extract the recipe name and all required ingredients.
        
        User query: "${query}"
        
        Return a JSON object with:
        - recipeName: The name of the dish/recipe
        - recipeIngredients: A comprehensive array of ALL ingredients needed (be thorough and include even basic ingredients like salt, oil, etc.)
        - mainKeywords: Key search terms to find the main components
        
        For example, for "create egg rice":
        {
          "recipeName": "egg fried rice",
          "recipeIngredients": ["rice", "eggs", "soy sauce", "green onions", "vegetable oil", "garlic", "salt", "pepper", "peas", "carrots", "onions"],
          "mainKeywords": ["rice", "eggs"]
        }
        
        Be comprehensive and include ALL possible ingredients someone might need.
        
        IMPORTANT: DO NOT use markdown formatting or code blocks. Just return the raw JSON object.
      `;
    } else {
      // Regular product search prompt
      prompt = `
        Extract search parameters from the following user query for an e-commerce product search.
        Query: "${query}"
        
        Return a JSON object with these possible fields:
        - keywords: array of main product keywords (required)
        - category: possible product category
        - brand: possible brand name
        - minPrice: minimum price if specified
        - maxPrice: maximum price if specified
        - attributes: array of other attributes (like "organic", "fresh", etc.)
        
        Only include fields that are explicitly or implicitly mentioned in the query.
        
        IMPORTANT: DO NOT use markdown formatting or code blocks. Just return the raw JSON object.
      `;
    }
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    
    // Parse the JSON response with improved handling of markdown formatting
    let searchParams;
    try {
      // Remove markdown code blocks if present (```json and ```)
      text = text.replace(/```json\n/g, '').replace(/```\n/g, '').replace(/```/g, '');
      
      // Clean up the text to ensure it's valid JSON
      // Remove any leading/trailing whitespace and non-JSON text
      const jsonStartIndex = text.indexOf('{');
      const jsonEndIndex = text.lastIndexOf('}') + 1;
      
      if (jsonStartIndex >= 0 && jsonEndIndex > 0) {
        const jsonString = text.substring(jsonStartIndex, jsonEndIndex);
        searchParams = JSON.parse(jsonString);
      } else {
        throw new Error('No valid JSON found in the response');
      }
      
      // Add recipe flag to the parameters
      if (isRecipeRequest) {
        searchParams.isRecipe = true;
        
        // If keywords not provided, use main ingredients
        if (!searchParams.keywords && searchParams.mainKeywords) {
          searchParams.keywords = searchParams.mainKeywords;
        }
        
        // If we've detected a recipe but no ingredients somehow, add basic ingredients based on recipe name
        if (!searchParams.recipeIngredients || searchParams.recipeIngredients.length === 0) {
          const recipeName = searchParams.recipeName || query.replace(/create|make|cook|prepare|recipe for|how to make|i want to|i need to/gi, '').trim();
          const basicIngredients = recipeName.split(/\s+/).filter(word => word.length > 2);
          searchParams.recipeIngredients = basicIngredients;
          searchParams.recipeName = recipeName;
        }
      }
    } catch (parseError) {
      console.error('Error parsing Gemini response:', parseError);
      console.log('Raw response text:', text);
      
      // Fallback to simple keyword extraction
      searchParams = {
        keywords: [query.replace(/create|make|cook|prepare|recipe for|how to make|i want to|i need to|show me/gi, '').trim()],
        isRecipe: isRecipeRequest
      };
      
      // Basic recipe detection in fallback mode
      if (isRecipeRequest) {
        const dishName = query.replace(/create|make|cook|prepare|recipe for|how to make|i want to|i need to/gi, '').trim();
        searchParams.recipeName = dishName;
        
        // Extract basic ingredients from dish name
        const basicIngredients = dishName.split(/\s+/).filter(word => word.length > 2);
        
        // For common recipes, provide default ingredients
        if (dishName.includes('egg') && dishName.includes('rice')) {
          searchParams.recipeIngredients = ['rice', 'eggs', 'soy sauce', 'green onions', 'vegetable oil', 'garlic', 'salt', 'pepper'];
        } else if (dishName.includes('biryani')) {
          searchParams.recipeIngredients = ['rice', 'chicken', 'yogurt', 'onions', 'tomatoes', 'biryani masala', 'ginger', 'garlic', 'coriander', 'mint'];
        } else {
          searchParams.recipeIngredients = basicIngredients;
        }
      }
    }
    
    return searchParams;
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    // Fallback to simple keyword extraction
    return {
      keywords: [query.replace(/create|make|cook|prepare|recipe for|how to make|i want to|i need to|show me/gi, '').trim()]
    };
  }
}

async function fetchProductsForIngredients(ingredients) {
  const productPromises = ingredients.map(async (ingredient) => {
    const regex = new RegExp(ingredient, 'i');
    const products = await Product.find({
      $or: [
        { name: { $regex: regex } },
        { description: { $regex: regex } },
        { features: { $in: [regex] } }
      ]
    }).limit(3); // Get top 3 matches per ingredient
    
    return {
      ingredient,
      products: products
    };
  });
  
  return Promise.all(productPromises);
}

// POST endpoint for AI-powered product search
router.post('/ai', async (req, res) => {
  try {
    const { query } = req.body;
    
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }
    
    // Process the natural language query with Gemini
    const searchParams = await processQueryWithGemini(query);
    
    let results = [];
    let metadata = {
      interpretedQuery: searchParams,
      isRecipe: searchParams.isRecipe || false
    };
    
    // Handle recipe requests specifically
    if (searchParams.isRecipe && searchParams.recipeIngredients && searchParams.recipeIngredients.length > 0) {
      console.log(`Recipe detected: ${searchParams.recipeName}`);
      console.log(`Searching for ingredients: ${searchParams.recipeIngredients.join(', ')}`);
      
      // Get products for each ingredient
      const ingredientProducts = await fetchProductsForIngredients(searchParams.recipeIngredients);
      
      // Filter out ingredients with no matching products
      const availableIngredients = ingredientProducts.filter(item => item.products.length > 0);
      
      // Flatten all products into a single array for results
      results = availableIngredients.flatMap(item => item.products);
      
      // Add recipe-specific metadata
      metadata = {
        ...metadata,
        recipeName: searchParams.recipeName,
        ingredientGroups: availableIngredients,
        missingIngredients: ingredientProducts
          .filter(item => item.products.length === 0)
          .map(item => item.ingredient),
        totalIngredients: searchParams.recipeIngredients.length
      };
    } else {
      // Handle regular product searches
      const mongoQuery = {};
      
      // Build search query for keywords
      if (searchParams.keywords && searchParams.keywords.length > 0) {
        const keywordTerms = searchParams.keywords.join(' ');
        mongoQuery.$or = [
          { name: { $regex: keywordTerms, $options: 'i' } },
          { description: { $regex: keywordTerms, $options: 'i' } },
          { 'features': { $in: searchParams.keywords.map(k => new RegExp(k, 'i')) } }
        ];
      }
      
      // Add category if provided
      if (searchParams.category) {
        mongoQuery.category = { $regex: searchParams.category, $options: 'i' };
      }
      
      // Add brand if provided
      if (searchParams.brand) {
        mongoQuery.brand = { $regex: searchParams.brand, $options: 'i' };
      }
      
      // Add price range if provided
      if (searchParams.minPrice !== undefined || searchParams.maxPrice !== undefined) {
        mongoQuery.price = {};
        if (searchParams.minPrice !== undefined) {
          mongoQuery.price.$gte = searchParams.minPrice;
        }
        if (searchParams.maxPrice !== undefined) {
          mongoQuery.price.$lte = searchParams.maxPrice;
        }
      }
      
      // Add attributes as additional filters
      if (searchParams.attributes && searchParams.attributes.length > 0) {
        // Applying attributes to description and features
        if (!mongoQuery.$or) mongoQuery.$or = [];
        
        // Match attributes in description or features
        searchParams.attributes.forEach(attr => {
          mongoQuery.$or.push({ description: { $regex: attr, $options: 'i' } });
          mongoQuery.$or.push({ 'features': { $in: [new RegExp(attr, 'i')] } });
        });
      }
      
      // Fetch products from database for regular search
      results = await Product.find(mongoQuery).limit(10);
    }
    
    // Return consistent response format for both search types
    res.json({
      ...metadata,
      results: results,
      count: results.length,
      code:200
    });
  } catch (error) {
    console.error('Error in AI search:', error);
    res.status(500).json({ 
      message: 'Error processing search request', 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

module.exports = router;
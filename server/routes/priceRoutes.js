const express = require('express');
const router = express.Router();
const { searchProduct, getProductDetails } = require('../services/priceService');

// Search for products across multiple platforms
router.get('/search', async (req, res) => {
  try {
    const { query, category } = req.query;
    
    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    console.log(`🔍 Searching for: ${query}`);
    const results = await searchProduct(query, category);
    
    res.json({
      success: true,
      query,
      results,
      totalResults: results.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ 
      error: 'Failed to search products',
      message: error.message 
    });
  }
});

// Get detailed product information
router.get('/product/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const productDetails = await getProductDetails(id);
    
    res.json({
      success: true,
      product: productDetails,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Product details error:', error);
    res.status(500).json({ 
      error: 'Failed to get product details',
      message: error.message 
    });
  }
});

// Get price history (mock endpoint for future implementation)
router.get('/history/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    
    // Mock price history data
    const priceHistory = {
      productId,
      history: [
        { date: '2024-01-01', price: 299.99, platform: 'Amazon' },
        { date: '2024-01-15', price: 289.99, platform: 'Amazon' },
        { date: '2024-02-01', price: 279.99, platform: 'Amazon' },
      ]
    };
    
    res.json({
      success: true,
      priceHistory,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Price history error:', error);
    res.status(500).json({ 
      error: 'Failed to get price history',
      message: error.message 
    });
  }
});

module.exports = router;
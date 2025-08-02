const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

// Platform configurations
const platforms = {
  amazon: {
    name: 'Amazon',
    baseUrl: 'https://www.amazon.com',
    searchUrl: 'https://www.amazon.com/s?k=',
    selectors: {
      productList: '[data-component-type="s-search-result"]',
      title: 'h2 a span',
      price: '.a-price-whole, .a-price .a-offscreen',
      image: '.s-image',
      link: 'h2 a',
      rating: '.a-icon-alt'
    }
  },
  ebay: {
    name: 'eBay',
    baseUrl: 'https://www.ebay.com',
    searchUrl: 'https://www.ebay.com/sch/i.html?_nkw=',
    selectors: {
      productList: '.s-item',
      title: '.s-item__title',
      price: '.s-item__price',
      image: '.s-item__image img',
      link: '.s-item__link',
      rating: '.x-star-rating'
    }
  },
  walmart: {
    name: 'Walmart',
    baseUrl: 'https://www.walmart.com',
    searchUrl: 'https://www.walmart.com/search?q=',
    selectors: {
      productList: '[data-testid="item"]',
      title: '[data-automation-id="product-title"]',
      price: '[data-automation-id="product-price"]',
      image: 'img[data-testid="productTileImage"]',
      link: 'a',
      rating: '[data-testid="reviews-section"]'
    }
  }
};

// Mock data for demonstration (since real scraping requires handling anti-bot measures)
const mockProducts = [
  {
    id: '1',
    title: 'iPhone 15 Pro 128GB',
    price: 999.99,
    originalPrice: 1099.99,
    platform: 'Amazon',
    image: 'https://via.placeholder.com/300x300?text=iPhone+15+Pro',
    url: 'https://amazon.com/iphone-15-pro',
    rating: 4.5,
    reviews: 1250,
    availability: 'In Stock',
    shipping: 'Free Shipping'
  },
  {
    id: '2',
    title: 'iPhone 15 Pro 128GB - Unlocked',
    price: 989.99,
    originalPrice: 1099.99,
    platform: 'eBay',
    image: 'https://via.placeholder.com/300x300?text=iPhone+15+Pro',
    url: 'https://ebay.com/iphone-15-pro',
    rating: 4.3,
    reviews: 890,
    availability: 'In Stock',
    shipping: 'Free Shipping'
  },
  {
    id: '3',
    title: 'Apple iPhone 15 Pro 128GB',
    price: 1049.99,
    originalPrice: 1099.99,
    platform: 'Walmart',
    image: 'https://via.placeholder.com/300x300?text=iPhone+15+Pro',
    url: 'https://walmart.com/iphone-15-pro',
    rating: 4.4,
    reviews: 567,
    availability: 'In Stock',
    shipping: '$5.99 Shipping'
  }
];

// Search products across platforms
async function searchProduct(query, category = '') {
  try {
    console.log(`Searching for: ${query}`);
    
    // For demo purposes, return mock data
    // In production, you would implement actual scraping logic
    const filteredProducts = mockProducts.filter(product => 
      product.title.toLowerCase().includes(query.toLowerCase())
    );

    // Sort by price (lowest first)
    const sortedProducts = filteredProducts.sort((a, b) => a.price - b.price);

    // Add comparison metrics
    const productsWithMetrics = sortedProducts.map((product, index) => {
      const lowestPrice = sortedProducts[0].price;
      const savings = product.price - lowestPrice;
      const savingsPercent = lowestPrice > 0 ? ((savings / lowestPrice) * 100).toFixed(1) : 0;
      
      return {
        ...product,
        rank: index + 1,
        isLowestPrice: index === 0,
        savings: savings.toFixed(2),
        savingsPercent: savingsPercent,
        pricePerformanceScore: calculatePricePerformanceScore(product)
      };
    });

    return productsWithMetrics;
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
}

// Calculate price performance score
function calculatePricePerformanceScore(product) {
  // Simple scoring algorithm based on price, rating, and reviews
  const priceScore = Math.max(0, 100 - (product.price / 10));
  const ratingScore = (product.rating / 5) * 30;
  const reviewScore = Math.min(20, product.reviews / 50);
  
  return Math.round(priceScore * 0.5 + ratingScore + reviewScore);
}

// Get detailed product information
async function getProductDetails(productId) {
  try {
    const product = mockProducts.find(p => p.id === productId);
    
    if (!product) {
      throw new Error('Product not found');
    }

    // Add detailed information
    return {
      ...product,
      description: `High-quality ${product.title} with excellent features and performance.`,
      specifications: {
        brand: 'Apple',
        model: 'iPhone 15 Pro',
        storage: '128GB',
        color: 'Natural Titanium',
        warranty: '1 Year Limited Warranty'
      },
      priceHistory: [
        { date: '2024-01-01', price: 1099.99 },
        { date: '2024-01-15', price: 1049.99 },
        { date: '2024-02-01', price: product.price }
      ]
    };
  } catch (error) {
    console.error('Error getting product details:', error);
    throw error;
  }
}

// Real scraping function (for reference - requires handling anti-bot measures)
async function scrapeWithPuppeteer(url, selectors) {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    
    const products = await page.evaluate((selectors) => {
      const productElements = document.querySelectorAll(selectors.productList);
      const results = [];
      
      productElements.forEach((element, index) => {
        if (index < 10) { // Limit to first 10 results
          const title = element.querySelector(selectors.title)?.textContent?.trim();
          const price = element.querySelector(selectors.price)?.textContent?.trim();
          const image = element.querySelector(selectors.image)?.src;
          const link = element.querySelector(selectors.link)?.href;
          
          if (title && price) {
            results.push({
              title,
              price: parsePrice(price),
              image,
              url: link
            });
          }
        }
      });
      
      return results;
    }, selectors);
    
    return products;
  } catch (error) {
    console.error('Puppeteer scraping error:', error);
    return [];
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Helper function to parse price from text
function parsePrice(priceText) {
  if (!priceText) return 0;
  const match = priceText.match(/[\d,]+\.?\d*/);
  return match ? parseFloat(match[0].replace(/,/g, '')) : 0;
}

module.exports = {
  searchProduct,
  getProductDetails,
  platforms
};
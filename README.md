# 🛒 PriceCompare - Price Comparison Website

A comprehensive price comparison website that helps users find the best deals across multiple e-commerce platforms. Built with React, Node.js, and modern web technologies.

## ✨ Features

- **Multi-Platform Price Comparison**: Compare prices across Amazon, eBay, Walmart, and more
- **Real-time Search**: Instant search results with product filtering
- **Responsive Design**: Mobile-first design that works on all devices
- **Product Details**: Detailed product information with specifications and price history
- **Best Deal Detection**: Automatically highlights the lowest prices
- **Modern UI**: Beautiful, intuitive interface with smooth animations
- **Price History**: Track price changes over time
- **Category Browsing**: Browse products by popular categories

## 🚀 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Styled Components** for styling
- **React Router** for navigation
- **Axios** for API calls
- **React Icons** for beautiful icons

### Backend
- **Node.js** with Express.js
- **Puppeteer** for web scraping
- **Cheerio** for HTML parsing
- **Helmet** for security
- **Rate limiting** for API protection

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd price-comparison-website
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Environment setup**
   ```bash
   cd server
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the development servers**
   ```bash
   # From the root directory
   npm run dev
   ```

   This will start:
   - Backend server on http://localhost:5000
   - Frontend development server on http://localhost:3000

## 🔧 Available Scripts

### Root Directory
- `npm start` - Start both frontend and backend in production mode
- `npm run dev` - Start both servers in development mode
- `npm run install-all` - Install dependencies for all packages

### Backend (`/server`)
- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon

### Frontend (`/client`)
- `npm start` - Start the development server
- `npm run build` - Build for production
- `npm test` - Run tests

## 🏗️ Project Structure

```
price-comparison-website/
├── client/                 # React frontend
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── styles/        # Global styles
│   │   └── App.tsx        # Main app component
│   └── package.json
├── server/                # Node.js backend
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   ├── index.js          # Server entry point
│   └── package.json
├── package.json          # Root package.json
└── README.md
```

## 🔍 API Endpoints

### Search Products
```
GET /api/prices/search?query=<search_term>&category=<category>
```

### Get Product Details
```
GET /api/prices/product/:id
```

### Get Price History
```
GET /api/prices/history/:productId
```

### Health Check
```
GET /health
```

## 🎨 Features in Detail

### 1. **Smart Search**
- Instant search across multiple platforms
- Category filtering
- Sorting by price, rating, and relevance

### 2. **Price Comparison**
- Side-by-side price comparison
- Savings calculation
- Best deal highlighting
- Price performance scoring

### 3. **Product Details**
- Comprehensive product information
- User reviews and ratings
- Shipping information
- Price history charts

### 4. **Responsive Design**
- Mobile-first approach
- Grid and list view options
- Touch-friendly interface
- Fast loading times

## 🛡️ Security Features

- Rate limiting to prevent abuse
- Helmet.js for security headers
- CORS configuration
- Input validation and sanitization

## 🚀 Deployment

### Using Docker (Recommended)
```bash
# Build and run with Docker Compose
docker-compose up --build
```

### Manual Deployment
1. Build the frontend:
   ```bash
   cd client && npm run build
   ```

2. Start the backend:
   ```bash
   cd server && npm start
   ```

## 🔮 Future Enhancements

- [ ] Real-time price alerts
- [ ] User accounts and watchlists
- [ ] Advanced filtering options
- [ ] Mobile app development
- [ ] AI-powered recommendations
- [ ] Coupon and deal integration
- [ ] Social sharing features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Thanks to all the open-source libraries that made this project possible
- Icons provided by [Feather Icons](https://feathericons.com/)
- Fonts from [Google Fonts](https://fonts.google.com/)

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact us at support@pricecompare.com.

---

Made with ❤️ by the PriceCompare Team
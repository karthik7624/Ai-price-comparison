import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiStar, FiTruck, FiExternalLink, FiFilter, FiGrid, FiList } from 'react-icons/fi';
import axios from 'axios';

const SearchContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 20px;
`;

const SearchHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const SearchInfo = styled.div`
  h1 {
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
    color: #1a202c;
  }
  
  p {
    color: #6b7280;
  }
`;

const ViewControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ViewToggle = styled.div`
  display: flex;
  background: white;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  overflow: hidden;
`;

const ViewButton = styled.button<{ active: boolean }>`
  padding: 0.5rem 1rem;
  background: ${props => props.active ? '#667eea' : 'white'};
  color: ${props => props.active ? 'white' : '#6b7280'};
  border: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.active ? '#5a67d8' : '#f9fafb'};
  }
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  color: #6b7280;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #667eea;
    color: #667eea;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  font-size: 1.1rem;
  color: #6b7280;
`;

const ProductsGrid = styled.div<{ view: 'grid' | 'list' }>`
  display: grid;
  grid-template-columns: ${props => props.view === 'grid' ? 'repeat(auto-fill, minmax(300px, 1fr))' : '1fr'};
  gap: 1.5rem;
`;

const ProductCard = styled.div<{ view: 'grid' | 'list' }>`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #f3f4f6;
  transition: all 0.3s ease;
  display: ${props => props.view === 'list' ? 'flex' : 'block'};
  gap: ${props => props.view === 'list' ? '1.5rem' : '0'};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
    border-color: #667eea;
  }
`;

const ProductImage = styled.img<{ view: 'grid' | 'list' }>`
  width: ${props => props.view === 'list' ? '150px' : '100%'};
  height: ${props => props.view === 'list' ? '150px' : '200px'};
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: ${props => props.view === 'grid' ? '1rem' : '0'};
  flex-shrink: 0;
`;

const ProductInfo = styled.div`
  flex: 1;
`;

const ProductTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1a202c;
  line-height: 1.4;
`;

const ProductPlatform = styled.div`
  display: inline-block;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const ProductPrice = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const CurrentPrice = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: #059669;
`;

const OriginalPrice = styled.span`
  font-size: 1rem;
  color: #9ca3af;
  text-decoration: line-through;
`;

const Discount = styled.span`
  background: #fef3c7;
  color: #92400e;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const ProductMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #6b7280;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const ProductActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: auto;
`;

const ActionButton = styled.a`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  }
`;

const ViewButton2 = styled(Link)`
  padding: 0.75rem 1rem;
  background: white;
  color: #667eea;
  text-decoration: none;
  border: 1px solid #667eea;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease;
  
  &:hover {
    background: #667eea;
    color: white;
  }
`;

const BestDealBadge = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #10b981;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
`;

const RelativeContainer = styled.div`
  position: relative;
`;

interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  platform: string;
  image: string;
  url: string;
  rating: number;
  reviews: number;
  availability: string;
  shipping: string;
  isLowestPrice: boolean;
  savings: string;
  savingsPercent: string;
}

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  
  const query = searchParams.get('q') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      if (!query) return;
      
      setLoading(true);
      try {
        const response = await axios.get(`/api/prices/search?query=${encodeURIComponent(query)}`);
        setProducts(response.data.results || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  if (loading) {
    return (
      <SearchContainer>
        <LoadingContainer>
          🔍 Searching for the best deals...
        </LoadingContainer>
      </SearchContainer>
    );
  }

  return (
    <SearchContainer>
      <SearchHeader>
        <SearchInfo>
          <h1>Search Results for "{query}"</h1>
          <p>{products.length} products found across multiple platforms</p>
        </SearchInfo>
        
        <ViewControls>
          <ViewToggle>
            <ViewButton 
              active={view === 'grid'} 
              onClick={() => setView('grid')}
            >
              <FiGrid size={16} />
              Grid
            </ViewButton>
            <ViewButton 
              active={view === 'list'} 
              onClick={() => setView('list')}
            >
              <FiList size={16} />
              List
            </ViewButton>
          </ViewToggle>
          
          <FilterButton>
            <FiFilter size={16} />
            Filters
          </FilterButton>
        </ViewControls>
      </SearchHeader>

      <ProductsGrid view={view}>
        {products.map((product) => (
          <RelativeContainer key={product.id}>
            <ProductCard view={view}>
              {product.isLowestPrice && <BestDealBadge>Best Deal</BestDealBadge>}
              
              <ProductImage 
                src={product.image} 
                alt={product.title}
                view={view}
              />
              
              <ProductInfo>
                <ProductPlatform>{product.platform}</ProductPlatform>
                <ProductTitle>{product.title}</ProductTitle>
                
                <ProductPrice>
                  <CurrentPrice>${product.price}</CurrentPrice>
                  {product.originalPrice > product.price && (
                    <>
                      <OriginalPrice>${product.originalPrice}</OriginalPrice>
                      <Discount>Save ${(product.originalPrice - product.price).toFixed(2)}</Discount>
                    </>
                  )}
                </ProductPrice>
                
                <ProductMeta>
                  <Rating>
                    <FiStar fill="#fbbf24" color="#fbbf24" size={14} />
                    {product.rating} ({product.reviews} reviews)
                  </Rating>
                  <span>•</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <FiTruck size={14} />
                    {product.shipping}
                  </div>
                </ProductMeta>
                
                <ProductActions>
                  <ActionButton href={product.url} target="_blank" rel="noopener noreferrer">
                    <FiExternalLink size={16} />
                    View Deal
                  </ActionButton>
                  <ViewButton2 to={`/product/${product.id}`}>
                    Details
                  </ViewButton2>
                </ProductActions>
              </ProductInfo>
            </ProductCard>
          </RelativeContainer>
        ))}
      </ProductsGrid>
      
      {products.length === 0 && !loading && (
        <LoadingContainer>
          No products found for "{query}". Try a different search term.
        </LoadingContainer>
      )}
    </SearchContainer>
  );
};

export default SearchResults;
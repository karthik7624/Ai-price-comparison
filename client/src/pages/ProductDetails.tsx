import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiArrowLeft, FiStar, FiTruck, FiExternalLink, FiTrendingUp, FiShield } from 'react-icons/fi';
import axios from 'axios';

const DetailsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 20px;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #667eea;
  text-decoration: none;
  margin-bottom: 2rem;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ProductHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  max-width: 500px;
  height: 400px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
`;

const ProductInfo = styled.div``;

const ProductTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1a202c;
  line-height: 1.3;
`;

const ProductPlatform = styled.div`
  display: inline-block;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
`;

const PriceSection = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
`;

const CurrentPrice = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #059669;
  margin-bottom: 0.5rem;
`;

const PriceComparison = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const OriginalPrice = styled.span`
  font-size: 1.2rem;
  color: #9ca3af;
  text-decoration: line-through;
`;

const Savings = styled.span`
  background: #fef3c7;
  color: #92400e;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 600;
`;

const ProductMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const PrimaryButton = styled.a`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  }
`;

const SecondaryButton = styled.button`
  padding: 1rem 2rem;
  background: white;
  color: #667eea;
  border: 2px solid #667eea;
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.2s ease;
  
  &:hover {
    background: #667eea;
    color: white;
  }
`;

const SpecsSection = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #1a202c;
`;

const SpecsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const SpecItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f3f4f6;
  
  &:last-child {
    border-bottom: none;
  }
`;

const SpecLabel = styled.span`
  color: #6b7280;
  font-weight: 500;
`;

const SpecValue = styled.span`
  color: #1a202c;
  font-weight: 600;
`;

const Description = styled.p`
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const PriceHistorySection = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

const PriceHistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const HistoryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 8px;
`;

const HistoryDate = styled.span`
  color: #6b7280;
  font-weight: 500;
`;

const HistoryPrice = styled.span`
  color: #1a202c;
  font-weight: 600;
  font-size: 1.1rem;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  font-size: 1.1rem;
  color: #6b7280;
`;

interface ProductDetail {
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
  description: string;
  specifications: {
    [key: string]: string;
  };
  priceHistory: Array<{
    date: string;
    price: number;
  }>;
}

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const response = await axios.get(`/api/prices/product/${id}`);
        setProduct(response.data.product);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return (
      <DetailsContainer>
        <LoadingContainer>
          📦 Loading product details...
        </LoadingContainer>
      </DetailsContainer>
    );
  }

  if (!product) {
    return (
      <DetailsContainer>
        <LoadingContainer>
          Product not found
        </LoadingContainer>
      </DetailsContainer>
    );
  }

  return (
    <DetailsContainer>
      <BackButton to="/search">
        <FiArrowLeft size={18} />
        Back to Search Results
      </BackButton>

      <ProductHeader>
        <ProductImage src={product.image} alt={product.title} />
        
        <ProductInfo>
          <ProductPlatform>{product.platform}</ProductPlatform>
          <ProductTitle>{product.title}</ProductTitle>
          
          <PriceSection>
            <CurrentPrice>${product.price}</CurrentPrice>
            
            {product.originalPrice > product.price && (
              <PriceComparison>
                <OriginalPrice>${product.originalPrice}</OriginalPrice>
                <Savings>
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </Savings>
              </PriceComparison>
            )}
          </PriceSection>
          
          <ProductMeta>
            <Rating>
              <FiStar fill="#fbbf24" color="#fbbf24" size={18} />
              <span>{product.rating} ({product.reviews} reviews)</span>
            </Rating>
            
            <MetaItem>
              <FiTruck size={18} />
              <span>{product.shipping}</span>
            </MetaItem>
            
            <MetaItem>
              <FiShield size={18} />
              <span>{product.availability}</span>
            </MetaItem>
          </ProductMeta>
          
          <ActionButtons>
            <PrimaryButton href={product.url} target="_blank" rel="noopener noreferrer">
              <FiExternalLink size={20} />
              Buy Now on {product.platform}
            </PrimaryButton>
            <SecondaryButton>
              Add to Watchlist
            </SecondaryButton>
          </ActionButtons>
        </ProductInfo>
      </ProductHeader>

      <SpecsSection>
        <SectionTitle>Product Description</SectionTitle>
        <Description>{product.description}</Description>
        
        <SectionTitle>Specifications</SectionTitle>
        <SpecsList>
          {Object.entries(product.specifications).map(([key, value]) => (
            <SpecItem key={key}>
              <SpecLabel>{key}:</SpecLabel>
              <SpecValue>{value}</SpecValue>
            </SpecItem>
          ))}
        </SpecsList>
      </SpecsSection>

      <PriceHistorySection>
        <SectionTitle>
          <FiTrendingUp size={24} style={{ marginRight: '0.5rem' }} />
          Price History
        </SectionTitle>
        <PriceHistoryList>
          {product.priceHistory.map((item, index) => (
            <HistoryItem key={index}>
              <HistoryDate>{new Date(item.date).toLocaleDateString()}</HistoryDate>
              <HistoryPrice>${item.price}</HistoryPrice>
            </HistoryItem>
          ))}
        </PriceHistoryList>
      </PriceHistorySection>
    </DetailsContainer>
  );
};

export default ProductDetails;
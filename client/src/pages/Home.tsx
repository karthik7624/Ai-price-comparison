import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiSearch, FiSmartphone, FiMonitor, FiHeadphones, FiCamera, FiWatch, FiShoppingBag } from 'react-icons/fi';

const HomeContainer = styled.div`
  min-height: calc(100vh - 80px);
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  padding: 4rem 0;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: #6b7280;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const SearchContainer = styled.div`
  max-width: 600px;
  margin: 0 auto 3rem;
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  background: white;
  border-radius: 50px;
  padding: 0.5rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  padding: 1rem 1.5rem;
  font-size: 1.1rem;
  border-radius: 50px;
  background: transparent;
  
  &::placeholder {
    color: #9ca3af;
  }
`;

const SearchButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  }
`;

const StatsSection = styled.section`
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
  }
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #667eea;
`;

const StatLabel = styled.div`
  color: #6b7280;
  font-weight: 500;
`;

const CategoriesSection = styled.section`
  padding: 4rem 0;
  background: white;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #1a202c;
`;

const CategoriesGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
`;

const CategoryCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #f3f4f6;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    border-color: #667eea;
  }
`;

const CategoryIcon = styled.div`
  width: 60px;
  height: 60px;
  margin: 0 auto 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const CategoryName = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #1a202c;
`;

const CategoryDescription = styled.p`
  color: #6b7280;
  font-size: 0.9rem;
`;

const categories = [
  { icon: FiSmartphone, name: 'Smartphones', description: 'Latest mobile phones', query: 'smartphone' },
  { icon: FiMonitor, name: 'Laptops', description: 'Computers & laptops', query: 'laptop' },
  { icon: FiHeadphones, name: 'Audio', description: 'Headphones & speakers', query: 'headphones' },
  { icon: FiCamera, name: 'Cameras', description: 'Digital cameras', query: 'camera' },
  { icon: FiWatch, name: 'Wearables', description: 'Smart watches & fitness', query: 'smartwatch' },
  { icon: FiShoppingBag, name: 'Fashion', description: 'Clothing & accessories', query: 'fashion' }
];

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleCategoryClick = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <HomeContainer>
      <HeroSection>
        <HeroContent>
          <HeroTitle>Find the Best Deals</HeroTitle>
          <HeroSubtitle>
            Compare prices across multiple platforms and save money on your purchases
          </HeroSubtitle>
          
          <SearchContainer>
            <SearchForm onSubmit={handleSearch}>
              <SearchInput
                type="text"
                placeholder="What are you looking for today?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <SearchButton type="submit">
                <FiSearch size={20} />
                Compare Prices
              </SearchButton>
            </SearchForm>
          </SearchContainer>
          
          <StatsSection>
            <StatItem>
              <StatNumber>10M+</StatNumber>
              <StatLabel>Products Compared</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>50+</StatNumber>
              <StatLabel>Online Stores</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>$2.5M</StatNumber>
              <StatLabel>Money Saved</StatLabel>
            </StatItem>
          </StatsSection>
        </HeroContent>
      </HeroSection>
      
      <CategoriesSection>
        <SectionTitle>Popular Categories</SectionTitle>
        <CategoriesGrid>
          {categories.map((category, index) => (
            <CategoryCard 
              key={index} 
              onClick={() => handleCategoryClick(category.query)}
            >
              <CategoryIcon>
                <category.icon size={24} />
              </CategoryIcon>
              <CategoryName>{category.name}</CategoryName>
              <CategoryDescription>{category.description}</CategoryDescription>
            </CategoryCard>
          ))}
        </CategoriesGrid>
      </CategoriesSection>
    </HomeContainer>
  );
};

export default Home;
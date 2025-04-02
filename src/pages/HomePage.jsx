import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import axios from 'axios';

function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products/featured');
        setFeaturedProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching featured products:', err);
        setError('Failed to load featured products. Please try again later.');
        setLoading(false);
        
        // Fallback to sample data for demo purposes
        setFeaturedProducts([
          {
            id: 1,
            name: 'Organic Apples',
            description: 'Fresh organic apples from local farms.',
            price: 2.99,
            unit: 'lb',
            category: 'fruits',
            image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce',
            featured: true
          },
          {
            id: 2,
            name: 'Fresh Spinach',
            description: 'Nutrient-rich spinach, perfect for salads and cooking.',
            price: 3.49,
            unit: 'bunch',
            category: 'vegetables',
            image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb',
            featured: true
          },
          {
            id: 3,
            name: 'Organic Strawberries',
            description: 'Sweet and juicy organic strawberries.',
            price: 4.99,
            unit: 'pint',
            category: 'fruits',
            image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6',
            featured: true
          },
          {
            id: 4,
            name: 'Fresh Broccoli',
            description: 'Crisp and nutritious broccoli florets.',
            price: 2.79,
            unit: 'head',
            category: 'vegetables',
            image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a',
            featured: true
          }
        ]);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-96 bg-green-100">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary-dark/80"></div>
        <div className="container-custom relative h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Fresh Fruits & Vegetables
          </h1>
          <p className="text-xl text-white mb-8 max-w-2xl">
            Farm-fresh produce delivered to your doorstep. Healthy eating made easy.
          </p>
          <Link to="/products" className="btn bg-white text-primary hover:bg-gray-100 inline-block w-max">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
          
          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <Link to="/products" className="btn btn-primary">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 bg-gray-100">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 rounded-full p-5 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fresh & Organic</h3>
              <p className="text-gray-600">All our products are fresh, organic, and locally sourced from trusted farms.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 rounded-full p-5 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">We deliver to your doorstep within 24 hours of placing your order.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 rounded-full p-5 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-600">Our blockchain payment system ensures secure and transparent transactions.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
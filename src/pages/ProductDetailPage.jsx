import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product details. Please try again later.');
        setLoading(false);
        
        // Fallback to sample data for demo
        const sampleProducts = [
          {
            id: 1,
            name: 'Organic Apples',
            description: 'Fresh organic apples from local farms. These apples are grown without pesticides or synthetic fertilizers, making them a healthy choice for you and your family. Rich in fiber and antioxidants, they\'re perfect for snacking, baking, or adding to salads.',
            price: 2.99,
            unit: 'lb',
            category: 'fruits',
            image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce',
            featured: true,
            nutrition: {
              calories: 95,
              fat: '0.3g',
              carbs: '25g',
              protein: '0.5g',
              fiber: '4g'
            },
            origin: 'Local Farms, USA'
          },
          {
            id: 2,
            name: 'Fresh Spinach',
            description: 'Nutrient-rich spinach, perfect for salads and cooking. Our spinach is carefully grown and harvested at peak freshness to ensure the best flavor and highest nutritional value. It\'s an excellent source of vitamins A, C, and K, as well as iron and folate.',
            price: 3.49,
            unit: 'bunch',
            category: 'vegetables',
            image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb',
            featured: true,
            nutrition: {
              calories: 23,
              fat: '0.4g',
              carbs: '3.6g',
              protein: '2.9g',
              fiber: '2.2g'
            },
            origin: 'California, USA'
          }
        ];
        
        const found = sampleProducts.find(p => p.id === parseInt(id));
        if (found) {
          setProduct(found);
        } else {
          setError('Product not found.');
        }
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    setQuantity(value >= 1 ? value : 1);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  if (loading) {
    return (
      <div className="container-custom py-12 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container-custom py-12">
        <div className="bg-red-50 p-4 rounded-md">
          <p className="text-red-500">{error || 'Product not found'}</p>
          <Link to="/products" className="text-primary hover:underline mt-2 inline-block">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <div className="mb-4">
        <Link to="/products" className="text-primary hover:underline flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Products
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Product Image */}
          <div className="aspect-w-4 aspect-h-3 md:aspect-w-3 md:aspect-h-4">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          
          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
              <span className="text-gray-500 ml-2">/ {product.unit}</span>
            </div>
            
            <p className="text-gray-700 mb-6">{product.description}</p>
            
            {/* Nutrition Info (if available) */}
            {product.nutrition && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Nutrition Facts</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Calories:</span>
                    <span>{product.nutrition.calories}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fat:</span>
                    <span>{product.nutrition.fat}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Carbs:</span>
                    <span>{product.nutrition.carbs}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Protein:</span>
                    <span>{product.nutrition.protein}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fiber:</span>
                    <span>{product.nutrition.fiber}</span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Origin (if available) */}
            {product.origin && (
              <div className="mb-6">
                <span className="text-sm text-gray-500">Origin: {product.origin}</span>
              </div>
            )}
            
            {/* Add to Cart */}
            <div className="flex items-center gap-4">
              <div className="w-24">
                <label htmlFor="quantity" className="sr-only">Quantity</label>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-full border-gray-300 rounded-md shadow-sm py-2 px-3"
                />
              </div>
              
              <button 
                onClick={handleAddToCart}
                className="btn btn-primary flex-1"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
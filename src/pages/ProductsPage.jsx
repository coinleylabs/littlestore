import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import axios from 'axios';

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
        setLoading(false);
        
        // Fallback to sample data for demo purposes
        setProducts([
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
          },
          {
            id: 5,
            name: 'Ripe Bananas',
            description: 'Sweet and ripe bananas, perfect for snacking.',
            price: 1.99,
            unit: 'lb',
            category: 'fruits',
            image: 'https://images.unsplash.com/photo-1543218024-57a70143c369',
            featured: false
          },
          {
            id: 6,
            name: 'Fresh Carrots',
            description: 'Crunchy carrots, great for cooking or snacking.',
            price: 2.49,
            unit: 'bunch',
            category: 'vegetables',
            image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7',
            featured: false
          },
          {
            id: 7,
            name: 'Red Bell Peppers',
            description: 'Sweet and crunchy red bell peppers.',
            price: 3.99,
            unit: 'lb',
            category: 'vegetables',
            image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83',
            featured: false
          },
          {
            id: 8,
            name: 'Avocados',
            description: 'Creamy and nutritious avocados.',
            price: 2.49,
            unit: 'each',
            category: 'fruits',
            image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578',
            featured: false
          }
        ]);
      }
    };

    fetchProducts();
  }, []);

  // Filter products by category and search term
  const filteredProducts = products.filter(product => {
    // Filter by category
    if (filter !== 'all' && product.category !== filter) {
      return false;
    }
    
    // Filter by search term
    if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Products</h1>
      
      {/* Search and Filter */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`btn ${filter === 'all' ? 'btn-primary' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('fruits')}
            className={`btn ${filter === 'fruits' ? 'btn-primary' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
          >
            Fruits
          </button>
          <button
            onClick={() => setFilter('vegetables')}
            className={`btn ${filter === 'vegetables' ? 'btn-primary' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
          >
            Vegetables
          </button>
        </div>
      </div>
      
      {/* Products Grid */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <div className="text-center text-red-500 py-12">{error}</div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductsPage;
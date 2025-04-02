import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';

// Import your blockchain payment SDK
// import BlockchainPayment from 'your-blockchain-payment-sdk';

function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems, subtotal, clearCart } = useCart();
  
  // Shipping information state
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    phone: ''
  });
  
  // Payment state
  const [paymentMethod, setPaymentMethod] = useState('blockchain');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  
  // Calculate order totals
  const shippingCost = subtotal > 50 ? 0 : 5.99;
  const taxRate = 0.08;
  const tax = subtotal * taxRate;
  const total = subtotal + shippingCost + tax;
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setError(null);
    
    try {
      // Create order object
      const order = {
        items: cartItems,
        customer: shippingInfo,
        totals: {
          subtotal,
          shipping: shippingCost,
          tax,
          total
        },
        paymentMethod
      };
      
      // First, submit order to backend
      const orderResponse = await axios.post('http://localhost:5000/api/orders', order);
      const orderId = orderResponse.data.id;
      
      // Initialize blockchain payment with your SDK
      if (paymentMethod === 'blockchain') {
        // Replace with your actual blockchain payment SDK implementation
        // const blockchainPayment = new BlockchainPayment({
        //   apiKey: 'your-api-key',
        //   environment: 'sandbox' // or 'production'
        // });
        
        // Simulate blockchain payment
        console.log('Processing blockchain payment for order:', orderId);
        
        // Simulate payment processing time
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Process payment
        // const paymentResult = await blockchainPayment.createPayment({
        //   orderId,
        //   amount: total,
        //   currency: 'USD',
        //   description: `Order #${orderId}`,
        //   metadata: {
        //     customerId: shippingInfo.email,
        //     products: cartItems.map(item => item.id)
        //   }
        // });
        
        // Simulate successful payment
        const paymentResult = {
          status: 'success',
          transactionId: `tx_${Math.random().toString(36).substring(2, 15)}`,
          timestamp: new Date().toISOString()
        };
        
        // Update order with payment info
        await axios.put(`http://localhost:5000/api/orders/${orderId}`, {
          paymentStatus: 'paid',
          paymentDetails: paymentResult
        });
        
        // Clear cart and redirect to success page
        clearCart();
        navigate('/order-success', { 
          state: { 
            orderId,
            total,
            paymentDetails: paymentResult
          } 
        });
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setError('There was a problem processing your payment. Please try again.');
    } finally {
      setProcessing(false);
    }
  };
  
  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }
  
  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Checkout Form */}
        <div>
          <form onSubmit={handleSubmit}>
            {/* Shipping Information */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name*
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={shippingInfo.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div className="col-span-1">
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name*
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={shippingInfo.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div className="col-span-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={shippingInfo.email}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div className="col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Address*
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={shippingInfo.address}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div className="col-span-1">
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    City*
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={shippingInfo.city}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div className="col-span-1">
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                    State/Province*
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={shippingInfo.state}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div className="col-span-1">
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP/Postal Code*
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={shippingInfo.zipCode}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div className="col-span-1">
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                    Country*
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={shippingInfo.country}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="AU">Australia</option>
                  </select>
                </div>
                
                <div className="col-span-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number*
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={shippingInfo.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>
            
            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    id="blockchain"
                    name="paymentMethod"
                    type="radio"
                    checked={paymentMethod === 'blockchain'}
                    onChange={() => setPaymentMethod('blockchain')}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                  />
                  <label htmlFor="blockchain" className="ml-3 block text-sm font-medium text-gray-700">
                    Blockchain Payment
                  </label>
                </div>
                
                {paymentMethod === 'blockchain' && (
                  <div className="ml-7 mt-2 bg-green-50 p-3 rounded-md">
                    <p className="text-sm text-green-700">
                      You'll be redirected to complete the payment securely using our blockchain gateway.
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Submit Order */}
            <div className="bg-white rounded-lg shadow-md p-6">
              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
                  {error}
                </div>
              )}
              
              <button
                type="submit"
                className="w-full btn btn-primary"
                disabled={processing}
              >
                {processing ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Place Order'
                )}
              </button>
            </div>
          </form>
        </div>
        
        {/* Order Summary */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            <div className="max-h-96 overflow-y-auto mb-4">
              <ul className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <li key={item.id} className="py-3 flex items-center">
                    <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                      <img 
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-3 border-t pt-3">
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Subtotal</p>
                <p className="text-sm font-medium text-gray-900">${subtotal.toFixed(2)}</p>
              </div>
              
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Shipping</p>
                <p className="text-sm font-medium text-gray-900">
                  {shippingCost === 0 
                    ? <span className="text-green-600">Free</span> 
                    : `$${shippingCost.toFixed(2)}`
                  }
                </p>
              </div>
              
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Tax (8%)</p>
                <p className="text-sm font-medium text-gray-900">${tax.toFixed(2)}</p>
              </div>
              
              <div className="flex justify-between border-t pt-3">
                <p className="text-base font-medium text-gray-900">Total</p>
                <p className="text-base font-bold text-primary">${total.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
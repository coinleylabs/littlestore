// import React from 'react'
// import { Route, Routes } from 'react-router-dom'
// import Home from './pages/Home'
// import Calculator from './pages/Calculator'
// import SolarCheckout from './pages/SolarCheckout'
// import Products from './pages/Products'
// import ProductDetails from './pages/ProductDetails'
// import Dashboard from './pages/Dashboard'
// import Order from './pages/Order'
// import CreateBill from './pages/CreateBill'
// import Billing from './pages/Billing'
// import Register from './pages/Register'
// import Login from './pages/Login'
// import Admin from './pages/Admin'
// import { CreateTown } from './pages/CreateTown'
// import CreateProduct from './pages/CreateProduct'
// import CreateCategory from './pages/CreateCategory'
// import Cart from './pages/Cart'
// import Purchases from './pages/Purchases'
// import ViewPurchase from './pages/ViewPurchase'
// import ProductTable from './pages/ProductTable'
// import EditProduct from './pages/EditProduct'
// import { CreateBrand } from './pages/CreateBrand'
// import EnquiryTable from './pages/EnquiryTable'
// import ViewEnquiry from './pages/ViewEnquiry'
// import SendEstimate from './pages/SendEstimate'
// import TermsAndConditions from './pages/TermsAndConditions'


// const App = () => {
//   return (
// <Routes>
// <Route exact path="/" element={<Home/>}/>
// <Route exact path="/register" element={<Register/>}/>
// <Route exact path="/login" element={<Login/>}/>
// <Route exact path="/admin" element={<Admin/>}/>
// <Route exact path="/calculator" element={<Calculator/>}/>
// <Route exact path="/products" element={<Products/>}/>
// <Route exact path="/productdetails/:id" element={<ProductDetails/>}/>
// <Route exact path="/cart" element={<Cart/>}/>
// <Route exact path="/checkout" element={<SolarCheckout/>}/>
// <Route exact path="/dashboard" element={<Dashboard/>}/>
// <Route exact path="/orders" element={<Order/>}/>
// <Route exact path="/billing" element={<Billing/>}/>
// <Route exact path="/createbill" element={<CreateBill/>}/>
// <Route exact path="/purchases" element={<Purchases/>}/>
// <Route exact path="/viewpurchase/:id" element={<ViewPurchase/>}/>
// <Route exact path="/viewenquiry/:id" element={<ViewEnquiry/>}/>
// <Route exact path="/producttable" element={<ProductTable/>}/>
// <Route exact path="/enquirytable" element={<EnquiryTable/>}/>
// <Route exact path="/createproduct" element={<CreateProduct />}/>
// <Route exact path="/createtown" element={<CreateTown/>}/>
// <Route exact path="/createproduct" element={<CreateProduct/>}/>
// <Route exact path="/sendestimate/:id" element={<SendEstimate/>}/>
// <Route exact path="/editproduct/:id" element={<EditProduct />}/>
// <Route exact path="/createcategory" element={<CreateCategory/>}/>
// <Route exact path="/createbrand" element={<CreateBrand/>}/>
// <Route exact path="/terms" element={<TermsAndConditions/>}/>
// </Routes>
//   )
// }

// export default App

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import NotFoundPage from './pages/NotFoundPage';
import { CartProvider } from './context/CartContext';

function App() {
  return (
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-success" element={<OrderSuccessPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>

  );
}

export default App;
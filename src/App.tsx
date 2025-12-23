import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/Dashboard'; 
import ProductList from './pages/ProductList';
import Inventory from './pages/Inventory';

function App() {
  return (
    <Router>
      <AdminLayout>
        <Routes>
          {/* This makes the Dashboard the home page (path="/") */}
          <Route path="/" element={<Dashboard />} />
          
          {/* This keeps your Inventory table accessible at /products */}
          <Route path="/products" element={<Inventory />} />
          
          {/* We will add Customers and other pages here later */}
          <Route path="/customers" element={<div>Customers Page Coming Soon</div>} />
          <Route path="/products" element={<ProductList />} />
        </Routes>
      </AdminLayout>
    </Router>
  );
}

export default App;
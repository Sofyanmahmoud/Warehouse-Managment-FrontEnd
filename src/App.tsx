import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/Dashboard';
import ProductList from './pages/ProductList';
import Customers from './pages/Customers';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Admin routes*/}
        <Route path="/" element={<AdminLayout><Dashboard /></AdminLayout>} />
        <Route path="/products" element={<AdminLayout><ProductList /></AdminLayout>} />
        <Route path="/customers" element={<AdminLayout><Customers /></AdminLayout>} />
        {/* customer routes*/}
        <Route path="/shop" element={<div>Welcome to the Customer Shop!</div>} />
      </Routes>
    </Router>
  );
}

export default App;
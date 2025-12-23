import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';

function App() {
  return (
    <Router>
      <AdminLayout>
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
          <h1 className="text-2xl font-bold text-slate-800">Welcome, Admin</h1>
          <p className="text-gray-500 mt-2">Your folders are no longer empty!</p>
        </div>
      </AdminLayout>
    </Router>
  );
}

export default App;
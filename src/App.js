import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Routes, Route } from 'react-router-dom';

import AdminApp from './admin-site/AdminApp';
import CustomerApp from './customer-site/CustomerApp';

function App() {
  return (
    <Routes>
      <Route path="/admin/*" element={<AdminApp />} />
      <Route path="/*" element={<CustomerApp />} />
    </Routes>
  );
}

export default App;

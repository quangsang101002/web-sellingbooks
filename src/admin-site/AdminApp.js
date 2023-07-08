import './AdminApp.css';

import { Routes, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';
import AdminLayout from './layouts/AdminLayout';
import AdminNotFoundPage from './pages/errors/AdminNotFoundPage';
import AdminHomePage from './pages/AdminHomePage';
import UserList from './pages/users/UserList';
import ProductList from './pages/products/ProductList';
import OrderProduct from './pages/orders/OrderProduct';
import OrderDetail from './pages/orders/OrderDetail';
import ManagerContact from './pages/contacts/ManagerContact';
import ContactDetail from './pages/contacts/ContactDetail';

function AdminApp() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/manager" element={<UserList />} />
        <Route path="/product" element={<ProductList />} />
        <Route path="/order" element={<OrderProduct />} />
        <Route path="/order_detail" element={<OrderDetail />} />
        <Route path="/manager_contact" element={<ManagerContact />} />
        <Route path="/manager_contact_detail" element={<ContactDetail />} />
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<AdminHomePage />} />
          <Route path="*" element={<AdminNotFoundPage />} />
        </Route>
      </Routes>
    </Provider>
  );
}

export default AdminApp;

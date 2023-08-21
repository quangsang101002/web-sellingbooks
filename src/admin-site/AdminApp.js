import './AdminApp.css';

import { Routes, Route, Outlet } from 'react-router-dom';

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
        {/* <Route path="/login" element={<AdminLoginPage />} /> */}
        <Route path="/login" element={<AdminLayout />} />
        <Route path="/manager" element={<UserList />}>
          <Route path=":page" element={<UserList />} />
        </Route>
        <Route path="/product" element={<ProductList />} />
        <Route path="/order" element={<OrderProduct />} />
        <Route path="/order_detail/:id" element={<OrderDetail />} />
        <Route path="/manager_contact" element={<ManagerContact />} />
        <Route path="/manager_contact_detail/:id" element={<ContactDetail />} />
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<AdminHomePage />} />
          <Route path="*" element={<AdminNotFoundPage />} />
        </Route>
      </Routes>
    </Provider>
  );
}

export default AdminApp;

import './AdminApp.css';

import { Routes, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';
import AdminLayout from './layouts/AdminLayout';
import AdminNotFoundPage from './pages/errors/AdminNotFoundPage';
import AdminHomePage from './pages/AdminHomePage';
import UserList from './pages/users/UserList';

function AdminApp() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/manager" element={<UserList />} />
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<AdminHomePage />} />
          <Route path="*" element={<AdminNotFoundPage />} />
        </Route>
      </Routes>
    </Provider>
  );
}

export default AdminApp;

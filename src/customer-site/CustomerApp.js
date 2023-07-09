import './CustomerApp.css';
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import CustomerLayout from './layouts/CustomerLayout';

import CustomerNotFoundPage from './pages/errors/CustomerNotFoundPage';
import CustomerRegisterPage from './pages/auth/CustomerRegisterPage';
import CustomerLoginPage from './pages/auth/CustomerLoginPage';
import CustomerHomePage from './pages/CustomerHomePage';
import CustomerHeaderComponent from './components/partials/CustomerHeaderComponent';
import CustomerDetails from './components/partials/CustomerDetails';
function CustomerApp() {
  return (
    <Provider store={store}>
      <CustomerHeaderComponent />
      <Routes>
        <Route path="/register" element={<CustomerRegisterPage />} />
        <Route path="/login" element={<CustomerLoginPage />} />
        <Route path="/detail-product/:id" element={<CustomerDetails />} />
        <Route path="/" element={<CustomerLayout />}>
          <Route index element={<CustomerHomePage />} />

          <Route path="*" element={<CustomerNotFoundPage />} />
        </Route>
      </Routes>
    </Provider>
  );
}

export default CustomerApp;

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
import Cart from './pages/cart/Cart';
import Address from './pages/personalInfo/AddressInfo';

import Products from './pages/products/Products';
import Contacts from './pages/contacts/Contacts';

// import CustomerFooterComponent from './components/partials/CustomerFooterComponent';
// import Address from './pages/personalInfo/Address';
import Personal from './pages/personalInfo/Personal';
import ScrollToTop from './pages/auth/ScrollToTop';
import AddressInfo from './pages/personalInfo/AddressInfo';
function CustomerApp() {
  return (
    <Provider store={store}>
      <CustomerHeaderComponent />
      <ScrollToTop />
      <Routes>
        <Route path="/register" element={<CustomerRegisterPage />} />
        <Route path="/login" element={<CustomerLoginPage />} />
        <Route path="/carts" element={<Cart />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route
          path="/personal-infomation/profile"
          element={<Personal />}
        ></Route>
        <Route path="/personal-infomation/address" element={<AddressInfo />} />
        <Route path="/detail-product/:id" element={<CustomerDetails />} />
        <Route path="/" element={<CustomerLayout />}>
          <Route index element={<CustomerHomePage />} />

          <Route path="*" element={<CustomerNotFoundPage />} />
        </Route>
      </Routes>
      {/* <CustomerFooterComponent /> */}
    </Provider>
  );
}

export default CustomerApp;

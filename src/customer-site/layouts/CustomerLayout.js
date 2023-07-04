import React from 'react';
import CustomerHeaderComponent from '../components/partials/CustomerHeaderComponent';
import CustomerMenuComponent from '../components/partials/CustomerMenuComponent';

const CustomerLayout = () => {
  return (
    <div>
      <CustomerHeaderComponent />
      <CustomerMenuComponent />
    </div>
  );
};

export default CustomerLayout;

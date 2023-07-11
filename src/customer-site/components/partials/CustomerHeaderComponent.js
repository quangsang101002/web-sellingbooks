import React from 'react';
import './CustomerHeaderComponent.scss';
import { FiUser } from 'react-icons/fi';
import { BsCart4 } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';

function CustomerHeaderComponent() {
  const products = useSelector(
    (state) => state.customerProductReducer.products,
  );
  return (
    <div className="wrapper">
      <Link to="/">
        <div className="wrapper_logo">
          <img
            src="https://www.shutterstock.com/image-vector/bookstore-book-shop-logo-web-260nw-710357626.jpg"
            alt=""
          ></img>
        </div>
      </Link>

      <ul className="wrapper_playlist-list">
        <Link to="/">
          <li>Home</li>
        </Link>

        <Link to="/products">
          <li>Product</li>
        </Link>
        <Link to="/abouts">
          <li>About</li>
        </Link>
        <Link to="/contacts">
          <li>Contact</li>
        </Link>
      </ul>

      <Link to="/register">
        <div className="wrapper_accout">
          <div>
            <FiUser /> Tài khoản
          </div>
          <Link to="/carts">
            <div>
              {' '}
              <small className="cart-product">{products.length}</small>
              <BsCart4 className="icon-cart" />
            </div>
          </Link>
        </div>
      </Link>

      <div className="wrapper_change-language">
        <select>
          <option>Tiếng Việt </option>
          <option>Tiếng Anh</option>
        </select>
      </div>
    </div>
  );
}

export default CustomerHeaderComponent;

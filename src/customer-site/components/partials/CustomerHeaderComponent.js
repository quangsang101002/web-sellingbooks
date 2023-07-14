import React, { useEffect, useState } from 'react';
import './CustomerHeaderComponent.scss';
import { FiLogOut, FiUser } from 'react-icons/fi';
import { BsCart4 } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';

function CustomerHeaderComponent() {
  const [login, setLogin] = useState('');
  const getUserAccount = JSON.parse(localStorage.getItem('userAccount'));

  useEffect(() => {
    setLogin(getUserAccount);
  }, []);
  const products = useSelector(
    (state) => state.customerProductReducer.products,
  );

  const logoutUser = () => {
    localStorage.removeItem('userAccount');
    window.location.reload();
  };
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

      {login ? (
        <div className="wrapper_accout">
          <p>{login.email}</p>
          <small onClick={logoutUser}>
            <FiLogOut />
          </small>
        </div>
      ) : (
        <Link to="/register">
          <FiUser /> Tài khoản
        </Link>
      )}

      <div className="wrapper_accout">
        <Link to="/carts">
          <div className="cart-product-main">
            <small className="cart-product">{products.length}</small>
            <BsCart4 className="icon-cart" />
          </div>
        </Link>
      </div>

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

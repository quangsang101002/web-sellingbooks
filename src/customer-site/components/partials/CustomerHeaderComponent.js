import React from 'react';
import './CustomerHeaderComponent.scss';
import { FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';

function CustomerHeaderComponent() {
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

      <div className="wrapper_search">
        <input></input>
      </div>
      <ul className="wrapper_playlist-list">
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/about">
          <li>About</li>
        </Link>
        <Link to="/product">
          <li>Product</li>
        </Link>
        <Link to="/contact">
          <li>Contact</li>
        </Link>
      </ul>
      <Link to="/register">
        <div className="wrapper_accout">
          <FiUser /> Tài khoản
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

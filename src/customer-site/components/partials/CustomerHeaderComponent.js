import React, { useEffect, useState } from 'react';
import './CustomerHeaderComponent.scss';
import { FiLogOut, FiUser } from 'react-icons/fi';
import { BsCart4 } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useNavigate } from 'react-router-dom';
import authAPI from '../../../apis/auth.api';
import Personal from '../../pages/personalInfo/Personal';
function CustomerHeaderComponent() {
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [userName, setUsername] = useState();
  const getUserAccount = JSON.parse(localStorage.getItem('userAccount'));

  const fetchData = async () => {
    try {
      const response = await authAPI.getAuthCustomer();
      setUsername(response.username);
      Personal(response.id);
    } catch (error) {
      navigate('/');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setLogin(getUserAccount);
  }, []);
  const products = useSelector(
    (state) => state.customerProductReducer.products,
  );

  const logoutUser = async () => {
    try {
      await authAPI.logoutCustomers();
      window.location.reload();
    } catch (error) {
      alert(error);
    }

    // localStorage.removeItem('userAccount');
    // navigate('/');
    // window.location.reload();
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
      {userName ? (
        <div className="wrapper_accout">
          <div className="account-info">
            <p className="userName">{userName}</p>

            <ul className="edit-info">
              <Link className="change-page" to="/personal-infomation/profile">
                <li>Tài Khoản Của Tôi</li>
              </Link>
              <li>Đơn Mua</li>
              <li onClick={logoutUser}>
                Đăng Xuất{' '}
                <small>
                  <FiLogOut />
                </small>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <Link to="/register">
          <FiUser /> Tài khoản
        </Link>
      )}
    </div>
  );
}
<Personal />;

export default CustomerHeaderComponent;

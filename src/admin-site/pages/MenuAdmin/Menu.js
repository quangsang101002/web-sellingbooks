import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import authAPI from '../../../apis/auth.api';
import { useNavigate } from 'react-router-dom';
import getStaticFileUrl from '../../utilities/getStaticFileUrl';
import { SlUser } from 'react-icons/sl';
import './Menu.scss';

const MenuAdmin = () => {
  const [avatar, setAvatar] = useState('');
  const [userName, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await authAPI.getAuth();
      setAvatar(response.avatar);
      setUsername(response.username);
    } catch (error) {
      navigate('/admin');
    }
  };

  const logoutUser = async () => {
    try {
      const token = window.localStorage.getItem('X-API-Key');
      await authAPI.logout(token);
      localStorage.removeItem('X-API-Key');
      navigate('/admin');
    } catch (error) {
      navigate('/admin');
    }
  };
  return (
    <>
      <div className="col-3">
        <Table striped hover variant="dark" className="text-center">
          <thead>
            <tr>
              <th>Trang quản trị</th>
            </tr>
          </thead>
          <tbody>
            <tr className="wrapper-avatar">
              <td className="profile-avatar">
                {avatar ? (
                  <img src={getStaticFileUrl(avatar)} alt="avatar" />
                ) : (
                  <SlUser />
                )}{' '}
                <b>{userName}</b>
              </td>
            </tr>
            <tr>
              <td>
                <Link to="/admin/product">Quản lí sản phẩm</Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link to="/admin/manager">Quản lí người dùng</Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link to="/admin/order">Quản lí đơn hàng</Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link to="/admin/manager_contact">Liên hệ</Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link to="/admin/manager_contact" onClick={logoutUser}>
                  Đăng xuất
                </Link>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default MenuAdmin;

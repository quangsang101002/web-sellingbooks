import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import authAPI from '../../../apis/auth.api';
import { useNavigate } from 'react-router-dom';
import getStaticFileUrl from '../../utilities/getStaticFileUrl';
import { SlUser } from 'react-icons/sl';
import userAPI from '../../../apis/user.api';
import './Menu.scss';

const MenuAdmin = () => {
  const [avatar, setAvatar] = useState('');
  const [userName, setUsername] = useState('');
  const [idUpdate, setUserId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await authAPI.getAuth();
      setAvatar(response.avatar);
      setUsername(response.username);
      setUserId(response.id);
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

  const uploadImage = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.click(); // Kích hoạt sự kiện chọn tệp
    fileInput.addEventListener('change', handleFileSelect);
  };

  const handleFileSelect = async (e) => {
    const selectedFile = e.target.files[0];
    const formData = new FormData();
    formData.append('avatar', selectedFile);
    if (selectedFile) {
      try {
        await userAPI.updateAvatarCt(idUpdate, formData);
      } catch (error) {
        alert(error);
      }
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
                <Link to="/admin/home">Home</Link>
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
        <button onClick={uploadImage} className="uploadImage">
          Chọn ảnh
        </button>
      </div>
    </>
  );
};

export default MenuAdmin;

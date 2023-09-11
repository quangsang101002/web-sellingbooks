import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { BsFillPencilFill } from 'react-icons/bs';
import { SlUser } from 'react-icons/sl';
import { Link } from 'react-router-dom';
import './personal.scss';
import getStaticFileUrl from '../../../admin-site/utilities/getStaticFileUrl';
import authAPI from '../../../apis/auth.api';
import userAPI from '../../../apis/user.api';

const AddressInfo = () => {
  const [getUser, setGetUser] = useState([]);
  const userEmail = JSON.parse(localStorage.getItem('userAccount'));
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  // const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await authAPI.getAuthCustomer();
      setName(response.username);
      setAvatar(response.avatar);
    } catch (error) {
      // navigate('/personal-infomation/profile');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const container = () => {
    return (
      <>
        <div className="col-3">
          <form>
            <table className="table table-striped table-hover table-dark text-center">
              <thead>
                <tr>
                  <th colSpan="2">
                    <div>
                      <BsFillPencilFill /> Sửa hồ sơ
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="profile-avatar">
                    {avatar ? (
                      <img src={getStaticFileUrl(avatar)} alt="avatar" />
                    ) : (
                      <SlUser />
                    )}{' '}
                    <b>{name}</b>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to="">Hồ sơ</Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to="">Ngân hàng</Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to="/personal-infomation/address">Địa chỉ</Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to="">Đổi mật khẩu</Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to="">Đăng xuất</Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </>
    );
  };

  return <>{container()}</>;
};

export default AddressInfo;

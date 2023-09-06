import React, { useEffect, useState } from 'react';
import { BsFillPencilFill } from 'react-icons/bs';
import { SlUser } from 'react-icons/sl';
import { Link } from 'react-router-dom';
import authAPI from '../../../apis/auth.api';
import { useNavigate } from 'react-router-dom';
import './personal.scss';
import userAPI from '../../../apis/user.api';
import getStaticFileUrl from '../../../admin-site/utilities/getStaticFileUrl';

const Personal = (id) => {
  const [name, setName] = useState('');
  const [userName, setUsername] = useState('');
  const [email, setMail] = useState('');
  const [idUpdate, setIdUpdate] = useState('');
  const [avatar, setAvatar] = useState('');

  const navigate = useNavigate();

  const changeName = (event) => {
    setUsername(event.target.value);
  };
  const changeEmail = (event) => {
    setMail(event.target.value);
  };
  const fetchData = async () => {
    try {
      const response = await authAPI.getAuthCustomer();
      setUsername(response.username);
      setName(response.username);
      setMail(response.email);
      setIdUpdate(response.id);
      setAvatar(response.avatar);
    } catch (error) {
      navigate('/personal-infomation/profile');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const saveChange = async () => {
    const updateUsers = {
      username: userName,
      email: email,
    };
    try {
      await userAPI.updateUser(idUpdate, updateUsers);
    } catch (error) {
      navigate('/personal-infomation/profile');
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
    <div className="mt-5 mainFrofile">
      <div className="row">
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

        <div className="col-6 content-edit_info">
          <div className="personal-profile">
            <h2>Hồ Sơ Của Tôi</h2>
            <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
            <table className="table table-striped table-hover ">
              <tbody className="input-info">
                <tr>
                  <td className="info-label">Tên đăng nhập</td>
                  <td className="info-value">
                    <input
                      placeholder="userName"
                      value={userName}
                      onChange={(event) => changeName(event)}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="info-label">Email</td>
                  <td className="info-value">
                    <input
                      placeholder="Email"
                      value={email}
                      onChange={(event) => changeEmail(event)}
                    />
                  </td>
                </tr>

                <tr>
                  <td></td>
                  <td className="colspan=2">
                    <button onClick={saveChange} className="saveChange">
                      Lưu
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-3">
          <div className="upload-image text-center">
            <div className="image-avatar">
              <img src={getStaticFileUrl(avatar)} alt="avatar" />
            </div>
            <button onClick={uploadImage} className="uploadImage">
              Chọn ảnh
            </button>
            <input
              type="file"
              style={{ display: 'none' }}
              onChange={handleFileSelect}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Personal;

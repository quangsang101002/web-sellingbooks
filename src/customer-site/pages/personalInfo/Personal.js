import React, { useEffect, useState } from 'react';
import { BsFillPencilFill } from 'react-icons/bs';
import { SlUser } from 'react-icons/sl';
import { Link } from 'react-router-dom';
import authAPI from '../../../apis/auth.api';
import { useNavigate } from 'react-router-dom';
import './personal.scss';
import userAPI from '../../../apis/user.api';

const Personal = (id) => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('Nam');
  const [userName, setUsername] = useState('');
  const [email, setMail] = useState('');
  const [idUpdate, setIdUpdate] = useState('');

  const navigate = useNavigate();

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

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
                  <td>
                    <SlUser /> <b>{name}</b>
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

        <div className="col-9 content-edit_info">
          <div className="personal-profile">
            <h2>Hồ Sơ Của Tôi</h2>
            <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>

            <table className="table table-striped table-hover ">
              <tbody>
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
                  <td className="info-label">Số điện thoại</td>
                  <td className="info-value">
                    <span className="info-value">*********05</span>
                    <button className="edit-button">Thay Đổi</button>
                  </td>
                </tr>
                <tr>
                  <td className="info-label">Giới tính</td>
                  <td>
                    <input
                      type="radio"
                      name="gender"
                      value="Nam"
                      checked={gender === 'Nam'}
                      onChange={handleGenderChange}
                      className="info-radio"
                    />
                    <label htmlFor="Nam">Nam</label>

                    <input
                      type="radio"
                      name="gender"
                      value="Nữ"
                      checked={gender === 'Nữ'}
                      onChange={handleGenderChange}
                      className="info-radio"
                    />
                    <label htmlFor="Nữ">Nữ</label>

                    <input
                      type="radio"
                      name="gender"
                      value="Khác"
                      checked={gender === 'Khác'}
                      onChange={handleGenderChange}
                      className="info-radio"
                    />
                    <label htmlFor="Khác">Khác</label>
                  </td>
                </tr>
                <tr>
                  <td className="info-label">Ngày sinh</td>
                  <td>
                    <span className="info-value">01/01/1990</span>
                    <button className="edit-button">Thay Đổi</button>
                  </td>
                </tr>
                <tr>
                  <td className="colspan=2">
                    <button onClick={saveChange}>Lưu</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Personal;

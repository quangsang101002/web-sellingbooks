import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { BsFillPencilFill } from 'react-icons/bs';
import { SlUser } from 'react-icons/sl';
import { Link } from 'react-router-dom';
import './personal.scss';

const Personal = () => {
  const [getUser, setGetUser] = useState([]);
  // const userEmail = JSON.parse(localStorage.getItem('userAccount'));
  const [name, setName] = useState('quang');
  const [gender, setGender] = useState('Nam');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };
  // const userEmail = JSON.parse(localStorage.getItem('userAccount'));
  const container = () => {
    return (
      <>
        <div className="mt-5 mainFrofile">
          <div className="row">
            <div className="col-3">
              <Table striped hover variant="dark" className="text-center">
                <thead>
                  <tr>
                    <th>
                      {' '}
                      {getUser.map((user) => {
                        if (1 == 1) {
                          return user.userName;
                        }
                      })}
                      <div>
                        <BsFillPencilFill /> Sửa hồ sơ
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {' '}
                      <SlUser />
                      Tài khoản của tôi
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Link to="">Hồ sơ</Link>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Link to="">Ngân hàng </Link>
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
              </Table>
            </div>
            <div className="col-9 content-edit_info">
              <div className="personal-profile">
                <h2>Hồ Sơ Của Tôi</h2>
                <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>

                <div className="profile-info">
                  <div className="info-item">
                    <span className="info-label">Tên đăng nhập</span>
                    <span className="info-value">{}</span>
                  </div>

                  <div className="info-item">
                    <span className="info-label">Tên</span>
                    <input
                      type="text"
                      value={name}
                      onChange={handleNameChange}
                      className="info-input"
                    />
                  </div>

                  <div className="info-item">
                    <span className="info-label">Email</span>
                    <span className="info-value">example@example.com</span>
                  </div>

                  <div className="info-item">
                    <span className="info-label">Số điện thoại</span>
                    <span className="info-value">*********05</span>
                    <button className="edit-button">Thay Đổi</button>
                  </div>

                  <div className="info-item">
                    <span className="info-label">Giới tính</span>
                    <div>
                      <input
                        type="radio"
                        name="gender"
                        value="Nam"
                        checked={gender === 'Nam'}
                        onChange={handleGenderChange}
                        className="info-radio"
                      />
                      <label htmlFor="Nam">Nam</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        name="gender"
                        value="Nữ"
                        checked={gender === 'Nữ'}
                        onChange={handleGenderChange}
                        className="info-radio"
                      />
                      <label htmlFor="Nữ">Nữ</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        name="gender"
                        value="Khác"
                        checked={gender === 'Khác'}
                        onChange={handleGenderChange}
                        className="info-radio"
                      />
                      <label htmlFor="Khác">Khác</label>
                    </div>
                  </div>

                  <div className="info-item">
                    <span className="info-label">Ngày sinh</span>
                    <span className="info-value">01/01/1990</span>
                    <button className="edit-button">Thay Đổi</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return <>{container()}</>;
};

export default Personal;

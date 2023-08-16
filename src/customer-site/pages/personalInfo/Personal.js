import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { BsFillPencilFill } from 'react-icons/bs';
import { SlUser } from 'react-icons/sl';
import { Link } from 'react-router-dom';

const Personal = () => {
  const getUser = JSON.parse(localStorage.getItem('infoUser'));
  const userEmail = JSON.parse(localStorage.getItem('userAccount'));
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
                        if (user.email == userEmail.email) {
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
                      <Link to="">Địa chỉ</Link>
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
            <div className="manager col-9"></div>
          </div>
        </div>
      </>
    );
  };

  return <>{container()}</>;
};

export default Personal;

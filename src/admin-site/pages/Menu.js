import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';

const MenuAdmin = () => {
  const container = () => {
    return (
      <>
        <div className="mt-5">
          <div className="row">
            <div className="col-3">
              <div>
                <input type="file" name="avatar" />
              </div>
              <Table striped hover variant="dark" className="text-center">
                <thead>
                  <tr>
                    <th>Trang quản trị</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="wrapper-avatar">
                    <div className="avatar"></div>
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
                      <Link to="/admin/manager_contact">Đăng xuất</Link>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </>
    );
  };

  return <>{container()}</>;
};

export default MenuAdmin;

import Table from 'react-bootstrap/Table';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './UserList.scss';
import Modals from './Modal';
import moment from 'moment/moment';
const AdminLayout = () => {
  const getAllUser = JSON.parse(localStorage.getItem('infoUser')) ?? [];
  const formattedTime = moment().format('YYYY-MM-DD HH:mm:ss');
  return (
    <div className="mt-5">
      <div className="row">
        <div className="col-3">
          <Table striped hover variant="dark" className="text-center ">
            <thead>
              <tr>
                <th>Trang quản trị</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Nguyễn Quang Hải</td>
              </tr>
              <tr></tr>
              <tr>
                <td>Quản lí sản phẩm</td>
              </tr>
              <tr>
                <Link to="/admin/manager">Quản lí người dùng</Link>
              </tr>
              <tr>
                <td>Quản lí đơn hàng</td>
              </tr>
              <tr>
                <td>Quản lí liên hệ</td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="manager col-9">
          <h1 className="mb-3">Quản lí người dùng</h1>
          <div className="serch mb-3">
            <div className="btn_search">
              <input type="text" placeholder="nhập từ khóa tìm kiếm"></input>
              <button type="button">Tìm kiếm</button>
            </div>

            <div className="btn-addnew">
              <button type="button">Thêm mới</button>
            </div>

            <div className="btn-delete">
              <button type="button">Xóa</button>
            </div>
          </div>

          <table id="customers">
            <tr>
              <th>Chọn</th>
              <th>Tên dăng nhập</th>
              <th>Email</th>
              <th>Tên người dùng</th>
              <th>Vai trò </th>
              <th>Thời gian tạo</th>
              <th>Thời gian cập nhật</th>
              <th>hành động</th>
            </tr>
            {getAllUser.map((user) => {
              return (
                <tr>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{user.userName}</td>
                  <td>{user.email}</td>
                  <td>
                    <span> {user.firstName}</span>
                    <span>{user.lastName}</span>
                  </td>

                  <td>Khách hàng</td>
                  <td>{user.time}</td>
                  <td>15:30:03</td>
                  <td>
                    <Modals user={user}></Modals>

                    <button>Xóa</button>
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;

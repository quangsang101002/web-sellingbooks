import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import unidecode from 'unidecode';
import { Button } from 'react-bootstrap';
import ModalOrderAdd from './ModalOrderAdd';

const OrderProduct = () => {
  const getAllUser = JSON.parse(localStorage.getItem('userOrder')) ?? [];
  const [choose, setChoose] = useState([]);
  const [search, setSearch] = useState('');
  const [btnSearchUser, setBtnSearchUser] = useState([]);

  useEffect(() => {
    setBtnSearchUser(getAllUser);
  }, [search]);
  const deleteUsers = () => {
    const updatedUsers = getAllUser.filter((user) => !choose.includes(user.id));
    localStorage.setItem('userOrder', JSON.stringify(updatedUsers));
    setChoose([]);
    window.location.reload();
  };

  const toggleSelectAll = () => {
    if (choose.length === getAllUser.length) {
      setChoose([]);
    } else {
      const allUserIds = getAllUser.map((user) => user.id);
      setChoose(allUserIds);
    }
  };

  const toggleCheckbox = (userId) => {
    if (choose.includes(userId)) {
      setChoose(choose.filter((id) => id !== userId));
    } else {
      setChoose([...choose, userId]);
    }
  };

  const deleteUser = (index) => {
    const spead = [...getAllUser];
    spead.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(spead));
    window.location.reload();
  };

  const btnSearch = () => {
    const searchNameUser = btnSearchUser.filter((user) => {
      return unidecode(user.nameProduct.toLowerCase()).includes(
        unidecode(search.toLowerCase()),
      );
    });
    setBtnSearchUser(searchNameUser);
  };

  const container = () => {
    return (
      <>
        <div className="mt-5">
          <div className="row">
            <div className="col-3">
              <Table striped hover variant="dark" className="text-center">
                <thead>
                  <tr>
                    <th>Trang quản trị</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Nguyễn Quang Hải</td>
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
                </tbody>
              </Table>
            </div>
            <div className="manager col-9">
              <h1 className="mb-3">Quản lí đơn hàng</h1>
              <div className="serch mb-3">
                <div className="btn_search">
                  <input
                    type="text"
                    placeholder="Nhập từ khóa tìm kiếm"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                  />
                  <button type="button" onClick={() => btnSearch()}>
                    Tìm kiếm
                  </button>
                </div>
                <div className="btn-addnew">
                  <ModalOrderAdd />
                </div>
                <div className="btn-delete">
                  <Button variant="danger" type="button" onClick={deleteUsers}>
                    Xóa
                  </Button>
                </div>
              </div>
              <table id="customers">
                <thead>
                  <tr>
                    <th>
                      <input
                        type="checkbox"
                        checked={choose.length === getAllUser.length}
                        onChange={toggleSelectAll}
                      />
                    </th>
                    <th>Mã đơn</th>
                    <th>Tên người đặt </th>
                    <th>Thời gian đặt</th>
                    <th>Tổng giá </th>
                    <th>Trạng thái</th>
                    <th>Thời gian tạo</th>
                    <th>Thời gian cập nhật</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {btnSearchUser.length === 0 ? (
                    <div className="空洞的">
                      <b>
                        <h1 className="text-center">Không tìm thấy sản phẩm</h1>
                      </b>
                    </div>
                  ) : (
                    <>
                      {' '}
                      {btnSearchUser.map((user, index) => (
                        <tr key={user.id}>
                          <td>
                            <input
                              type="checkbox"
                              checked={choose.includes(user.id)}
                              onChange={() => toggleCheckbox(user.id)}
                            />
                          </td>
                          <td>{user.codeOder}</td>
                          <td>{user.nameUserOder}</td>
                          <td>{user.time}</td>
                          <td>{user.classify}</td>
                          <td></td>
                          <td>{user.time}</td>
                          <td>{user.timmeUpdate}</td>
                          <td>
                            <Link to="/admin/order_detail">
                              <Button>Xem</Button>
                            </Link>
                            <Button
                              className="ml-3"
                              variant="danger"
                              onClick={() => deleteUser(index)}
                            >
                              Xóa
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  };

  return <>{container()}</>;
};

export default OrderProduct;

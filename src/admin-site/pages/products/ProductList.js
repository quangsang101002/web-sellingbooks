import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import ModalProduct from './ModalProduct';
import ModalAddProduct from './ModalAddProduct';
import unidecode from 'unidecode';
import { Button } from 'react-bootstrap';

const ProductList = () => {
  const getAllUser = JSON.parse(localStorage.getItem('products')) ?? [];
  const [choose, setChoose] = useState([]);
  const [search, setSearch] = useState('');
  const [btnSearchUser, setBtnSearchUser] = useState([]);

  useEffect(() => {
    setBtnSearchUser(getAllUser);
  }, [search]);
  console.log(search);
  const deleteUsers = () => {
    const updatedUsers = getAllUser.filter((user) => !choose.includes(user.id));
    window.location.reload();
    localStorage.setItem('products', JSON.stringify(updatedUsers));
    setChoose([]);
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
      return unidecode(user.userName.toLowerCase()).includes(
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
              <h1 className="mb-3">Quản lí sản phẩm</h1>
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
                  <ModalAddProduct />
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
                    <th>Mã sản phẩm</th>
                    <th>Tên sản phẩm</th>
                    <th>Đơn giá</th>
                    <th>Phân loại</th>
                    <th>Thời gian tạo</th>
                    <th>Thời gian cập nhật</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {btnSearchUser.length === 0 ? (
                    <div className="空洞的">
                      <b>
                        <h1 className="text-center">
                          Không tìm thấy người dùng
                        </h1>
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
                          <td>{user.userName}</td>
                          <td>{user.email}</td>
                          <td>
                            <span>{user.firstName}</span>
                            <span>{user.lastName}</span>
                          </td>
                          <td>Khách hàng</td>
                          <td>{user.time}</td>
                          <td>{user.timmeUpdate}</td>
                          <td>
                            <ModalProduct user={user} />
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

export default ProductList;

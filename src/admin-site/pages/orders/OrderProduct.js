import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import unidecode from 'unidecode';
import { Button } from 'react-bootstrap';
import ModalOrderAdd from './ModalOrderAdd';
import authAPI from '../../../apis/auth.api';
import orderApi from '../../../apis/order.api';
import ManagerContact from '../contacts/ManagerContact';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import moment from 'moment';
const OrderProduct = () => {
  const getAllUser = JSON.parse(localStorage.getItem('userOrder')) ?? [];
  const [choose, setChoose] = useState([]);
  const [search, setSearch] = useState('');
  const [btnSearchUser, setBtnSearchUser] = useState([]);
  const [userName, setUsername] = useState('');
  const [orderUser, setOrderUser] = useState([]);
  // const [selectedColor, setSelectedColor] = useState('#ffffff');
  const [getNumberPages, setGetNumberPages] = useState();
  const navigate = useNavigate();
  const onchangeStatus = (event, userId) => {
    const newStatus = event.target.value;

    const updatedOrderUser = orderUser.map((user) => {
      if (user.order_id === userId) {
        return { ...user, status: newStatus };
      }
      return user;
    });
    setOrderUser(updatedOrderUser);

    orderApi.updateStatus(userId, newStatus);
  };
  const getNumberPager = (event) => {
    setGetNumberPages(event.target.textContent);
  };

  useEffect(() => {
    const fetchDataOrder = async () => {
      await orderApi
        .searchOrder()
        .then((response) => {
          setOrderUser(response.data.result.recount);
        })
        .catch((error) => {
          alert(error);
        });
    };
    fetchDataOrder();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = window.localStorage.getItem('X-API-Key');
        const response = await authAPI.getAuth(token);

        setUsername(response.username);
        <ManagerContact userName={response.username} />;
      } catch (error) {
        navigate('/admin');
      }
    };

    fetchData();
  }, []);

  const logoutUser = async () => {
    try {
      const token = window.localStorage.getItem('X-API-Key');
      await authAPI.logout(token);
      localStorage.removeItem('X-API-Key');
      navigate('/admin');
    } catch (error) {
      alert(error);
    }
  };

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

  const deleteUser = (id) => {
    try {
      orderApi.deleteOrder(id);
    } catch (error) {
      alert(error);
    }
    // const spead = [...getAllUser];
    // spead.splice(index, 1);
    // localStorage.setItem('userOrder', JSON.stringify(spead));
    // window.location.reload();
  };

  const btnSearch = () => {
    const searchNameUser = btnSearchUser.filter((user) => {
      return unidecode(user.nameUserOrder.toLowerCase()).includes(
        unidecode(search.toLowerCase()),
      );
    });
    setBtnSearchUser(searchNameUser);
  };
  const getBackgroundColor = (status) => {
    const colorMapping = {
      1: '#ff0000', // Đỏ
      2: '#00ff00', // Xanh lá
      3: '#0000ff', // Xanh dương
    };

    return colorMapping[status] || '#ffffff';
  };
  const Container = () => {
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
                    <td>{userName}</td>
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
                    <th>Ghi chú </th>
                    <th>Thời gian đặt</th>
                    <th>Tổng giá </th>
                    <th>Trạng thái</th>
                    <th>Thời gian tạo</th>
                    <th>Thời gian cập nhật</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {orderUser.length === 0 ? (
                    <div className="空洞的">
                      <b>
                        <h1 className="text-center">Không tìm thấy đơn hàng</h1>
                      </b>
                    </div>
                  ) : (
                    <>
                      {' '}
                      {orderUser.map((user, index) => (
                        <tr key={user.id}>
                          <td>
                            <input
                              type="checkbox"
                              checked={choose.includes(user.id)}
                              onChange={() => toggleCheckbox(user.id)}
                            />
                          </td>
                          <td>{user.serial_number}</td>
                          <td>{user.username}</td>
                          <td>{user.note}</td>
                          <td>
                            {moment(user.order_at).format('YYYY-MM-DD HH:mm')}
                          </td>
                          <td>{user.total_price}</td>
                          <td>
                            {' '}
                            <form method="put">
                              <select
                                value={user.status}
                                onChange={(event) =>
                                  onchangeStatus(event, user.order_id)
                                }
                                // onChange={(e) => {

                                //   // setSelectedColor(
                                //   //   getBackgroundColor(selectedStatus),
                                //   // );
                                // }}
                              >
                                <option value="1">Đơn hàng mới</option>
                                <option value="2">Đơn xác thực</option>
                                <option value="3">Đơn giao hàng</option>
                                <option value="4">Đã giao hàng</option>
                                <option value="5">Đã thanh toán</option>
                                <option value="6"> Hoàn tất</option>
                                <option value="7"> Bị từ chối</option>
                              </select>{' '}
                            </form>
                          </td>
                          <td>
                            {moment(user.created_at).format('YYYY-MM-DD HH:mm')}
                          </td>
                          <td>
                            {moment(user.updated_at).format('YYYY-MM-DD HH:mm')}
                          </td>
                          <td>
                            <Link to={`/admin/order_detail/${user.id}`}>
                              <Button>Xem</Button>
                            </Link>
                            <Button
                              className="ml-3"
                              variant="danger"
                              onClick={() => deleteUser(user.order_id)}
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
          <div className="paging text-center mt-5 mb-5">
            <div>
              <button className="btn-pagig">
                <AiOutlineLeft />
              </button>
              <a href={`/admin/order/${getNumberPages}`}>
                <button
                  className="btn-pagig"
                  onClick={(event) => getNumberPager(event)}
                >
                  1
                </button>
              </a>
              <a href={`/admin/order/${getNumberPages}`}>
                <button
                  className="btn-pagig"
                  onClick={(event) => getNumberPager(event)}
                >
                  2
                </button>
              </a>
              <a href={`/admin/order/${getNumberPages}`}>
                <button
                  className="btn-pagig"
                  onClick={(event) => getNumberPager(event)}
                >
                  3
                </button>
              </a>
              <span className="btn-pagig">...</span>
              <button className="btn-pagig">
                <AiOutlineRight />
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };

  return <>{Container()}</>;
};

export default OrderProduct;

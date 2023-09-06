import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import './UserList.scss';
import Modals from './Modal';
import ModalAddUser from './ModalAddUser';
import unidecode from 'unidecode';
import { Button } from 'react-bootstrap';
import authAPI from '../../../apis/auth.api';
import { useNavigate } from 'react-router-dom';
import userAPI from '../../../apis/user.api';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import getStaticFileUrl from '../../utilities/getStaticFileUrl';
import MenuAdmin from '../MenuAdmin/Menu';

const AdminLayout = () => {
  const getAllUser = JSON.parse(localStorage.getItem('infoUser')) ?? [];
  const [choose, setChoose] = useState([]);
  const [search, setSearch] = useState('');
  const [btnSearchUser, setBtnSearchUser] = useState([]);
  const [username, setUsername] = useState('');
  const [getUser, setGetUser] = useState([]);
  const [getNumberPage, setGetNumberPage] = useState();
  const [avatar, setAvatar] = useState();
  const [idAdmin, setIdAdmin] = useState();
  const { page } = useParams();
  const navigate = useNavigate();
  console.log();
  useEffect(() => {
    const fetchData = async () => {
      await userAPI
        .searchUsers(5, Number(page || 1))
        .then((response) => {
          setGetUser(response.result.recount);
        })
        .catch((error) => {
          alert(error);
        });
    };
    fetchData();
  }, []);

  const changeAvatar = async (avatar) => {
    try {
      if (avatar) {
        const formData = new FormData();
        formData.append('avatar', avatar);
        await userAPI.updateAvatar(idAdmin, formData);
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const token = window.localStorage.getItem('X-API-Key');
        const response = await authAPI.getAuth();
        setAvatar(response.avatar);
        setUsername(response.username);
        setIdAdmin(response.id);
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
      navigate('/admin');
    }
  };

  useEffect(() => {
    setBtnSearchUser(getAllUser);
  }, [search]);
  const deleteUsers = () => {
    const updatedUsers = getAllUser.filter((user) => !choose.includes(user.id));

    localStorage.setItem('infoUser', JSON.stringify(updatedUsers));
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

  const deleteUser = async (id) => {
    try {
      await userAPI.deleteUser(id);
    } catch (error) {
      alert(error);
    }
  };

  const btnSearch = () => {
    const searchNameUser = btnSearchUser.filter((user) => {
      return unidecode(user.userName.toLowerCase()).includes(
        unidecode(search.toLowerCase()),
      );
    });
    setBtnSearchUser(searchNameUser);
  };

  const getNumberPager = (event) => {
    setGetNumberPage(event.target.textContent);
  };

  const container = () => {
    return (
      <>
        <div className="mt-5">
          <div className="row">
            <MenuAdmin />
            <div className="manager col-9">
              <h1 className="mb-3">Quản lí người dùng</h1>
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
                  <ModalAddUser />
                  {/* </div>
                <div className="btn-delete"> */}
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
                    <th>Tên dăng nhập</th>
                    <th>Email</th>
                    <th>Tên người dùng</th>
                    <th>Vai trò</th>
                    <th>Thời gian tạo</th>
                    <th>Thời gian cập nhật</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {getUser.length === 0 ? (
                    <div className="空洞的">
                      <b>
                        <h1 className="text-center">
                          Không tìm thấy người dùng
                        </h1>
                      </b>
                    </div>
                  ) : (
                    <>
                      {/* {userAdmin.map((user, index) => {
                        console.log(user.avatar);
                        if (user.role === 1) {
                          return (
                            <tr key={user.id}>
                              <td>
                                <input
                                  type="checkbox"
                                  checked={choose.includes(user.id)}
                                  onChange={() => toggleCheckbox(user.id)}
                                />
                              </td>

                              <td>{user.username}</td>
                              <td>{user.email}</td>
                              <td>
                                <span>{user.first_name}</span>
                                <span>{user.last_name}</span>
                              </td>
                              <td>
                                {user.role === 1 ? (
                                  <span>Admin</span>
                                ) : (
                                  <span>Customers</span>
                                )}
                              </td>
                              <td>
                                {moment(user.create_at).format(
                                  'YYYY-MM-DD HH:mm',
                                )}
                              </td>

                              <td>
                                {moment(user.update_at).format(
                                  'YYYY-MM-DD HH:mm',
                                )}
                              </td>
                              <td>
                                <Modals user={user.id} />
                                <Button
                                  className="ml-3"
                                  variant="danger"
                                  onClick={() => deleteUser(user.id)}
                                >
                                  Xóa
                                </Button>
                              </td>
                            </tr>
                          );
                        }
                      })} */}

                      {getUser.map((user, index) => {
                        return (
                          <tr key={user.id}>
                            <td>
                              <input
                                type="checkbox"
                                checked={choose.includes(user.id)}
                                onChange={() => toggleCheckbox(user.id)}
                              />
                            </td>

                            <td>{user.username}</td>
                            <td>{user.email}</td>

                            <td>
                              <span>{user.first_name}</span>
                              <span>{user.last_name}</span>
                            </td>
                            <td>
                              {user.role === 1 ? (
                                <span>Admin</span>
                              ) : (
                                <span>Customers</span>
                              )}
                            </td>
                            <td>
                              {moment(user.create_at).format(
                                'YYYY-MM-DD HH:mm',
                              )}
                            </td>

                            <td>
                              {moment(user.update_at).format(
                                'YYYY-MM-DD HH:mm',
                              )}
                            </td>
                            <td className="edit-main">
                              <Modals user={user.id} />
                              <Button
                                className="ml-3"
                                variant="danger"
                                onClick={() => deleteUser(user.id)}
                              >
                                Xóa
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </>
                  )}
                </tbody>
              </table>
              <div className="paging text-center mt-5 mb-5">
                <div>
                  <button className="btn-pagig">
                    <AiOutlineLeft />
                  </button>
                  <a href={`/admin/manager/${getNumberPage}`}>
                    <button
                      className="btn-pagig"
                      onClick={(event) => getNumberPager(event)}
                    >
                      1
                    </button>
                  </a>
                  <a href={`/admin/manager/${getNumberPage}`}>
                    <button
                      className="btn-pagig"
                      onClick={(event) => getNumberPager(event)}
                    >
                      2
                    </button>
                  </a>
                  <a href={`/admin/manager/${getNumberPage}`}>
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
          </div>
        </div>
      </>
    );
  };

  return <>{container()}</>;
};

export default AdminLayout;

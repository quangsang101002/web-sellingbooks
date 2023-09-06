import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import unidecode from 'unidecode';
import { Button } from 'react-bootstrap';
import ModalAddContact from './ModalAddContact';
import authAPI from '../../../apis/auth.api';
import { useNavigate } from 'react-router-dom';
import MenuAdmin from '../MenuAdmin/Menu';

const ManagerContact = () => {
  const getAllUser = JSON.parse(localStorage.getItem('Contacts')) ?? [];
  const [choose, setChoose] = useState([]);
  const [search, setSearch] = useState('');
  const [btnSearchUser, setBtnSearchUser] = useState([]);
  const [userName, setUsername] = useState('');
  const navigate = useNavigate();
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
    localStorage.setItem('Contacts', JSON.stringify(updatedUsers));
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
    localStorage.setItem('Contacts', JSON.stringify(spead));
    window.location.reload();
  };

  const btnSearch = () => {
    const searchNameUser = btnSearchUser.filter((user) => {
      return unidecode(user.userContact.toLowerCase()).includes(
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
            <MenuAdmin />
            <div className="manager col-9">
              <h1 className="mb-3">Quản lí liên hệ</h1>
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
                  <ModalAddContact />
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
                    <th>Tên người liên hệ </th>
                    <th>Email </th>
                    <th>Nội dung</th>
                    <th>Trạng thái </th>
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
                          Không tìm thấy người liên hệ
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
                          <td>{user.userContact}</td>
                          <td>{user.email}</td>
                          <td>{user.note}</td>
                          <td>{user.status}</td>
                          <td>{user.time}</td>
                          <td>{user.timmeUpdate}</td>
                          <td>
                            <Link to="/admin/manager_contact_detail">
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

export default ManagerContact;

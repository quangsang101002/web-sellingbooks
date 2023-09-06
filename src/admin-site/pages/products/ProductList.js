import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import ModalProduct from './ModalProduct';
import ModalAddProduct from './ModalAddProduct';
import unidecode from 'unidecode';
import { Button } from 'react-bootstrap';
import authAPI from '../../../apis/auth.api';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import productAPI from '../../../apis/products.api';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import MenuAdmin from '../MenuAdmin/Menu';
import moment from 'moment';
import './Products.scss';

const ProductList = () => {
  const getAllUser = JSON.parse(localStorage.getItem('products')) ?? [];
  const [choose, setChoose] = useState([]);
  const [search, setSearch] = useState('');
  const [btnSearchUser, setBtnSearchUser] = useState([]);
  const [userName, setUsername] = useState('');
  const [getProduct, setGetProduct] = useState([]);
  const [displayProduct, setDisplayProduct] = useState([]);
  const [getNumberPages, setGetNumberPages] = useState();

  const navigate = useNavigate();
  const { id } = useParams();
  const getNumberPager = (event) => {
    setGetNumberPages(event.target.textContent);
  };

  useEffect(() => {
    const fetchDataProduct = async () => {
      await productAPI
        .searchProduct(search, 7, Number(id) || 1)
        .then((response) => {
          setGetProduct(response.result.recount);
          setDisplayProduct(response.result.recount);
        })
        .catch((error) => {
          alert(error);
        });
    };
    fetchDataProduct();
  }, []);

  useEffect(() => {
    if (search === '') {
      setDisplayProduct(getProduct);
    } else {
    }
  }, [search]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = window.localStorage.getItem('X-API-Key');
        const response = await authAPI.getAuth(token);
        setUsername(response.username);
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
  const deleteUsers = (id) => {
    try {
      productAPI.deleteProduct(id);
    } catch (error) {
      console.log(error);
    }
    // const updatedUsers = getAllUser.filter((user) => !choose.includes(user.id));
    // localStorage.setItem('products', JSON.stringify(updatedUsers));
    // setChoose([]);
    // window.location.reload();
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

  const btnSearch = async () => {
    await productAPI
      .searchProduct(search, 7, Number(id) || 1)
      .then((response) => {
        setDisplayProduct(response.result.recount);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const container = () => {
    return (
      <>
        <div className="mt-5">
          <div className="row">
            <MenuAdmin />
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
                  <button type="button" onClick={btnSearch}>
                    Tìm kiếm
                  </button>
                </div>
                <div className="btn-addnew">
                  <ModalAddProduct />
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
                    <th>Mã sản phẩm</th>
                    <th>Tên sản phẩm</th>
                    <th>Đơn giá</th>
                    <th>Mô tả</th>
                    <th>Phân loại</th>
                    <th>Thời gian tạo</th>
                    <th>Thời gian cập nhật</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {displayProduct.length === 0 ? (
                    <div className="空洞的">
                      <b>
                        <h1 className="text-center">Không tìm thấy sản phẩm</h1>
                      </b>
                    </div>
                  ) : (
                    <>
                      {' '}
                      {displayProduct.map((user, index) => (
                        <tr key={user.id}>
                          <td>
                            <input
                              type="checkbox"
                              checked={choose.includes(user.id)}
                              onChange={() => toggleCheckbox(user.id)}
                            />
                          </td>
                          <td>{user.sku}</td>
                          <td>{user.name}</td>
                          <td>{user.unit_price}</td>
                          <td>{user.description}</td>
                          <td>
                            {user.category === 1
                              ? 'STN'
                              : user.category === 2
                              ? 'VH & NT'
                              : 'T & TT'}
                          </td>

                          <td>
                            {moment(user.created_at).format('YYYY-MM-DD HH:mm')}
                          </td>
                          <td>
                            {moment(user.updated_at).format('YYYY-MM-DD HH:mm')}
                          </td>
                          <td className="edit-main">
                            <ModalProduct id={user.product_id} />
                            <Button
                              className="ml-3"
                              variant="danger"
                              onClick={() => deleteUsers(user.product_id)}
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
              <div className="paging text-center mt-5 mb-5">
                <div>
                  <button className="btn-pagig">
                    <AiOutlineLeft />
                  </button>
                  <a href={`/admin/product/${getNumberPages}`}>
                    <button
                      className="btn-pagig"
                      onClick={(event) => getNumberPager(event)}
                    >
                      1
                    </button>
                  </a>
                  <a href={`/admin/product/${getNumberPages}`}>
                    <button
                      className="btn-pagig"
                      onClick={(event) => getNumberPager(event)}
                    >
                      2
                    </button>
                  </a>
                  <a href={`/admin/product/${getNumberPages}`}>
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

export default ProductList;

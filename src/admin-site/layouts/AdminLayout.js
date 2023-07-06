import { Alert, Button, Container, Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import './AdminLayout.scss';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
const AdminLayout = () => {
  const [code, setCode] = useState('');
  const [product, setProduct] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  const addNewProduct = (event) => {
    const getProduct = JSON.parse(localStorage.getItem('products')) ?? [];
    event.preventDefault();
    const allProduct = {
      code: code,
      product: product,
      price: price,
      category: category,
      image: image,
      description: description,
    };

    getProduct.push(allProduct);
    localStorage.setItem('products', JSON.stringify(getProduct));
    setCategory('');
    setCode('');
    setDescription('');
    setImage('');
    setPrice('');
    setProduct('');
  };

  const cancelHandle = () => {
    setCategory('');
    setCode('');
    setDescription('');
    setImage('');
    setPrice('');
    setProduct('');
  };
  return (
    <Container className="mt-5">
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
              <tr>
                <td></td>
              </tr>
              <tr>
                <td>Quản lí sản phẩm</td>
              </tr>
              <tr>
                <Link to="/admin/manager">
                  <td>Quản lí người dùng</td>
                </Link>
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
          <h2>Thêm mới sản phẩm</h2>
          <div className="add-product">
            <form action="">
              <div className="form-group">
                <label htmlFor="code">
                  Mã sản phẩm<small>(*)</small>
                </label>
                <input
                  type="text"
                  id="code"
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="nameProduct">
                  Tên sản phẩm<small>(*)</small>
                </label>
                <input
                  type="text"
                  id="nameProduct"
                  value={product}
                  onChange={(event) => setProduct(event.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Mô tả</label>
                <input
                  type="text"
                  id="description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">
                  Đơn giá<small>(*)</small>
                </label>
                <input
                  type="text"
                  id="price"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">
                  Phân loại<small>(*)</small>
                </label>
                <select id="category">
                  <option>Thiếu nhi</option>
                  <option>Văn học</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="image">
                  Hình ảnh<small>(*)</small>
                </label>
                <input
                  type="text"
                  id="image"
                  value={image}
                  onChange={(event) => setImage(event.target.value)}
                />
              </div>
              <div className="form-group-btn">
                <button onClick={(event) => addNewProduct(event)}>Thêm</button>
                <button type="reset" onClick={() => cancelHandle()}>
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AdminLayout;

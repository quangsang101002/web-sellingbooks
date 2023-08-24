import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react';
import productAPI from '../../../apis/products.api';
import moment from 'moment/moment';

const ModalProduct = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const getAddUser = JSON.parse(localStorage.getItem('products')) ?? [];
  const [sku, setSku] = useState('');
  const [nameProduct, setNameProduct] = useState('');
  const [categoryProduct, setCategoryProduct] = useState('');
  const [description, setDescription] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState(0);
  const [getProduct, setGetProduct] = useState([]);
  const formattedTime = moment().format('YYYY-MM-DD HH:mm:ss');

  useEffect(() => {
    try {
      productAPI.searchProduct().then((response) => {
        setGetProduct(response.result.recount);
      });
    } catch (error) {
      alert(error);
    }
    changeValue();
  }, []);

  const changeValue = () => {
    getProduct.forEach((user) => {
      if (user.product_id === props.id) {
        setSku(user.sku);
        setNameProduct(user.name);
        setCategoryProduct(user.category);
        setDescription(user.description);
        setUnitPrice(user.unit_price);
        setImage(user.image);
      }
    });
  };

  const handleSave = () => {
    const updatedUsers = getProduct.map((user) => {
      if (user.id === props.id) {
        return {
          ...user,
          sku: sku,
          name: nameProduct,
          category: categoryProduct,
          description: description,
          unit_price: unitPrice,
          image: image,
        };
      }
      window.location.reload();
      return user;
    });

    localStorage.setItem('products', JSON.stringify(updatedUsers));

    setShow(false);
  };
  const classify = (event) => {
    setCategory(event.target.value);
  };
  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        Sửa
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="d-flex justify-content-center">
            Sửa thông tin người dùng
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            className="mb-2"
            placeholder="Mã sản phẩm"
            value={sku}
            onChange={(event) => setSku(event.target.value)}
          ></Form.Control>
          <Form.Control
            className="mb-2"
            placeholder="Tên sản phẩm "
            value={nameProduct}
            onChange={(event) => setNameProduct(event.target.value)}
          ></Form.Control>
          <Form.Control
            className="mb-2"
            placeholder="Đơn giá"
            value={unitPrice}
            onChange={(event) => setUnitPrice(event.target.value)}
          ></Form.Control>
          <Form.Control
            className="mb-2"
            placeholder="Mô tả"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          ></Form.Control>
          <Form.Control
            className="mb-2"
            placeholder="Phân loại"
            value={categoryProduct}
            onChange={(event) => setCategory(event.target.value)}
          ></Form.Control>
          <Form.Select onChange={(event) => classify(event)} value={category}>
            <option disabled hidden value="0">
              Thể loại
            </option>
            <option value="1">Sách thiếu nhi</option>
            <option value="2">Sách văn học nghệ thuật</option>
            <option value="3">Sách Truyện, tiểu thuyết</option>
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Lưu thay đổi
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalProduct;

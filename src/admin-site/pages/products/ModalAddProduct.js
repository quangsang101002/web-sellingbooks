import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import moment from 'moment/moment';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import productAPI from '../../../apis/products.api';

function ModalAddProduct() {
  const [code, setCode] = useState('');
  const [nameProduct, setNameProduct] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [classify, setClassify] = useState('');
  const [image, setImage] = useState('');
  const [validate, setValidate] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const getAddProduct = JSON.parse(localStorage.getItem('products')) ?? [];
  const formattedTime = moment().format('YYYY-MM-DD HH:mm:ss');

  const addInfoUser = () => {
    const validateError = validateName();
    if (validateError.size === 0) {
      addUser();
      setShow(false);
    } else {
      setValidate(Object.fromEntries(validateError));
    }
  };

  const validateName = () => {
    // let mes = {};
    // setValidate(mes);
    // if (code.length === 0) {
    //   mes.mesName = 'Mã sản phẩm không được bỏ trống';
    // } else if (nameProduct.length === 0) {
    //   mes.mesProduct = 'Tên sản phẩm không được bỏ trống';
    // } else if (price.length === 0) {
    //   mes.mesPrice = 'Đơn giá không được bỏ trống';
    // } else if (image.length === 0) {
    //   mes.image = 'Hình ảnh không được để trống';
    // } else {
    //   mes.mesName = '';
    // }
    let error = new Map();
    if (code.length === 0) {
      error.set('sku', 'Mã sản phẩm không được bỏ trống');
    } else if (nameProduct.length === 0) {
      error.set('nameProduct', 'Tên sản phẩm không được bỏ trống');
    } else if (price.length === 0) {
      error.set('price', 'Đơn giá không được bỏ trống');
    }
    // } else if (image.length === 0) {
    //   error.set('image', 'Hình ảnh không được để trống');
    // }
    return error;
  };

  const addUser = () => {
    const allProduct = {
      sku: code,
      name: nameProduct,
      category: classify,
      description: description,
      unit_price: price,
      image: image,
    };
    try {
      productAPI.addProduct(allProduct);
    } catch (error) {
      alert(error);
    }
  };

  const getClassify = (event) => {
    setClassify(event.target.value);
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Thêm
      </Button>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm người dùng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <div className="wrapper_CustomerRegisterPage">
            <Form> */}
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextUserName"
          >
            <Form.Label column sm="2">
              {/* Tên đăng nhập */}
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Mã sản phẩm"
                value={code}
                onChange={(event) => setCode(event.target.value)}
              />
            </Col>
            <small className="text-center" style={{ color: 'red' }}>
              {validate.sku}
            </small>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="2">
              {/* Email */}
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="email"
                name="text"
                placeholder="Tên sản phẩm"
                value={nameProduct}
                onChange={(event) => setNameProduct(event.target.value)}
              />
            </Col>
            <small className="text-center" style={{ color: 'red' }}>
              {validate.nameProduct}
            </small>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextFirstName"
          >
            <Form.Label column sm="2">
              {/* Họ */}
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                as="textarea"
                placeholder="Mô tả"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextLastName"
          >
            <Form.Label column sm="2">
              {/* Tên */}
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Đơn giá"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              />
            </Col>
            <small className="text-center" style={{ color: 'red' }}>
              {validate.price}
            </small>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="2">
              {/* Mật khẩu */}
            </Form.Label>
            <Col sm="10">
              <Form.Select
                onChange={(event) => getClassify(event)}
                value={classify}
              >
                <option disabled hidden value="">
                  Thể loại
                </option>
                <option value="1">Sách thiếu nhi</option>
                <option value="2">Sách văn học nghệ thuật</option>
                <option value="3">Sách Truyện, tiểu thuyết</option>
              </Form.Select>
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextRepeatPassword"
          >
            <Form.Label column sm="2">
              {/* Mật khẩu nhập lại */}
            </Form.Label>
            <Col sm="10">
              <Form.Control
                name="listProduct"
                type="file"
                accept="image/*"
                value={image}
                onChange={(event) => setImage(event.target.value)}
              />
              <small className="text-center" style={{ color: 'red' }}>
                {validate.image}
              </small>
            </Col>
          </Form.Group>

          {/* <div className="col-12 text-end">
            <Button onClick={addInfoUser}>Submit</Button>
          </div> */}
          {/* </Form>
          </div> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={addInfoUser}>
            Thêm mới
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalAddProduct;

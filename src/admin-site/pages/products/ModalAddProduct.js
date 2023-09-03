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
  const [validate, setValidate] = useState('');
  const [show, setShow] = useState(false);
  const [avatar, setAvatar] = useState('');
  const [gallery, setGallery] = useState('');
  const [errorDisplay, setErrorDisplay] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const getAddProduct = JSON.parse(localStorage.getItem('products')) ?? [];
  // const formattedTime = moment().format('YYYY-MM-DD HH:mm:ss');
  const addInfoUser = (event) => {
    event.preventDefault();
    const validateError = validateName();
    if (validateError.size === 0) {
      setShow(false);
      addUser();
    } else {
      setValidate(Object.fromEntries(validateError));
      return;
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
    } else if (avatar.length === 0) {
      error.set('avatar', 'Hình ảnh không được để trống');
    } else if (gallery.length === 0) {
      error.set('gallery', 'Hình ảnh không được để trống');
    }
    return error;
  };

  const addUser = async () => {
    const allProduct = {
      sku: code,
      name: nameProduct,
      category: classify,
      description: description,
      unit_price: price,
      avatar: avatar,
      gallery: Array.from(gallery),
    };
    try {
      await productAPI.addProduct(allProduct);
    } catch (error) {
      setShow(true);
      setErrorDisplay(error);
    }
  };

  const getClassify = (event) => {
    setClassify(event.target.value);
  };
  return (
    <>
      <form method="post" enctype="multipart/form-data">
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
                {errorDisplay.messageSku}
                {errorDisplay.sku}
              </small>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
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
                {errorDisplay.messageName}
                {errorDisplay.nameProduct}
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
                <label for="myfile">
                  <b>avatarImage:</b>
                </label>
                <Form.Control
                  name="listProduct"
                  type="file"
                  onChange={(event) => setAvatar(event.target.files[0])}
                />
                <small className="text-center" style={{ color: 'red' }}>
                  {validate.avatar}
                </small>
              </Col>
            </Form.Group>

            <Form.Group
              method="post"
              enctype="multipart/form-data"
              as={Row}
              className="mb-3"
              controlId="formPlaintextRepeatPassword"
            >
              <Form.Label column sm="2"></Form.Label>
              <Col sm="10">
                <label for="myfile">
                  <b>galleryImage:</b>
                </label>
                <Form.Control
                  name="galleryImage"
                  type="file"
                  multiple
                  onChange={(event) => setGallery(event.target.files)}
                />
                <small className="text-center" style={{ color: 'red' }}>
                  {validate.gallery}
                </small>
              </Col>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Đóng
            </Button>
            <Button variant="primary" onClick={(event) => addInfoUser(event)}>
              Thêm mới
            </Button>
          </Modal.Footer>
        </Modal>
      </form>
    </>
  );
}

export default ModalAddProduct;

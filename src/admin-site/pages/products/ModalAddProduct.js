import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment/moment';
import Modal from 'react-bootstrap/Modal';

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
    validateName();
    addUser();
    setShow(false);
  };
  const addUser = () => {
    const allProduct = {
      id: getAddProduct.length + 1,
      code: code,
      nameProduct: nameProduct,
      price: price,
      description: description,
      classify: classify,
      time: formattedTime,
      image: image,
    };
    if (nameProduct && price && code) {
      getAddProduct.push(allProduct);
      localStorage.setItem('products', JSON.stringify(getAddProduct));
    } else {
      return;
    }
  };

  const validateName = () => {
    let mes = {};

    setValidate(mes);
    if (code.length === 0) {
      mes.mesName = 'Mã sản phẩm không được bỏ trống';
    } else if (nameProduct.length === 0) {
      mes.mesProduct = 'Tên sản phẩm không được bỏ trống';
    } else if (price.length === 0) {
      mes.mesPrice = 'Đơn giá không được bỏ trống';
    } else if (image.length === 0) {
      mes.image = 'Hình ảnh không được để trống';
    } else {
      mes.mesName = '';
    }
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
              {validate.mesName}
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
              {validate.mesProduct}
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
              {validate.mesPrice}
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
                onChange={(event) => setClassify(event.currentTarget.value)}
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

          <div className="col-12 text-end">
            <Button onClick={addInfoUser}>Submit</Button>
          </div>
          {/* </Form>
          </div> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Thêm mới
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalAddProduct;

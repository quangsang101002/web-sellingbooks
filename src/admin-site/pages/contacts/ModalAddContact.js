import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';
import moment from 'moment/moment';
import Modal from 'react-bootstrap/Modal';

function ModalAddContact() {
  const [code, setCode] = useState('');
  const [nameProduct, setNameProduct] = useState('');
  const [price, setPrice] = useState('');
  const [classify, setClassify] = useState('');
  const [validate, setValidate] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getAddProduct = JSON.parse(localStorage.getItem('userOrder')) ?? [];
  const formattedTime = moment().format('YYYY-MM-DD HH:mm:ss');

  const addInfoUser = () => {
    addUser();
    validateName();
  };
  const addUser = () => {
    const allProduct = {
      id: getAddProduct.length + 1,
      codeOrder: code,
      nameUserOrder: nameProduct,
      totalPrice: price,
      time: formattedTime,
    };
    if (nameProduct && price && code) {
      getAddProduct.push(allProduct);
      localStorage.setItem('userOrder', JSON.stringify(getAddProduct));
    } else {
      return;
    }
  };

  const validateName = () => {
    let mes = {};

    setValidate(mes);
    console.log(mes);
    if (code.length === 0) {
      mes.mesName = 'Mã sản phẩm không được bỏ trống';
    } else if (nameProduct.length === 0) {
      mes.mesProduct = 'Tên sản phẩm không được bỏ trống';
    } else if (price.length === 0) {
      mes.mesPrice = 'Đơn giá không được bỏ trống';
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
                placeholder="Tên người liên hệ"
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
                placeholder="Email"
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
            controlId="formPlaintextLastName"
          >
            <Form.Label column sm="2">
              {/* Tên */}
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Nội dung"
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
                onChange={(event) => setClassify(event.target.value)}
              >
                <option>Sách thiếu nhi</option>
                <option>Sách văn học nghệ thuật</option>
                <option>Sách Truyện, tiểu thuyết</option>
              </Form.Select>
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextRepeatPassword"
          ></Form.Group>

          <div className="col-12 text-end">
            <Button onClick={() => addInfoUser()}>Submit</Button>
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

export default ModalAddContact;

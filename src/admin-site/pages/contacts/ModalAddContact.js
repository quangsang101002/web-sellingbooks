import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';
import moment from 'moment/moment';
import Modal from 'react-bootstrap/Modal';

function ModalAddContact() {
  const [code, setCode] = useState('');
  const [nameContact, setNameContact] = useState('');
  const [price, setPrice] = useState('');
  const [classify, setClassify] = useState('');
  const [validate, setValidate] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getAddProduct = JSON.parse(localStorage.getItem('Contacts')) ?? [];
  const formattedTime = moment().format('YYYY-MM-DD HH:mm:ss');

  const addInfoUser = () => {
    addUser();
    validateName();
  };
  const addUser = () => {
    const allProduct = {
      id: getAddProduct.length + 1,
      userContact: code,
      note: price,
      email: nameContact,
      status: classify,
      time: formattedTime,
    };
    if (nameContact && price && code) {
      getAddProduct.push(allProduct);
      localStorage.setItem('Contacts', JSON.stringify(getAddProduct));
    } else {
      return;
    }
  };

  const validateName = () => {
    let mes = {};

    setValidate(mes);
    if (code.length === 0) {
      mes.mesName = 'Tên người liên hệ không được bỏ trống ';
    } else if (nameContact.length === 0) {
      mes.mesProduct = 'Email không được bỏ trống';
    } else if (classify === '') {
      mes.mesStatus = 'Bạn chưa chọn trạng thái';
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
                name="email"
                placeholder="Email"
                value={nameContact}
                onChange={(event) => setNameContact(event.target.value)}
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
                as="textarea"
                rows={3}
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
                value={classify}
              >
                <option disabled hidden value="">
                  Trạng thái
                </option>
                <option>Liên hệ mới</option>
                <option>Đã nhận</option>
                <option>Bị từ chối</option>
              </Form.Select>
            </Col>
            <small className="text-center" style={{ color: 'red' }}>
              {validate.mesStatus}{' '}
            </small>
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

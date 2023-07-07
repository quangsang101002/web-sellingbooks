import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react';
import moment from 'moment/moment';

const ModalProduct = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getAddUser = JSON.parse(localStorage.getItem('products')) ?? [];
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFistName] = useState('');
  const [lastName, setLastName] = useState('');
  const formattedTime = moment().format('YYYY-MM-DD HH:mm:ss');

  useEffect(() => {
    changeValue();
  }, []);

  const changeValue = () => {
    getAddUser.forEach((user) => {
      if (user.id === props.user.id) {
        setUserName(user.userName);
        setEmail(user.email);
        setFistName(user.firstName);
        setLastName(user.lastName);
      }
    });
  };

  const handleSave = () => {
    const updatedUsers = getAddUser.map((user) => {
      if (user.id === props.user.id) {
        return {
          ...user,
          userName: userName,
          email: email,
          firstName: firstName,
          lastName: lastName,
          timmeUpdate: formattedTime,
        };
      }
      window.location.reload();
      return user;
    });

    localStorage.setItem('products', JSON.stringify(updatedUsers));

    setShow(false);
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
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
          ></Form.Control>
          <Form.Control
            className="mb-2"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          ></Form.Control>
          <Form.Control
            className="mb-2"
            value={firstName}
            onChange={(event) => setFistName(event.target.value)}
          ></Form.Control>
          <Form.Control
            className="mb-2"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          ></Form.Control>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={() => handleSave()}>
            Lưu thay đổi
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalProduct;

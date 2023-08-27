import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react';
import moment from 'moment/moment';
import userAPI from '../../../apis/user.api';

const Modals = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFistName] = useState('');
  const [lastName, setLastName] = useState('');
  const formattedTime = moment().format('YYYY-MM-DD HH:mm:ss');

  const updateUser = {
    username: userName,
    email: email,
    first_name: firstName,
    last_name: lastName,
    update_at: formattedTime,
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const getUsersDb = await userAPI.searchUsers();
        if (getUsersDb.result && getUsersDb.result.recount) {
          changeValue(getUsersDb.result.recount);
        }
      } catch (error) {
        alert(error);
      }
    };
    fetchData();
  }, []);

  const changeValue = (users) => {
    if (users) {
      users.forEach((user) => {
        if (user.id === props.user) {
          setUserName(user.username);
          setEmail(user.email);
          setFistName(user.first_name);
          setLastName(user.last_name);
        }
      });
    }
  };

  const handleSave = async () => {
    await userAPI.updateUser(props.user, updateUser);
    setShow(false);
  };
  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        Sửa
      </Button>

      <form method="PUT">
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
              placeholder="userName"
              onChange={(event) => setUserName(event.target.value)}
            ></Form.Control>
            <Form.Control
              className="mb-2"
              value={email}
              placeholder="Email"
              type="email"
              id="email"
              name="email"
              onChange={(event) => setEmail(event.target.value)}
            ></Form.Control>
            <Form.Control
              className="mb-2"
              value={firstName}
              placeholder="firstName"
              onChange={(event) => setFistName(event.target.value)}
            ></Form.Control>
            <Form.Control
              className="mb-2"
              value={lastName}
              placeholder="lastName"
              onChange={(event) => setLastName(event.target.value)}
            ></Form.Control>
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
      </form>
    </>
  );
};

export default Modals;

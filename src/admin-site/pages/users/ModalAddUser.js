import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';
import moment from 'moment/moment';
import Modal from 'react-bootstrap/Modal';

function ModalAddUser() {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFistName] = useState('');
  const [lastName, setLastName] = useState('');
  const [passWord, setPassWord] = useState('');
  const [reapeat, setRepeatPassWord] = useState('');
  const [validate, setValidate] = useState('');
  const [validatePw, setValidatePw] = useState('');
  const [show, setShow] = useState(false);
  const [selectedClassify, setSelectedClassify] = useState('');

  console.log('classify', selectedClassify);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const getAddUser = JSON.parse(localStorage.getItem('infoUser')) ?? [];
  const formattedTime = moment().format('YYYY-MM-DD HH:mm:ss');

  const addInfoUser = () => {
    addUser();
    validateName();
    validatePassWord();
  };
  const addUser = () => {
    const allUser = {
      id: getAddUser.length + 1,
      userName: user,
      email: email,
      firstName: firstName,
      lastName: lastName,
      classify: selectedClassify,
      passWord: passWord,
      time: formattedTime,
    };
    if (email && firstName && lastName && passWord) {
      getAddUser.push(allUser);
      localStorage.setItem('infoUser', JSON.stringify(getAddUser));
    } else {
    }
  };

  const validateName = () => {
    let mes = {};
    const regex =
      /^[A-Za-z0-9]+([.-]?[A-Za-z0-9]+)*@[A-Za-z0-9]+([.-]?[A-Za-z0-9]+)*\.[A-Za-z]{2,}$/;
    setValidate(mes);
    console.log(mes);
    if (user.length === 0) {
      mes.mesName = 'Tên User không được bỏ trống';
    } else if (!user.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/)) {
      mes.mesName =
        'Tên đăng nhập chỉ cho nhập chữ và số và không có các kí tự đặc biệt';
    } else if (!email.match(regex)) {
      mes.mesEmail = 'Email không hợp lệ';
    } else {
      mes.mesName = '';
    }
  };
  const validatePassWord = () => {
    let changePage = false;
    console.log(validatePw);
    let mes = {};
    setValidatePw(mes);
    if (passWord.length === 0) {
      mes.mesPw = 'mật khẩu không được bỏ trống';
    } else if (passWord.length < 4 || passWord.length > 10) {
      mes.mesPw = 'mật khẩu tối thiểu 4 kí tự và nhiều nhất 10 kí tự';
    } else if (passWord === reapeat) {
      changePage = true;
    } else if (passWord !== reapeat) {
      mes.mesPw = 'mật khẩu không trùng lặp vui lòng nhập lại';
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
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                {/* Tên đăng nhập */}
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  placeholder="UserName"
                  id="formPlaintextUserName"
                  value={user}
                  onChange={(event) => setUser(event.target.value)}
                />
              </Col>
              <small>{validate.mesName}</small>
            </Form.Group>

            <small>{validate.mesName}</small>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="2">
              {/* Email */}
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="email"
                name="email"
                placeholder="email"
                onChange={(event) => setEmail(event.target.value)}
              />
            </Col>
            <small>{validate.mesEmail}</small>
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
                placeholder="FirstName"
                onChange={(event) => setFistName(event.target.value)}
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
                placeholder="LastName"
                onChange={(event) => setLastName(event.target.value)}
              />
            </Col>
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
                onChange={(event) => setSelectedClassify(event.target.value)}
              >
                <option>Quản trị viên</option>
                <option>Khách hàng</option>
              </Form.Select>
            </Col>
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
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(event) => setPassWord(event.target.value)}
              />
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
                type="password"
                placeholder="RepeatPassword"
                onChange={(event) => setRepeatPassWord(event.target.value)}
              />
            </Col>
            <small>{validatePw.mesPw}</small>
          </Form.Group>

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

export default ModalAddUser;

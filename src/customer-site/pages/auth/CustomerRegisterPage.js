import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import './CustomerRegisterPage.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment/moment';

function CustomerRegisterPage() {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFistName] = useState('');
  const [lastName, setLastName] = useState('');
  const [passWord, setPassWord] = useState('');
  const [reapeat, setRepeatPassWord] = useState('');
  const [validate, setValidate] = useState('');
  const [validatePw, setValidatePw] = useState('');

  const navigate = useNavigate();
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
      classify: 'khách hàng',
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

    if (changePage) {
      navigate('/');
    }
  };
  return (
    <div className="wrapper_CustomerRegisterPage">
      <div className="container">
        <div className="title">
          <h2 className="text-center ">Đăng kí</h2>
        </div>
        <Form>
          <Form.Group className="mb-3" controlId="formPlaintextUserName">
            <Col>
              <Form.Control
                type="text"
                placeholder="UserName"
                value={user}
                onChange={(event) => setUser(event.target.value)}
              />
            </Col>
            <small>{validate.mesName}</small>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPlaintextEmail">
            <Col>
              <Form.Control
                type="email"
                id="email"
                name="email"
                placeholder="email"
                onChange={(event) => setEmail(event.target.value)}
              />
            </Col>
            <small>{validate.mesEmail}</small>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPlaintextFirstName">
            <Col>
              <Form.Control
                type="text"
                placeholder="FirstName"
                onChange={(event) => setFistName(event.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPlaintextLastName">
            <Col>
              <Form.Control
                type="text"
                placeholder="LastName"
                onChange={(event) => setLastName(event.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPlaintextPassword">
            <Col>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(event) => setPassWord(event.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPlaintextRepeatPassword">
            <Col>
              <Form.Control
                type="password"
                placeholder="RepeatPassword"
                onChange={(event) => setRepeatPassWord(event.target.value)}
              />
            </Col>
            <small>{validatePw.mesPw}</small>
          </Form.Group>

          <div className="text-end">
            <Button onClick={() => addInfoUser()}>Submit</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default CustomerRegisterPage;

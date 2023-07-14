import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import './CustomerRegisterPage.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment/moment';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';

function CustomerLoginPage() {
  const [email, setEmail] = useState('');
  const [passWord, setPassWord] = useState('');
  const [validate, setValidate] = useState('');
  const [validatePw, setValidatePw] = useState('');
  const [showPw, setShowPw] = useState('');

  const navigate = useNavigate();
  const getAddUser = JSON.parse(localStorage.getItem('infoUser')) ?? [];
  const setShowPassword = () => {
    setShowPw(!showPw);
  };
  const addInfoUser = (event) => {
    event.preventDefault();
    validateName();
    validatePassWord();
  };

  const validateName = () => {
    let mes = {};
    const regex =
      /^[A-Za-z0-9]+([.-]?[A-Za-z0-9]+)*@[A-Za-z0-9]+([.-]?[A-Za-z0-9]+)*\.[A-Za-z]{2,}$/;
    setValidate(mes);

    if (email.length === 0) {
      mes.mesEmail = 'Tên email không được bỏ trống';
    } else if (!email.match(regex)) {
      mes.mesEmail = 'Email không hợp lệ';
    } else {
      mes.mesEmail = '';
    }
  };
  const validatePassWord = () => {
    let mes = {};
    setValidatePw(mes);
    let isExitsEmail = true;
    getAddUser.forEach((user) => {
      if (user.passWord !== passWord) {
        isExitsEmail = false;
      } else {
        isExitsEmail = true;
      }
    });
    if (passWord.length === 0) {
      mes.mesPw = 'mật khẩu không được bỏ trống';
    } else if (passWord.length < 4 || passWord.length > 10) {
      mes.mesPw = 'mật khẩu tối thiểu 4 kí tự và nhiều nhất 10 kí tự';
    } else if (!isExitsEmail) {
      mes.mesPw = 'mật khẩu sai';
    } else {
      mes.mesPw = '';
    }

    const user = {
      email,
    };
    if (isExitsEmail) {
      localStorage.setItem('userAccount', JSON.stringify(user));
      navigate('/');
      window.location.reload();
    }
  };
  return (
    <div className="wrapper_CustomerRegisterPage">
      <div className="container-customer">
        <div className="title">
          <h2 className="text-center ">Đăng nhập</h2>
        </div>
        <Form>
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
          <Form.Group className="mb-3" controlId="formPlaintextPassword">
            <Col className="wrapper_password">
              <Form.Control
                type={!showPw ? 'text' : 'password'}
                placeholder="Password"
                onChange={(event) => setPassWord(event.target.value)}
              />
              {!showPw ? (
                <FaEye className="showinput" onClick={setShowPassword} />
              ) : (
                <FaEyeSlash className="showinput" onClick={setShowPassword} />
              )}
            </Col>
            <small>{validatePw.mesPw}</small>
          </Form.Group>

          <div className="text-end">
            <div className="login-user">
              <p onClick={() => navigate('/register')}>Đăng kí</p>
            </div>
            <button
              type="button"
              className="add-product_buy"
              onClick={(event) => addInfoUser(event)}
            >
              Submit
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default CustomerLoginPage;

import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import './CustomerRegisterPage.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import authAPI from '../../../apis/auth.api';

function CustomerLoginPage() {
  const [email, setEmail] = useState('');
  const [passWord, setPassWord] = useState('');
  const [validate, setValidate] = useState({});
  const [validatePw, setValidatePw] = useState({});
  const [showPw, setShowPw] = useState(false);
  const [displayErorr, setDisplayErorr] = useState('');

  console.log('displayErorr---');
  const navigate = useNavigate();
  const getAddUser = JSON.parse(localStorage.getItem('infoUser')) ?? [];
  const setShowPassword = () => {
    setShowPw(!showPw);
  };

  const addInfoUser = (event) => {
    event.preventDefault();

    const fetchDataUser = async () => {
      try {
        const response = await authAPI.login(email, passWord);
        window.localStorage.setItem('X-API-key-Custermer', response.token);
        console.log('>>>', response);
        navigate('/');
      } catch (error) {
        setDisplayErorr(error);
      }
    };
    fetchDataUser();
    // validateName();
    // validatePassWord();
  };

  const validateName = () => {
    let isUser = false;

    for (const user of getAddUser) {
      if (user.email === email) {
        isUser = true;
        break;
      }
    }

    const regex =
      /^[A-Za-z0-9]+([.-]?[A-Za-z0-9]+)*@[A-Za-z0-9]+([.-]?[A-Za-z0-9]+)*\.[A-Za-z]{2,}$/;
    const validation = {};

    if (email.length === 0) {
      validation.mesEmail = 'Tên email không được bỏ trống';
    } else if (!email.match(regex)) {
      validation.mesEmail = 'Email không hợp lệ';
    } else if (!isUser) {
      validation.mesEmail = 'Email không đúng';
    }

    setValidate(validation);
  };

  const validatePassWord = () => {
    let isUserLogin = false;

    for (const user of getAddUser) {
      if (user.passWord === passWord) {
        isUserLogin = true;
        break;
      }
    }
    const validation = {};

    if (passWord.length === 0) {
      validation.mesPw = 'Mật khẩu không được bỏ trống';
    } else if (passWord.length < 4 || passWord.length > 10) {
      validation.mesPw = 'Mật khẩu phải có từ 4 đến 10 kí tự';
    } else if (!isUserLogin) {
      validation.mesPw = 'Mật khẩu không chính xác';
    }

    setValidatePw(validation);

    if (isUserLogin) {
      const user = {
        email,
      };

      localStorage.setItem('userAccount', JSON.stringify(user));
      navigate('/');
      window.location.reload();
    }
  };

  return (
    <div className="wrapper_CustomerRegisterPage">
      <div className="container-customer">
        <div className="title">
          <h2 className="text-center">Đăng nhập</h2>
        </div>
        <Form>
          <Form.Group className="mb-3" controlId="formPlaintextEmail">
            <Col>
              <Form.Control
                type="email"
                name="email"
                placeholder="Email"
                onChange={(event) => setEmail(event.target.value)}
              />
            </Col>
            {displayErorr === 'User not found' ? (
              <small>User not found</small>
            ) : (
              ''
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPlaintextPassword">
            <Col className="wrapper_password">
              <Form.Control
                type={showPw ? 'text' : 'password'}
                placeholder="Mật khẩu"
                onChange={(event) => setPassWord(event.target.value)}
              />
              <span className="showinput" onClick={setShowPassword}>
                {showPw ? <FaEyeSlash /> : <FaEye />}
              </span>
            </Col>
            {displayErorr === 'Sai mật khẩu' ? <small>Sai mật khẩu</small> : ''}
          </Form.Group>

          <div className="text-end">
            <div className="login-user">
              <p onClick={() => navigate('/register')}>Đăng kí</p>
            </div>
            <Button
              type="button"
              className="add-product_buy"
              onClick={addInfoUser}
            >
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default CustomerLoginPage;

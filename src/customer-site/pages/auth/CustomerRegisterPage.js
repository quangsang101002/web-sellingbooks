import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import './CustomerRegisterPage.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment/moment';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import userAPI from '../../../apis/user.api';
import authAPI from '../../../apis/auth.api';

function CustomerRegisterPage() {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [passWord, setPassWord] = useState('');
  const [repeat, setRepeatPassWord] = useState('');
  const [validate, setValidate] = useState({});
  const [validatePw, setValidatePw] = useState('');
  const [showPw, setShowPw] = useState('');
  const [displayErorr, setDisplayErorr] = useState('');
  console.log(displayErorr.errorPw);
  const navigate = useNavigate();
  const setShowPassword = () => {
    setShowPw(!showPw);
  };
  const setShowRpPassword = () => {
    setValidatePw(!validatePw);
  };
  const getAddUser = JSON.parse(localStorage.getItem('infoUser')) ?? [];
  const formattedTime = moment().format('YYYY-MM-DD HH:mm:ss');
  const handleRegister = async (event) => {
    event.preventDefault();
    const registerUser = {
      username: user,
      email: email,
      first_name: firstName,
      last_name: lastName,
      password: passWord,
    };

    const validatePw = validateName();

    if (validatePw.size === 0) {
      try {
        await authAPI.register(registerUser);
      } catch (error) {
        // console.log(error);
        alert(error);
      }
    } else {
      setDisplayErorr(Object.fromEntries(validatePw));
    }

    // const validationResult = validateInput();
    // if (validationResult.isValid) {
    //   addUser();
    //   navigate('/login');
    // } else {
    //   setValidate(validationResult.errors);
    // }
  };

  const validateName = () => {
    let error = new Map();
    if (passWord !== repeat) {
      error.set('errorPw', 'Mật khẩu không trùng lặp');
    }
    return error;
  };

  const validateInput = () => {
    const errors = {};

    if (user.trim().length === 0) {
      errors.userName = 'Tên User không được bỏ trống';
    } else if (!user.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/)) {
      errors.userName =
        'Tên đăng nhập chỉ cho nhập chữ và số và không có các kí tự đặc biệt';
    }

    const regex =
      /^[A-Za-z0-9]+([.-]?[A-Za-z0-9]+)*@[A-Za-z0-9]+([.-]?[A-Za-z0-9]+)*\.[A-Za-z]{2,}$/;
    if (!email.match(regex)) {
      errors.email = 'Email không hợp lệ';
    } else {
      const isExitsEmail = getAddUser.some((user) => user.email === email);
      if (isExitsEmail) {
        errors.email = 'Email đã tồn tại';
      }
    }

    if (firstName.trim().length === 0) {
      errors.firstName = 'FirstName không được bỏ trống';
    }

    if (lastName.trim().length === 0) {
      errors.lastName = 'LastName không được bỏ trống';
    }

    if (passWord.trim().length === 0) {
      errors.passWord = 'Mật khẩu không được bỏ trống';
    } else if (passWord.length < 4 || passWord.length > 10) {
      errors.passWord = 'Mật khẩu tối thiểu 4 kí tự và nhiều nhất 10 kí tự';
    }

    if (passWord !== repeat) {
      errors.repeatPassWord = 'Mật khẩu không trùng khớp vui lòng nhập lại';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors: errors,
    };
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

    getAddUser.push(allUser);
    localStorage.setItem('infoUser', JSON.stringify(getAddUser));
  };

  return (
    <div className="wrapper_CustomerRegisterPage">
      <div className="container-customer">
        <div className="title">
          <h2 className="text-center">Đăng kí</h2>
        </div>
        <Form method="POST">
          <Form.Group className="mb-3" controlId="formPlaintextUserName">
            <Col>
              <Form.Control
                type="text"
                placeholder="UserName"
                value={user}
                onChange={(event) => setUser(event.target.value)}
              />
            </Col>
            <small>{validate.userName}</small>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPlaintextEmail">
            <Col>
              <Form.Control
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                onChange={(event) => setEmail(event.target.value)}
              />
            </Col>
            <small>{validate.email}</small>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPlaintextFirstName">
            <Col>
              <Form.Control
                type="text"
                placeholder="FirstName"
                onChange={(event) => setFirstName(event.target.value)}
              />
            </Col>
            <small>{validate.firstName}</small>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPlaintextLastName">
            <Col>
              <Form.Control
                type="text"
                placeholder="LastName"
                onChange={(event) => setLastName(event.target.value)}
              />
            </Col>
            <small>{validate.lastName}</small>
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
            <small>{displayErorr.errorPw}</small>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPlaintextRepeatPassword">
            <Col className="wrapper_password">
              <Form.Control
                type={!validatePw ? 'text' : 'password'}
                placeholder="RepeatPassword"
                onChange={(event) => setRepeatPassWord(event.target.value)}
              />
              {!validatePw ? (
                <FaEye className="showinput" onClick={setShowRpPassword} />
              ) : (
                <FaEyeSlash className="showinput" onClick={setShowRpPassword} />
              )}
            </Col>

            <small>{validate.repeatPassWord}</small>
          </Form.Group>

          <div className="text-end">
            <div className="login-user">
              <p onClick={() => navigate('/login')}>Login</p>
            </div>
            <Button
              type="submit"
              className="add-product_buy"
              onClick={handleRegister}
            >
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default CustomerRegisterPage;

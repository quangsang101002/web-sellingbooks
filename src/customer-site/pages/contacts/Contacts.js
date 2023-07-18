import React, { useState } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Swal from 'sweetalert2';
import moment from 'moment';

const Contacts = () => {
  const [userContact, setUserContact] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const products = useSelector(
    (state) => state.customerAuthReducer.totalPricePay,
  );
  const totalPircePay = useSelector((state) => state.customerAuthReducer.total);
  const formattedTime = moment().format('YYYY-MM-DD HH:mm:ss');

  const infoOrder = products.map((product, index) => ({
    ...product,
    email: email,
    time: formattedTime,
    totalPrice: totalPircePay,
    note: content,
    nameUserOrder: userContact,
    id: products.length + 1,
  }));

  const orderProduct = () => {
    const existingData = JSON.parse(localStorage.getItem('userOrder')) ?? [];
    const newData = [...existingData, ...infoOrder];
    localStorage.setItem('userOrder', JSON.stringify(newData));

    Swal.fire({
      title: '',
      text: 'Bạn đã đặt hàng thành công',
      icon: 'success',
    });
  };

  return (
    <>
      <div className="container mt-5 container-cart">
        <table id="customers">
          <thead>
            <tr>
              <th>Sản phẩm</th>
              <th>Đơn giá</th>
              <th>Số lượng </th>
              <th>Thành tiền</th>
            </tr>
          </thead>
          {products.map((product) => {
            return (
              <tbody key={product.id}>
                <tr>
                  <td>
                    <div className="cart-img-order">
                      <img src={product.image} alt=""></img>
                      <small> {product.nameProduct}</small>
                    </div>
                  </td>
                  <td className="td-order">{product.price}</td>
                  <td className="td-order">{product.quantity}</td>
                  <td className="td-order">{product.subTotal}</td>
                </tr>
              </tbody>
            );
          })}
          <tr>
            <td colSpan="2">
              <div className="address-contact">
                <input
                  type="text"
                  placeholder="Tên người liên hệ"
                  value={userContact}
                  onChange={(event) => setUserContact(event.target.value)}
                ></input>
              </div>
              <div className="address-contact">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                ></input>
              </div>
              <div className="address-contact">
                <Col sm="10">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    type="text"
                    placeholder="Nội dung"
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                  />
                </Col>
              </div>
            </td>
            <td colSpan="2" className="td-order">
              Tổng số tiền({products.length} sản phẩm) {totalPircePay}
            </td>
          </tr>

          <tr>
            <td colSpan="4">
              <div className="total-order-pay">
                <h2>Tổng thanh toán</h2>
                <h2 className="text-center">{totalPircePay}</h2>
                <button
                  type="button"
                  className="mb-5 add-product_order add-product_buy"
                  onClick={orderProduct}
                >
                  Đặt hàng
                </button>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </>
  );
};

export default Contacts;

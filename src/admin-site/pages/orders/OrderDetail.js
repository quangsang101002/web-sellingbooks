import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './OrderProduct.scss';
const OrderDetail = () => {
  const getUserOrder = JSON.parse(localStorage.getItem('userOrder'));
  let { id } = useParams();

  const Container = () => {
    return (
      <>
        <div className="mt-5">
          <div className="row">
            <div className="col-3">
              <Table striped hover variant="dark" className="text-center">
                <thead>
                  <tr>
                    <th>Trang quản trị</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Nguyễn Quang Hải</td>
                  </tr>
                  <tr>
                    <td>
                      <Link to="/admin/product">Quản lí sản phẩm</Link>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Link to="/admin/manager">Quản lí người dùng</Link>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Link to="/admin/order">Quản lí đơn hàng</Link>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Link to="/admin/manager_contact">Liên hệ</Link>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <div className="manager_order col-9">
              <h2>Thông tin đơn hàng</h2>
              {/* <div className="col-12"> */}
              <h2 className="info-general">Thông tin chung</h2>
              <div className="container">
                {getUserOrder.map((order) => {
                  if (order.id == id) {
                    return (
                      <div key={order.codeOrder} className="card-body ">
                        <p className="card-text">
                          <b>Mã đơn hàng:</b> {order.code}
                        </p>
                        <p className="card-text">
                          <b>Tổng giá:</b> {order.totalPrice}
                        </p>
                        <p className="card-text">
                          <b>Tên người đặt hàng:</b> {order.nameUserOrder}
                        </p>
                        <p className="card-text">
                          <b>Ghi chú:</b> {order.note}
                        </p>
                        <p className="card-text">
                          <b>Trạng thái:</b> {order.classify}
                        </p>
                        <p className="card-text">
                          <b>Thời gian đặt hàng:</b> {order.time}
                        </p>
                      </div>
                    );
                  }
                })}
              </div>
              {/* </div> */}
            </div>
          </div>
        </div>
      </>
    );
  };

  return <>{Container()}</>;
};

export default OrderDetail;

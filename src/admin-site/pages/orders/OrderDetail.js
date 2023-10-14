import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './OrderProduct.scss';
import MenuAdmin from '../MenuAdmin/Menu';
import orderApi from '../../../apis/order.api';
import moment from 'moment';
const OrderDetail = () => {
  const getUserOrder = JSON.parse(localStorage.getItem('userOrder'));
  const [orderDetail, setOrderDetail] = useState([]);
  let { id } = useParams();
  const Container = () => {
    useEffect(() => {
      fetchDataOrder();
    }, []);

    const fetchDataOrder = async () => {
      await orderApi
        .searchOrder()
        .then((response) => {
          setOrderDetail(response.data.result.recount);
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    return (
      <>
        <div className="mt-5">
          <div className="row">
            <MenuAdmin />
            <div className="manager_order col-9">
              <h2>Thông tin đơn hàng</h2>
              <h2 className="info-general">Thông tin chung</h2>
              <div className="container">
                {orderDetail.map((order) => {
                  if (order.order_id == id) {
                    return (
                      <div key={order.codeOrder} className="card-body ">
                        <p className="card-text">
                          <b>Mã đơn hàng:</b> {order.serial_number}
                        </p>
                        <p className="card-text">
                          <b>Tổng giá:</b> {order.total_price}
                        </p>
                        <p className="card-text">
                          <b>Tên người đặt hàng:</b> {order.username}
                        </p>
                        <p className="card-text">
                          <b>Ghi chú:</b> {order.note}
                        </p>
                        <p className="card-text">
                          <b>Trạng thái:</b> {order.status}Đơn hàng mới
                        </p>
                        <p className="card-text">
                          <b>Thời gian đặt hàng:</b>{' '}
                          {moment(order.order_at).format('YYYY-MM-DD HH:mm')}
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

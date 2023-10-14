import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { LiaSadCrySolid } from 'react-icons/lia';
import { useState } from 'react';
import { totalPay } from '../../store/actions/customerProductAction';
import { useEffect } from 'react';
import orderApi from '../../../apis/order.api';
import productAPI from '../../../apis/products.api';
import AddressInfo from '../personalInfo/AddressInfo';
import getStaticFileUrl from '../../../admin-site/utilities/getStaticFileUrl';
import './purchaseOrder.scss';
const PurchaseOrders = () => {
  const [totalPayProducs, setTotalPayProducs] = useState([]);
  const [products, setProduct] = useState([]);
  const dispatch = useDispatch();

  // const products = useSelector(
  //   (state) => state.customerProductReducer.products,
  // );

  const totalPayProduct = (getProduct) => {
    if (totalPayProducs.includes(getProduct)) {
      setTotalPayProducs(
        totalPayProducs.filter((product) => product !== getProduct),
      );
    } else {
      setTotalPayProducs([...totalPayProducs, getProduct]);
    }
  };
  useEffect(() => {
    dispatch(totalPay(totalPayProducs));
    // totalPayProduct();
  }, [totalPayProducs, totalPayProduct]);

  useEffect(() => {
    fetchDataOrder();
  }, []);

  const fetchDataOrder = async () => {
    await orderApi
      .searchOrder()
      .then((response) => {
        setProduct(response.data.result.recount);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const empty = () => {
    return (
      <div className="containers">
        <div className="row">
          <AddressInfo />
          <div className="col-9">
            <table>
              <tr>
                <th>Tất cả</th>
                <th>Chờ thanh toán</th>
                <th>Vận chuyển</th>
                <th>Giao hàng</th>
                <th>Hoàn thành </th>
                <th>Đã hủy</th>
                <th>Trả hàng/Hoàn tiền</th>
              </tr>
            </table>
            <div className="order-product">
              {products.map((product) => {
                const inputString = product.avatar;
                const parts = inputString.split(',');

                const part1 = parts[0];
                return (
                  <>
                    <div className="name-product">
                      <img src={getStaticFileUrl(part1)} alt="anh"></img>
                      <div className="content-product">
                        {product.nameproduct}
                      </div>
                      <span>{product.total_price}VND</span>
                    </div>
                    <div className="name-action">
                      <div className="totalOrder-product">
                        <label>
                          <b>Thành tiền:</b>
                        </label>
                        <div className="totalOrder">
                          <b>{product.total_price}</b>
                        </div>
                      </div>

                      <section className="section-action">
                        <button>Liên Hệ Người Bán</button>
                        <button>Hủy Đơn Hàng</button>
                      </section>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="check-empty_product">
        {products.length === 0 ? (
          <h2 className="text-center">
            Bạn chưa có sản phẩm nào
            <small className="check-empty_icon">
              <LiaSadCrySolid />
            </small>
          </h2>
        ) : (
          empty()
        )}
      </div>
    </>
  );
};
export default PurchaseOrders;

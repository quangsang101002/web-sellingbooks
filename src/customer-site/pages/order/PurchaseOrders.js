import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { LiaSadCrySolid } from 'react-icons/lia';
import { useState } from 'react';
import { totalPay } from '../../store/actions/customerProductAction';
import { useEffect } from 'react';
import orderApi from '../../../apis/order.api';
const PurchaseOrders = () => {
  const [totalPayProducs, setTotalPayProducs] = useState([]);
  const [purchaseOrder, setPurchaseOrder] = useState([]);
  const dispatch = useDispatch();
  const products = useSelector(
    (state) => state.customerProductReducer.products,
  );

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
        setPurchaseOrder(response.data.result.recount);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const empty = () => {
    return (
      <div className="container mt-5 container-cart">
        {purchaseOrder.map((product) => {
          return (
            <div className="row">
              <div className="col-12 row-cart">
                <div className="cart-img">
                  <img src={product.image} alt=""></img>
                </div>
                <p>
                  <b>Sản phẩm: </b> {product.name}
                </p>
                <span className="mr-2">{product.unit_price} vnd</span>
                <div className="quality-cart"></div>
                <div className="cart-price">
                  <p>{product.subTotal} vnd</p>
                </div>
                <div className="cart-delete">
                  {/* <button className="add-product_buy">Xoá</button> */}
                </div>
              </div>
            </div>
          );
        })}
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

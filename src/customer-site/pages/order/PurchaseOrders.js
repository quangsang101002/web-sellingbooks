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
const PurchaseOrders = () => {
  const [totalPayProducs, setTotalPayProducs] = useState([]);
  const [purchaseOrder, setPurchaseOrder] = useState([]);
  const [product, setProduct] = useState([]);
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
    fetchDataProduct();
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
  const fetchDataProduct = async () => {
    await productAPI
      .searchProduct()
      .then((response) => {
        setProduct(response.result.recount);
      })
      .catch((error) => {
        alert(error);
      });
  };
  const empty = () => {
    return (
      <div className="container mt-5 container-cart">
        <div className="row">
          <AddressInfo />
          <div className="col-9">
            {purchaseOrder.map((product) => {
              return (
                <div className="wrapper-purchase">
                  <tr className="排">
                    <td>
                      <b>Sản phẩm: </b> {product.nameproduct}
                    </td>
                    <td>
                      {' '}
                      <b>Thành Tiền: </b>
                      {product.total_price} vnd
                    </td>
                  </tr>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="check-empty_product">
        {purchaseOrder.length === 0 ? (
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

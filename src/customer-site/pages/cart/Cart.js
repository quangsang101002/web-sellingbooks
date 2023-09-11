import React from 'react';
import { useSelector } from 'react-redux';
import { deleteProduct } from '../../store/actions/customerProductAction';
import { useDispatch } from 'react-redux';
import { LiaSadCrySolid } from 'react-icons/lia';
import { useState } from 'react';
import { changeQuantity } from '../../store/actions/customerProductAction';
import { totalPay } from '../../store/actions/customerProductAction';
import { deleteQuatity } from '../../store/actions/customerProductAction';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [totalPayProducs, setTotalPayProducs] = useState([]);
  const [auto, setAuto] = useState('');
  const totalPircePay = useSelector((state) => state.customerAuthReducer.total);
  const orderProduct = useSelector(
    (state) => state.customerAuthReducer.totalPricePay,
  );
  const getCart = JSON.parse(localStorage.getItem('cart'));
  const dispatch = useDispatch();
  const products = useSelector(
    (state) => state.customerProductReducer.products,
  );

  const deleteProductCart = (product) => {
    Swal.fire({
      title: 'Bạn có chắc chắn xóa không',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Đã xóa', 'Bạn đã xóa sản phẩm.', 'success');
        dispatch(deleteProduct(product));
      }
    });
    dispatch(deleteQuatity(product, totalPayProducs));
  };

  const reducerProduct = (product, id) => {
    let initNumber = product - 1;

    if (initNumber >= 1) {
      dispatch(changeQuantity(initNumber, id));
    }
    setAuto(initNumber);
  };

  const increaseProduct = (product, id) => {
    let initNumber = product + 1;

    dispatch(changeQuantity(initNumber, id));
    setAuto(initNumber);
  };

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

  const empty = () => {
    return (
      <div className="container mt-5 container-cart">
        {products.map((product) => {
          return (
            <div className="row">
              <div className="col-12 row-cart">
                <div className="input-buy">
                  <input
                    type="checkbox"
                    onChange={() => totalPayProduct(product)}
                  ></input>
                </div>
                <div className="cart-img">
                  <img src={product.image} alt=""></img>
                </div>
                <p> {product.name}</p>
                <span className="mr-2">${product.unit_price}</span>
                <div className="quality-cart">
                  <button
                    onClick={() =>
                      reducerProduct(product.quantity, product.product_id)
                    }
                  >
                    -
                  </button>
                  <input value={product.quantity}></input>
                  <button
                    onClick={() =>
                      increaseProduct(product.quantity, product.product_id)
                    }
                  >
                    +
                  </button>
                </div>
                <div className="cart-price">
                  <p>{product.subTotal}</p>
                </div>
                <div className="cart-delete">
                  <button
                    className="add-product_buy"
                    onClick={() => deleteProductCart(product)}
                  >
                    Xoá
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        <div className="total_price-cart">
          <div className="wrapper-total_price-cart">
            <p>Tổng thanh toán({totalPayProducs.length}sản phẩm) </p>
            <h2>{totalPircePay > 0 ? totalPircePay : 0}</h2>
            <div className="total_price-cart-order">
              <Link to="/contacts">
                <button className="add-product_buy">Đặt hàng</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="check-empty_product-exits">
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
export default Cart;

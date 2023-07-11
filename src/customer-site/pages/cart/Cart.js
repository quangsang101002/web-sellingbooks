import React from 'react';
import { useSelector } from 'react-redux';
import { deleteProduct } from '../../store/actions/customerProductAction';
import { useDispatch } from 'react-redux';
import { LiaSadCrySolid } from 'react-icons/lia';
import { useState } from 'react';
import { changeQuantity } from '../../store/actions/customerProductAction';
import { totalPay } from '../../store/actions/customerProductAction';
const Cart = () => {
  const [totalPayProducs, setTotalPayProducs] = useState('');
  const dispatch = useDispatch();
  const products = useSelector(
    (state) => state.customerProductReducer.products,
  );
  const total = useSelector((state) => state.customerProductReducer.total);
  const deleteProductCart = (product) => {
    dispatch(deleteProduct(product));
  };

  const reducerProduct = (product, id) => {
    let initNumber = product - 1;

    if (initNumber >= 1) {
      dispatch(changeQuantity(initNumber, id));
    }
  };

  const increaseProduct = (product, id) => {
    let initNumber = product + 1;

    dispatch(changeQuantity(initNumber, id));
  };
  const totalPayProduct = (productId) => {
    if (totalPayProducs.includes(productId)) {
      setTotalPayProducs(
        totalPayProducs.filter((product) => product !== productId),
      );
    } else {
      setTotalPayProducs([...totalPayProducs, productId]);
    }
    dispatch(totalPay(totalPayProducs));
  };
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
                    onClick={() => totalPayProduct(product.id)}
                  ></input>
                </div>
                <div className="cart-img">
                  <img src={product.image} alt=""></img>
                </div>
                <p> {product.nameProduct}</p>
                <span className="mr-2">{product.price}</span>
                <div className="quality-cart">
                  <button
                    onClick={() => reducerProduct(product.quantity, product.id)}
                  >
                    -
                  </button>
                  <input value={product.quantity}></input>
                  <button
                    onClick={() =>
                      increaseProduct(product.quantity, product.id)
                    }
                  >
                    +
                  </button>
                </div>
                <div className="cart-price">
                  <p>{product.subTotal}</p>
                </div>
                <div className="cart-delete">
                  <button onClick={() => deleteProductCart(product)}>
                    Xoá
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        <div className="total_price-cart"></div>
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
export default Cart;

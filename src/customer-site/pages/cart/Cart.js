import React from 'react';
import { useSelector } from 'react-redux';
import { deleteProduct } from '../../store/actions/customerProductAction';
import { useDispatch } from 'react-redux';
import { LiaSadCrySolid } from 'react-icons/lia';
import { useState } from 'react';
const Cart = () => {
  const [numberProduct, setNumberProduct] = useState(1);
  const dispatch = useDispatch();
  const products = useSelector(
    (state) => state.customerProductReducer.products,
  );

  const deleteProductCart = (product) => {
    dispatch(deleteProduct(product));
  };

  const reduceProduct = (number) => {
    let qualityProduct = 1;
    setNumberProduct(number + qualityProduct);
  };
  const increaseProduct = () => {};
  const empty = () => {
    return (
      <div className="container mt-5 container-cart">
        {products.map((product) => {
          return (
            <div className="row">
              <div className="col-12 row-cart">
                <div className="input-buy">
                  <input type="checkbox"></input>
                </div>
                <div className="cart-img">
                  <img src={product.image} alt=""></img>
                </div>
                <p> {product.nameProduct}</p>
                <span className="mr-2">{product.price}</span>
                <div className="quality-cart">
                  <button onClick={() => product.quanlity}>-</button>
                  <input value={numberProduct}></input>
                  <button onClick={() => increaseProduct(product.quanlity)}>
                    +
                  </button>
                </div>
                <div className="cart-price">
                  <p>{product.price}</p>
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

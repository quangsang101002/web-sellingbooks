import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
const CustomerDetails = () => {
  const useParam = useParams();
  let { id } = useParam;
  const producted = useSelector(
    (state) => state.customerProductReducer.products,
  );
  const products = JSON.parse(localStorage.getItem('products'));
  const [similarProducts, setSimilarProducts] = useState('');
  console.log('similarProducts', similarProducts);

  useEffect(() => {
    const selectedProduct = () => {
      return (
        <>
          <div className="container mt-5">
            {products.map((product, index) => {
              if (product.id == id) {
                setSimilarProducts(product.classify);
                return (
                  <div className="row detail-book" key={index}>
                    <div className="col-4 text-center ">
                      <div className="col-height">
                        {' '}
                        <img src={product.image} alt=""></img>
                      </div>

                      <div className="row prev-container">
                        <div className="col-2 prev-img">
                          {' '}
                          <img src={product.image2} alt=""></img>
                        </div>
                        <div className="col-2 prev-img">
                          {' '}
                          <img src={product.image3} alt=""></img>
                        </div>
                        <div className="col-2 prev-img">
                          {' '}
                          <img src={product.image4} alt=""></img>
                        </div>
                        <div className="col-2 prev-img">
                          {' '}
                          <img src={product.image5} alt=""></img>
                        </div>
                        <div className="col-2 prev-img">
                          {' '}
                          <img src={product.image6} alt=""></img>
                        </div>
                      </div>
                    </div>
                    <div className="col-8">
                      <h2>
                        <b>Tên sách: </b>
                        {product.nameProduct}
                      </h2>
                      <p>
                        <b>Tác giả: </b>
                        {product.description}
                      </p>
                      <h2>{product.price}đ</h2>
                      Số lượng
                      <div className="d-flex mb-5">
                        <Button>-</Button>
                        <FormControl
                          style={{ width: '35px' }}
                          min="1"
                        ></FormControl>

                        <Button>+</Button>
                      </div>
                      <Link to="/cart">
                        <Button>Chọn mua</Button>
                      </Link>
                      <Button>Thêm vào giỏ hàng</Button>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </>
      );
    };
    selectedProduct();
  }, []);

  const displaySelectedProduct = () => {
    return (
      <>
        <div className="container mt-5">
          {products.map((product, index) => {
            if (product.id == id) {
              return (
                <div className="row detail-book" key={index}>
                  <div className="col-4 text-center ">
                    <div className="col-height">
                      {' '}
                      <img src={product.image} alt=""></img>
                    </div>

                    <div className="row prev-container">
                      <div className="col-2 prev-img">
                        {' '}
                        <img src={product.image2} alt=""></img>
                      </div>
                      <div className="col-2 prev-img">
                        {' '}
                        <img src={product.image3} alt=""></img>
                      </div>
                      <div className="col-2 prev-img">
                        {' '}
                        <img src={product.image4} alt=""></img>
                      </div>
                      <div className="col-2 prev-img">
                        {' '}
                        <img src={product.image5} alt=""></img>
                      </div>
                      <div className="col-2 prev-img">
                        {' '}
                        <img src={product.image6} alt=""></img>
                      </div>
                    </div>
                  </div>
                  <div className="col-8">
                    <h2>
                      <b>Tên sách: </b>
                      {product.nameProduct}
                    </h2>
                    <p>
                      <b>Tác giả: </b>
                      {product.description}
                    </p>
                    <h2>{product.price}đ</h2>
                    Số lượng
                    <div className="d-flex mb-5">
                      <button className="color-btn">-</button>
                      <input style={{ width: '35px' }} min="1"></input>

                      <button className="color-btn">+</button>
                    </div>
                    <Link to="/cart">
                      <button>Chọn mua</button>
                    </Link>
                    <button>Thêm vào giỏ hàng</button>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      </>
    );
  };

  const similarProduct = () => {
    return (
      <>
        <Container>
          <div className="body-product">
            <h2 className="fade-ins">Sản phẩm tương tự</h2>
            {similarProducts == 'Sách thiếu nhi' ? (
              <h2 className="fade-ins">Sách thiếu nhi</h2>
            ) : (
              <h2 className="fade-ins">Sách văn học</h2>
            )}
          </div>
          <div className="container-product mt-5 mb-5 row">
            {products.map((product) => {
              if (product.classify == similarProducts) {
                return (
                  <div
                    key={product.id}
                    className="col-2 wrap-container_product"
                  >
                    <Link to={`/detail-product/${product.id}`}>
                      <div className="product_image">
                        <img src={product.image} alt="" />
                      </div>
                    </Link>
                    <h2 className="mt-4 product-description text-center">
                      {product.nameProduct}
                    </h2>
                    <h2 className="fade-ins product-name_product text-center">
                      <b>Tác giả:</b> {product.description}
                    </h2>
                    <div className="price-product">
                      <span className="old-price">122.322 đ</span>
                      <span className="new-price">{product.price}đ</span>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </Container>
      </>
    );
  };

  return (
    <>
      {displaySelectedProduct()}
      {similarProduct()}
    </>
  );
};

export default CustomerDetails;

import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './CustomerHeaderComponent.scss';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../store/actions/customerProductAction';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function CustomerMenuComponent() {
  const getProduct = JSON.parse(localStorage.getItem('products'));
  const dispatch = useDispatch();
  const products = useSelector(
    (state) => state.customerProductReducer.products,
  );
  console.log('product', products);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProduct;

        dispatch(addProduct(data));
      } catch (error) {
        alert(error);
      }
    };

    fetchData();
  }, []);

  const headerProduct = () => {
    return (
      <>
        <div className="wrapper_CustomerMenuComponent">
          <div className="CustomerMenu_banner mb-5">
            <Carousel interval={3000}>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://images.pexels.com/photos/1031588/pexels-photo-1031588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h3>First slide label</h3>
                  <p>
                    Nulla vitae elit libero, a pharetra augue mollis interdum.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://images.pexels.com/photos/3060324/pexels-photo-3060324.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Second slide"
                />
                <Carousel.Caption>
                  <h3>Second slide label</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://images.pexels.com/photos/5331072/pexels-photo-5331072.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Third slide"
                />
                <Carousel.Caption>
                  <h3>Third slide label</h3>
                  <p>
                    Praesent commodo cursus magna, vel scelerisque nisl
                    consectetur.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
      </>
    );
  };

  const bookReadAlot = () => {
    return (
      <>
        <Container>
          <div className="CustomerMenu_search">
            <input placeholder="Nhập từ khóa sản phẩm bạn tìm kiếm..." />{' '}
            <button>Tìm kiếm</button>
          </div>

          <div className="body-product">
            <h2 className="fade-ins">Sách đọc nhiều</h2>
          </div>
          <div className="container-product mt-5 mb-5 row">
            {products.map((product) => {
              return (
                <div key={product.id} className="col-2 wrap-container_product">
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
            })}
          </div>
        </Container>
      </>
    );
  };

  const childreBook = () => {
    return (
      <>
        <Container>
          <div className="body-product">
            <h2 className="fade-ins">Sách thiếu nhi</h2>
          </div>
          <div className="container-product mt-5 mb-5 row">
            {products.map((product) => {
              if (product.classify == 'Sách thiếu nhi') {
                return (
                  <>
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
                  </>
                );
              }
            })}
          </div>
        </Container>
        ;
      </>
    );
  };
  const literature = () => {
    return (
      <>
        <Container>
          <div className="body-product">
            <h2 className="fade-ins">Sách văn học</h2>
          </div>
          <div className="container-product mt-5 mb-5 row">
            {products.map((product) => {
              if (product.classify === 'Sách văn học nghệ thuật') {
                return (
                  <>
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
                  </>
                );
              }
            })}
          </div>
        </Container>
        ;
      </>
    );
  };
  return (
    <>
      {headerProduct()}
      {bookReadAlot()}
      {childreBook()}
      {literature()}
    </>
  );
}

export default CustomerMenuComponent;

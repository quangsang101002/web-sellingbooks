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

  const [showVanHoc, setShowVanHoc] = useState(true);

  return (
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
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
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
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
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
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

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
            if (product.classify === 'Sách văn học nghệ thuật') {
              if (showVanHoc) {
                setShowVanHoc(false);
                return (
                  <div key="sach-van-hoc" className="col">
                    <h2 className="fade-ins">Sách văn học</h2>
                    <div className="col-2">
                      <img src={product.image} alt="" />
                      <h2 className="mt-4 product-description text-center">
                        {product.description}
                      </h2>
                      <h2 className="fade-ins product-name_product text-center">
                        {product.nameProduct}
                      </h2>
                      <h3>${product.price}</h3>
                      <Link to={`/detail-product/${product.id}`}>
                        <Button>Buy</Button>
                      </Link>
                    </div>
                  </div>
                );
              }
              return (
                <div key={product.id} className="col-2">
                  <img src={product.image} alt="" />
                  <h2 className="mt-4 product-description text-center">
                    {product.description}
                  </h2>
                  <h2 className="fade-ins product-name_product text-center">
                    {product.nameProduct}
                  </h2>
                  <h3>${product.price}</h3>
                  <Link to={`/detail-product/${product.id}`}>
                    <Button>Buy</Button>
                  </Link>
                </div>
              );
            }
            return null;
          })}
        </div>
      </Container>
    </div>
  );
}

export default CustomerMenuComponent;

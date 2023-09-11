import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './CustomerHeaderComponent.scss';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import unidecode from 'unidecode';
import productAPI from '../../../apis/products.api';
import authAPI from '../../../apis/auth.api';
import { useNavigate } from 'react-router-dom';
import getStaticFileUrl from '../../../admin-site/utilities/getStaticFileUrl';

function CustomerMenuComponent() {
  // const products = JSON.parse(localStorage.getItem('products')) ?? [];
  const [keySearch, setKeySearch] = useState('');
  const [filterSearchProduct, setFilterSearchProduct] = useState([]);
  const [allProduct, setAllProduct] = useState([]);
  const [userName, setUsername] = useState('');
  const navigate = useNavigate();

  const filterProduct = (event) => {
    setKeySearch(event.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await authAPI.getAuthCustomer();
      setUsername(response.username);
    } catch (error) {
      navigate('/');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const fetchDataProduct = async () => {
      try {
        await productAPI.searchProduct().then((response) => {
          setAllProduct(response.result.recount);
        });
      } catch (error) {
        alert(error);
      }
    };

    if (keySearch == '') {
      fetchDataProduct();
    } else {
      return;
    }
  }, [keySearch]);

  // useEffect(() => {
  // const displayProducts = allProduct.filter((product) =>
  // unidecode(product.nameProduct.toUpperCase()).includes(
  //   unidecode(keySearch.toUpperCase()),
  // ),
  // );
  // setFilterSearchProduct(displayProducts);
  // }, [keySearch]);

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
                  <h3>Cần cù bù siêng năng</h3>
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
                  <h3>Thất bại là mẹ thành công</h3>
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
                  <h3>Có công mài sắt có ngày nên kim</h3>
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

  const searchProduct = async () => {
    try {
      const productalls = await productAPI.searchProduct(keySearch);
      setAllProduct(productalls.result.recount);
    } catch (error) {
      alert(error);
    }
  };
  const bookReadAlot = () => {
    return (
      <>
        <Container>
          <div className="CustomerMenu_search">
            <input
              placeholder="Nhập từ khóa sản phẩm bạn tìm kiếm..."
              value={keySearch}
              onChange={(event) => filterProduct(event)}
            />
            <button onClick={searchProduct}>Tìm kiếm</button>
          </div>

          <div className="body-product">
            <h2 className="fade-ins">Sách đọc nhiều</h2>
          </div>
          <div className="container-product mt-5 mb-5 row">
            {allProduct.map((product) => {
              const inputString = product.image;
              const parts = inputString.split(',');
              const part1 = parts[0];
              return (
                <div
                  key={product.product_id}
                  className="col-2 wrap-container_product"
                >
                  <Link to={`/detail-product/${product.product_id}`}>
                    <div className="product_image">
                      <img src={getStaticFileUrl(part1)} alt="" />
                    </div>
                  </Link>
                  <h2 className="mt-4 product-description text-center">
                    {product.name}
                  </h2>
                  <h2 className="fade-ins product-name_product text-center">
                    <b>Tác giả:</b> {product.description}
                  </h2>
                  <div className="price-product">
                    <span className="old-price">122.322 đ</span>
                    <span className="new-price">{product.unit_price}đ</span>
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
            {allProduct.map((product) => {
              const inputString = product.image;
              const parts = inputString.split(',');
              const part1 = parts[0];
              if (product.category == 1) {
                return (
                  <>
                    <div
                      key={product.id}
                      className="col-2 wrap-container_product"
                    >
                      <Link to={`/detail-product/${product.product_id}`}>
                        <div className="product_image">
                          <img src={getStaticFileUrl(part1)} alt="" />
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
            {allProduct.map((product) => {
              console.log(product);
              if (product.category == 2) {
                const inputString = product.image;
                const parts = inputString.split(',');
                const part1 = parts[0];
                return (
                  <>
                    <div
                      key={product.id}
                      className="col-2 wrap-container_product"
                    >
                      <Link to={`/detail-product/${product.product_id}`}>
                        <div className="product_image">
                          <img src={getStaticFileUrl(part1)} alt="" />
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

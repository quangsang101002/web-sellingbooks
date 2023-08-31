import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { LiaCartPlusSolid } from 'react-icons/lia';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../store/actions/customerProductAction';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { useNavigate } from 'react-router-dom';
import 'sweetalert2/src/sweetalert2.scss';
import productAPI from '../../../apis/products.api';
import getStaticFileUrl from '../../../admin-site/utilities/getStaticFileUrl';

const CustomerDetails = () => {
  const [similarProducts, setSimilarProducts] = useState('');
  const [inceaseProduct, setInceaseProduct] = useState(1);
  const [products, setProduct] = useState([]);
  const [changeImg, setChangeimg] = useState('');
  const useParam = useParams();
  let { id } = useParam;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const products = JSON.parse(localStorage.getItem('products'));
  const getUserAccount =
    JSON.parse(localStorage.getItem('userAccount')) ?? null;

  useEffect(() => {
    fetchDataProduct();
  }, []);

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
  // useEffect(() => {
  //   const selectedProduct = () => {
  //     return (
  //       <>
  //         <div className="container mt-5">
  //           {products.map((product, index) => {
  //             if (product.id == id) {
  //               return (
  //                 <div className="row detail-book" key={index}>
  //                   <div className="col-8">
  //                     <h2>
  //                       <b>Tên sách: </b>
  //                       {product.name}
  //                     </h2>
  //                     <p>
  //                       <b>Tác giả: </b>
  //                       {product.description}
  //                     </p>
  //                     <h2>{product.price}đ</h2>
  //                     Số lượng
  //                     <div className="d-flex mb-5">
  //                       <Button>-</Button>
  //                       <FormControl
  //                         style={{ width: '35px' }}
  //                         min="1"
  //                       ></FormControl>

  //                       <Button>+</Button>
  //                     </div>
  //                     <Link to="/cart">
  //                       <Button>Chọn mua</Button>
  //                     </Link>
  //                     <Button>Thêm vào giỏ hàng</Button>
  //                   </div>
  //                 </div>
  //               );
  //             }
  //             return null;
  //           })}
  //         </div>
  //       </>
  //     );
  //   };
  //   selectedProduct();
  // }, []);

  const addProductNew = (product, inceaseProduct) => {
    if (getUserAccount) {
      dispatch(addProduct(product, inceaseProduct));
      localStorage.setItem('cart', JSON.stringify(product));
      Swal.fire({
        title: '',
        text: 'Bạn đã thêm sản phẩm vào giỏ hàng',
        icon: 'success',
      });
      setTimeout(function () {
        Swal.close();
      }, 4000);
    } else {
      navigate('/register');
    }
  };
  const addProductBuy = (product, inceaseProduct) => {
    dispatch(addProduct(product, inceaseProduct));
    // if (getUserAccount) {
    //   dispatch(addProduct(product, inceaseProduct));
    // } else {
    //   navigate('/register');
    // }
  };
  const increaseQuality = () => {
    setInceaseProduct(inceaseProduct + 1);
  };
  const reduceQuality = () => {
    if (inceaseProduct > 1) {
      setInceaseProduct(inceaseProduct - 1);
    }
  };

  const changeImage = (img) => {
    setChangeimg(img);
  };
  const displaySelectedProduct = () => {
    return (
      <>
        <div className="container mt-5">
          {products.map((product, index) => {
            if (product.product_id == id) {
              const inputString = product.image;
              const parts = inputString.split(',');
              const part1 = parts[0];
              const part2 = parts[1];
              return (
                <div className="row detail-book" key={index}>
                  <div className="col-4 text-center">
                    <div className="col-height">
                      {' '}
                      <img
                        src={changeImg || getStaticFileUrl(part1)}
                        alt=""
                      ></img>
                    </div>

                    <div className="row prev-container">
                      <div className="col-2 prev-img">
                        {' '}
                        <img
                          src={getStaticFileUrl(part2)}
                          alt="ảnh sp"
                          onClick={() => changeImage(getStaticFileUrl(part2))}
                        ></img>
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
                      {product.name}
                    </h2>
                    <p>
                      <b>Tác giả: </b>
                      {product.description}
                    </p>
                    <h2>{product.unit_price}đ</h2>
                    Số lượng
                    <div className="d-flex mb-5">
                      <button className="color-btn" onClick={reduceQuality}>
                        -
                      </button>
                      <input
                        className="input-detail"
                        value={inceaseProduct}
                        min="1"
                      ></input>

                      <button className="color-btn" onClick={increaseQuality}>
                        +
                      </button>
                    </div>
                    <div className="add-product">
                      <button
                        className="add-product_cart"
                        onClick={() => addProductNew(product, inceaseProduct)}
                      >
                        {' '}
                        <LiaCartPlusSolid /> Thêm vào giỏ hàng
                      </button>

                      <Link to="/carts">
                        <button
                          className="add-product_buy"
                          onClick={() => addProductBuy(product, inceaseProduct)}
                        >
                          Chọn mua
                        </button>
                      </Link>
                    </div>
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

  const setResetValue = () => {
    setInceaseProduct(1);
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
            {/* {products.map((product) => {
              if (product.classify == similarProducts) {
                return (
                  <div
                    key={product.id}
                    className="col-2 wrap-container_product"
                  >
                    <Link
                      to={`/detail-product/${product.id}`}
                      onClick={setResetValue}
                    >
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
            })} */}
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

import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { LiaCartPlusSolid } from 'react-icons/lia';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../store/actions/customerProductAction';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { useNavigate } from 'react-router-dom';
import 'sweetalert2/src/sweetalert2.scss';
import productAPI from '../../../apis/products.api';
import getStaticFileUrl from '../../../admin-site/utilities/getStaticFileUrl';
import authAPI from '../../../apis/auth.api';
import { AiOutlineLeft } from 'react-icons/ai';
import { AiOutlineRight } from 'react-icons/ai';
import './CustomerDetails.scss';

const CustomerDetails = () => {
  const [similarProducts, setSimilarProducts] = useState('');
  const [inceaseProduct, setInceaseProduct] = useState(1);
  const [products, setProduct] = useState([]);
  const [changeImg, setChangeimg] = useState('');
  const [userName, setUsername] = useState('');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const useParam = useParams();
  console.log('electedImageIndex', selectedImageIndex);
  let { id } = useParam;
  const myRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const products = JSON.parse(localStorage.getItem('products'));
  const pushCart = JSON.parse(localStorage.getItem('cart')) ?? [];

  const fetchData = async () => {
    try {
      const response = await authAPI.getAuthCustomer();
      setUsername(response.username);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
    if (userName) {
      dispatch(addProduct(product, inceaseProduct));
      pushCart.push(product);
      localStorage.setItem('cart', JSON.stringify(pushCart));
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
    // dispatch(addProduct(product, inceaseProduct));
    if (userName) {
      dispatch(addProduct(product, inceaseProduct));
    } else {
      navigate('/register');
    }
  };
  const increaseQuality = () => {
    setInceaseProduct(inceaseProduct + 1);
  };
  const reduceQuality = () => {
    if (inceaseProduct > 1) {
      setInceaseProduct(inceaseProduct - 1);
    }
  };
  const changeImage = (index, length) => {
    if (index < 0) {
      setSelectedImageIndex(length - 1); // Nếu index nhỏ hơn 0, đặt lại thành ảnh cuối cùng
    } else if (index >= length) {
      setSelectedImageIndex(0); // Nếu index lớn hơn hoặc bằng length, đặt lại thành ảnh đầu tiên
    } else {
      setSelectedImageIndex(index);
    }
  };

  const displayImageDetail = () => {
    setIsModalVisible(true); // Show the modal
    window.onclick = function (event) {
      if (myRef.current) {
        if (event.target === myRef.current) {
          setIsModalVisible(false); // Hide the modal when clicking on it
        }
      }
    };
  };

  const displaySelectedProduct = () => {
    return (
      <>
        <div className="container mt-5">
          {products.map((product, index) => {
            if (product.product_id == id) {
              const inputString = product.image;
              const parts = inputString.split(',');
              // setParts(parts);
              const part1 = parts[0];

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
                      {parts.map((imgprd, index) => {
                        return (
                          <div className="col-2 prev-img">
                            {' '}
                            <img
                              src={getStaticFileUrl(imgprd)}
                              alt=""
                              onClick={displayImageDetail}
                            ></img>
                          </div>
                        );
                      })}
                      {isModalVisible ? (
                        <div
                          className="modal-detail "
                          onClick={displayImageDetail}
                          ref={myRef}
                        >
                          {parts.length > 0 &&
                            (() => {
                              // Chọn chỉ số của ảnh bạn muốn hiển thị

                              if (
                                selectedImageIndex >= 0 &&
                                selectedImageIndex < parts.length
                              ) {
                                return (
                                  <>
                                    <AiOutlineLeft
                                      onClick={() =>
                                        changeImage(
                                          selectedImageIndex - 1,
                                          parts.length,
                                        )
                                      }
                                      className="btn-viewImage"
                                    />
                                    <img
                                      src={getStaticFileUrl(
                                        parts[selectedImageIndex],
                                      )}
                                      alt=""
                                    />
                                    <AiOutlineRight
                                      onClick={() =>
                                        changeImage(
                                          selectedImageIndex + 1,
                                          parts.length,
                                        )
                                      }
                                      className="btn-viewImage"
                                    />
                                  </>
                                );
                              } else {
                                return null; // Nếu chỉ số không hợp lệ, trả về null hoặc thông báo lỗi
                              }
                            })()}
                        </div>
                      ) : (
                        ''
                      )}
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

                      {userName ? (
                        <Link to="/carts">
                          <button
                            className="add-product_buy"
                            onClick={() =>
                              addProductBuy(product, inceaseProduct)
                            }
                          >
                            Chọn mua
                          </button>
                        </Link>
                      ) : (
                        <Link to="/register">
                          <button className="add-product_buy">Chọn mua</button>
                        </Link>
                      )}
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

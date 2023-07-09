import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const CustomerDetails = () => {
  const useParam = useParams();
  let { id } = useParam;
  const products = useSelector(
    (state) => state.customerProductReducer.products,
  );

  console.log('đA', products);
  return (
    <div className="container">
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
                <h3>
                  <b>Tác giả: </b>
                  {product.author}
                </h3>
                <p>
                  <b>Tên sách: </b>
                  {product.name}
                </p>
                <h2>{product.price}</h2>
                Số lượng
                <div className="d-flex mb-5">
                  <Button>-</Button>
                  <FormControl style={{ width: '35px' }} min="1"></FormControl>

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
  );
};

export default CustomerDetails;

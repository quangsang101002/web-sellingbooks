import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './CustomerHeaderComponent.scss';

function CustomerMenuComponent() {
  return (
    <div className="wrapper_CustomerMenuComponent">
      <div className="CustomerMenu_banner mb-5">
        <Carousel interval={3000}>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://cdn.tuoitre.vn/thumb_w/730/471584752817336320/2023/7/2/black-pink-1688268429280389421007.jpg"
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
              src="https://vcdn-giaitri.vnecdn.net/2023/07/04/BlackPink-2-7427-1688445866.jpg?w=0&h=0&q=100&dpr=1&fit=crop&s=bZGu-vst-P9e_N3q1LSCBg"
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
              src="https://2sao.vietnamnetjsc.vn/images/2019/11/03/01/57/Blackpink-aba.jpg"
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
      <div className="CustomerMenu_search"></div>
    </div>
  );
}

export default CustomerMenuComponent;

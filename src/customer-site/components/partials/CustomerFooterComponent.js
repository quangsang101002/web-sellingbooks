import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineDoubleRight } from 'react-icons/ai';
import { FaFacebookSquare } from 'react-icons/fa';
import { FaInstagramSquare } from 'react-icons/fa';
import { IoLogoTiktok } from 'react-icons/io5';
const CustomerFooterComponent = () => {
  return (
    <>
      <div className="wrapper-footer">
        <div className="footer-promo">
          <div className="footer">
            <div>
              <ul className="footer-logo">
                <li className="footer-contact">
                  <AiOutlineDoubleRight />
                  <span>Contact</span>
                </li>
                <li className="footer-contact">
                  <AiOutlineDoubleRight />
                  <span>Introduction</span>
                </li>
                <li className="footer-contact">
                  <AiOutlineDoubleRight />
                  <span>Recruitment</span>
                </li>
                <li className="footer-contact">
                  <AiOutlineDoubleRight />
                  <span>News</span>
                </li>
              </ul>
            </div>
            <div className="footer-promo">
              <h2>Support</h2>
              <ul className="footer-support">
                <li className="li-support">
                  {' '}
                  <AiOutlineDoubleRight />
                  <span>Ordering guide</span>
                </li>
                <li className="li-support">
                  {' '}
                  <AiOutlineDoubleRight />
                  <span>Size guide</span>
                </li>

                <li className="li-support">
                  {' '}
                  <AiOutlineDoubleRight />
                  <span>VIP guest policy</span>
                </li>
                <li className="li-support">
                  {' '}
                  <AiOutlineDoubleRight />
                  <span>Payment - Delivery</span>
                </li>
                <li className="li-support">
                  {' '}
                  <AiOutlineDoubleRight />
                  <span>Payment - Delivery</span>
                </li>
              </ul>
            </div>
            <div className="footer-promo">
              <h2>pay</h2>
              <div className="footer-pay">
                <img className="logo-pay" src="./image/visa.png" alt="visa" />
                <img className="logo-pay" src="./image/tragop.png" alt="visa" />
                <img className="logo-pay" src="./image/pay.png" alt="visa" />
                <img className="logo-pay" src="./image/paypay.png" alt="visa" />
                <img className="logo-pay" src="./image/jcb.png" alt="visa" />
                <img className="logo-pay" src="./image/cop.png" alt="visa" />
              </div>
            </div>
            <div className="footer-promo">
              <h2>Follow us</h2>
              <ul className="follow-footer">
                <li className="footer-logo_follow">
                  <FaFacebookSquare /> facebook
                </li>
                <li className="footer-logo_follow">
                  <FaInstagramSquare /> instagram
                </li>
                <li className="footer-logo_follow">
                  <IoLogoTiktok /> Tik Tok
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright-footer">
        <span>@Copyright belongs to 4men shop</span>
      </div>
    </>
  );
};

export default CustomerFooterComponent;

import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react';
import productAPI from '../../../apis/products.api';
import moment from 'moment/moment';

const ModalProduct = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log('props.id', props.id);
  // const getAddUser = JSON.parse(localStorage.getItem('products')) ?? [];
  const [sku, setSku] = useState('');
  const [nameProduct, setNameProduct] = useState('');
  const [categoryProduct, setCategoryProduct] = useState('');
  const [description, setDescription] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState(0);
  const [getProduct, setGetProduct] = useState([]);
  console.log('user', getProduct);
  const formattedTime = moment().format('YYYY-MM-DD HH:mm:ss');

  useEffect(() => {
    changeValue();
  }, []);

  const changeValue = async () => {
    try {
      const response = await productAPI.searchProduct();
      const matchingProduct = response.result.recount.find(
        (user) => user.product_id === props.id,
      );
      setGetProduct(matchingProduct);
      if (matchingProduct) {
        setSku(matchingProduct.sku);
        setNameProduct(matchingProduct.name);
        setCategoryProduct(matchingProduct.category);
        setDescription(matchingProduct.description);
        setUnitPrice(matchingProduct.unit_price);
        setImage(matchingProduct.image);
      }
    } catch (error) {
      alert(error);
    }
  };

  const newUpdate = {
    sku: sku,
    name: nameProduct,
    category: categoryProduct,
    description: description,
    unit_price: unitPrice,
    image: image,
  };
  const handleSave = () => {
    try {
      productAPI.updateProduct(props.id, newUpdate);
      setShow(false);
    } catch (error) {
      alert(error);
    }
  };
  const classify = (event) => {
    setCategoryProduct(event.target.value);
  };
  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        Sửa
      </Button>
      <form method="PUT">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="d-flex justify-content-center">
              Sửa thông tin người dùng
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Control
              className="mb-2"
              placeholder="Mã sản phẩm"
              value={sku}
              onChange={(event) => setSku(event.target.value)}
            ></Form.Control>
            <Form.Control
              className="mb-2"
              placeholder="Tên sản phẩm "
              value={nameProduct}
              onChange={(event) => setNameProduct(event.target.value)}
            ></Form.Control>
            <Form.Control
              className="mb-2"
              placeholder="Đơn giá"
              value={unitPrice}
              onChange={(event) => setUnitPrice(event.target.value)}
            ></Form.Control>
            <Form.Control
              className="mb-2"
              placeholder="Mô tả"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            ></Form.Control>
            <Form.Control type="file" className="mb-2"></Form.Control>
            <Form.Select
              onChange={(event) => classify(event)}
              value={categoryProduct}
            >
              <option disabled hidden value="">
                Thể loại
              </option>
              <option value="1">Sách thiếu nhi</option>
              <option value="2">Sách văn học nghệ thuật</option>
              <option value="3">Sách Truyện, tiểu thuyết</option>
            </Form.Select>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Đóng
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Lưu thay đổi
            </Button>
          </Modal.Footer>
        </Modal>
      </form>
    </>
  );
};

export default ModalProduct;

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, deleteItem, clearCart } from '../redux/actions';
import { useNavigate } from "react-router-dom";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { NavLink } from 'react-router-dom';

const Cart = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showCheckoutImage, setShowCheckoutImage] = useState(false);
  const cart = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();

  console.log(cart)

  const handleButtonAdd = (product) => {
    dispatch(addItem(product));
  };

  const handleButtonDelete = (product) => {
    dispatch(removeItem(product));
  };

  const handleTrashButton = (product) => {
    dispatch(deleteItem(product));
  };

  const handleNavigation = () => {
    navigate(`/`);
  };

  const getTotalAmount = () => {
    let total = 0;
    cart.forEach((product) => {
      total += product.qty * product.price;
    });
    return total.toFixed(2);
  };

  const handleCheckoutClick = () => {
    dispatch(clearCart());
    setShowCheckoutImage(true);
  };

  useEffect(() => {
    // Simulate loading effect
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);


  const SkeletonLoader = () => {
    return (
      <div>
        <div className="mx-5">
          {[...Array(cart.length)].map((_, index) => (
            <div key={index} className="d-flex flex-row align-items-center justify-content-start gap-5">
              <Skeleton height={200} width={180} />
              <div style={{ width: "600px" }}>
                <Skeleton height={30} width={300} />
                <Skeleton height={20} width={200} />
                <Skeleton height={20} width={100} />
                <Skeleton height={20} width={150} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="d-flex flex-row justify-content-center align-items-start my-5">
      <div className="mx-5">
        {
          loading ? 
              <SkeletonLoader />
            :
              showCheckoutImage ? 
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <img src="./assets/images/order-place.webp" alt="Order Placed Successfully" />
                    <div className="px-4 py-2 btn btn-outline-success mt-3" onClick={() => handleNavigation()}>
                      <h4 className="m-0">Continue Shopping</h4>
                    </div>
                </div>
            : 
              cart && cart.length ? 
                cart.map((product) => (
                  <div key={product.id} className="d-flex flex-row align-items-center justify-content-start gap-5 ">
                    <img src={product.image} alt={product.title} height="200px" width="180px" className="mb-4"/>
                    <div style={{ width: "600px" }}>
                      <h3>{product.title}</h3>
                      <p className="lead fw-bold">
                        {product.qty} x ${product.price} = ${product.price * product.qty}
                      </p>
                      <button className="btn btn-outline-dark me-2" onClick={() => handleButtonAdd(product)}>
                        <i className="fa fa-plus"></i>
                      </button>
                      <button className="btn btn-outline-dark me-2" onClick={() => handleTrashButton(product)}>
                        <i className="fa fa-trash"></i>
                      </button>
                      <button className="btn btn-outline-dark me-4" onClick={() => handleButtonDelete(product)}>
                        <i className="fa fa-minus"></i>
                      </button>
                    </div>
                  </div>
                ))
            : 
              <img src="./assets/images/empty_cart.jpg" alt="Your Cart is Empty" style={{ width: "60%", marginLeft: "20rem" }} onClick={() => handleNavigation()}/>
        }
      </div>

      {
        cart && cart.length > 0 && !loading && !showCheckoutImage &&(
          <div className="border border-dark rounded mx-5">
            <div className="bg-success text-white p-2 mb-2 d-flex justify-content-center">
              <h5 className="m-0">SUMMARY</h5>
            </div>
            <div className="text-center total-amount p-4 mb-3">
              <h4 className="m-0">Total Amount: ${getTotalAmount()}</h4>
            </div>
            <div className="bg-success text-white p-2 d-flex justify-content-center" onClick={() => handleCheckoutClick()}>
              PROCEED TO CHECKOUT
            </div>
          </div>
        )
      }



    </div>
  );
};

export default Cart;
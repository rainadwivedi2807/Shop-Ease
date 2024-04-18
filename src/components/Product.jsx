import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/actions';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import { NavLink } from 'react-router-dom';
import 'react-loading-skeleton/dist/skeleton.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getProducts = () => {
      setLoading(true);
      axios
        .get(`https://fakestoreapi.com/products/${id}`)
        .then((response) => {
          setProduct(response.data);
          setLoading(false);
          console.log(response);
        })
        .catch((error) => {
          console.error('Error fetching products:', error);
          setLoading(false);
        });
    };
    getProducts();
  }, [id]);

  const addProductToCart = (productToAdd) => {
    dispatch(addItem(productToAdd));
    showToast();
  };

  const showToast = () => {
    toast.success('Product added to cart!', {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: {marginTop: '50px'},
    
    });
  };

  const SkeletonLoader = () => {
    return (
      <>
        <div className="col-md-6">
          <Skeleton height={400} />
        </div>
        <div className="col-md-6" style={{ lineHeight: '2' }}>
          <Skeleton height={50} width={300} />
          <Skeleton height={75} width={300} />
          <Skeleton height={25} width={150} />
          <Skeleton height={50} />
          <Skeleton height={150} />
          <Skeleton height={50} width={200} />
        </div>
      </>
    );
  };

  return (
    <div>
      <div className="container py-5">
        <div className="row mt-5 ms-md-4">
          {
            loading ? 
              <SkeletonLoader />
            : 
              <>
                <div className="col-md-5">
                  <img src={product.image} alt={product.title} height="400px" width="400px" />
                </div>
                <div className="col-md-6">
                  <h4 className="text-uppercase text-black-50">{product.category}</h4>
                  <h1 className="display-5">{product.title}</h1>
                  <p className="lead fw-bolder">
                    <i className="fa fa-star" style={{ marginRight: '0.5rem' }} />
                    Rating {product.rating && product.rating.rate}
                  </p>
                  <h3 className="display-6 fw-bold my-4">${product.price}</h3>
                  <p className="lead">{product.description}</p>
                  <button className="px-4 py-2 btn btn-outline-success ms-2" onClick={() => addProductToCart(product)}>
                    Add to Cart
                  </button>
                  <NavLink to={`/cart`} className="btn btn-dark ms-2 px-3 py-2">
                    Go to Cart
                  </NavLink>
                </div>
              </>
          }
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Product;
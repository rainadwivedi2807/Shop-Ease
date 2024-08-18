import React, { useState, useEffect } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import 'react-loading-skeleton/dist/skeleton.css';

const Products = () => {

  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const getProducts = () => {
      setLoading(true);
      axios.get("https://fakestoreapi.com/products")
        .then((response) => {
          setData(response.data);
          setFilter(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching products:', error);
          setLoading(false);
        });
    };
  
    getProducts();
  }, []);
  

  const Loader = () => {
    return (
      <SkeletonTheme color="#f0f0f0" highlightColor="#e0e0e0">

        <div className="col-md-3">
          <Skeleton height={350}/>
        </div>
        <div className="col-md-3">
          <Skeleton height={350}/>
        </div>
        <div className="col-md-3">
          <Skeleton height={350}/>
        </div>
        <div className="col-md-3">
          <Skeleton height={350}/>
        </div>
      </SkeletonTheme>
    );
  };

  const filterProduct = (category) => {
    const filteredList = data.filter((obj) => obj.category === category);
    setFilter(filteredList);
  }

  const filterCategory = [
    { label: "All", action: () => setFilter(data)},
    { label: "Men's Clothing", action: () => filterProduct("men's clothing") },
    { label: "Women's Clothing", action: () => filterProduct("women's clothing")},
    { label: "Jewellery", action: () => filterProduct("jewelery")},
    { label: "Electronic", action: () => filterProduct("electronics") }
];

  return (
    <div>
      <div className="container my-5 py-5">
        <div className="row">
          <div className="col-12 mb-5">
            <h1 className='display-6 fw-bolder text-center'>Latest Products</h1>
          </div>
          {
            loading ? 
              <Loader/>
            : 
              <>
                  
                  <div className="buttons  d-flex justify-content-center mb-5 pb-5">
                   { 
                    filterCategory.map((filter, index) => (
                        <button key={index} className="btn btn-outline-dark me-2" onClick={filter.action}>
                          {filter.label}
                        </button>
                      ))
                    }
                  </div>

                  {
                      filter && filter.length > 0 ?
                      (
                          filter.map((product, index) => (
                            <div className="col-md-3 mb-3" key={product.id}>
                                <div className="card h-100 txt-center p-4">
                                <img src={product.image} className="card-img-top" alt={product.title} height='250px' width='150px'/>
                                <div className="card-body">
                                    <h5 className="card-title mb-0">{product.title.substring(0, 17) + "..."}</h5>
                                    <p className="card-text lead fw-bold">${product.price}</p>
                                    <div className="text-center ">
                                      <NavLink to={`/products/${product.id}`} className="btn btn-outline-success ms-2">Buy Now</NavLink>
                                    </div>
                                </div>
                                </div>
                            </div>
                          ))
                      ) 
                    : 
                      null
                  }
              </>
          }
        </div>
      </div>
    </div>
  );
};

export default Products;

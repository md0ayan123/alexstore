import { useEffect, useState } from 'react';
import React from 'react'
import {Suspense} from 'react'
// import CardItems from '../CardItems/CardItems';
import Navbar from '../../Components/Navbar/Navbar';
import './home.css';
import { baseUrl } from '../../utils/constant';
import CardListShimmer from '../CardListShimmer/CardListShimmer';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import img1 from '../../assets/img1.avif'
import img2 from '../../assets/img2.avif'
import img3 from '../../assets/img3.avif'
import Loading from './Loading'
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from './ErrorBoundary';
const CardItems= React.lazy(()=>import('../CardItems/CardItems')) ;


const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleSearch = (query) => {
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(query.toLowerCase()) || 
      product.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const fetchProducts = async () => {
    const response = await fetch(`${baseUrl}/products/listed`,{
      headers:{
        "Content-Type":"application/js"
      }
    });
    const result = await response.json();

    if (response.ok) {
      setProducts(result.result); 
      setFilteredProducts(result.result);
    } else {
      console.log(result.error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
   
 <div className="navbar-card-container">
  <div className='d-flex flex-column gap-3'> 
    <Navbar onSearch={handleSearch} />
<Carousel
  showThumbs={false}
  infiniteLoop
  autoPlay
  interval={3000}
  showStatus={false}
  stopOnHover
  className="mt-5"
  
>
  <div>
    <img
      src={img1}
      alt="Slide 1"
      className="w-100"
      style={{
        width: "100%",
        aspectRatio: "16/9", // forces all to have same proportion
        objectFit: "cover"
      }}
      // style={{ width: "100%", height: "auto", maxHeight: "500px", objectFit: "cover" }}
    />
  </div>
  <div>
    <img
      src={img2}
      alt="Slide 2"
      className="w-100"
      style={{
          width: "100%",
          aspectRatio: "16/9", // forces all to have same proportion
          objectFit: "cover"
}}
      // style={{ width: "100%", height: "auto", maxHeight: "500px", objectFit: "cover" }}
    />
  </div>
  <div>
    <img
      src={img3}
      alt="Slide 3"
      className="w-100 "
      style={{
        width: "100%",
        aspectRatio: "16/9", // forces all to have same proportion
        objectFit: "cover"
}}
      // style={{ width: "100%", height: "auto", maxHeight: "500px", objectFit: "cover" }}
    />
  </div>
</Carousel>


  </div>
   

  { !filteredProducts.length ?  ( <CardListShimmer/> ) : (<div className="row w-100 m-0 g-0 p-0   ">
    {filteredProducts.map((product) => (
      <div
        key={product._id}
        className="card-container mt-md-3 mt-0  col-6 col-sm-4 col-md-3 col-lg-2 "
      >
        <ErrorBoundary FallbackComponent={ErrorFallback} >
          <Suspense fallback={<Loading /> || <div>loading...</div>}>
        <CardItems
          _id={product._id}
          image={product.image.length > 300? "data:image/jpg;base64," + product.image:product.image}
          description={product.description}
          price={product.price}
          title={product.title}
        />
        </Suspense>
        </ErrorBoundary>
      </div>
    ))}
  </div>)}
</div>

 </>
  );
};

export default Home;

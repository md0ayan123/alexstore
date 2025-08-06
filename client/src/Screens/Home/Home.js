import { useEffect, useState } from 'react';
import CardItems from '../CardItems/CardItems';
import Navbar from '../../Components/Navbar/Navbar';
import './home.css';
import { baseUrl } from '../../utils/constant';
import CardListShimmer from '../CardListShimmer/CardListShimmer';


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
    const response = await fetch(`${baseUrl}/products/listed`);
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
  <div> 
    <Navbar onSearch={handleSearch} />
  </div>
    
  { !filteredProducts.length ?  ( <CardListShimmer/> ) : (<div className="row w-100 m-0 g-0 p-0 ">
    {filteredProducts.map((product) => (
      <div
        key={product._id}
        className="card-container mt-5 col-6 col-sm-4 col-md-3 col-lg-2 "
      >
        <CardItems
          _id={product._id}
          image={"data:image/jpg;base64," + product.image}
          description={product.description}
          price={product.price}
          title={product.title}
        />
      </div>
    ))}
  </div>)}
</div>

 </>
  );
};

export default Home;

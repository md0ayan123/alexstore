import React, { useEffect ,useState} from 'react'
import CardItems from '../CardItems/CardItems'
import Navbar from '../../Components/Navbar/Navbar'
import './home.css'
import { baseUrl } from '../../utils/constant'

// import { base64ToBlob } from '../../utils/commonServices'
// import { useCart } from '../../Components/context/cart._context'




const Home = () => {

  const [selectedCat, setSelectedCat] = useState('');
 const [isLoggin,setIsLoggin]=useState(false)

  const[data,setData]=useState([])
  // const procduct=useCart()
  
const allProduct=async()=>{
  const response = await fetch(`${baseUrl}/products/listed`,)
  const result=await response.json()

  if (!response.ok) {
    console.log(result.error);
    return;
}
  if(response.ok){
    console.log('resultss',result);
    setData(result)
    
  }
  
}





// useEffect(() => {
//   const fetchProducts = async () => {
//       const res = await fetch(`https://fakestoreapi.com/products/category/${selectedCat}`);
//       const data = await res.json();
//       setData(data);
//   };
//   if(selectedCat){
//     fetchProducts();
//   }else{
//     allProduct()
//   }
// }, [selectedCat]);

  useEffect(()=>{
    allProduct()
  },[])



  return (
    <div>
      <Navbar />
      <div className='page-box'>
     <div className='row p-4'>
      {data.result?.map((element,index)=>{      
        return <div key={index} className='card-container col-md-4 mt-4' >
          <CardItems key={index} id={element.id}  image={"data:image/jpg;base64," + element.image} description={element.description} price={element.price} title={element.title}/>
        </div>
      })}
     </div>
    </div>
    </div>
  )
}

export default Home

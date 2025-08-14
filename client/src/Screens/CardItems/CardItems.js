import './cardItems.css'
import { useDispatchCart,useCart } from '../../Components/context/cart._context'
 import { toast } from 'react-toastify';


const CardItems = (props) => {

  let{_id,image,description,price,title}=props
  let dispatch=useDispatchCart();
  let data=useCart()
  // console.log(data,'hbfeoeopibhv'); 
  


  
const handleAddToCart=async()=>{
  await dispatch({type:"ADD",_id:_id ,price:price,image:image,title:title,description:description})
  toast.success("Added to card!");
}

// if(Math.random() > 0.5 ){
//   return new Error("Test Error Boundary")
// }
return (
  <div>
      <div class="card " >
        <div className="image-container">
        <img src={image} className='cardImg' alt="..."/>
        </div>
  
  <div class="card-body ">
    
    <h5 class="card-title">{title.slice(0,10)}..</h5>
    <p class="card-text">{description.slice(0,12)}...</p>
    {/* <p>Rating: ⭐ {rating.rate} ({rating.count} reviews)</p>  */}
    <div className='d-flex justify-content-between align-items-center'>
    <span className='fw-bold'>${price}</span>
    <button class="btn  btn-sm text-white" style={{backgroundColor:"#ff3f6c"}} onClick={()=>handleAddToCart()}>Add to Cart</button>
    </div>
  </div>
</div>
    </div>
  )
  
  
}
export default CardItems;

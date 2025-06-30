import { useEffect ,useState} from 'react'
import CardItems from '../CardItems/CardItems'
import Navbar from '../../Components/Navbar/Navbar'
import './home.css'
import { baseUrl } from '../../utils/constant'






const Home = () => {
  const[data,setData]=useState([])

  
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

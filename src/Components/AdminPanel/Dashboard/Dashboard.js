import arrow from '../../../assets/curve-arrow-upward-icon-on-transparent-background-free-png.webp'
import { useState,useEffect } from 'react';
import axios from 'axios'
import { baseUrl } from '../../../utils/constant'
import './dashboard.css'
import { FaUserCircle } from "react-icons/fa";
import { IoIosCart } from "react-icons/io";
import { FaBagShopping } from "react-icons/fa6";
import { BsStarFill } from "react-icons/bs";
import { HiDotsVertical } from "react-icons/hi";
import { IoIosTrendingUp } from "react-icons/io";
import { Chart } from "react-google-charts";
// import AddedProduct from '../AddedProduct/AddedProduct';
// import CreateProduct from '../CreateProduct/CreateProduct'
// import OrderList from '../OrderList/OrderList'



const Dashboard =()=>{
    const [data, setData] = useState({});
  const [monthlySalesData, setMonthlySalesData] = useState([["Month", "Sales"]]);
  const [filter, setFilter] = useState("monthly");

useEffect(() => {
  async function fetchDashboard() {
    try {
      const res = await axios.get(`${baseUrl}/admin/dashboard`, {
        headers: { "Content-Type": "application/json" }
      });

      const result = res.data.data;
      setData(result);

      const graphRows = result.monthlySales.map(item => {
        let label = "";

        if (filter === "daily") {
          label = `${item.day}-${item.month}-${item.year}`;
        } else if (filter === "weekly") {
          label = `Week ${item.week} - ${item.year}`;
        } else if (filter === "monthly") {
          label = `${item.month}-${item.year}`;
        } else if (filter === "yearly") {
          label = `${item.year}`;
        }

        return [label, item.totalSales];
      });

      setMonthlySalesData([
        [filter.charAt(0).toUpperCase() + filter.slice(1), "Sales"],
        ...graphRows
      ]);

    } catch (error) {
      console.error("Failed to fetch dashboard data", error);
    }
  }

  fetchDashboard();
}, [filter]);  // <-- Depend on filter so data reloads on change



  return (
    <>
    <div className='right-content'>
    <div className='row dashboardWrapperRow '>
      <div className='col-md-12 d-flex justify-content-center'>
          <div className='dashboardBoxWrapper  w-100  gap-3 d-flex  flex-wrap justify-content-center'>
        <div className='dashboardBox' style={{backgroundImage:"linear-gradient(to right,#1da256,#48d483)"}}>   
         <div className='d-flex w-100 justify-content-between'>
          <div className='col1'>
            <h4 className='text-white fs-4 mb-0 fs-sm-5'>Total User</h4>
            <span className="text-white fs-1 fw-bold lh-1">{data?.users ?? 0}</span>
              <div className='trendingIcon'>
              <IoIosTrendingUp />
            </div>
            </div>
            <div className="ml-auto">
              <span className='icon'>
                <FaUserCircle />
              </span>
            </div>
          
             </div> 
          <div className='d-flex align-items-center justify-content-between' >
               <h6 className='text-white mb-0 mt-0'>Last Month</h6>
                 <span className='ml-auto'><HiDotsVertical /></span> 
              </div> 
             
        </div>
        <div className='dashboardBox' style={{backgroundImage:"linear-gradient(to right,#c012e2,#eb64fe)"}}> 
           <div className='d-flex w-100 justify-content-between'>
          <div className='col1'>
            <h4 className='text-white fs-4  fs-sm-5 mb-0 '>Total Orders</h4>
            <span className="text-white fs-1 fw-bold lh-1">{data?.orders ?? 0}</span>
             <div className='trendingIcon'>
              <IoIosTrendingUp />
            </div>
            </div>
            <div className="ml-auto">
              <span className='icon '>
                <IoIosCart />
              </span>
            </div>
             </div>      
             <div className='d-flex align-items-center justify-content-between'>
               <h6 className='text-white mb-0 mt-0'>Last Month</h6>
            <span className='ml-auto'><HiDotsVertical /></span> 
              </div> 
        </div>
        <div className='dashboardBox' style={{backgroundImage:"linear-gradient(to right,#2c78e5,#60aff5)"}}>   
           <div className='d-flex w-100 justify-content-between'>
          <div className='col1'>
            <h4 className='text-white fs-4  fs-sm-5 mb-0 '>Total Products</h4>
            <span className="text-white fs-1 fw-bold lh-1">{data?.products ?? 0}</span>
             <div className='trendingIcon'>
              <IoIosTrendingUp />
            </div>
            </div>
            <div className="ml-auto">
              <span className='icon'>
             <FaBagShopping />
              </span>
            </div>
             </div>     
             <div className='d-flex align-items-center justify-content-between'>
               <h6 className='text-white mb-0 mt-0'>Last Month</h6>
            <span className='ml-auto'><HiDotsVertical /></span> 
              </div> 
        </div>
        <div className='dashboardBox' style={{backgroundImage:"linear-gradient(to right,#e1950e,#f3cd29)"}}>   
           <div className='d-flex w-100 justify-content-between'>
          <div className='col1'>
            <h4 className='text-white fs-4  fs-sm-5 mb-0 '>Reviews</h4>
            <span className="text-white fs-1 fw-bold lh-1">277</span>
             <div className='trendingIcon'>
              <IoIosTrendingUp />
            </div>
            </div>
            <div className="ml-auto">
              <span className='icon '>
                <BsStarFill />

              </span>
            </div>
             </div>    
             <div className='d-flex align-items-center justify-content-between'>
               <h6 className='text-white mb-0 mt-0'>Last Month</h6>
            <span className='ml-auto'><HiDotsVertical /></span> 
              </div>              
             
        </div>
      </div>
      </div>
    </div>
         <div className="col md-12 pl-0 mt  ">
      <div className="box graph-box mt-4 border ">
        <div className='d-flex col justify-content-between'>
          <h4 >Total Sales</h4>
           <span className='ml-auto'><HiDotsVertical /></span> 
        </div>
        
         <h3 className=' font-weight-bold'>${(data?.totalSales ?? 0).toFixed(2)}</h3>
        <p className='fs-6 opacity-50'>
      ${(data?.lastMonthSales ?? 0).toFixed(2)} last month
    </p>
<div>
  <select
  value={filter}
  onChange={(e) => setFilter(e.target.value)}
  className="form-select mb-3"
>
  <option value="daily">Daily</option>
  <option value="weekly">Weekly</option>
  <option value="monthly">Monthly</option>
  <option value="yearly">Yearly</option>
</select>
      <h4>Monthly Sales Overview</h4>
      {monthlySalesData.length > 1 ? (
        <Chart
          chartType="ColumnChart"
          data={monthlySalesData}
          options={{
            title: "Monthly Sales",
            backgroundColor: "transparent",
            chartArea: { width: "80%", height: "70%" },
            colors: ['#4CAF50']
          }}
          width="100%"
          height="300px"
        />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  
              
      </div>
        
        
         </div>
    

    </div>
    </>
   

    
  )
}

export default Dashboard

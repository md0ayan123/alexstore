import React from 'react'
import './CardListShimmer.css'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CardListShimmer = () => {
  return (
    <>
  <div className="row w-100 m-0 g-0 p-0 r">
  {[...Array(18)].map((_, i) => (
    <div key={i} className="mt-5 col-6 col-sm-4 col-md-3 col-lg-2 ">
   <div className="border">
    <Skeleton height={350} />
    
  </div>
    </div>
  ))}
</div>

    </>
  
  )
}

export default CardListShimmer

import React from 'react'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { tabsdata } from './AllData'

function SearchData({category,searchcat}) {
    let tabsdata1 = tabsdata   
   

    
    let filterData=tabsdata1.filter((v)=>{
       if(category=="All" && searchcat==""){
             return v;
       }
       else{

            if(category!="" && searchcat!="" ){
                    if(v.category==category && v.head.includes(searchcat)){
                        return v
                    }
            }
            else if(category!="" && v.category==category){
                return v
            }
            else if(searchcat!="" && v.head.includes(searchcat)){
                return v
            }
        }
        
    } )
    console.log(filterData)
  return (
    <>
    {
        filterData.map(v=>{
            

               return( <div className={` duration-500 border hover:shadow-[0px_0px_15px_1px_gray] border-gray-300  w-full mb-5 group rounded-[10px_10px_0px_0px] overflow-hidden`}>
        <div className='cardimg   h-[200px] bg-cover bg-no-repeat relative' style={{backgroundImage:`url('${v.image}')`}}>
            
            <div className='bg-[rgba(0,0,0,0.5)] w-full h-full absolute top-0 left-0'>
                <button className='bg-yellow-600 absolute duration-[0.3s] scale-0 group-hover:scale-[1] top-3 left-3 text-white px-3 py-2 text-[15px] rounded-md'>Top Seller</button>
                <span className='absolute scale-0 origin-center duration-[0.3s] group-hover:scale-[1s] group-hover:bottom-[80px] text-white bottom-[30px] left-[105px]'>Preview Course</span>
            </div>
        </div>
        <div className='carddetails font-["Nunito"] bg-white text-left pt-6 pb-4 px-5'>
            <h5 className='pb-3'>{v.meta}</h5>
            <h2 className='pb-3 text-[20px] font-bold'>{v.head}</h2>
            
        </div>
        <div className='flex rounded-[0px_0px_10px_10px] justify-between items-center border-t-[1px] w-full bg-white px-5 py-3'>
                <FontAwesomeIcon icon={faUser} className='text-[18px]'/> 
                <button className='text-red-600 text-[18px]'>{v.fee}</button>
            </div>
    </div>  
               )
            
           
           
           

        })
    }

        
    </>
  )
}

export default SearchData



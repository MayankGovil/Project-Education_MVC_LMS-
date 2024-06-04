import React, { useEffect, useState } from 'react'
import Header from '../Common/Header'
// import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";  
import HomeSlider from '../Common/HomeSlider';

import Cards from '../Common/Cards';
import CardsTwo from '../Common/CardsTwo';
import Tabs from '../Common/Tabs';
import TeamSlider from '../Common/TeamSlider';
import bgimg from '../img/2 (2).png'
import Footer from '../Common/Footer';
function Home() {
  
  let [tab,setTabs] = useState('')
  
  useEffect(()=>{
    setTabs("All")
  },[])
  
  console.log(tab)
  
  
  return (
    <>
    <Header/>
    <section className='w-full'>
    <div className='w-full h-[30vh] lg:h-[100vh]'>
    <HomeSlider />
    </div>
    </section>
    <section className='w-full pt-[20px] px-[20px] lg:px-0 lg:pt-[100px] '>
    <div className='max-w-[1300px] m-auto text-center font-["Nunito"]'>
    <h1 className='lg:text-[30px] text-[25px] font-[600] text-[#203367] pb-2'>Via School Categories Courses</h1>
    <p className='text-[18px]'>Cum doctus civibus efficiantur in imperdiet deterruisset.</p>
    <div className='grid lg:grid-cols-4 grid-cols-1 py-[30px] lg:py-[60px] gap-8'>
    <Cards/>
    
    </div>
    <div className='flex justify-center items-center mb-[60px]'>
    <button className='border border-blue-700 border-[2px] text-[#2441E7] py-3 px-[60px] rounded-[40px]'>View All Courses</button>
    </div>
    </div>
    </section>
    {/* <div className='w-full bg-gray-300 h-[2px]'></div> */}
    <section className='w-full lg:pt-[100px] pt-[50px] px-[20px] lg:px-0 border-y-2 '>
    <div className='max-w-[1300px] m-auto text-center font-["Nunito"]'>
    <h1 className='text-[30px] font-[600] text-[#203367] pb-2'>What We Do</h1>
    <p className='text-[18px]'>Cum doctus civibus efficiantur in imperdiet deterruisset.</p>
    <div className='grid lg:grid-cols-4 py-[30px] gap-8 mt-8 mb-[50px]'>
    
    <CardsTwo/>
    
    </div>
    </div>
    </section>
    <section className='w-full lg:pt-[100px] pt-[50px] px-[20px] lg:px-0 bg-[#F4F5F7] '>
    <div className='max-w-[1300px] m-auto text-center font-["Nunito"]'>
    <h1 className='lg:text-[30px] text-[25px] font-[600] text-[#203367] pb-2 text-center'>Browse Our Top Courses</h1>
    <p className='lg:text-[18px] text-[15px] text-center lg:w-[55%] m-auto'>Cum doctus civibus efficiantur in imperdiet deterruisCum doctus civibus efficiantur in imperdiet deterruisset.</p>
    <div className='w-full pb-2'>
    <div  className='tabs '>
    <div className='flex gap-5 py-10 justify-center '>
    
    <div onClick={()=>setTabs("All")} className={`${tab=="All" ?" active":" "} `}>All</div>
    <div onClick={()=>setTabs("Desgin")} className={` ${tab=="Desgin" ?"active":" "}`}>Desgin</div>
    <div onClick={()=>setTabs("3D + Animation")} className={` ${tab=="3D + Animation" ?"active":" "}`}>3D + Animation</div>
    
    
    </div>
    </div>
    <div className=' grid lg:grid-cols-4 gap-5 '>
    {
      tab!=""?
      <Tabs tabbing={tab}/>
      :
      ""
    }
    </div>
    <div className='flex justify-center mt-10 items-center mb-[60px]'>
    <button className='border border-blue-700 border-[2px] text-[#2441E7] py-3 px-[60px] rounded-[40px]'>View All Courses</button>
    </div>
    </div>
    </div>
    </section>
    <section className='w-full lg:pt-[80px] pt-[50px] px-[20px] lg:px-0 pb-[50px] bg-[white] '>
    <div className='max-w-[1300px] m-auto text-center font-["Nunito"]'>
    <h1 className='lg:text-[30px] text-[25px] font-[600] text-[#203367] pb-2 text-center'>Teachers</h1>
    <p className='lg:text-[18px] text-[15px] text-center lg:w-[55%] m-auto'>Cum doctus civibus efficiantur in imperdiet deterruisset.</p>
    <div className='w-full py-[50px]  '>
    
    <TeamSlider />
    
    </div>
    </div>
    </section>
    <section  className=' w-full   bg-no-repeat lg:h-[550px]  relative'>
    <div className='bg-[#192675] lg:py-[100px] py-[50px] px-[20px] lg:h-full w-full  lg:absolute top-0 left-0'>
    <img src={bgimg} alt="" className='absolute top-[10px] opacity-[0.2] lg:block hidden'/>
    <div className='lg:max-w-[1300px] w-full m-auto font-["Nunito"]'>
    <div className='grid lg:grid-cols-2 gap-10 relative z-[99]'>
    <div className='text-white'>
    <p className=' text-center lg:text-left pb-3 lg:pb-0 '>Get 100 Online Courses for Free</p>
    <h3 className='font-bold lg:text-[43px] text-[28px] text-center lg:text-left tracking-[3px]'>REGISTER TO GET IT</h3>
    
    <div className='grid lg:grid-cols-4 grid-cols-2 text-center gap-8 mt-[50px] lg:mt-[100px] lg:mb-[50px] '>
    <div className='border border-2 py-2 lg:py-0 rounded-lg'>
    <h3 className='lg:text-[36px] text-[25px]'>52</h3>
    <h2 className='lg:text-[25px] text-[25px]'>Days</h2>
    </div>
    <div className='border border-2 py-2 lg:py-0 rounded-lg'>
    <h3 className='lg:text-[36px] text-[25px]'>04</h3>
    <h2 className='lg:text-[25px] text-[25px]'>Hours</h2>
    </div>
    <div className='border border-2 py-2 lg:py-0 rounded-lg'>
    <h3 className='lg:text-[36px] text-[25px]'>52</h3>
    <h2 className='lg:text-[25px] text-[25px]'>Minutes</h2>
    </div>
    <div className='border border-2 py-2 lg:py-0 rounded-lg'>
    <h3 className='lg:text-[36px] text-[25px]'>52</h3>
    <h2 className='lg:text-[25px] text-[25px]'>Seconds</h2>
    </div>
    </div>
    </div>
    <div className='text-white text-center lg:text-left'>
    <p className='pb-3 lg:pb-0 '>SIGNUP TO NEWSLETTER TO GET IT</p>
    <h3 className=' lg:text-[25px] text-[30px] tracking-[1px]'>THE COMPLETE WEB DEVELOPER COURSE</h3>
    <form action="" className='lg:w-[85%] mt-[40px] lg:mt-[70px]'>

      <input type="text" className='border-b-2 mb-[40px] bg-inherit w-full focus:outline-0 text-white placeholder:text-white pb-3 ' placeholder='Your Name'/>
      
      <input type="text" className='border-b-2 bg-inherit w-full focus:outline-0 text-white placeholder:text-white pb-3 ' placeholder='Email address'/>

      <input type="submit" value="Get it Now" className='border-[3px] duration-500 hover:bg-white hover:text-[#192675] px-[45px]  mt-[50px] py-[10px] text-[17px] rounded-[50px]' />
    </form>
    </div>
    </div>
    </div>
    </div>
    
    </section>
    <Footer/>
    </>
    )
  }
  
  export default Home
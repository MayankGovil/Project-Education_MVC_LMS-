import React from 'react'
import Header from '../Common/Header'
import TitleSection from '../Common/TitleSection'
import aboutimg from '../img/8 (2).jpg'
import TeamSlider from '../Common/TeamSlider'
import Footer from '../Common/Footer'
function AboutUs() {
  return (
    <>
    <Header/>
    <TitleSection title={"About Us"}/>
    <div className='max-w-[1300px] m-auto my-4'>
      <div className='grid grid-cols-2 py-[5%] gap-[50px]'>
        <div className='font-["Nunito"]'>
          <h1 className='text-[28px] font-[600] pb-7'>Enhance your skills with best Online courses</h1>
          <p className='text-[15.5px] leading-[30px] text-gray-500 pb-5'>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis,et quasi architecto beatae vitae dicta sunt explicabo.</p>
          <p className='text-[15.5px] leading-[30px] text-gray-500 pb-5'>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis,et quasi architecto beatae vitae dicta sunt explicabo.</p>
          <p className='text-[15.5px] leading-[30px] text-gray-500 pb-5 '>Nemo enim ipsam,voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia,consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.,Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, adipisci velit, sed quia non numquam eius modi tempor</p>
        </div>
        <div>
          <img src={aboutimg} alt="" />
        </div>
      </div>
      <div className='my-[30px]'>
      <h1 className='text-[25px] font-["Nunito"] font-bold text-center'>Our Story</h1>
      <div className='max-w-[1000px] m-auto mb-8  py-5'>
        <div className='flex justify-between mt-10'>
          <div className='w-[15%]'>
            <h5>Students learning</h5>
            <h2 className='font-[500] pt-3 text-[25px]'>6500</h2>
          </div>
          <div className='w-[15%]'>
            <h5>Graduates</h5>
            <h2 className='font-[500] pt-3 text-[25px]'>5854</h2>
          </div>
          <div className='w-[15%]'>
            <h5>Free Courses</h5>
            <h2 className='font-[500] pt-3 text-[25px]'>1000</h2>
          </div>
          <div className='w-[15%]'> 
            <h5>Active Course</h5>
            <h2 className='font-[500] pt-3 text-[25px]'>2000</h2>
          </div>
        </div>
      </div>
      </div>
      <div className='my-[30px] flex justify-center '>
          <div className='grid  py-10 grid-cols-2 font-["Nunito"] gap-[30px]'>
            <div className='shadow-[0px_0px_10px_1px_rgba(0,0,0,0.2)] px-5 py-3'>
              <h1 className='font-[500] pb-6 text-[24px]'>Who We Are</h1>
              <p className='pb-6 text-[15.5px] leading-[30px] text-gray-500 pb-5'>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis,et quasi architecto beatae vitae dicta sunt explicabo.</p>
              <p className='text-[15.5px] leading-[30px] text-gray-500 pb-5'>Nemo enim ipsam,voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia,consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.,Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, adipisci velit, sed quia non numquam eius modi tempora</p>
            </div>
            <div className='shadow-[0px_0px_10px_1px_rgba(0,0,0,0.2)] px-5 py-3'>
              <h1 className='font-[500] pb-6 text-[24px]'>What We Do</h1>
              <p className='pb-6 text-[15.5px] leading-[30px] text-gray-500 pb-5'>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis,et quasi architecto beatae vitae dicta sunt explicabo.</p>
              <p className='text-[15.5px] leading-[30px] text-gray-500 pb-5'>Nemo enim ipsam,voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia,consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.,Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, adipisci velit, sed quia non numquam eius modi tempora</p>
            </div>
          </div>
      </div>
      
    </div>
    <div className='bg-[#F9FAFC] w-[100%] py-[60px] '>
      <div className='max-w-[1300px] m-auto font-["Nunito"] text-center font-[500]'>
        <h1 className=' text-[30px] pb-12 '>Popular Instructor</h1> 
        <TeamSlider/>
        </div>


      </div>
      <Footer/>
</>
  )
}

export default AboutUs
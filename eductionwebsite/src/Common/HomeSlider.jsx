import React from 'react'
import Slider from 'react-slick';
import "./slider.css";
function HomeSlider() {
    const settings = {
        arrows:true,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
    
    const sliderdata = [
        {
            bg:"https://demo.createdbycocoon.com/moodle/edumy/11/pluginfile.php/452/block_cocoon_slider_6/slides/1/h2flip.jpg"
        },
        {
            bg:"https://demo.createdbycocoon.com/moodle/edumy/11/pluginfile.php/452/block_cocoon_slider_6/slides/2/4.jpg"
        },
        {
            bg:"https://demo.createdbycocoon.com/moodle/edumy/11/pluginfile.php/452/block_cocoon_slider_6/slides/2/4.jpg"
        },
        {
            bg:"https://demo.createdbycocoon.com/moodle/edumy/11/pluginfile.php/452/block_cocoon_slider_6/slides/4/h3.jpg"
        },
        
    ]

  return (
   <>
    
    <Slider {...settings} className='w-full h-full' >
        {
            sliderdata.length>0 ?

            sliderdata.map(v=>{
                // console.log(v.bg)
                return (
                    <div >
                    <div style={{backgroundImage:`url('${v.bg}')`}}  className={`relative h-[30vh] lg:h-[100vh] w-full  bg-cover bg-center`}>
                    <div className='absolute top-0 left-0 bg-[rgba(0,0,0,0.5)] w-full h-full'>
                      <div className='w-full text-center lg:text-left lg:translate-y-[-50%]  lg:w-[50%] static text-white lg:border-blue-600 absolute lg:top-[50%] lg:left-[5%] top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]   py-4 lg:translate-y-[-50%] lg:translate-x-[0%]   lg:border-l-4 lg:pl-[50px] '>
                          <h1 className='lg:text-[60px] font-["Nunito"]'>With Edumy, Learning </h1>
                          <h2 className='lg:text-[60px] font-["Nunito"] font-bold'>Never Ends</h2>
                      </div>
                    </div>
                </div>
                </div>
                )
            })
            :
            ""
        }
         
          
          
        </Slider>
   </>
  )
}

export default HomeSlider
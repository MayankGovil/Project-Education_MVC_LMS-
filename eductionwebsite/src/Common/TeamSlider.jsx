import React from 'react'
import Slider from 'react-slick'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { teamData } from './AllData'

function TeamSlider() {

    let slideTeamData = teamData

    const setting2 = {
        arrows:false,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
           
          ],
      };

      
  return (
    <>
        <Slider {...setting2} >

            {
                slideTeamData.map(v=>{
                    return(
                        <div className='w-full '>
                            <div className='w-[150px] m-auto  h-[150px] rounded-[50%] overflow-hidden'>
                                <img src={v.bg} alt="" />
                              
                            </div>
                            <ul className='flex justify-center text-[13px] text-yellow-400 gap-2 mt-5 mb-2'>
                                    <li><FontAwesomeIcon icon={faStar}/></li>
                                    <li><FontAwesomeIcon icon={faStar}/></li>
                                    <li><FontAwesomeIcon icon={faStar}/></li>
                                    <li><FontAwesomeIcon icon={faStar}/></li>
                                    <li><FontAwesomeIcon icon={faStar}/></li>

                                </ul>
                                <h1 className='text-[19px]'>Member Name</h1>
                        </div>
                    )
                })
            }
           

        </Slider>
    
    
    </>
  )
}

export default TeamSlider
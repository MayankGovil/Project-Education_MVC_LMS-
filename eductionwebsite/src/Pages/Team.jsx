import React from 'react'
import Header from '../Common/Header'
import TitleSection from '../Common/TitleSection'
import TeamSlider from '../Common/TeamSlider'
import AllTeam from '../Common/AllTeam'

function Team() {
  return (
    <>
    <Header/>
    <TitleSection title={"Team"}/>
    <div className='w-full bg-[#f9fafc] py-14'>
    <div className='lg:max-w-[1300px] m-auto '>
      <div className='text-center'>
      <h1 className=' text-[30px] pb-12 '>Popular Instructor</h1> 
      <TeamSlider/>
      </div>
    </div>
    </div>
    <div className='lg:max-w-[1300px] m-auto '>
      <div className='text-center'>
      <div className=' mt-[60px]'>
        <div className='grid grid-cols-4 gap-x-8 gap-y-9'>
          
            <AllTeam/>
          
        </div>
      </div>
      </div>
    </div>
</>
  )
}

export default Team
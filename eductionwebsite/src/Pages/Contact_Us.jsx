import React from 'react'
import Header from '../Common/Header'
import TitleSection from '../Common/TitleSection'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLocation, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons'
import Footer from '../Common/Footer'

function Contact_Us(){
  return (
    <>
    <Header/>
    <TitleSection title={"Contact Us"}/>
    <div className='max-w-[1300px] m-auto my-[50px]'>
      <div className='grid grid-cols-3'>
        <div className='text-center font-["Nunito"]'>
          <FontAwesomeIcon icon={faLocationDot} className='text-[50px] py-4'/>
          <h1 className='text-[23px] font-[500]'>Our Location</h1>
          <p className='text-gray-500 pt-2'>Collin Street West, Victor 8007, Australia.</p>
        </div>
        <div className='text-center font-["Nunito"]'>
          <FontAwesomeIcon icon={faPhone} className='text-[50px] py-4'/>
          <h1 className='text-[23px] font-[500]'>Our Numbers</h1>
          <p className='text-gray-500 pt-2'>Mobile: (+096) 468 235</p>
        </div>
        <div className='text-center font-["Nunito"]'>
          <FontAwesomeIcon icon={faEnvelope} className='text-[50px] py-4'/>
          <h1 className='text-[23px] font-[500]'>Our Email</h1>
          <p className='text-gray-500 pt-2'>info@edumy.com</p>
        </div>
      </div>

      <div className='grid grid-cols-2 my-[70px] gap-[30px]'>
      <div className=''>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1831723.4854919256!2d70.59351975624999!3d26.275131300000023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39418dfd54702095%3A0x12a00bbcdd6211d6!2sWsCube%20Tech%20Pvt.%20Ltd!5e0!3m2!1sen!2sin!4v1706696499111!5m2!1sen!2sin" width="100%" height="100%" allowfullscreen="" loading="lazy" ></iframe>
      </div>
      <div className=' font-["Nunito"]'>
        <h1 className='text-[25px] font-[500] pb-3'>Send a Message</h1>
        <p className='pb-4'>Ex quem dicta delicata usu, zril vocibus maiestatis in qui.</p>
        <form action="">
          <label htmlFor="" className=''>
            Your name
          </label>
          <input type="text" className='w-full mt-2 mb-6 rounded h-[50px] shadow-[0px_0px_5px_0px_gray] ' />
          <label htmlFor="" className=''>
            Email Address
          </label>
          <input type="text" className='w-full mt-2 mb-6 rounded h-[50px] shadow-[0px_0px_5px_0px_gray] ' />
          <label htmlFor="" className=''>
            Subject
          </label>
          <input type="text" className='w-full mt-2 mb-6 rounded h-[50px] shadow-[0px_0px_5px_0px_gray] ' />
          <label htmlFor="" className=''>
            Message
          </label>
          <textarea name="" id="" className='w-full mt-2 mb-3 rounded  shadow-[0px_0px_5px_0px_gray] ' cols="30" rows="5"></textarea>
          
          <input type="Submit" value={"Send"} className='border-[3px] text-blue-700 border-blue-700 text-[20px] px-[60px] rounded py-3' />
        </form>
      </div>
      </div>
    </div>
    <Footer/>
</>
  )
}

export default Contact_Us
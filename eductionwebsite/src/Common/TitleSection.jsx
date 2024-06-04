import React from 'react'
import Header from './Header'
import { Breadcrumb , Divider  } from '@uiw/react-breadcrumb'
import { Link } from 'react-router-dom'
import innerbg from '../img/inner-pagebg.jpg'
function TitleSection({title}) {
 
  return (
    <>
    <Header/>
    <div className='w-full text-center bg-blue-600 pt-[180px] pb-[100px] relative bg-no-repeat bg-cover bg-center' style={{backgroundImage:`url(${innerbg})`}}>
        <div className='absolute top-0 left-0 bg-[rgba(0,0,0,0.4)] w-full h-full'></div>
        <div className='relative'>
            <h1 className='text-[30px] text-white'>{title}</h1>
            <div className='flex justify-center text-white my-5'>
                <Link to={'/'} className='pr-3'>
                    Home
                </Link> / 
                <Link  className='pl-3'>
                    Courses
                </Link>
            </div>
            </div>
    </div>

    </>
  )
}

export default TitleSection
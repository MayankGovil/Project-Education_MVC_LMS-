import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
function Cards() {
    let cardData = [ 

        {
           icon: <FontAwesomeIcon icon={faPenToSquare} className='text-[40px] text-[#2441E7] mb-6'/>,
           head:"Design",
           para:"Over 800 Courses" 
        },
        {
            icon: <FontAwesomeIcon icon={faPenToSquare} className='text-[40px] text-[#2441E7] mb-6'/>,
            head:"Design",
            para:"Over 800 Courses" 
         },
         {
            icon: <FontAwesomeIcon icon={faPenToSquare} className='text-[40px] text-[#2441E7] mb-6'/>,
            head:"Design",
            para:"Over 800 Courses" 
         },
         {
            icon: <FontAwesomeIcon icon={faPenToSquare} className='text-[40px] text-[#2441E7] mb-6'/>,
            head:"Design",
            para:"Over 800 Courses" 
         },
         {
            icon: <FontAwesomeIcon icon={faPenToSquare} className='text-[40px] text-[#2441E7] mb-6'/>,
            head:"Design",
            para:"Over 800 Courses" 
         },
         {
            icon: <FontAwesomeIcon icon={faPenToSquare} className='text-[40px] text-[#2441E7] mb-6'/>,
            head:"Design",
            para:"Over 800 Courses" 
         },
         {
            icon: <FontAwesomeIcon icon={faPenToSquare} className='text-[40px] text-[#2441E7] mb-6'/>,
            head:"Design",
            para:"Over 800 Courses" 
         },
         {
            icon: <FontAwesomeIcon icon={faPenToSquare} className='text-[40px] text-[#2441E7] mb-6'/>,
            head:"Design",
            para:"Over 800 Courses" 
         },
    ]
    return (
        <>
        {
            cardData.map(v=>{
                return(
                    <div className='w-full hover:border-blue-600 duration-[1s] border rounded-[5px] py-[40px] font-["Nunito]'>
                    {v.icon}
                    <h1 className='mb-2 font-bold text-[17px] text-[#2441E7]'>{v.head}</h1>
                    <p className='text-[15px] font-[400]'>{v.para}</p>
                    </div>
                )
            })
        }
        </>
       
        )
    }
    
    export default Cards


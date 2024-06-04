import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { teamData } from './AllData'
import axios from 'axios';

function AllTeam() {
    // let slideTeamData = teamData;

    let [finalCourse,setfinalCourse]=useState([])
    

    useEffect(()=>{

        axios.get('http://localhost:5000/Teamapi/viewTeamMembers')
        .then((res)=>{
            setfinalCourse(res.data.data)
        })
    })
    return (
        <>
        {
            finalCourse.map(v=>{
                return(
                    <div className='w-full hover:shadow-lg duration-300 text-center border py-10 '>
                    <div className='w-[120px] m-auto  h-[120px] rounded-[50%] overflow-hidden'>
                    <img src={v.memberimage} alt="" />
                    
                    </div>
                    <h1 className='text-[19px] py-3'>{v.membername}</h1>
                    <p>{v.membercategory}</p>
                    <ul className='flex justify-center text-[13px] text-yellow-400 gap-2 mt-3 mb-2'>
                    <li><FontAwesomeIcon icon={faStar}/></li>
                    <li><FontAwesomeIcon icon={faStar}/></li>
                    <li><FontAwesomeIcon icon={faStar}/></li>
                    <li><FontAwesomeIcon icon={faStar}/></li>
                    <li><FontAwesomeIcon icon={faStar}/></li>
                    
                    </ul>
                    </div>
                    )
                })
            }
            
            </>
            )
        }
        
        export default AllTeam
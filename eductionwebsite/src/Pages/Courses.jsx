import React, { useEffect, useState } from 'react'
import TitleSection from '../Common/TitleSection'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp, faArrowDown, faArrowsUpDown, faSearch } from '@fortawesome/free-solid-svg-icons'
import { tabsdata } from '../Common/AllData'
import SearchData from '../Common/SearchData'
import Header from '../Common/Header'
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Courses() {

  const nav = useNavigate();

  const YOUR_PUBLISHABLE_KEY = "pk_test_51LiyTNSH4QsKt7gApjEgxNySurOKQbOlLuc0XxwsqJek8ItuUyPQLIwIThhZ7Q4Ut7dYzWkrlg15v5kgV2opUJF6002wEvois3";

  const stripePromise = loadStripe(YOUR_PUBLISHABLE_KEY);

  let [catelog , setcatelog] = useState('')
  let [search,setsearch]=useState('')
  let [faq,setFaq]= useState(false)
  let [finalCourse,setfinalCourse]=useState([])
  let [courseImgUrl,setcourseImgUrl]=useState('')

  const checkLogin = ()=>{
    let userData = Cookies.get('user');
    console.log(userData);

    if(!userData){
      nav('/login');
    }
  };
  
  useEffect(()=>{
    checkLogin();
  },[])


 


 


  useEffect(()=>{
  
    setcatelog("All")
    
  },[]);


  useEffect(()=>{
    axios.get('http://localhost:5000/Courseapi/viewcourses')
    .then((res)=>{
      // res.data.data
      // console.log(res.data.data)
      setfinalCourse(res.data.data)
      setcourseImgUrl(res.data.data.courseimage)
    })
    // .then((finalRes)=>{
    //    setfinalCourse(finalRes.finalCourse)
    //    setcourseImgUrl(finalRes.courseImgUrl);
    // })
  },[]);


  // payment integration
  const makePayment = async(e)=>{
    
    // const carts = [];

    const productsPro = JSON.parse(e.target.value);
   

    const carts = [
      {
        id:productsPro._id,
        name: productsPro.coursename,
        image: productsPro.courseimage,
        amount:Number(productsPro.courseprice),
        qunt:1
      }
    ];

    // console.log(carts)

    const finalDataToSend = {
      cart : carts,
      user : {
        username: 'Sultan',
        lastname: 'Khan',
        userid: '01',
        usermail: 'sultan@testapimail.com',
        usermobilenumber: '1234567890' 
      }
    };


    // console.log(carts,courseImgUrl);

    const stripe = await loadStripe("pk_test_51LiyTNSH4QsKt7gApjEgxNySurOKQbOlLuc0XxwsqJek8ItuUyPQLIwIThhZ7Q4Ut7dYzWkrlg15v5kgV2opUJF6002wEvois3");

    const body = {
        products:finalDataToSend
    }
    const headers = {
        "Content-Type":"application/json"
    }
    const response = await fetch("http://localhost:5000/payment/payment",{
        method:"POST",
        headers:headers,
        body:JSON.stringify(body)
    });

    const session = await response.json();

    const result = stripe.redirectToCheckout({
        sessionId:session.id
    });
    
    if(result.error){
        console.log(result.error);
    }
}
  


  return (
    <>
<Header/>
    <TitleSection title={"Courses"}/>
    <div className='max-w-[1300px] m-auto   mt-4 py-5'> 
      <div className='grid grid-cols-[73%_auto] gap-4'>
        <div className=' py-5 px-4'>
            <form action="" >
          <div className='flex gap-4'>
              <div className='w-[25%]'>
                <select name="" id="" onChange={(e)=>setcatelog(e.target.value)} className='w-full h-[45px]  rounded-[3px] px-3 border border-[gray] text-[gray]'>
                  <option value="All">Select...</option>
                  <option value="Desgin">Desgin</option>
                  <option value="3D + Animation">3D + Animation</option>
                </select>
              </div>
              <div className='w-[35%] flex items-center relative'>
                <input type="text" value={search} onChange={(e)=>setsearch(e.target.value)} className='w-full h-[45px] rounded-[3px] px-3 border border-[gray] focus:outline-none ' placeholder='Search Our Course' />
                <FontAwesomeIcon  icon={faSearch} className='absolute text-[gray] text-[20px] top-[13px] right-[10px] z-[99]'/>
              </div>
          </div>
            </form>

            <div className=' mt-[40px]'>

            <table className='border-2 w-[100%]' cellPadding='10px'>
            <tr>
              <th className='border'>S.no</th>
              <th className='border'>Course Name</th>
              <th className='border'>Fees</th>
              <th className='border'>Duration</th>
              <th className='border'>Description</th>
              <th className='border'>Image</th>
              <th className='border'>Buy</th>
            </tr>
            {finalCourse.length>=1

              ?
              
              finalCourse.map((courseItems,index)=>{
                return(
                  <tr className='text-center border'>
                      <td className='border'>{index + 1}</td>
                      <td className='border'>{courseItems.coursename}</td>
                      <td className='border'>{courseItems.courseprice}</td>
                      <td className='border'>{courseItems.courseduration}</td>
                      <td className='border'>{courseItems.coursedecription}</td>
                      <td className='border'>
                        <img src={courseItems.courseimage} width={50} />
                      </td>
                      <td className='border'>
                        <button onClick={makePayment} value={JSON.stringify(courseItems)} className='bg-[cyan] py-2 px-4 rounded' >Buy Now</button>
                      </td>
                      
                </tr>
                )
              })
              
            :
            <tr>
                <td colSpan={8}>no data found</td>
          </tr>

            }
           
          </table>

            </div>
        </div>
        <div className=' py-5 px-3'>
          <div className='faq border-[2px] rounded-[10px] py-6 '>
            <div onClick={()=>setFaq(!faq)} className={`flex  justify-between items-center px-6`}>
              <h4 className='text-[20px] font-bold'>Category Filter</h4>
              <FontAwesomeIcon icon={faq!=true ?faAngleDown : faAngleUp}/>
            </div>
            <ul className={`mx-[25px]   ${faq!=true ? "duration-[1s] mt-4 visible opacity-[1] max-h-[500px]":"mt-0 duration-[1s] invisible opacity-0 max-h-[0]"} `}>
              <li className='mb-2 text-[20px]'>Desgin</li>
              <li className='mb-2 text-[20px]'>Desgin</li>
              <li className='mb-2 text-[20px]'>Desgin</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
</>
  )
}

export default Courses
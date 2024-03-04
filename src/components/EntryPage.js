import React, { useState, useRef, useEffect } from 'react'
import first_image from '../assets/front_image1.jpg'
import netflix_logo from '../assets/Netflix_Logo_PMS.png'
import tv1 from '../assets/tv1.png'
import video1 from '../assets/video1.mp4'
import img1 from '../assets/image1.png'
import tv2 from '../assets/tv2.png'
import video2 from '../assets/video2.mp4'
import img3 from '../assets/image3.png'
import FreqaskToggleComponent from './FreqaskToggleComponent'
import { freqaskqsobject } from '../static/freqaskqsObject'
import { useNavigate } from 'react-router-dom'
import Footer from './Footer'


const EntryPage = () => {
  useEffect(() => {
    window.scrollTo(0,0)
  },[])
  const navigate = useNavigate()

  // for handling dropdown button on the top of the page
  const dropdownRef = useRef(null);
  // const buttonRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered_tam, setIsHovered_tam] = useState(false);
  const [isHovered_eng, setIsHovered_eng] = useState(true);
  const [inputValue, setInputValue] = useState('');

  //const [freqaskToggle, setfreqaskToggle] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      console.log(dropdownRef.current)
      if (isOpen && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // Clicked outside the dropdown, close it

        setIsOpen(false);
      }
    };

    // Attach the event listener when the component mounts
    document.addEventListener('mousedown', handleOutsideClick);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);


  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleMouseOver_tam = () => {
    setIsHovered_tam(true);
  };

  const handleMouseOut_tam = () => {
    setIsHovered_tam(false);
  }
  const handleMouseOver_eng = () => {
    setIsHovered_eng(true);
  };

  const handleMouseOut_eng = () => {
    setIsHovered_eng(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);

    // buttonRef.current.focus();

  };

  return (
    <>
      <div className="relative h-[700px]" ref={dropdownRef}>
        <img src={first_image} className="object-fill w-full h-full" alt='movies cover image' />
        <div className="absolute object-cover inset-0 bg-black opacity-60"></div>
        <nav className=" absolute top-1  flex justify-between items-center w-full pr-[115px] pl-[140px]  ">

          <img src={netflix_logo} className='w-[188px] h-full' alt='movies cover image' />

          <div className="space-x-4  flex items-center pr-12">

            <div className="relative">
              <button
              onBlur={()=>setIsOpen(!isOpen)}
                onClick={toggleDropdown}
                data-dropdown-toggle="dropdown" 
                className=" text-white  font-semibold rounded flex items-center bg-black bg-opacity-30 border border-white border-opacity-30  py-[4px] px-[20px]"
                // ref={buttonRef}

              ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                  <path fill-rule="evenodd" d="M9 2.25a.75.75 0 0 1 .75.75v1.506a49.384 49.384 0 0 1 5.343.371.75.75 0 1 1-.186 1.489c-.66-.083-1.323-.151-1.99-.206a18.67 18.67 0 0 1-2.97 6.323c.318.384.65.753 1 1.107a.75.75 0 0 1-1.07 1.052A18.902 18.902 0 0 1 9 13.687a18.823 18.823 0 0 1-5.656 4.482.75.75 0 0 1-.688-1.333 17.323 17.323 0 0 0 5.396-4.353A18.72 18.72 0 0 1 5.89 8.598a.75.75 0 0 1 1.388-.568A17.21 17.21 0 0 0 9 11.224a17.168 17.168 0 0 0 2.391-5.165 48.04 48.04 0 0 0-8.298.307.75.75 0 0 1-.186-1.489 49.159 49.159 0 0 1 5.343-.371V3A.75.75 0 0 1 9 2.25ZM15.75 9a.75.75 0 0 1 .68.433l5.25 11.25a.75.75 0 1 1-1.36.634l-1.198-2.567h-6.744l-1.198 2.567a.75.75 0 0 1-1.36-.634l5.25-11.25A.75.75 0 0 1 15.75 9Zm-2.672 8.25h5.344l-2.672-5.726-2.672 5.726Z" clip-rule="evenodd" />
                </svg>

                English
                <svg class="w-4 h-4 pl-1 items-center" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              {isOpen && (
                <div className="absolute w-full  bg-white border rounded shadow-md">
                  <ul>
                    <li className={` py-2 px-4 rounded-t ${isHovered_eng ? 'bg-blue-500 text-white' : 'bg-white text-black'}`} onMouseEnter={handleMouseOver_eng}
                      onMouseLeave={handleMouseOut_eng}>English</li>
                    <li className={`${isHovered_tam ? 'bg-blue-500 text-white' : 'bg-white text-black'} py-2 px-4  rounded-b`} onMouseEnter={handleMouseOver_tam}
                      onMouseLeave={handleMouseOut_tam}>Tamil</li>

                  </ul>
                </div>
              )}
            </div>


            <button onClick={() => navigate('/login')} className="bg-customRed hover:bg-red-700 py-[4px] px-[14px] font-semibold text-white   rounded ">
              Sign in
            </button>

          </div>
        </nav>
        <div className='text-center  absolute top-[270px] flex flex-col items-center w-full'  >
          <p className='text-[50px] text-white  font-extrabold '  >Unlimited movies, TV shows and more</p>
          <p className='text-2xl mt-2 text-white' > Watch anywhere. Cancel anytime.</p>
          <p className='text-2xl mt-4 text-white ' >Ready to watch? Enter your email to create or restart your membership.</p>
          <div className='flex items-center justify-center w-full mt-5'>
            {/* <input type='email' value={inputValue} onChange={handleInputChange} className="text-white   py-4 px-3 mr-3  border  bg-black bg-opacity-60 rounded-md w-[370px] focus:outline-none focus:border-white focus:border-2" placeholder="Email address"></input> */}

            <div >
              <div class="relative mr-3 min-w-[370px] h-[58px]    ">
                <input
                  class="peer w-full py-4  px-3    text-white h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-white  focus:border-2 border-t-transparent focus:border-t-transparent text-sm rounded-[7px] border  bg-black bg-opacity-60 focus:border-white "
                  placeholder=" " /><label
                    class="flex w-full  select-none   text-gray-700 pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-gray-400 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-white  transition-all -top-1.5 peer-placeholder-shown:text-[16px] text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[4.3] text-gray-500 peer-focus:text-white before:border-white peer-focus:before:!border-white after:border-white peer-focus:after:!border-white">Email address
                </label>
              </div>
            </div>


            <button className=" bg-customRed justify-center  hover:bg-red-700 text-2xl py-[4px] px-[14px] flex font-semibold items-center text-white h-[58px]  rounded ">
              Get Started
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 pl-2 font-semibold">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>

            </button>
          </div>

        </div>
      </div>
      <div className='bg-gray-800 relative h-auto' >
        <div className='w-full flex items-center justify-center bg-black absolute mt-2 h-[500px] '  >
          <div className='flex-1 pt-[40px] px-16' >
            <p className='text-[40px] text-center text-white  font-extrabold '  >Watch everywhere</p>
            <p className='text-2xl  text-center mt-2 text-white' > Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.</p>
          </div>
          <div className='flex-1  relative flex items-center justify-center pb-40' >
            <video className='w-[335px] h-[330px] ' src={video1} autoPlay loop muted />
            <img className='absolute top-[2px] w-[450px] h-[350px] ' src={tv1} />
          </div>
        </div>

        <div className='w-full flex items-center justify-center bg-black absolute mt-[516px] h-[500px] '  >
          <div className='flex-1 pl-40  relative flex items-center justify-center' >
            <img src={img1} />
          </div>
          <div className='flex-1 pt-[40px] pr-40 pl-40 flex justify-start flex-col  ' >
            <p className='text-[40px]   text-white  font-extrabold '  >Download your shows to watch offline</p>
            <p className='text-2xl   mt-2 text-white' > Save your favourites easily and always have something to watch.</p>
          </div>

        </div>

        <div className='w-full flex items-center justify-center bg-black absolute mt-[1024px] h-[500px] '  >
          <div className='flex-1 pt-[40px] px-16' >
            <p className='text-[40px] text-center text-white  font-extrabold '  >Enjoy on your TV</p>
            <p className='text-2xl  text-center mt-2 text-white' > Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.</p>
          </div>
          <div className='flex-1  relative flex items-center justify-center pb-40' >
            <video className='w-[290px] h-[200px] ' src={video2} autoPlay loop muted />
            <img className='absolute top-[2px] w-[450px] h-[350px]' src={tv2} />
          </div>
        </div>

        <div className='w-full flex items-center justify-center bg-black absolute mt-[1530px] h-[500px] '  >
          <div className='flex-1 pl-40  relative flex items-center justify-center' >
            <img src={img3} />
          </div>
          <div className='flex-1 pt-[40px] pr-40 pl-40 flex justify-start flex-col  ' >
            <p className='text-[40px]   text-white  font-extrabold '  >Create profiles for kids</p>
            <p className='text-2xl   mt-2 text-white' > Send children on adventures with their favourite characters in a space made just for them—free with your membership.</p>
          </div>

        </div>

        <div className='w-full   bg-black absolute mt-[1530px] flex-col  '>
          <p className='text-[40px] text-center pt-8 pb-5    text-white  font-extrabold '  >Frequently Asked Questions</p>
          {freqaskqsobject.map((obj) =>
            <FreqaskToggleComponent key={obj.qs} obj={obj} />


          )}
        <Footer />
        </div>
       {/* <div className='w-full absolute mt-[3002px]   '>  */}
        
        {/* </div>  */}
 
      </div>

    </>
  )
}

export default EntryPage
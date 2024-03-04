import React, { useState } from 'react'
import first_image from '../assets/front_image1.jpg'
import netflix_logo from '../assets/Netflix_Logo_PMS.png'
import { Link, useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
    const [loadingSpinner, setLoadingSpinner] = useState(false)

    const [loginMail, setLoginMail] = useState('')
    const [loginMailErrMsg, setLoginMailErrMsg] = useState()
    const [TextIndicator, setTextIndicator] = useState(false)

    const navigate = useNavigate()


    const mailCheckHandlefunc = async (e) => {

        e.preventDefault();


        // email validation
        if (!loginMail) {
            setLoginMailErrMsg('Email should not be blank.Please enter a email address')
        }

        if (loginMail) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            var isValidEmail = emailRegex.test(loginMail);

            if (!isValidEmail) {

                setLoginMailErrMsg('Please enter a valid email address')
            }
            // else {
            //     setLoginMailErrMsg('')
            // }
        }
    

    if (loginMail) {


        let updatedValue = {
            "email": loginMail,
        };

        setLoadingSpinner(true)

        //setuserJsondatasignup(prev => ({ ...prev, ...updatedValue }))

        try {
            const response = await fetch('http://127.0.0.1:8000/emailRequest/', {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                    // You may need to include additional headers, such as authentication headers
                },

                body: JSON.stringify(updatedValue),
            });
            

            if (response.status == 401) {

                //setloginServererrmsg(true)
                setLoginMailErrMsg('Please use the registered email id for password reset')

            }
            if (response.ok) { setLoginMailErrMsg('')
            setLoadingSpinner(false)
            const userObject = await response.json();
            if (userObject){
                setTextIndicator(true)
            }
            console.log(userObject)
         }
            // dont remove the below if
            if (!response.ok) {
                console.log(response, 'login response')
                //If the HTTP response status is not ok (e.g., 404 or 500), throw an error
                setLoadingSpinner(false)
                throw new Error(`Failed to fetch data: ${response.status}`);

            }

            //place the registered data into store after getting it from db

            setLoadingSpinner(false)
            //navigate('/browse')


        } catch (error) {
            console.error('fetch error', error)

        }
    }
    }
    const wrong_icon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 pt-1">
        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>;
    const loading_spinner = <div aria-label="Loading..." role="status" class="flex bg-red-700 text-center justify-center items-center w-[320px] py-[6px] px-[14px] space-x-2  ">
        <svg class="h-7 w-7 animate-spin stroke-white" viewBox="0 0 256 256">
            <line x1="128" y1="32" x2="128" y2="64" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
            <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" stroke-linecap="round" stroke-linejoin="round"
                stroke-width="24"></line>
            <line x1="224" y1="128" x2="192" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
            </line>
            <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
                stroke-width="24"></line>
            <line x1="128" y1="224" x2="128" y2="192" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
            </line>
            <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
                stroke-width="24"></line>
            <line x1="32" y1="128" x2="64" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
            <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
            </line>
        </svg>
        <span class="text-1xl font-medium text-white">Loading...</span>
    </div>;


    return (
        <div className='relative'>
<nav className=" absolute top-1  flex justify-between items-center z-10 w-full pr-[115px] pl-[140px]  ">

<img src={netflix_logo} className='w-[188px] h-full' alt='movies cover image' />

<div className="space-x-4  flex items-center pr-12">


  <button onClick={() => navigate('/login')} className="bg-customRed hover:bg-red-700 py-[4px] px-[14px] font-semibold text-white   rounded ">
    Sign in
  </button>

</div>
</nav>





        <img src={first_image} className="object-fill w-full h-full" alt='movies cover image' />
        <div className="absolute object-cover inset-0 bg-black opacity-60"></div>
            <div className='top-[100px] absolute flex justify-center w-full text-white'>
                <div className='w-[430px] m-auto bg-black bg-opacity-60   '>

                    <form className='flex flex-col items-center mt-5 mb-5 ' onSubmit={mailCheckHandlefunc} >
                    <p className='text-[20px]   text-white  font-semibold w-[320px] mb-3 mt-4 '  >Reset Password</p>
                        <div >
                            <div className="relative my-4 min-w-[320px] h-[58px]    ">
                                <input onChange={(e) => setLoginMail(e.target.value)} value={loginMail} name='loginMail' type='text'
                                    className={`peer w-full py-4  px-3    text-white 
                                    h-full bg-transparent  font-sans font-normal 
                                    outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 
                                      placeholder-shown:border placeholder-shown:border-blue-gray-200
                                       focus:border-2 
                                      border-t-transparent focus:border-t-transparent text-sm 
                                      rounded-[7px] border  bg-black bg-opacity-60 ${loginMailErrMsg ? 'placeholder-shown:border-t-red-700  border-red-700 focus:border-red-700 ' : ' placeholder-shown:border-t-white focus:border-white'}  `}
                                    placeholder=" " /><label
                                        className={`flex w-full  select-none    pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-gray-400 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-white  transition-all -top-1.5 peer-placeholder-shown:text-[16px] text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all  peer-placeholder-shown:leading-[4.3]  ${loginMailErrMsg ? 'peer-enabled:after:border-red-700  border-red-700 text-red-700 peer-focus:text-red-700 before:border-red-700 peer-focus:before:!border-red-700 after:border-red-700 peer-focus:after:!border-red-700' : 'peer-focus:text-white before:border-white peer-focus:before:!border-white peer-focus:after:!border-white after:border-white  '}     `}>Email Address
                                </label>
                            </div>
                        </div>
                        {loginMailErrMsg && <p className='text-red-700  text-[14px] mb-3 w-[320px] flex items-start'  >{wrong_icon}<span >{loginMailErrMsg}</span></p>}

                        {!loadingSpinner ? <button className="bg-customRed hover:bg-red-700 w-[320px] py-[8px] px-[14px] font-semibold text-white   rounded ">
                            Send Mail
                        </button> : loading_spinner}

                    </form>
                    <div class="flex  flex-col mt-2 ml-[56px] mb-10">
                    {TextIndicator && <p className='text-green-500 mb-2  text-[12px]'  > The password reset link is sent to the registered mail</p>}
                        <p className='text-gray-400 mb-2  text-[12px]'  ><span className='font-semibold'>Note:</span> Please enter your existing email address with us to receive password reset link</p>
                        <p className='text-white   text-[12px]'  ><span className='font-semibold'>New Here?</span> <Link className='hover:underline' to='/login'>Click here to sign up</Link></p>
                    </div>
                </div>
            </div>



        </div>
    )
}

export default ForgotPassword


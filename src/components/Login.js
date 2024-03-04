import React, { useEffect, useState, useCallback } from 'react'
import netflix_logo from '../assets/Netflix_Logo_PMS.png'
import first_image from '../assets/front_image1.jpg'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { validate } from '../util_function/validate'
import { addUser, removeUser } from '../util_function/userSlice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Footer from './Footer'
const { REACT_APP_GOOGLE_CLIENT_ID, REACT_APP_GOOGLE_REDIRECT_URL_ENDPOINT } =
    process.env;

const Login = () => {
    //const authUser = useSelector((store) => store.users.userInfo)
    const navigate = useNavigate()


    const [authFormtoggle, setAuthFormtoggle] = useState(false)
    // const email = useRef(null)
    // const password = useRef(null)
    // const username = useRef(null)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")

    const [validateErrormsgEmail, setvalidateErrormsgEmail] = useState()
    const [validateErrormsgPwd, setvalidateErrormsgPwd] = useState()
    const [validateErrormsgUname, setvalidateErrormsgUname] = useState()
    const [loginServererrmsg, setloginServererrmsg] = useState(false)
    const [userJsondatasignup, setuserJsondatasignup] = useState({})
    const [restrictpPwdmsg, setrestrictpPwdmsg] = useState(false)
    const [loadingSpinner, setLoadingSpinner] = useState(false)


    const dispatch = useDispatch()

    const openGoogleLoginPage = useCallback(() => {
        const googleAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth";

        const scope = [
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/userinfo.profile",
        ].join(" ");

        const params = new URLSearchParams({
            response_type: "code",
            client_id: REACT_APP_GOOGLE_CLIENT_ID,
            redirect_uri: `${REACT_APP_GOOGLE_REDIRECT_URL_ENDPOINT}/google`,
            prompt: "select_account",
            access_type: "offline",
            scope,
        });

        const url = `${googleAuthUrl}?${params}`;

        window.location.href = url;
    }, []);

    const authformHandlefunc = async (e) => {

        e.preventDefault();

        // email and password validation
        const errormsg = validate(email, password)
       




        if (errormsg) {
            if (errormsg.includes('#')) {
                setvalidateErrormsgEmail(errormsg.split('#')[0])
                setvalidateErrormsgPwd(errormsg.split('#')[1])

                if (authFormtoggle) {
                    if (!username) {
                        setvalidateErrormsgUname('Username is mandatory')

                    } else {
                        setvalidateErrormsgUname()

                    }
                }

            }
            else {
                var emailerr_count = ['Email', 'email'].filter(word => errormsg.includes(word));
                var pwderr_count = ['special', 'password'].filter(word => errormsg.includes(word));
                console.log(pwderr_count)
                if (emailerr_count.length == 0) { setvalidateErrormsgEmail() }
                if (pwderr_count.length == 0) {
                    console.log('*******************************')
                    setvalidateErrormsgPwd() 
                }
                else{
                    console.log(errormsg)
                    setvalidateErrormsgPwd(errormsg)
                    console.log(validateErrormsgPwd)
                }

                console.log(validateErrormsgPwd)
                if (emailerr_count.length !== 0) {
                    setvalidateErrormsgEmail(errormsg)
                }
                // if (pwderr_count.length !== 0) {
                //     console.log(errormsg)
                    

                // }
                console.log(validateErrormsgPwd)

                if (authFormtoggle) {
                    if (!username) {
                        setvalidateErrormsgUname('Username is mandatory')

                    } else {
                        setvalidateErrormsgUname()
                    }
                }
            }
        }

        //false - sign in ,true - signup page
        // sign in false
        if (!authFormtoggle) {
            if (!email && !password) {
                return null
            }
        }
        // sign up true
        if (authFormtoggle) {
            if (!username && !email && !password) {
                return null

            }

        }
        // validations ends here
        console.log(authFormtoggle, username,email ,password ,validateErrormsgPwd)
        // signup
        if (authFormtoggle && username && email && password && !errormsg) {

            let updatedValue = {
                "username": username, "email": email,
                "password": password
            };
            //console.log(updatedValue)
            setLoadingSpinner(true)

            setuserJsondatasignup(prev => ({ ...prev, ...updatedValue }))
            //console.log(authFormtoggle, username, email, password)
            //console.log(userJsondatasignup)
            try {
                const response = await fetch('http://127.0.0.1:8000/auth/register/', {

                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',

                        // You may need to include additional headers, such as authentication headers
                    },

                    body: JSON.stringify(updatedValue),
                });

                if (!response.ok){
                    setLoadingSpinner(false)
                    setvalidateErrormsgEmail('This email id is already an existing user. Please try with new email id ')

                }
                if (response.ok) {
                    const data = await response.json();

                    //make the user loggin suddenly after the user registered in the website

                    const loginResponse = await fetch('http://127.0.0.1:8000/auth/login/', {

                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',

                            // You may need to include additional headers, such as authentication headers
                        },

                        body: JSON.stringify({
                            "email": email,
                            "password": password
                        }),
                    });
                    //console.log(loginResponse)
                    const loggedUserjson = await loginResponse.json();


                    //place the registered data into store after getting it from db
                    dispatch(addUser(loggedUserjson))

                    // to access the refresh token present inside cookie -- need to work on this
                    function getCookie(cookie) {
                        return document.cookie.split(';').reduce(function (prev, c) {
                            var arr = c.split('=');
                            return (arr[0].trim() === cookie) ? arr[1] : prev;
                        }, undefined);
                    }

                    //console.log(getCookie('refreshToken'))

                    // now navigate to home page
                    setLoadingSpinner(true)

                    navigate('/browse')

                }


            } catch (error) {
                console.error('Error fetching data:', error);
            }

        }
        //signin
        if (!authFormtoggle && email && password && !errormsg) {


            let updatedValue = {
                "email": email,
                "password": password
            };
            //console.log(updatedValue)
            setLoadingSpinner(true)

            setuserJsondatasignup(prev => ({ ...prev, ...updatedValue }))
            //console.log(authFormtoggle,  email, password)
            //console.log(userJsondatasignup)
            try {
                const response = await fetch('http://127.0.0.1:8000/auth/login/', {

                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',

                        // You may need to include additional headers, such as authentication headers
                    },

                    body: JSON.stringify(updatedValue),
                });
                //console.log(response)

                if (response.status == 400) {

                    setloginServererrmsg(true)
                    setvalidateErrormsgPwd('Please enter a valid password')

                }
                if (response.status == 401) {

                    //setloginServererrmsg(true)
                    setvalidateErrormsgEmail('Please use the registered email id for login')
                    setvalidateErrormsgPwd()
                    setloginServererrmsg(true)

                }
                if (response.ok) { setloginServererrmsg(false) }
                // dont remove the below if
                if (!response.ok) {
                    console.log(response, 'login response')
                    //If the HTTP response status is not ok (e.g., 404 or 500), throw an error
                    setLoadingSpinner(false)
                    throw new Error(`Failed to fetch data: ${response.status}`);

                }

                const data = await response.json();
                //place the registered data into store after getting it from db
                dispatch(addUser(data))
                setLoadingSpinner(false)
                navigate('/browse')


            } catch (error) {
                console.error('fetch error', error)

                //setloginServererrmsg(true)
                //setvalidateErrormsgPwd('Please enter a valid password')
                //setrestrictpPwdmsg(true)

            }

        }

    }





    const authformTogglefunc = () => {
        setAuthFormtoggle(!authFormtoggle)
        setvalidateErrormsgEmail()
        setvalidateErrormsgPwd()
        setvalidateErrormsgUname()
        setloginServererrmsg(false)
        setEmail("")
        setPassword("")
        setUsername("")

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

    const googleButton = <button

        className="bg-white text-gray-800 font-bold  w-[320px] py-[4px] px-[14px] border rounded shadow  focus:outline-none  mb-8  "
        onClick={openGoogleLoginPage}
    >
        <div className="flex items-center justify-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="31px"
                height="31px"
            >
                <path
                    fill="#FFC107"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                />
                <path
                    fill="#FF3D00"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                />
                <path
                    fill="#4CAF50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                />
                <path
                    fill="#1976D2"
                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                />
            </svg>
            <span className='pl-2' >Sign in with Google</span>
        </div>
    </button>;


    return (
        <div className="relative h-[900px]" >
            <img src={first_image} className="object-fill w-full h-full" alt='movies cover image' />
            <div className="absolute object-cover inset-0 bg-black opacity-60"></div>
            <nav className=" absolute top-1  flex justify-between items-center w-full pr-[115px] pl-[140px]  ">

                <img src={netflix_logo} className='w-[188px] h-full' alt='movies cover image' />

            </nav>
            <div className='top-[100px] absolute flex flex-col justify-center w-full text-white'>
                <div className='w-[430px] m-auto bg-black bg-opacity-60   '>

                    <form className='flex flex-col items-center mt-5 mb-2 ' onSubmit={authformHandlefunc}>
                        <p className='text-[32px]   text-white  font-bold w-[320px] mb-7 mt-4 '  >Sign in</p>
                        {loginServererrmsg && <div className='flex flex-col rounded-sm px-3 py-3 justify-start  bg-orange-400 text-black text-[16px] mb-3 w-[320px]' ><p className='font-semibold'>Something went wrong</p><p>We can't able to find your the email id or may be an incorrect password.Please try again </p></div>}
                        {/* {authFormtoggle && <input type='text' name='username' onChange={(e) => setUsername(e.target.value)} value={username} className={`text-white   py-4 px-3  ${validateErrormsgUname ? 'border-red-700' : 'border-white'}  border  bg-black bg-opacity-60 rounded-md w-[320px] my-4 focus:outline-none focus:border-white focus:border-2`} placeholder="Username"></input>} */}
                        {authFormtoggle && <div >
                            <div className="relative my-4 min-w-[320px] h-[58px]    ">
                                <input onChange={(e) => setUsername(e.target.value)} value={username} name='username' type='username'
                                    className={`peer w-full py-4  px-3    text-white 
                                    h-full bg-transparent  font-sans font-normal 
                                    outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 
                                      placeholder-shown:border placeholder-shown:border-blue-gray-200
                                       focus:border-2 
                                      border-t-transparent focus:border-t-transparent text-sm 
                                      rounded-[7px] border  bg-black bg-opacity-60 ${validateErrormsgUname ? 'placeholder-shown:border-t-red-700  border-red-700 focus:border-red-700 ' : ' placeholder-shown:border-t-white focus:border-white'}  `}
                                    placeholder=" " /><label
                                        className={`flex w-full  select-none    pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-gray-400 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-white  transition-all -top-1.5 peer-placeholder-shown:text-[16px] text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all  peer-placeholder-shown:leading-[4.3]  ${validateErrormsgUname ? 'peer-enabled:after:border-red-700  border-red-700 text-red-700 peer-focus:text-red-700 before:border-red-700 peer-focus:before:!border-red-700 after:border-red-700 peer-focus:after:!border-red-700' : 'peer-focus:text-white before:border-white peer-focus:before:!border-white peer-focus:after:!border-white after:border-white  '}     `}>Username
                                </label>
                            </div>
                        </div>}
                        {validateErrormsgUname && <p className='text-red-700  text-[14px] mb-3 w-[320px] flex items-start'  >{wrong_icon}<span >{validateErrormsgUname}</span></p>}
                        {/* <input type='email' name='email' onChange={(e) => setEmail(e.target.value)} value={email} className={`text-white   py-4 px-3 ${validateErrormsgEmail ? 'border-red-700' : 'border-white'} border  bg-black bg-opacity-60 rounded-md w-[320px] my-4 focus:outline-none focus:border-white focus:border-2`} placeholder="Email address"></input> */}


                        <div >
                            <div className="relative my-4 min-w-[320px] h-[58px]    ">
                                <input onChange={(e) => setEmail(e.target.value)} value={email} name='email' type='text'
                                    className={`peer w-full py-4  px-3    text-white 
                                    h-full bg-transparent  font-sans font-normal 
                                    outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 
                                      placeholder-shown:border placeholder-shown:border-blue-gray-200
                                       focus:border-2 
                                      border-t-transparent focus:border-t-transparent text-sm 
                                      rounded-[7px] border  bg-black bg-opacity-60 ${validateErrormsgEmail ? 'placeholder-shown:border-t-red-700  border-red-700 focus:border-red-500 ' : ' placeholder-shown:border-t-white focus:border-white'}  `}
                                    placeholder=" " /><label
                                        className={`flex w-full  select-none    pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-gray-400 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-white  transition-all -top-1.5 peer-placeholder-shown:text-[16px] text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all  peer-placeholder-shown:leading-[4.3]  ${validateErrormsgEmail ? 'peer-enabled:after:border-red-700  border-red-700 text-red-500 peer-focus:text-red-500 before:border-red-500 peer-focus:before:!border-red-500 after:border-red-700 peer-focus:after:!border-red-500' : 'peer-focus:text-white before:border-white peer-focus:before:!border-white peer-focus:after:!border-white after:border-white  '}     `}>Email address
                                </label>
                            </div>
                        </div>



                        {validateErrormsgEmail && <p className='text-red-600  text-[14px] mb-3 w-[320px] flex items-start'  >{wrong_icon}<span >{validateErrormsgEmail}</span></p>}
                        {/* <input type='password' name='password' onChange={(e) => setPassword(e.target.value)} value={password} className={`text-white   py-4 px-3 ${validateErrormsgPwd ? 'border-red-700' : 'border-white'}  border  bg-black bg-opacity-60 rounded-md w-[320px] my-4 focus:outline-none focus:border-white focus:border-2`} placeholder="Password"></input> */}

                        <div >
                            <div className="relative my-4 min-w-[320px] h-[58px]    ">
                                <input onChange={(e) => setPassword(e.target.value)} value={password} name='password' type='password'
                                    className={`peer w-full py-4  px-3    text-white 
                                    h-full bg-transparent  font-sans font-normal 
                                    outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 
                                      placeholder-shown:border placeholder-shown:border-blue-gray-200
                                       focus:border-2 
                                      border-t-transparent focus:border-t-transparent text-sm 
                                      rounded-[7px] border  bg-black bg-opacity-60 ${validateErrormsgPwd ? 'placeholder-shown:border-t-red-700  border-red-700 focus:border-red-500 ' : ' placeholder-shown:border-t-white focus:border-white'}  `}
                                    placeholder=" " /><label
                                        className={`flex w-full  select-none    pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-gray-400 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-white  transition-all -top-1.5 peer-placeholder-shown:text-[16px] text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all  peer-placeholder-shown:leading-[4.3]  ${validateErrormsgPwd ? 'peer-enabled:after:border-red-700  border-red-700 text-red-500 peer-focus:text-red-500 before:border-red-500 peer-focus:before:!border-red-500 after:border-red-700 peer-focus:after:!border-red-500' : 'peer-focus:text-white before:border-white peer-focus:before:!border-white peer-focus:after:!border-white after:border-white  '}     `}>Password
                                </label>
                            </div>
                        </div>

                        {validateErrormsgPwd && <p className='text-red-600  text-[14px] mb-3 w-[320px] flex items-start'  >{wrong_icon}<span className=''>{validateErrormsgPwd}</span></p>}

                        {!loadingSpinner && <button className="bg-customRed hover:bg-red-700 w-[320px] py-[8px] px-[14px] font-semibold text-white   rounded ">
                            {authFormtoggle ? 'Sign in' : 'Sign up'}
                        </button>}{loadingSpinner && loading_spinner}
                        <p className='text-[16px] mt-3' ><Link to='/forgotPassword'>Forgot password?</Link></p>

                    </form>
                    {!authFormtoggle &&
                    <div className="   w-[430px] m-auto text-center text-[15px] mb-2 font-semibold  text-gray-400 ">or</div>}
                    {!authFormtoggle && <div className="   w-[430px] m-auto  flex justify-center ">

                        {googleButton}
                    </div>}



                    <div class="flex items-center mt-2 ml-[65px] mb-5">
                        <input type="checkbox" id="myCheckbox" class="hidden" />
                        <label for="myCheckbox" class="relative inline-block w-5 h-5 bg-black border-[1.5px] border-white cursor-pointer"></label>
                        <span class="ml-2 text-white">Remember me</span>

                    </div>
                    <div class="flex  flex-col mt-2 ml-[65px] mb-5">
                        <p className='text-gray-300  text-[16px] mb-3'  >{authFormtoggle ? "Already registered?" : "New to Netfilx?"} <p className='text-white font-semibold inline-block hover:underline cursor-pointer' onClick={authformTogglefunc}  >{authFormtoggle ? "Sign In Now" : "Sign Up Now"}</p></p>
                        <p className='text-gray-400  text-[12px]'  >This page is protected by Google reCAPTCHA<br /> to ensure you're not a bot.<a href='' className='text-white pl-1'  >Learn more.</a></p>
                    </div>
                    








                </div>
                    <div className='mt-3'  ><Footer/> </div>
                
            </div>
            
        </div>
    )
}

export default Login
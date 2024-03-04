import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from '../util_function/userSlice'
//import "./index.css";
import first_image from '../assets/front_image1.jpg'

import { loadingSpinnerOne } from '../util_function/Icons'

const { REACT_APP_BACKEND_API_URL } = process.env;

const SocialAuth = () => {

  const dispatch = useDispatch()

  let location = useLocation();
  console.log("location", location);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const values = queryString.parse(location.search);
    console.log("values", values);
    const code = values.code ? values.code : null;
    console.log("code", code);
    if (code) {
      onGogglelogin();
    }
  }, []);

  const googleLoginHandler = (code) => {
    //console.log('http://localhost:8000/auth/login/google/${code}')
    return axios
    .get(`http://127.0.0.1:8000/auth/login/google/${code}`)
      //.get(`${REACT_APP_BACKEND_API_URL}/api/auth/google/${code}`)
      .then((res) => {
        console.log('no errrrrrrrrrrrrrrrrrrrrror')
        //localStorage.setItem("goggleFirstName", res.data.user.first_name);
        return res.data;
      })
      .catch((err) => {
        console.log(error,'errorrrrrrrrrrrrrrrrrrrrrrrrr')
        setError(err);
        return err;
      });
  };

  const onGogglelogin = async () => {
    console.log(location.search)
    const response = await googleLoginHandler(location.search);
    console.log(response)
    //const loggedUserjson = await response.json();
    

    if (response.email) {
      dispatch(addUser(response))
      navigate("/browse");
    }
  }

  return (
    
    <div className="relative w-full" >
    <img src={first_image} className="object-fill w-screen h-screen" alt='movies cover image' />
    <div className="absolute object-cover inset-0 bg-black opacity-60"></div>
    <div className="absolute top-[40%]  w-[35%]  text-white left-[32%]  flex-col"><div className='pl-[120px]'>{loadingSpinnerOne}</div  ><p className='font-semibold text-1xl text-center'>Gearing up...</p><p className='font-sm italic text-[15px] text-center'>This may take a few seconds, please don't close this page.</p></div>
</div>
  );
};


export default SocialAuth;
import React, { useEffect, useState } from 'react'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick'
import { IMG_CONST } from '../static/freqaskqsObject'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addVideoShowHandling } from '../util_function/VideoPopUpSlice';
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";



const DetailCardsTwo = ({ OffVideoList, setShow, setVideoId }) => {
    //const {VideoShowHandling} = useSelector((store) => store.videopopup)
    const [showTemp, setshowTemp] = useState(false);
    const [videoIdTemp, setvideoIdTemp] = useState(null);
    const dispatch = useDispatch()
    // console.log(show,videoId)
    useEffect(() => { 
        dispatch(addVideoShowHandling({ showRedux: showTemp, videoIdRedux:videoIdTemp  })); 
        setvideoIdTemp(null);
        setshowTemp(false);


    }, [showTemp])


    console.log(OffVideoList)
    const settings = {
        // Slick configuration options
        dots: false,
        infinite: true,
        speed: 900,
        slidesToShow: 3,
        sliderToScroll: 1,

    };
    return (


        <Slider {...settings}>
            {OffVideoList?.map((o) => {
                return (
                    <div key={o?.id} class="inline-block    ">

                        <div data-modal-target="default-modal" data-modal-toggle="default-modal" onClick={() => {
                            setVideoId(o.key);
                            setShow(true);
                            setvideoIdTemp(o.key);
                            setshowTemp(true);

                            // console.log(show,videoId,'llllllllllllllllllllllllllll')

                        }} class="flex flex-col w-96 h-full relative pb-5   ">
                            <LazyLoadImage effect='blur' class="w-full  hover:opacity-75 translate-opacity duration-300 h-40 mb-3 object-cover rounded-sm shadow-lg" src={`https://img.youtube.com/vi/${o?.key}/mqdefault.jpg`} alt="Bonnie image" />

                            <p class="    text-white dark:text-white">{o?.name}</p>
                            <Link to='' className="w-14 h-14 top-[26%] left-[45%] absolute className='transform   rounded-full ring-2  ring-white grid place-items-center hover:bg-slate-700 transition">

                                <svg className="ml-1 w-4  " viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 7.26795C16.3333 8.03775 16.3333 9.96225 15 10.7321L3 17.6603C1.66667 18.4301 1.01267e-06 17.4678 1.07997e-06 15.9282L1.68565e-06 2.0718C1.75295e-06 0.532196 1.66667 -0.430054 3 0.339746L15 7.26795Z" fill="red" />
                                </svg>
                            </Link>


                        </div>
                    </div>

                )
            })}</Slider>





    )
}

export default DetailCardsTwo
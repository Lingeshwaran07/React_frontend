import React from 'react'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick'
import { IMG_CONST } from '../static/freqaskqsObject'
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const DetailCards = ({incominglist}) => {
    const navigate = useNavigate()

    

    const settings = {
        // Slick configuration options
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 5,
        sliderToScroll: 5,
        // nextArrow: (
        //     <div>
        //       <div className="next-slick-arrow" style ={{'color':'white'}}>
        //           <svg xmlns="http://www.w3.org/2000/svg" stroke="white" height="24" viewBox="0 -960 960 960" width="24"><path d="m242-200 200-280-200-280h98l200 280-200 280h-98Zm238 0 200-280-200-280h98l200 280-200 280h-98Z"/></svg>
        //       </div>
        //     </div>
        //   ),
      
        //   prevArrow: (
        //     <div>
        //       <div className="next-slick-arrow rotate-180">
        //         <svg xmlns="http://www.w3.org/2000/svg" stroke="white" height="24" viewBox="0 -960 960 960" width="24"><path d="m242-200 200-280-200-280h98l200 280-200 280h-98Zm238 0 200-280-200-280h98l200 280-200 280h-98Z"/></svg>
        //       </div>
        //     </div>
        //   ),

    };
  return (
    
    
                            <Slider {...settings}>
                                {incominglist?.map((i) => {
                                    return (
                                    <div onClick={()=> 
                                    {
                                    navigate(`/movie/${i.id}`)
                                    }
                                    
                                    } key = {i?.id} >

                                        <div class="flex flex-col w-56     ">
                                            <LazyLoadImage effect='blur' class="w-full h-60 mb-3 object-cover rounded-sm shadow-lg cursor-pointer  hover:shadow-xl ease-in-out  transition duration-1000 transform group-hover:scale-105  " src={i.poster_path ? IMG_CONST + i.poster_path:'https://image.tmdb.org/t/p/original/' + i.backdrop_path} alt="Bonnie image" />
                                            <h5 class="mb-1 text-xl font-medium text-white gray-900 dark:text-white">{i.title.length >46?i.title.slice(0,46):i.title}</h5>
                                            <p class="   text-gray-400 dark:text-white">{dayjs(i.release_date).format("MMM D, YYYY")}</p>


                                        </div>
                                    </div>
                                    
                                     )
                                })}</Slider> 
  
    
    
    
  )
}

export default DetailCards
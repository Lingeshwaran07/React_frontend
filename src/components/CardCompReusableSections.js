import React from 'react'
import Skeleton from 'react-loading-skeleton';

import Card, { CardHigherOrderComp } from './Card'

import { IMG_CONST } from '../static/freqaskqsObject'
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick'

import '../css/cardShimmerCss.css';
import { useNavigate } from 'react-router-dom';



const CardCompReusableSections = ({ list_of_movie, heading }) => {
  const navigate = useNavigate()



  const randomList = [0, 1, 4, 6, 9];

  //if (!list_of_movie) return null;


  const settings = {
    // Slick configuration options
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    sliderToScroll: 4,

  };


  //console.log(list_of_movie)
  return (
    <div className='mb-7 w-[95%] m-auto flex-col   ' >
      {list_of_movie? <p className='font-[500]  text-[20px]  mb-5  text-white '>{heading}</p>:<Skeleton style={{marginBottom:'20px',width:'250px',height:'35px'}}/>}
      {list_of_movie?
      <div className='w-full'>
        <Slider {...settings}>
        {list_of_movie.map((i, index) => (
          !randomList.includes(index) ?

            <div className='inline-block relative group' onClick={()=> navigate(`/movie/${i.id}`) } >
          
              <LazyLoadImage delayTime={1000} effect='blur'  key={index} className='w-[170px]   inline-block cursor-pointer shadow-lg hover:shadow-xl ease-in-out  transition duration-1000 transform group-hover:scale-105 ' src={IMG_CONST + i.poster_path} />
            </div>
            : <div className='inline-block relative group' onClick={()=> navigate(`/movie/${i.id}`) }>   <LazyLoadImage effect='blur' delayTime={1000}  key={index} className='w-[170px]   cursor-pointer inline-block  shadow-lg hover:shadow-xl ease-in-out  transition duration-1000 transform group-hover:scale-105 ' src={IMG_CONST + i.poster_path} />
              <p className='bg-red-600 inline-block shadow-lg left-[38px] rounded-r-sm absolute top-0   px-[4px] py-2px   text-white font-medium    text-[13px]  '>Recently added</p> </div>

        ))}</Slider>
      </div>:
       <div className="w-full">
       <div className='flex flex-row justify-around  relative group'>
          {[1,2,3,4,5,6,7].map((i) => {
            return(<Skeleton  key={i} width={170} height={190} marginRight={10} className='inline-block' />)

           })}
          
        </div>
         </div>
      

        }

    </div>
    // <div className='mb-16 w-11/12 m-auto flex-col   ' >
    //   <p className='font-[500]  text-[20px]  mb-5  text-white '>{heading}</p>
    //   <div className='w-full'>
    //     <Slider {...settings}>
    //       {list_of_movie.map((i, index) => (
    //         !randomList.includes(index) ?
    //           <Card key={index} img={i.poster_path} /> : <CardHigherOrderComp key={index} img={i.poster_path} />)

    //       )
    //       }</Slider>
    //   </div>



    // </div>
  )
}

export default CardCompReusableSections
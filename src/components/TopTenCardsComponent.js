import React from 'react'
import i1 from '../assets/1.PNG'
import i2 from '../assets/2.PNG'
import i3 from '../assets/3.PNG'
import i4 from '../assets/4.PNG'
import i5 from '../assets/5.PNG'
import i6 from '../assets/6.PNG'
import i7 from '../assets/7.PNG'
import i8 from '../assets/8.PNG'
import i9 from '../assets/9.PNG'
import i10 from '../assets/10.PNG'
import { IMG_CONST } from '../static/freqaskqsObject'
import Slider from 'react-slick'
import Skeleton from 'react-loading-skeleton'
import { useNavigate } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import "react-lazy-load-image-component/src/effects/blur.css";


const TopTenCardsComponent = ({ list_of_movie }) => {

    const myArray = [i1, i2, i3, i4, i5, i6, i7, i8, i9, i10];

    // Push variables into the array


    //if (!list_of_movie) return null;

    const settings = {
        // Slick configuration options
        dots: false,
        infinite: true,
        speed: 600,
        slidesToShow: 5,
        sliderToScroll: 4,

    };

    console.log(list_of_movie)
    const navigate = useNavigate()

    return (
        <div className='mb-13 w-[93%] m-auto    ' >
            {list_of_movie ? <p className='font-[500]  text-[20px]    text-white '>Top 10 Movies of the week</p> : <Skeleton width={300} height={40} marginBottom={10}  />}
            {list_of_movie ? <div className='w-full '>
                <Slider {...settings}>
                    {list_of_movie.map((i, index) => (
                        <div onClick={()=> navigate(`/movie/${i.id}`) } className='cursor-pointer relative group  pl-5 pr-10  '>
                            <img  key={index} src={myArray[index]} className='w-[250px] h-[280px] pr-6    cursor-pointer inline-block  shadow-lg hover:shadow-xl ease-in-out  transition duration-1000 transform group-hover:scale-110 ' />

                            <img   className='bg-red-600 absolute -right-[18px] top-[45px] w-[130px]  object-cover shadow-lg ' src={IMG_CONST + i.poster_path} />

                        </div>

                    ))}</Slider>
            </div> : <div className="w-full mb-4">
                <div className='flex flex-row justify-around  relative group'>
                    {[1, 2, 3, 4, 5].map((i) => {
                        return (<Skeleton key={i} width={170} height={190} marginRight={10} className='inline-block' />)

                    })}

                </div>
            </div>}



        </div>
    )
}

export default TopTenCardsComponent
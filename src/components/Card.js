import React from 'react'
import { IMG_CONST } from '../static/freqaskqsObject'



const Card = ({ index, img }) => {
    return (
        <div className='inline-block relative group'>
              <img effect='blur'  key={index} className='w-[170px]   inline-block cursor-pointer shadow-lg hover:shadow-xl ease-in-out  transition duration-1000 transform group-hover:scale-105 ' src={IMG_CONST + img} />
            </div>
    )
}



export const CardHigherOrderComp = ({ index, img }) => {
    
    return (
        
        <div className='inline-block relative group'>   <img effect='blur'  key={index} className='w-[170px]   cursor-pointer inline-block  shadow-lg hover:shadow-xl ease-in-out  transition duration-1000 transform group-hover:scale-105 ' src={IMG_CONST + img} />
              <p className='bg-red-600 inline-block shadow-lg left-[38px] rounded-r-sm absolute top-0   px-[4px] py-2px   text-white font-medium    text-[13px]  '>Recently added</p> </div>

        
    )
}

export default Card
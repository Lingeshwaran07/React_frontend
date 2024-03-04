import React from 'react'
import { useState } from 'react';

const FreqaskToggleComponent = ({obj}) => {

    const [freqaskToggle, setfreqaskToggle] = useState(false);
    const {qs,ans} = obj
    const freq_asked_qs_toggle = () => {
        setfreqaskToggle(!freqaskToggle)
    
      }
    
    return (
        <div className='text-white text-2xl '>
            <p onClick={freq_asked_qs_toggle} className=' cursor-pointer w-3/4 mx-auto py-4 px-7 mb-2 text-left bg-gray-800 flex items-center justify-between'  ><span>{qs}</span> {freqaskToggle ? (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-6 h-6">
                <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
            </svg>
            ) : (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>)}
            </p>
            {freqaskToggle && <p className='mt-[2px] mb-2 bg-gray-800 w-3/4 mx-auto py-3 px-6  ' >{ans}</p>}


        </div>
    )
}

export default FreqaskToggleComponent
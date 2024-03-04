import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { IMG_CONST } from '../static/freqaskqsObject'
import useFetchedTrailervideo from '../Hooks/useFetchedTrailervideo';
import { useNavigate } from 'react-router-dom';


const SearchSuggestComp = ({single ,setDisplayTextBox}) => {
    
    const menuref = useRef()

    
    // const movieList = useSelector(store => store.movies?.nowPlayingMovies);

    // if (!movieList){
    //     return null;
    // }
    //const date = "2024-02-14";
    const navigate = useNavigate()

    //const TrailerId =  useFetchedTrailervideo(single.id)

    return (
        <div  onClick={()=> {navigate(`/movie/${single.id}`)
        
        console.log('oooooooooooooooooooooooooooo')} } className='w-[400px] cursor-pointer ml-[867px] mb-2 relative flex   '>
            <div className="absolute  inset-0 -z-10 bg-black opacity-60"></div>
            <div ><img   src={IMG_CONST + single.poster_path} className=' w-[40px]  object-cover' /></div>
            <div className=' pl-1 flex text-[13px] text-white flex-col'><p className='font-semibold'>{single.title}</p>
            <p className='text-gray-300 italic'>Release date : {single.release_date}</p>
            <p className='text-gray-300 italic'>Rating : {single.vote_average}</p>
            
            </div>
        </div>
    )
}

export default SearchSuggestComp
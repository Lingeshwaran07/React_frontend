import React from 'react'
import Skeleton from 'react-loading-skeleton';
import { useSelector } from 'react-redux';
import useFetchRequiredMovies from '../Hooks/useFetchRequiredMovies';
import useFetchedTrailervideo from '../Hooks/useFetchedTrailervideo';


const BrowseMainCompText = ({setShow,setVideoId}) => {

  // uncomment the below lines after finishing other parts of the code
  //const AquaMovie = useFetchRequiredMovies('572802')
  const movieList = useSelector(store => store.movies?.nowPlayingMovies);

  //const TrailerId =  useFetchedTrailervideo(572802)
  const TrailerId = 'TWqxHhSS218';

  //console.log(movieList)
  //const aquamanMovie = movieList.filter(e => e.id == 572802)
  //console.log(aquamanMovie)
  //const {title,overview} = aquamanMovie[0]
  //hard coded in belowwwwwwwwwwwwwwwwwwwwwwwwwww line 
  const { title, overview } = { 'title': "Aquaman and the Lost Kingdom", 'overview': "Black Manta seeks revenge on Aquaman for his father's death. Wielding the Black Trident's power, he becomes a formidable foe. To defend Atlantis, Aquaman forges an alliance with his imprisoned brother. They must protect the kingdom." }

  return (
    <div className='flex flex-col text-white justify-start ml-20 drop-shadow-md shadow-black  '>
      {movieList ?
        <p className='text-[70px] text-blue-400 text-shadow-lg  font-extrabold '>{title.split(' ')[0]}</p> : <Skeleton style={{ width: '150px' }} />}
      {movieList ? <p className='w-[380px] font-semibold mb-5 text-2xl text-shadow-lg'>#5 in TV Shows Today</p> : <Skeleton style={{ width: '190px' }} />}
      {movieList ? <p className='w-[380px] font-semibold mb-5'>{overview}</p> : <Skeleton style={{ width: '380px', height: '175px',marginBottom:'20px' }} />}
      <div className='flex'> {movieList ? <button onClick={() => {
                            setVideoId(TrailerId);
                            setShow(true);
                        }} class="hover:bg-gray-300   bg-white text-black font-semibold py-2 px-5 rounded  flex justify-center items-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 ">
          <path fill-rule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clip-rule="evenodd" />
        </svg>

        <span className='ml-3 text-black '>Play</span>
      </button> : <Skeleton style={{ width: '100px', height: '38px' }} />}
        {movieList ? <button class="bg-gray-500 hover:bg-gray-600 ml-3 text-white font-semibold py-2 px-5 rounded  flex justify-center items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
          </svg>


          <span className='ml-3'>More Info</span>
        </button> : <Skeleton style={{ width: '100px', height: '38px',marginLeft:'12px' }} />}</div>

    </div>
  )
}

export default BrowseMainCompText
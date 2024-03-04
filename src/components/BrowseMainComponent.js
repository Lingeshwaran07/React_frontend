
import { useSelector } from 'react-redux'
import useFetchedTrailervideo from '../Hooks/useFetchedTrailervideo'
import trailerVideoAqua from '../assets/trailerVideoAqua.mp4'
import Skeleton from 'react-loading-skeleton';


const BrowseMainComponent = () => {
  const movieList = useSelector(store => store.movies?.nowPlayingMovies);

  
  console.log('send id to 2nd hook', movieList)
  //const movieTrailer = useSelector(store=>store.movies?.TrailerVideo)
  // get  single movie info
  
  //console.log('video component',movieTrailer)
  // we are going to display trailer , title and description about the movie taken as sample for this component
  //866398
  //we take description and title from store...need to do an api call to video endpoint.and filter it .. get triler video among 20 videos ..
  useFetchedTrailervideo(572802)
  // if (!movieList) { return null }





  return (
    <>
            {/* <iframe className='w-screen aspect-video' src={"https://www.youtube.com/embed/"+ movieTrailer[0]?.key+"?autoplay=1&mute=1"} title="YouTube video player"  ></iframe> */}
            {movieList?
            <video  className='w-full  ' src = {trailerVideoAqua} autoPlay loop muted/>:<Skeleton style={{ backgroundColor: 'lightgray' }} className='w-full h-[1920px] ' />}

      
    </>
  )
}

export default BrowseMainComponent
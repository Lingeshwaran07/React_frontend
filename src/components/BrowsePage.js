import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from './Header';
import { useEffect } from 'react';

import BrowseMainComponent from './BrowseMainComponent';
import BrowseMainCompText from './BrowseMainCompText';
import CardCompReusableSections from './CardCompReusableSections';
import CardsComponent from './CardsComponent';
import useFetchRequiredMovies from '../Hooks/useFetchRequiredMovies';
import { CardHigherOrderComp } from './Card';
import trailerVideoAqua from '../assets/trailerVideoAqua.mp4';
import Skeleton from 'react-loading-skeleton';
import SearchSuggestComp from './SearchSuggestComp';
import Footer from './Footer';
import ReactPlayer from "react-player/youtube";
import { addVideoShowHandling } from '../util_function/VideoPopUpSlice';




const BrowsePage = () => {
  useEffect(() => {
    window.scrollTo(0,0)
  },[])
  const [ShowSuggessions, setShowSuggessions] = useState(false);
  const [DisplayTextBox, setDisplayTextBox] = useState(false)
  const [SearchListIfClicked, setSearchListIfClicked] = useState(false)
  const [SearchListIfNotClicked, setSearchListIfNotClicked] = useState(false)
  const dispatch = useDispatch()

  const [EqualLoading, setEqualLoading] = useState(false)
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const { nowPlayingMovies: movieList_np, PopularMovies, TopRatedMovies, UpcomingMovies } = useSelector(store => store.movies);





  const Onfocus = () => {

    //setDisplayTextBox(true)
    setShowSuggessions(true);
    console.log('onfucus   -- show suggession true', ShowSuggessions)
  };
  // const OnblurHeader = () => {
  //   //setSearchListIfClicked(false)
  //   //setSearchListIfNotClicked(true)
  //  //if(!SearchListIfNotClicked && !SearchListIfClicked) {setShowSuggessions(false)};
  //  setShowSuggessions(false)
  //  console.log('onblurrrrrrrrrrrrrrrrrrrr outside click ',!SearchListIfNotClicked && !SearchListIfClicked,ShowSuggessions)

  //   // setShowSuggessions(false);
  //   setDisplayTextBox(false)
  // };

  const hidePopup = () => {
       
    setShow(false)
    setVideoId(null)
    dispatch(addVideoShowHandling({showRedux:false,videoIdRedux:null}))
    // setShow(false);
    // setVideoId(null);
};

  const currentsearchlist = useSelector(state => state.searchResultsCached?.currentsearchresult);

  if (currentsearchlist) {
    // Create a Set to store unique keys
    const uniqueKeys = new Set();

    // Filter the array based on the uniqueness of the key
    var uniqueArrayOfObjects = currentsearchlist.filter(obj => {
      const key = obj.id; // Use the desired key
      if (!uniqueKeys.has(key)) {

        uniqueKeys.add(key);
        //console.log('dddddddddddddddddddddddddd',currentsearchlist,uniqueKeys)
        return true;
      }
      return false;
    });

  }


  if (uniqueArrayOfObjects && uniqueArrayOfObjects.length > 7) {
    var currentsearchlistTrimmed = uniqueArrayOfObjects.slice(0, 7);


  } else { var currentsearchlistTrimmed = uniqueArrayOfObjects }


  const [bgColor, setBgColor] = useState('bg-transparent'); // Initial background color
  //useeffect for handling navbar color on scrollS
  useEffect(() => {
    const handleScroll = () => {
      // You can customize the scroll threshold and colors as needed
      const scrollThreshold = 15;
      const newBgColor = window.scrollY > scrollThreshold ? 'transition easy-in-out delay-400 bg-black duration-1000 ' : 'bg-transparent';

      setBgColor(newBgColor);
    };

    // Attach the event listener when the component mounts
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const { username, email } = useSelector((state) => state.users);
  console.log('browse page rendered')
  //custom hook like js function  for fetching the movies and storing it to store
  //reuse the custom hook for fetching each categories of movies
  useFetchRequiredMovies('now_playing')
  //console.log('1')
  useFetchRequiredMovies('popular')
  // console.log('2')
  useFetchRequiredMovies('top_rated')
  // console.log('3')
  useFetchRequiredMovies('upcoming')
  // console.log('4'))

  const menuref = useRef(null)
  useEffect(() => {
    let handler = (e) => {
      //console.log(e?.target?.tagName)

     if (!menuref?.current && !menuref?.current?.contains(e.target) && e?.target?.tagName !== 'INPUT' && e?.target?.tagName !== 'svg') {

        setShowSuggessions(false)
        setDisplayTextBox(false)
}
      
    }
    document.addEventListener('click', handler)

    return () => {
      document.removeEventListener('click', handler)
    }

  }, [])




  return (
    <>
      <div className='relative  w-full'>

        <div className={`fixed  w-full top-0 z-20 `}><Header onBlur={() => {
          //setShowSuggessions(false)
          //setDisplayTextBox(false)
        }} DisplayTextBox={DisplayTextBox} setDisplayTextBox={setDisplayTextBox} Onfocus={Onfocus} bgColor={bgColor} />
          {currentsearchlistTrimmed  && ShowSuggessions && currentsearchlistTrimmed.map((c, index) => 

            <SearchSuggestComp ref={menuref}className='z-30' key={index} single={c} />)}
            
            </div>

        <div className="absolute bg-zinc-900 opacity-60 inset-0 top-0 w-full z-0 h-[1500px] "></div>
        <div className='absolute top-0 left-0 w-full '> <BrowseMainComponent /></div>


        <div className='absolute w-full z-10 top-36 '><BrowseMainCompText setShow = {setShow} setVideoId = {setVideoId} /></div>

        <div className='absolute w-full  top-[560px] z-10  '><CardsComponent /></div>
      </div>
      {show &&  videoId &&
            <div className=" bg-gradient-to-r  fixed z-20 top-0 left-0 w-full h-screen from-blue-500 to-purple-500 ">
                {/* Glass container */}
                
                <div className="bg-white relative justify-center items-center flex bg-opacity-20 py-8 w-full h-full rounded-md backdrop-blur-md">
                    {/* The bg-opacity-20 sets the background opacity to 20% */}
                    {/* <ReactPlayer className=' left-[10%] top-[15%] z-20 ' */}
                    <span className='absolute flex items-center right-1 top-0 cursor-pointer' onClick={hidePopup}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>
Close</span>
                    <ReactPlayer className='w-full h-full '
                        url={`https://www.youtube.com/watch?v=${videoId}`}
                        controls={true}
                        width="100%"
                        height="100%"
                        playing={true}
                    />
                </div>
            </div>}
      <div className="absolute  z-10 top-[2360px] "><Footer /></div>





      {/* <div className='relative  w-full'>
  
      <div className={`fixed  w-full top-0 z-20 `}><Header Onfocus = {Onfocus} Onblur  ={Onblur} bgColor = {bgColor} />{currentsearchlistTrimmed && ShowSuggessions && currentsearchlistTrimmed.map((c,index) => <SearchSuggestComp key={index} single={c}  />)}</div>
      
        <div className="absolute bg-zinc-900 opacity-60 inset-0 top-0 w-full z-0 h-[1500px] "></div>
        <div className='absolute top-0 left-0 w-full '> <BrowseMainComponent /></div>

         
        <div className='absolute w-full z-10 top-36 '><BrowseMainCompText /></div>

        <div className='absolute w-full  top-[560px] z-10  '><CardsComponent /></div> 
        <div className="absolute  z-10 top-[710px] "><Footer/></div> 
        
        

      </div>  */}







    </>

  )
}


export default BrowsePage


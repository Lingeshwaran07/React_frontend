import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import SearchSuggestComp from './SearchSuggestComp';
import Header from './Header';
import { IMG_CONST } from '../static/freqaskqsObject'
import { options } from '../static/freqaskqsObject'
import { Link, useNavigate, useParams } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick'
import DetailCards from './DetailCards';
import DetailCardsTwo from './DetailCardsTwo';
import useFetchRequiredMovies from '../Hooks/useFetchRequiredMovies';
import dayjs from 'dayjs';
import avatar from '../assets/avatar.png'
import Footer from './Footer';
import ReactPlayer from "react-player/youtube";
import '../css/videoPlayer.css'
import { addVideoShowHandling } from '../util_function/VideoPopUpSlice';
import useFetchedTrailervideo from '../Hooks/useFetchedTrailervideo';
import { addNowTrailerVideo } from '../util_function/MovieSlice';
import Skeleton from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";


//https://tw-elements.com/docs/standard/components/rating/
//https://flowbite.com/docs/components/buttons/

const MovieDetail = () => {
    // get  single movie info




    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const { showRedux, videoIdRedux } = useSelector((store) => store.videopopup?.VideoShowHandling)
    const dispatch = useDispatch()

    //console.log(showRedux, videoIdRedux)
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);


    const { id } = useParams()

    

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [id])
    //console.log(id)
    const MovieInfo = useFetchRequiredMovies(`${id}`)
    console.log(MovieInfo,'movie info')

    const TrailerId = useFetchedTrailervideo(id)
    //const TrailerId = useMemo(() => useFetchedTrailervideo(id), [id]);
    //console.log('got trailer id' ,TrailerId)


    // get  single movie videos
    const OffVideoList = useFetchRequiredMovies(`${id}/videos`);
   // console.log(OffVideoList, 'official video')
    // get  single movie credits
    const { cast, crew } = useFetchRequiredMovies(`/${id}/credits`)
    //console.log(cast, 'cat crew')


    //get  single movie recommendation list
    const recomlist = useFetchRequiredMovies(`/${id}/recommendations`)
    //console.log(recomlist, 'recommendations')
    if (recomlist) {
        var filteredrecomlist = recomlist.filter((r) => r.poster_path !== null && r.backdrop_path !== null)
    }
    //get  single movie similar list
    const similarlist = useFetchRequiredMovies(`/${id}/similar`)
    //console.log(similarlist, 'similar')

    if (similarlist) {
        var filteredsimilarlist = similarlist.filter((f) => f.poster_path !== null && f.backdrop_path !== null)
    }


    if (cast && cast.length > 6) {
        var slicedcast = cast?.splice(0, 6)


    } else { var slicedcast = cast }


    const director = crew?.filter((f) => f?.job === "Director")
    const writer = crew?.filter((f) => f?.job === "Screenplay" || f?.job === "Story" || f?.job === "Writer")

    if (director) {
        // Create a Set to store unique keys
        const uniqueKeysdir = new Set();

        // Filter the array based on the uniqueness of the key
        var uniquedirectors = director.filter(obj => {
            const key = obj.id; // Use the desired key
            if (!uniqueKeysdir.has(key)) {

                uniqueKeysdir.add(key);
                //console.log('dddddddddddddddddddddddddd',writer,uniqueKeys)
                return true;
            }
            return false;
        });

        if (writer) {
            // Create a Set to store unique keys
            const uniqueKeys = new Set();

            // Filter the array based on the uniqueness of the key
            var uniquewriters = writer.filter(obj => {
                const key = obj.id; // Use the desired key
                if (!uniqueKeys.has(key)) {

                    uniqueKeys.add(key);
                    //console.log('dddddddddddddddddddddddddd',writer,uniqueKeys)
                    return true;
                }
                return false;
            });

        }
    }
    // const toHoursAndMinutes = (totalMinutes) => {
    //     const hours = Math.floor(totalMinutes / 60);
    //     const minutes = totalMinutes % 60;
    //     return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    //   };
    // console.log(director)
    // console.log(writer)
    // asynchronous function always return a promise but we are handling promise inside the hooks useeffect



    //console.log(MovieInfo,'movieeeeeeeeeeeeeeeee info')


    //const singleData = useFetchRequiredMovies(`${id}`)
    //console.log(MovieInfo,'pppppppppp')


    // const settings = {
    //     // Slick configuration options
    //     dots: false,
    //     infinite: true,
    //     speed: 900,
    //     slidesToShow: 5,
    //     sliderToScroll: 1,

    // };

    // const Onfocus = () => {
    //     //console.log('onfucussssssssssssssssssss')
    //     setShowSuggessions(true);
    // };
    // const Onblur = () => {
    //     //console.log('onblurrrrrrrrrrrrrrrrrrrr')
    //     setShowSuggessions(false);
    // };

    //const currentsearchlist = useSelector(state => state.searchResultsCached?.currentsearchresult);

    // if (currentsearchlist) {
    //     // Create a Set to store unique keys
    //     const uniqueKeys = new Set();

    //     // Filter the array based on the uniqueness of the key
    //     var uniqueArrayOfObjects = currentsearchlist.filter(obj => {
    //         const key = obj.id; // Use the desired key
    //         if (!uniqueKeys.has(key)) {

    //             uniqueKeys.add(key);
    //             //console.log('dddddddddddddddddddddddddd',currentsearchlist,uniqueKeys)
    //             return true;
    //         }
    //         return false;
    //     });

    // }


    // if (uniqueArrayOfObjects && uniqueArrayOfObjects.length > 7) {
    //     var currentsearchlistTrimmed = uniqueArrayOfObjects.slice(0, 7);


    // } else { var currentsearchlistTrimmed = uniqueArrayOfObjects }


    const hidePopup = () => {

        setShow(false)
        setVideoId(null)
        dispatch(addVideoShowHandling({ showRedux: false, videoIdRedux: null }))
        // setShow(false);
        // setVideoId(null);
    };

    // below codes  are for header
    const [ShowSuggessions, setShowSuggessions] = useState(false);
    const [DisplayTextBox, setDisplayTextBox] = useState(false)

    const Onfocus = () => {
        //console.log('onfucussssssssssssssssssss')
        setShowSuggessions(true);
    };
    const Onblur = () => {
        // console.log('onblurrrrrrrrrrrrrrrrrrrr')
        setShowSuggessions(false);
        setDisplayTextBox(false)
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

    // if (!TrailerId){
    //     console.log('qwerty')
    //     return (
    //         <>
    //             <Skeleton width={1000} height={100}/>
    //         </>
    //     )
    // }



    // const [bgColor, setBgColor] = useState('bg-transparent'); // Initial background color
    // //useeffect for handling navbar color on scrollS
    // useEffect(() => {
    //     const handleScroll = () => {
    //         // You can customize the scroll threshold and colors as needed
    //         const scrollThreshold = 15;
    //         const newBgColor = window.scrollY > scrollThreshold ? 'transition easy-in-out delay-400 bg-black duration-1000 ' : 'bg-transparent';

    //         setBgColor(newBgColor);
    //     };
    //     // Attach the event listener when the component mounts
    //     window.addEventListener('scroll', handleScroll);

    //     // Clean up the event listener when the component unmounts
    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, []); // Empty dependency array ensures the effect runs only once on mount

    return (
        <>
            <div className='relative'>

                <div className={`fixed  w-full top-0 z-20 `}>
                    <Header DisplayTextBox={DisplayTextBox} setDisplayTextBox={setDisplayTextBox} Onfocus={Onfocus} Onblur={Onblur} bgColor={bgColor} />
                    {currentsearchlistTrimmed && ShowSuggessions && currentsearchlistTrimmed.map((c, index) => <SearchSuggestComp ref={menuref} key={index} single={c} />)}
                </div>
                {/* <div className={`fixed  w-full top-0 z-20 `}><Header Onfocus={Onfocus} Onblur={Onblur} bgColor={bgColor} />{currentsearchlistTrimmed && ShowSuggessions && currentsearchlistTrimmed.map((c, index) => <SearchSuggestComp key={index} single={c} />)}</div> */}
                {TrailerId?<img src={MovieInfo?.backdrop_path ? 'https://image.tmdb.org/t/p/original/' + MovieInfo?.backdrop_path : IMG_CONST + MovieInfo?.poster_path} className=' w-screen h-screen object-cover overflow-hidden opacity-80' />:<Skeleton height={1000} style={{ backgroundColor: 'lightgray' }} />}
                {TrailerId?<div className="absolute object-cover inset-0 bg-black opacity-60 h-screen"></div>:<Skeleton height={1000} style={{ backgroundColor: 'lightgray' }} />}

                {MovieInfo ? <div className='flex absolute left-20 top-28 '>



                    {TrailerId ? <div className='w-[350px]'>
                        <img src={IMG_CONST + MovieInfo?.poster_path} className=' object-cover h-[520px] rounded-lg' />
                    </div> : <div className='w-[350px]'><Skeleton height={520} /></div>}


                    <div className=' flex-1 items-left pl-8'>
                        {TrailerId ? <p className=' text-white font-sm text-3xl pb-2'>{MovieInfo?.title} {`(${MovieInfo?.release_date?.split('-')[0]})`}</p> : <Skeleton />}
                        {TrailerId ? <p className=' text-gray-400 italic mb-3 font-sm text-[20px]'>{MovieInfo?.tagline || "The fate is closer"}</p> : <Skeleton />}
                        {TrailerId ? <div className='text-white text-[13px] mb-2  flex'>{MovieInfo?.genres?.map((g) => {

                            return (
                                <div className='bg-red-600 px-1 rounded-md text-semibold mr-2' key={g.id} >
                                    {g.name}
                                </div>
                            );
                        })}</div> : <Skeleton />}


                        {TrailerId ? <div class="flex items-center">
                            {/* <svg class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg> */}
                            {/* <p class="ms-2 text-sm font-bold text-white dark:text-white">{MovieInfo.vote_average.toFixed(1)}</p> */}
                            {MovieInfo?.vote_average * 10 > 60 ?
                                <div className="radial-progress text-green-500" style={{ "--value": MovieInfo?.vote_average * 10, "--size": "4rem" }} role="progressbar">{MovieInfo?.vote_average?.toFixed(1)}</div> :
                                <div className="radial-progress text-yellow-400" style={{ "--value": MovieInfo?.vote_average * 10, "--size": "4rem" }} role="progressbar">{MovieInfo?.vote_average?.toFixed(1)}</div>

                            }
                            <div className=" ">

                                <div className="stat">
                                    {MovieInfo ? <div className="stat-title text-center text-white">Total Reviews</div> : <Skeleton width={70} />}
                                    {MovieInfo ? <div className="stat-value text-center text-white">{MovieInfo?.vote_count}</div> : <Skeleton />}

                                </div>

                            </div>
                            {/* <span class="w-1 h-1 mx-1.5 bg-white rounded-full dark:bg-gray-400"></span>
                            <a href="#" class="text-sm font-medium text-white underline hover:no-underline dark:text-white">{MovieInfo.vote_count} reviews</a> */}
                            <Link to='' onClick={() => {
                                setVideoId(TrailerId);
                                setShow(true);
                            }} className='cursor-pointer'><div className='flex items-center  '>

                                    <div>
                                        <Link to='' className="w-14 h-14 className='transform  bg-black rounded-full ring-2  ring-red-600 grid place-items-center hover:bg-slate-700 transition">

                                            <svg className="ml-1 w-4  " viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M15 7.26795C16.3333 8.03775 16.3333 9.96225 15 10.7321L3 17.6603C1.66667 18.4301 1.01267e-06 17.4678 1.07997e-06 15.9282L1.68565e-06 2.0718C1.75295e-06 0.532196 1.66667 -0.430054 3 0.339746L15 7.26795Z" fill="red" />
                                            </svg>
                                        </Link>
                                    </div><span className="text-3xl ml-2 text-white hover:text-red-600 font-semibold">
                                        Watch Trailer
                                    </span>
                                </div></Link>
                        </div> : <Skeleton height={90} />}

                        <div className=''>
                            {TrailerId ? <p className='  shadow-lg    text-white font-medium   text-2xl mb-1  '>Overview</p> : <Skeleton width={150} height={25} />}
                            {TrailerId ? <p className=' shadow-lg text-gray-300 font-medium   text-1xl  '>{MovieInfo?.overview}</p> : <Skeleton height={100} />}


                        </div>
                        {TrailerId ? <div className='flex mt-3 bg-blur   inset-0 bg-black bg-opacity-40 border-gray-400'>
                            <p className='text-gray-400 font-semibold italic flex-1   text-1xl'><span className='text-white font-semibold italic   text-1xl pr-2'>Status:</span  >{MovieInfo?.status}</p>
                            <p className='text-gray-400 font-semibold italic flex-1  text-1xl'><span className='text-white font-semibold italic   text-1xl pr-2'>Release Date:</span>{dayjs(MovieInfo?.release_date).format("MMM D, YYYY")}</p>
                            <p className='text-gray-400 font-semibold italic flex-1  text-1xl'><span className='text-white font-semibold italic   text-1xl pr-2'>Runtime:</span>{`${Math.floor(MovieInfo?.runtime / 60)}hrs ${MovieInfo?.runtime % 60}mins`}</p>
                        </div> : <Skeleton />}
                        {TrailerId ? <div className='flex mt-3 inset-0 bg-black bg-opacity-40 '>
                            <p className='text-gray-400 font-semibold italic flex-1   text-1xl'><span className='text-white font-semibold italic   text-1xl pr-2'>Director:</span  >{uniquedirectors?.map((e, i) => <span className='' key={e.id}>{e.name}{uniquedirectors?.length - 1 !== i && ", "}</span>)}</p>

                        </div> : <Skeleton />}
                        {TrailerId
                         ? <div className='flex mt-3 inset-0 bg-black bg-opacity-40'>
                            <p className='text-gray-400 font-semibold italic flex-1   text-1xl'><span className='text-white font-semibold italic   text-1xl pr-2'>Writer:</span  >{uniquewriters?.map((k, i) => <span className='pr-2' key={k.id}>{k.name}{uniquewriters?.length - 1 !== i && ", "}</span>)}</p>

                        </div> : <Skeleton width={800} />}


                    </div>




                </div> : <Skeleton />}
            </div>
            <div className='object-cover   '>
                {/* <img src={'https://image.tmdb.org/t/p/original/' + MovieInfo.backdrop_path} className=' w-screen h-screen object-cover overflow-hidden opacity-80' /> */}
                {/* <div className="absolute object-cover inset-0 bg-black opacity-81 h-[250vh]"></div> */}

                <p className=' ml-20   text-white pt-3 font-medium   text-2xl  '>Top cast</p>
                <div className='flex ml-20  top-14 '>
                    {slicedcast?.map((c) => {
                        return (<div key={c.cast_id} class="w-48    pt-4   shadow  ">

                            <div class="flex flex-col items-center   pb-3">
                                <LazyLoadImage effect='blur' class="w-40 h-40 mb-3 rounded-full shadow-lg object-cover" src={c?.profile_path ? 'https://image.tmdb.org/t/p/original/' + c.profile_path : avatar} alt="Bonnie image" />
                                <h5 class="mb-1 text-xl font-medium text-white dark:text-white">{c.name.length > 15 ? (c?.name?.slice(0, 15)) : (c.name)}</h5>
                                <h5 class="mb-1 text-[16px] font-medium text-gray-300 dark:text-white">{c.character.length > 25 ? (c?.character?.slice(0, 25)) : (c.character)}</h5>


                            </div>
                        </div>)
                    })}
                </div>





                <div className='flex flex-col mr-10 ml-20 '>
                    {/* official videeo section */}
                    {OffVideoList.length !== 0 && OffVideoList.length !== 1 && <> <p className='  text-white pt-5 font-medium   text-2xl  '>Official videos</p>
                        <div className=' w-full pt-4 flex flex-col justify-center m-auto'  >
                            <DetailCardsTwo OffVideoList={OffVideoList} setShow={setShow} setVideoId={setVideoId} />
                        </div></>}


                    {/* similar card section */}

                    {similarlist.length !== 0 && <p className='   text-white pt-5  font-medium   text-2xl  '>Similar movies</p>}
                    {similarlist.length !== 0 && <div className='    pt-4  flex-col ' >
                        <DetailCards incominglist={filteredsimilarlist} />
                    </div>

                    }
                    {/* Recommendations videeo section */}
                    {recomlist.length !== 0 &&
                        <p className='  text-white pt-5  font-medium   text-2xl  '>Recommendations</p>}
                    {recomlist.length !== 0 &&
                        <div className='w-full pt-4   flex-col ' >
                            <DetailCards incominglist={filteredrecomlist} />
                        </div>

                    }

                </div>


            </div>


            {show && videoId &&
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


            <Footer />


        </>
    )
}

export default MovieDetail
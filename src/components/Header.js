import React, { useCallback, useEffect, useState } from 'react'
import netflix_logo from '../assets/Netflix_Logo_PMS.png'

import HeaderDropdown from './HeaderDropdown';
import { useDispatch, useSelector } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import { addCachedResult, addCurrentSearchResult } from '../util_function/SearchCacheSlice';
import { Link, useNavigate } from 'react-router-dom';


const Header = ({ bgColor, Onfocus, setDisplayTextBox, DisplayTextBox }) => {
    const {username} = useSelector((store) => store.users)
    console.log(username)

    if (username && username.length > 8) {
        console.log(username)
        var trimmedUser = username.slice(0, 8)
    }
    const { nowPlayingMovies: movieList_np, PopularMovies, TopRatedMovies, UpcomingMovies } = useSelector(store => store.movies);
    const cachedResult = useSelector(store => store.searchResultsCached?.allcachedresults);
    //console.log(cachedResult)
    const dispatch = useDispatch()
    // const [DisplayTextBoxTemp, setDisplayTextBoxTemp] = useState(false)
    //const [DisplayTextBox, setDisplayTextBox] = useState(false)
    const [SearchInput, setSearchInput] = useState('')
    const [SearchResultList, setSearchResultList] = useState('')
    const navigate = useNavigate()



    if (movieList_np && PopularMovies && TopRatedMovies && UpcomingMovies) {
        var AllMovies = [...movieList_np, ...PopularMovies, ...TopRatedMovies, ...UpcomingMovies]
        //console.log(AllMovies)
    }
    //const movieList_np = useSelector(store => store.movies?.nowPlayingMovies);

    const SearchSuggestHandlefunc = (e) => setSearchInput(e.target.value)
    //console.log(SearchInput)

    // here i have done debouncing by placing the api/filter function inside set timeout and placing 
    //set timeout inside a useeffect with search text as dependancy 
    // i have also done caching the results of search text successfully made in a dedicated redux slice so that 
    // we dont need to do api call or query for same repeated search terms...

    useEffect(() => {

        console.log(SearchInput)
        const timer = setTimeout(() => debounceFilterFunc(), 100);

        return () => { clearTimeout(timer); }
    }, [SearchInput])




    const debounceFilterFunc = () => {
        //console.log(AllMovies,'AllMovies')
        if (!AllMovies) {

            return <nav className="  flex w-full items-center ">
                <div className='flex-[2] flex justify-center  '  ><img src={netflix_logo} className='w-[110px] h-[50px] ' alt='movies cover image' /></div>
                {!AllMovies ?
                    <ul className='flex flex-[12] text-[15px]   text-gray-200'>
                    </ul> : <Skeleton className='flex-[12]' />}


            </nav>
        }

        if (cachedResult[SearchInput] && SearchInput !== '') {
            setSearchResultList(cachedResult[SearchInput])
            dispatch(addCurrentSearchResult(cachedResult[SearchInput]))
        } else {

            const filteredMovies = AllMovies.filter(movie => movie.title.toLowerCase().includes(SearchInput.toLowerCase()));
            if (filteredMovies && SearchInput !== '') {


                setSearchResultList(filteredMovies)

                dispatch(addCurrentSearchResult(filteredMovies))

                dispatch(addCachedResult({ [SearchInput]: filteredMovies }))
                //console.log(filteredMovies,SearchInput)
            }
            else {
                dispatch(addCurrentSearchResult(null))
                setSearchResultList(null)


            }
        }
    }

    // if (!AllMovies){
    //     return <nav className="  flex w-full items-center ">
    //     <div className='flex-[2] flex justify-center  '  ><img src={netflix_logo} className='w-[110px] h-[50px] ' alt='movies cover image' /></div>
    //     {!AllMovies?
    //     <ul className='flex flex-[12] text-[15px]   text-gray-200'>
    //     </ul>:<Skeleton className='flex-[12]'/>}


    // </nav>
    // }





    const searchIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>;

    const bellIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6 mx-5 cursor-pointer">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
    </svg>;


    const searchBox =
        <form  className={`${DisplayTextBox ? ' transform translate-x-10 transition-transform visible ' : 'invisible'}`}>
            <label for="search" class="mb-2 text-sm font-medium text-white sr-only dark:text-white">Search</label>
            <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg class="w-4 h-4 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input type="search" id="search" onFocus={Onfocus} name='searchinput' onChange={SearchSuggestHandlefunc} value={SearchInput} class="  block w-full h-8 p-4 ps-10 text-sm text-gray-500 border border-white rounded-sm bg-black focus:ring-white focus:border-white dark:bg-gray-700 dark:border-white dark:placeholder-gray-400 dark:text-white dark:focus:ring-white dark:focus:border-white" placeholder="Titles,peoples,genres" required />


            </div>
        </form>;




    return (
        <>
            {AllMovies ? <nav className={`flex w-full items-center ${bgColor}`}  >
                <div className='flex-[2] flex justify-center   '  ><img src={netflix_logo} onClick={()=> navigate('/browse')} className=' cursor-pointer w-[110px] h-[50px] ' alt='movies cover image' /></div>
                {/* {movieList_np? */}
                {/* <div> */}
                <ul className='flex flex-[6] text-[15px]    text-gray-200'>
                    <li className='text-white font-semibold  justify-between' ><Link to=''>Home</Link></li>
                    <li className='pl-4 cursor-pointer hover:text-white'  ><Link to=''>TV Shows</Link></li>
                    <li className='pl-4 cursor-pointer hover:text-white'><Link to=''>Movies</Link></li>
                    <li className='pl-4 cursor-pointer hover:text-white'><Link to=''>New & Popular</Link></li>
                    <li className='pl-4 cursor-pointer hover:text-white'><Link to=''>My List</Link></li>
                    <li className='pl-4 cursor-pointer hover:text-white'><Link to=''>Browse by Languages</Link></li>
                </ul>
                <div className='flex-[6] flex justify-center items-center font-semibold '>
                    {searchBox}
                    {/* <div className='fixed'><div>2</div><div>3</div><div>4</div></div> */}
                    <button onClick={() => {
                        //setDisplayTextBoxTemp(!DisplayTextBoxTemp)
                        setDisplayTextBox(true)
                    }
                    } class="text-black ">{searchIcon}</button>
                    <span className='ml-5 pl-2 hover:text-gray-200  text-white text-[14px]'>{trimmedUser? trimmedUser:username || 'Children'}</span>
                    {bellIcon}

                    <HeaderDropdown />




                </div>
                {/* </div>:<Skeleton width={100}/>} */}



            </nav> : <nav className="  flex w-full items-center ">
                <div className='flex-[2] flex justify-center  '  ><img src={netflix_logo} className='w-[110px] h-[50px] ' alt='movies cover image' /></div>
                {!AllMovies ?
                    <ul className='flex flex-[12] text-[15px]   text-gray-200'>
                    </ul> : <Skeleton />}


            </nav>
            }
        </>
    )
}

export default Header
import React, { useEffect } from 'react'
import CardCompReusableSections from './CardCompReusableSections'
import { useSelector } from 'react-redux';
import TopTenCardsComponent from './TopTenCardsComponent';

const CardsComponent = () => {
  const movieList_np = useSelector(store => store.movies?.nowPlayingMovies);
  //console.log(movieList_np,'dwejfwjfwejfwjefwjf')
  const movieList_pop = useSelector(store => store.movies?.PopularMovies);
  //console.log(movieList_pop,'wwwwwwww')
  const movieList_tr = useSelector(store => store.movies?.TopRatedMovies);
  //console.log(movieList_tr,'qqqqqq')
  const movieList_up = useSelector(store => store.movies?.UpcomingMovies);
  //console.log(movieList_up,'qwewwq')
  
  if (movieList_np && movieList_pop && movieList_tr &&  movieList_up ){
    var topTenMovies = [...movieList_np.slice(14, 16),...movieList_pop.slice(11, 14),...movieList_tr.slice(4,7),...movieList_up.slice(10,12)]

  }

  //console.log(topTenMovies)
  return (
    <>
     <CardCompReusableSections list_of_movie = {movieList_np} heading='Recently Added Movies' />
     <TopTenCardsComponent list_of_movie = {topTenMovies} />
     <CardCompReusableSections list_of_movie = {movieList_up}  heading='Upcoming Movies'/>
  <CardCompReusableSections list_of_movie = {movieList_tr } heading='Top Rated Movies'/>
  <CardCompReusableSections list_of_movie = {movieList_pop} heading='Popular Movies' />
  
    
    </>
  )
}

export default CardsComponent
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNowTrailerVideo } from '../util_function/MovieSlice';
import { options } from '../static/freqaskqsObject';

const useFetchedTrailervideo = (movieId) => {
    const dispatch = useDispatch();
    //console.log('into useFetchedTrailervideo',movieId)
    const [TrailerId,setTrailerId]  = useState()
    
    // take a single movie it do an api call and get 20 videos for tthat movie
    // and just filter the trailer video for that movie from 20 video
    const getTrailerFromExernal = async (movieId) => {
        
        const BASE_URL = `https://api.themoviedb.org/3/movie/${movieId}/videos`;

        
    
        try {
            const response = await fetch(BASE_URL, options);
    
            const {id,results} = await response.json();

            const trailerFilter = results.filter(vid=> (vid.type =='Trailer'));
            console.log(trailerFilter)
            setTrailerId(results[0]?.key)
            console.log('fetched trailer',trailerFilter)
            dispatch(addNowTrailerVideo(trailerFilter))
        }
        catch (error) {
            console.error('fetch error', error)
    
        }
    }
    useEffect(() => {
        
        getTrailerFromExernal(movieId);
    
        
        
    
    }, [movieId])

    return TrailerId
  
}

export default useFetchedTrailervideo
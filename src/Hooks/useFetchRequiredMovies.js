
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies, addPopularMovies, addTopRatedMovies, addUpcomingMovies } from '../util_function/MovieSlice';
import { options } from '../static/freqaskqsObject';
import React from 'react'

const useFetchRequiredMovies = (category) => {
    //console.log('coming inside first hook',category)
    const[SingleMovie,setSingleMovie] = useState({})
    const[OffVideo,setOffVideo] = useState([])
    const[CastCrew,setCastCrew] = useState({})
    //const[Promis0 ,setPromis0] = useState(null)

    const[Recommendations,setRecommendations] = useState([])
    const[Similar,setSimilar] = useState([])

    const dispatch = useDispatch();
    const getMoviesFromExernal = async (category) => {
        console.log(category,'inside the fetch hooooook')
        const BASE_URL = `https://api.themoviedb.org/3/movie/${category}`
        //console.log(BASE_URL,'dwefwefwfw')
        
        try {
            console.log('ready to call',category)
            const response = await fetch(BASE_URL, options);
            //console.log(response)
            const data = await response.json();
            // console.log(data.results)
            if(category == 'now_playing') {dispatch(addNowPlayingMovies(data.results))
            //return data.results
            
            };
            if(category == 'popular') {dispatch(addPopularMovies(data.results))
               // return data.results
            };
            if(category == 'top_rated') {dispatch(addTopRatedMovies(data.results))
               // return data.results
            };
            if(category == 'upcoming') {dispatch(addUpcomingMovies(data.results))
              //  return data.results
            }
            if(category.includes('recommendations')) {
                // console.log(data)
                setRecommendations(data.results)
                return data
                
            }
            if(category.includes('similar')) {
                // console.log(data)
                setSimilar(data.results)
                return data
 
            }
            if(category.includes('credits')) {
                // console.log(data)
                setCastCrew(data)
                return data
    
            } 
            if(category.includes('videos')) {
                // console.log(data)
                setOffVideo(data)
                return data
    
            }
            else{
                //console.log('cAMEEEeeeeeeeeeeeeeeeeeeee',data)
                return data

            }
            
            //console.log('dispatched trailer')
        }
        catch (error) {
            //console.error('fetch error', error)
    
        }
    }
    useEffect(() => {
    
        
        if (['now_playing','popular','top_rated','upcoming'].includes(category)){
            console.log('call async from inside use effect')
            //const promise0 = getMoviesFromExernal(category);
            getMoviesFromExernal(category);
        //     setPromis0(promise0)
            
        }
        else if(category.includes('recommendations')) {
            const promis3 = getMoviesFromExernal(category);
            //console.log(promis1)
            //promis3.then((d) => setOffVideo(d.results))

            
        }  
        else if(category.includes('similar')) {
            const promis4 = getMoviesFromExernal(category);
            //console.log(promis1)
            //promis4.then((d) => setOffVideo(d.results))

            
        }  
        else if(category.includes('videos')) {
            const promis1 = getMoviesFromExernal(category);
            //console.log(promis1)
            promis1.then((d) => setOffVideo(d.results))

            
        }   
        else if(category.includes('credits')) {
            const promis2 = getMoviesFromExernal(category);
            //console.log('111111111111111111111111111111111')
            //console.log(CastCrew)
            //console.log(promis2)
            
            //promis2.then((d) => setCastCrew(d))
            
            
        } 
        
        else
        {
            const data = getMoviesFromExernal(category);
            //console.log('111111111111111111111111111111111',data)
            data.then((d) => setSingleMovie(d))
            
        }
    }
        
    
    , [category])

    // if (category.includes(['now_playing','popular','top_rated','upcoming'])){
    //     return Promis0
    // }
    if (category.includes('recommendations')){
        //console.log(OffVideo)
        return Recommendations

    }
    else if (category.includes('similar')){
        //console.log(OffVideo)
        return Similar

    }

    else if (category.includes('videos')){
        //console.log(OffVideo)
        return OffVideo

    }
    else if(category.includes('credits')) {
        //console.log(CastCrew)
        return CastCrew
    }
    else if (!['now_playing','popular','top_rated','upcoming'].includes(category)){
        console.log(SingleMovie,category)
        return SingleMovie
    }
    
             
}

export default useFetchRequiredMovies

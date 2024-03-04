//u can have any number of list , objects and individual data inside the big initial state
//can create a seperate reducer for managing  each and every list/obj/datas in a single slice...

import { createSlice } from '@reduxjs/toolkit';
const initialUserState = { nowPlayingMovies: null, TrailerVideo: null,PopularMovies:null,TopRatedMovies:null,
  UpcomingMovies:null}
const MovieSlice = createSlice({
  name: 'movies',
  initialState: initialUserState,
  reducers: {
    addNowPlayingMovies: (state, action) => { state.nowPlayingMovies = action.payload; },
    addPopularMovies: (state, action) => { state.PopularMovies = action.payload; },
    addTopRatedMovies: (state, action) => { state.TopRatedMovies = action.payload; },
    addUpcomingMovies: (state, action) => { state.UpcomingMovies = action.payload; },
    addNowTrailerVideo: (state, action) => { state.TrailerVideo = action.payload; }
    
  },
},
);
console.log('inside slice')
export const { addNowPlayingMovies, addNowTrailerVideo,addPopularMovies,addTopRatedMovies,addUpcomingMovies } = MovieSlice.actions;

export default MovieSlice.reducer;

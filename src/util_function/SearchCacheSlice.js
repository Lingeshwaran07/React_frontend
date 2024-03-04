//u can have any number of list , objects and individual data inside the big initial state
//can create a seperate reducer for managing  each and every list/obj/datas in a single slice...

import { createSlice } from '@reduxjs/toolkit';
const initialCache = {allcachedresults:{},currentsearchresult:null}
const SearchCacheSlice = createSlice({
  name: 'searchResultsCached',
  initialState: initialCache,
  reducers: {
    addCachedResult: (state, action) => {state.allcachedresults = {...state.allcachedresults,...action.payload}},
    addCurrentSearchResult: (state, action) => {state.currentsearchresult = action.payload}
    
    
  },
},
);
console.log('inside slice')
export const { addCachedResult , addCurrentSearchResult} = SearchCacheSlice.actions;

export default SearchCacheSlice.reducer;
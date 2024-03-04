//u can have any number of list , objects and individual data inside the big initial state
//can create a seperate reducer for managing  each and every list/obj/datas in a single slice...

import { createSlice } from '@reduxjs/toolkit';
const initialUserState = { VideoShowHandling:{}}
const VideoPopUpSlice = createSlice({
  name: 'videopopup',
  initialState: initialUserState,
  reducers: {
    addVideoShowHandling: (state, action) => { state.VideoShowHandling = action.payload }
    
  },
},
);
console.log('inside video show up slice')
export const { addVideoShowHandling } = VideoPopUpSlice.actions;

export default VideoPopUpSlice.reducer;

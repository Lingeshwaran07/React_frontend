import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import movieReducer from './MovieSlice'
import searchCacheReducer from './SearchCacheSlice'
import videoReducer from './VideoPopUpSlice'
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // or another storage engine
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['users'],
  // Add additional configuration options as needed
};

// const rootReducer = combineReducers({
//   users: userReducer,
//   // Add other slices as needed
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);
const persistedReducer = persistReducer(persistConfig, userReducer);

const Reduxstore = configureStore({
    reducer: {
        users:persistedReducer,
        movies:movieReducer,
        searchResultsCached:searchCacheReducer,
        videopopup:videoReducer
        
    },
  }) 

  const persistor = persistStore(Reduxstore);

export {persistor };

export default Reduxstore

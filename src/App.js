import RootComponent from "./components/RootComponent";
import Reduxstore from './util_function/reduxStore';
import {Provider} from 'react-redux';
import 'react-loading-skeleton/dist/skeleton.css'
import { PersistGate } from "redux-persist/integration/react";
import {persistor} from './util_function/reduxStore';


function App() {
  return (
    <div ClassName="App">
      <Provider store={Reduxstore}>
      <PersistGate loading={null} persistor={persistor}>

        <RootComponent />
        </PersistGate>
        </Provider>

    </div>
  );
}

export default App;

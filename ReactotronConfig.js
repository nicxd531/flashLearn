// ReactotronConfig.js
import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux'; // If you are using Redux
import AsyncStorage from '@react-native-async-storage/async-storage'; // If you are using AsyncStorage

Reactotron
  .setAsyncStorageHandler(AsyncStorage) // If you are using AsyncStorage
  .configure({ name: 'React Native Demo' }) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .use(reactotronRedux()) // if you are using Redux
  .connect(); // let's connect!

// Clear Reactotron on every time we load the app
Reactotron.clear();

console.tron = Reactotron; // Optional: Add a console.tron for easier logging

export default Reactotron;
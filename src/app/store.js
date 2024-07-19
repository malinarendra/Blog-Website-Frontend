import { combineReducers, configureStore } from "@reduxjs/toolkit";
import user from "../feature/user"

// Function to load state from localStorage
const loadStateFromLocalStorage = () => {
    try {
      const serializedState = localStorage.getItem('loginObj');
      if (serializedState === null) {
        return {
            login:false,
            data:{}
        }
      }
      return JSON.parse(serializedState); // Parse JSON string to an object
    } catch (e) {
      console.error("Could not load state from localStorage", e);
      return undefined;
    }
  };

const rootReducer = combineReducers({
    user: user
})

const store = configureStore({
    reducer: rootReducer,
    preloadedState:{
        user:loadStateFromLocalStorage()
    }
})

export default store;
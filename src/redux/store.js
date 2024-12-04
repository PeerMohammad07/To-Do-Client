import { configureStore } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import userSlice from "./userSlice"

const persistConfigUser = {
  key: "user",
  storage,
};


const persistedUserReducer = persistReducer(persistConfigUser, userSlice);

const store = configureStore({
  reducer : {
    user : persistedUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
  }),
})

export const persistor = persistStore(store);
export default store
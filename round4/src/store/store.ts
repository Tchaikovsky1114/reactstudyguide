import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { userSignReducer } from "./userSlice";


export const store = configureStore({
  reducer: {
    user: userSignReducer,
    create: userSignReducer
    
  }
})

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch;

export const useUserSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>();
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { TypedUseSelectorHook } from "react-redux";
import {editorReducer, insertEditor} from './slice/EditorSlice'





export const store = configureStore({
  reducer: {
   editor:editorReducer
  }
})

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export const useEditorSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>();



store.dispatch(
  insertEditor({
    id:null
  })
)
store.dispatch(
  insertEditor({
    id:null
  })
)

console.log(store.getState());
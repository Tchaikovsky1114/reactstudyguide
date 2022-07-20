import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DeleteEditorAction, InsertEditorAction, MoveEditorAction, UpdateEditorAction } from "../actions";

export interface Editor {
  id: string;
  content: string;
}

interface InitialStateType {
  order: string[],
  data: {
    [key:string]: Editor
  }
}

const initialState:InitialStateType = {
  order: [],
  data: {}
}

const editorSlice = createSlice({
  name:'editor',
  initialState,
  reducers: {
    updateEditor(state:InitialStateType,action:PayloadAction<UpdateEditorAction>){
      const {id, content} = action.payload;
      state.data[id].content = content;
    },
    deleteEditor(state:InitialStateType,action:PayloadAction<DeleteEditorAction>){
      const {id} = action.payload
      delete state.data[id]
      state.order = state.order.filter((oid) => oid !== id)
    },
    moveEditor(state:InitialStateType,action:PayloadAction<MoveEditorAction>){
      const {direction,id} = action.payload;
      const index = state.order.findIndex((oid) => oid === id)
      const targetIndex = direction === 'up' ? index - 1 : index + 1;

      if(targetIndex < 0 || targetIndex > state.order.length - 1) {
        return
      }
      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = id
    },
    insertEditor(state:InitialStateType,action:PayloadAction<InsertEditorAction>){
      const {id} = action.payload
      const editorObj:Editor = {
        id: createRandomId(),
        content: ''
      }
      state.data[editorObj.id] = editorObj

      const index = state.order.findIndex((oid) => oid === id)
      if(index < 0){
        state.order.unshift(editorObj.id);
      }else{
        state.order.splice(index + 1, 0, editorObj.id)
      }
    }
  }
})


const createRandomId = () => {
  return Math.random().toString(36).substring(2,10)
}


export const editorReducer = editorSlice.reducer;
export const {updateEditor,deleteEditor,insertEditor,moveEditor} = editorSlice.actions;

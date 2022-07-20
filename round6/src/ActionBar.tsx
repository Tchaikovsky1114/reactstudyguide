import React from 'react';
import { deleteEditor, moveEditor } from './store/slice/EditorSlice';
import { useAppDispatch } from './store/store';

interface ActionBarProps {
  id: string
  bgColor?:string
}

const ActionBar = ({id,bgColor}:ActionBarProps) => {

  const dispatch = useAppDispatch()

  const editorMoveUpHandler = () => {
    dispatch(moveEditor({
      id,
      direction:'up'
    }))
  }

  const editorMoveDownHandler = () => {
    dispatch(moveEditor({
      id,
      direction:'down'
    }))
  }
  
  const editorDeleteHandler = () => {
    dispatch(deleteEditor({
      id
    }))
  }

  return (
    <div className={`absolute top-0 right-0 z-20 ${bgColor} rounded-bl-lg opacity-50 hover:opacity-90 transition-all duration-200`}>
      
      <button className="bg-orange-400 hover:bg-orange-500 text-white font-bold px-1 py-1 text-sm" onClick={editorMoveUpHandler}>
        <span className='icon'><i className='fas fa-arrow-up fa-2xs p-2' ></i></span>
      </button>
      <button className="bg-orange-400 hover:bg-orange-500 text-white font-bold px-1 py-1 text-sm" onClick={editorMoveDownHandler}>
      <span className='icon'><i className='fas fa-arrow-down fa-2xs  p-2' ></i></span>
      </button>
      <button className="bg-orange-400 hover:bg-orange-500 text-white font-bold px-1 py-1 text-sm" onClick={editorDeleteHandler}>
      <span className='icon'><i className='fas fa-trash fa-2xs  p-2' ></i></span>
      </button>
      
    </div>
  );
};

export default ActionBar;
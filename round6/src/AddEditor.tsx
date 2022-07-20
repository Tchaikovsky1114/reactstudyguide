import React from 'react';
import { insertEditor } from './store/slice/EditorSlice';
import { useAppDispatch } from './store/store';


interface AddEditorProps {
  isVisible?:boolean
  id:string | null
}

const AddEditor = ({isVisible,id}:AddEditorProps) => {
  const dispatch = useAppDispatch()
  const addEditorHandler = () => {
    dispatch(insertEditor({
      id
    }))
  }
  return (
    <div className={`relative flex justify-center items-start h-full hover:opacity-100 transition-opacity duration-300 ease-in my-2
    ${isVisible ? 'opacity-100' : 'opacity-0'}
    `}>
      <button className='bg-orange-400 hover:bg-orange-500 text-white font-bold px-4 py-1 rounded-full flex flex-row justify-center items-center' onClick={addEditorHandler}><i className="pr-2 fa-solid fa-plus fa-2xs" /><span className='text-xs'>Editor</span></button>
      <div className=' absolute top-1/2 bottom-1/2 left-[2.5%] right-[2.5%] border-b border-gray-500 -z-10'></div>
    </div>
  );
};

export default AddEditor;
import React, { useEffect, useRef, useState } from 'react';
import MDEditor, { commands } from '@uiw/react-md-editor';
import { Editor, updateEditor } from './store/slice/EditorSlice';
import { useAppDispatch } from './store/store';



interface TextEditorProps {
  editor: Editor
}

const TextEditor = ({editor}:TextEditorProps) => {

  const dispatch = useAppDispatch()
  
  const editorRef = useRef<HTMLDivElement>(null)
  const [isEditing, setIsEditing] = useState(false);
  const valueHandler = (value: string | undefined) => {
    if (value) {
      dispatch(updateEditor({
        id:editor.id,
        content:value
      }))
    }
  };

  const editingHandler = () => { 
    setIsEditing(prev => !prev)
  }

  useEffect(() => {
    const eventListener = (e:MouseEvent) => {
      if(e.currentTarget && editorRef.current?.contains(e.target as Node)){
        return
      }else{
        setIsEditing(false)
      }
    }
    window.addEventListener('click',eventListener,true)

    return () => {
      window.removeEventListener('click',eventListener,true)
    }
  },[])

  if (isEditing) {
    return (
      <div ref={editorRef}>
        <MDEditor value={editor.content || 'Hello React-Maestro'} onChange={valueHandler} />
      </div>
    );
  } else {
    return (
      <div onClick={editingHandler}>
        <MDEditor.Markdown source={editor.content || 'Hello React-Maestro'} />
      </div>
    );
  }
};

export default TextEditor;
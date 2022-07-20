import React, { Fragment } from 'react';
import ActionBar from './ActionBar';
import AddEditor from './AddEditor';
import { useEditorSelector } from './store/store';
import TextEditor from './TextEditor';

const EditorList = () => {
  const { order, data } = useEditorSelector((state) => state.editor);

  const editorlist = order.map((oid) => data[oid]);

  return (
    <div className="m-10 p-4">
      {editorlist.map((editor) => (
        <Fragment key={editor.id}>
          <div
            className="relative h-7 bg-slate-700 border border-slate-400"
            key={editor.id}
          >
            <ActionBar id={editor.id} />
          </div>

          <TextEditor editor={editor} />
          <AddEditor id={editor.id} />
        </Fragment>
      ))}
      <AddEditor id={null} isVisible={editorlist.length === 0} />
    </div>
  );
};

export default EditorList;

import { Editor } from 'react-draft-wysiwyg';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import React, {Component, useEffect, useState} from 'react';
import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html';
import { useFormikContext } from 'formik';
import './editor.css';
const HTMLInputField = ({ field }) => {
  const { setFieldValue } = useFormikContext();
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  const onEditorStateChange = editorState => {
    setFieldValue(
      field.name,
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    );
    setEditorState(editorState)
  };
    useEffect(() => {
        if (field.value) {
            setEditorState(EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(field.value))))
        }
    });
  return (
    <Editor
        editorState={editorState}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="editorClassName"
      onEditorStateChange={onEditorStateChange}
      placeholder="Enter your body here..."
      toolbarStyle={{
        // backgroundColor: 'rgb(23, 25, 35)',
        color: 'black',
        width: '100%',
        height: '8rem',
        border: '0.05rem solid white',
        borderRadius: '1rem',
        marginBottom: '1rem',
      }}
      editorStyle={{
        border: '0.05rem solid white',
        borderRadius: '1rem',
        marginBottom: '2rem',
        textAlign: 'center',
        maxHeight: '300px',
        padding: '1rem',
        letterSpacing: '0.1rem',
        maxWidth: '100%',
        overflow: 'auto',
      }}
    />
  );
};

export default HTMLInputField;

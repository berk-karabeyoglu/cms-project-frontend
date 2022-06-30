import { Editor } from 'react-draft-wysiwyg';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import React, { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { useFormikContext } from 'formik';
import './editor.css';
const HTMLInputField = ({ field }) => {
  const { setFieldValue } = useFormikContext();

  const onEditorStateChange = editorState => {
    setFieldValue(
      field.name,
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    );
  };

  const { editorState } = '';
  // console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));

  return (
      <Editor
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={onEditorStateChange}
        placeholder="Enter your body here..."
        toolbarStyle={{
          backgroundColor: 'white',
          color: 'black',
          width: '100%',
          height: '8rem',
          borderBlock: '0.15rem solid white',
          borderRadius: '1rem',
          marginBottom: '1rem',
        }}
        editorStyle={{
          backgroundColor: '',
          borderBlock: '0.15rem solid white',
          borderRadius: '1rem',
          marginBottom: '2rem',
          textAlign: 'center',
          maxHeight: '800px',
          padding: '1rem',
          letterSpacing: '0.1rem',
          maxWidth: '100%',
        }}
      />

  );
};

export default HTMLInputField;

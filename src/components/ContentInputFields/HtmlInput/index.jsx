import { Editor } from 'react-draft-wysiwyg';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import React, { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { useFormikContext } from 'formik';
const HTMLInputField = ({ field }) => {
  const { setFieldValue } = useFormikContext();

  const onEditorStateChange = editorState => {
    setFieldValue(
      field.name,
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    );
    console.log(editorState);
  };

  const { editorState } = '';
  // console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));

  return (
    <div>
      <Editor
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={onEditorStateChange}
        placeholder="Enter your body here..."
        toolbarStyle={{
          backgroundColor: 'rgb(23, 25, 35)',
          color: 'black',
          width: '100%',
          height: '8rem',
          borderBlock: '0.15rem solid white',
          borderRadius: '1rem',
          marginBottom: '1rem',
        }}
        editorStyle={{
          backgroundColor: '',
          color: 'white',
          borderBlock: '0.15rem solid white',
          borderRadius: '1rem',
          marginBottom: '2rem',
          textAlign: 'center',
          height: 'auto',
          maxHeight: '600px',
          overflow: 'auto',
          padding: '1rem',
          letterSpacing: '0.1rem',
          maxWidth: '100%',
        }}
      />
      {/* <textarea
        style={{ width: '100%' }}
        value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
      ></textarea> */}
    </div>
  );
};

export default HTMLInputField;

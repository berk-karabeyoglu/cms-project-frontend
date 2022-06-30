import { Editor } from 'react-draft-wysiwyg';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import React, { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
export default class HTMLInputField extends Component {
  state = {
    editorState: EditorState.createEmpty(),
    field: '',
  };

  onEditorStateChange = editorState => {
    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;
    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));

    return (
      <div>
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={this.onEditorStateChange}
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
            maxWidth: '28.5rem',
          }}
        />
        <textarea
          {...this.state.field}
          style={{ width: '100%' }}
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        ></textarea>
      </div>
    );
  }
}

import { Editor } from 'react-draft-wysiwyg';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import React from 'react';
import { Flex } from '@chakra-ui/react';
const HTMLInputField = () => {
  return (
    <Flex>
      <Editor
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
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
        wrapperStyle={{}}
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
    </Flex>
  );
};

export default HTMLInputField;

import { Field, useFormikContext } from 'formik';

const { useState } = require('react');

const FileInputField = ({ field, maximumFieldAmount }) => {
  const [files, setFiles] = useState([]);
  const { setFieldValue } = useFormikContext();
  const [filename, setFileName] = useState('');
  const [selectedFile, setSelectedFile] = useState('');

  const onChangeHandler = event => {
    setFiles({
      selectedFile: event.target.files[0],
      loaded: 0,
    });
  };

  // eslint-disable-next-line no-lone-blocks
  {
    if (maximumFieldAmount === 1) {
      return (
        <label className="custom-file-upload">
          <input
            type="file"
            value={selectedFile}
            accept=".pdf,.jpg,.png"
            onChange={onChangeHandler}
          />
        </label>
      );
    } else {
      return (
        <label className="custom-file-upload">
          <input type="file" accept=".pdf,.jpg,.png" multiple />
        </label>
      );
    }
  }
};

export default FileInputField;

import { Field, useFormikContext } from 'formik';

const { useState } = require('react');

const FileInputField = ({ field, maximumFieldAmount }) => {
  const [files, setFiles] = useState([]);
  const { setFieldValue } = useFormikContext();
  const [filename, setFileName] = useState('');
  const onChange = e => {
    var files = '';
    var filesArr = [];
    if (filesArr.length < 2) {
      files = e.target.files;
      filesArr = Array.prototype.slice.call(files);
      setFiles([...files, ...filesArr]);
      setFieldValue(field.name, filesArr);
      setFileName(filesArr[0].name);
      return files;
    } else {
      alert('You have to stop');
      return;
    }
  };
  // eslint-disable-next-line no-lone-blocks
  {
    if (maximumFieldAmount === 1) {
      return (
        <label className="custom-file-upload">
          <input
            {...field}
            type="file"
            value=''
            accept=".pdf,.jpg,.png"
            onChange={onChange}
          />
        </label>
      );
    } else {
      return (
        <label className="custom-file-upload">
          <input
            {...field}
            type="file"
            value=""
            accept=".pdf,.jpg,.png"
            multiple
            onChange={onChange}
          />
        </label>
      );
    }
  }
};

export default FileInputField;

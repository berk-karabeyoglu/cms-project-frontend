const { useState } = require('react');

const FileInputField = ({ maximumFieldAmount }) => {
  const [files, setFiles] = useState([]);
  const onChange = e => {
    var files = '';
    var filesArr = [];
    if (filesArr.length < 2) {
      files = e.target.files;
      console.log(files);
      filesArr = Array.prototype.slice.call(files);
      console.log(filesArr);
      setFiles([...files, ...filesArr]);
    } else {
      alert('You have to stop');
      return;
    }
  };
  // eslint-disable-next-line no-lone-blocks
  {
    console.log("maximum:" , maximumFieldAmount)
    if (maximumFieldAmount === 1) {
    console.log("===1 e girdi")
      return (
        <label className="custom-file-upload">
          <input type="file" accept=".pdf,.jpg,.png" onChange={onChange} />
        </label>
      );
    } else {
        console.log("multiple kismina girdi")
      return (
        <label className="custom-file-upload">
          <input type="file" accept=".pdf,.jpg,.png" multiple onChange={onChange} />
        </label>
      );
    }
  }
};

export default FileInputField;

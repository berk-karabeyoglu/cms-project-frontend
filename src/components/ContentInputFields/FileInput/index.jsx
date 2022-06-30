import { useFormikContext } from 'formik';
const FileInputField = ({ field, maximumFieldAmount }) => {
  const { setFieldValue } = useFormikContext();
  const onChangeHandler = event => {
    setFieldValue(field.name, event.currentTarget.files[0]);
  };

  // eslint-disable-next-line no-lone-blocks
  {
    if (maximumFieldAmount === 1) {
      return (
        <label className="custom-file-upload">
          <input {...field} id="file" type="file" onChange={onChangeHandler} />
        </label>
      );
    } else {
      return (
        <label className="custom-file-upload">
          <input id="file" type="file" onChange={onChangeHandler} />
        </label>
      );
    }
  }
};

export default FileInputField;

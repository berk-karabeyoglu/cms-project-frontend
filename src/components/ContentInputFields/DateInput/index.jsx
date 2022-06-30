import { useFormikContext } from 'formik';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
const TimestampInputField = ({ field }) => {
  const [startDate, setStartDate] = useState(new Date());
  const { setFieldValue } = useFormikContext();
  function updateDate(newDate) {
    let formattedDate = newDate.toLocaleDateString('tr-TR');
    formattedDate = formattedDate.replace(/\./g, '-');
    setFieldValue(field.name, formattedDate);
    setStartDate(newDate);
  }
  return (
    <DatePicker
      {...field}
      dateFormat="dd-MM-yyyy"
      selected={startDate}
      onChange={date => updateDate(date)}
      isClearable
      placeholderText="I have been cleared!"
    />
  );
};

export default TimestampInputField;

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
const TimestampInputField = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      dateFormat="dd-MM-yyyy"
      selected={startDate}
      onChange={date => setStartDate(date)}
      isClearable
      placeholderText="I have been cleared!"
    />
  );
};

export default TimestampInputField;

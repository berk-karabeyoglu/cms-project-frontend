import React, { useEffect, useState } from 'react';
import Navigation from './navigation';
import { Paginated } from './table';
import { COLUMNS } from './columnData';
import axios from 'axios';
import { API } from '../../constants/constants';

const ContentType = () => {
  const [dataIncome, setDataIncome] = useState([]);
  useEffect(() => {
    axios
      .get(API.API_URL + '/content-types', {
        headers: {
          Authorization:
            'Bearer ' + JSON.parse(localStorage.getItem('access_token')).token,
        },
      })
      .then(response => setDataIncome(response.data.data));
  }, []);

  return (
    <>
      <Navigation />
      <Paginated data={dataIncome} columns={COLUMNS} />
    </>
  );
};

export default ContentType;

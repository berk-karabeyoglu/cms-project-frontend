import React, { useEffect, useState } from 'react';
import Navigation from './navigation';
import { Paginated } from './table';
import { COLUMNS } from './columnData';
import editPageUtils from '../../utils/editPageUtils';
import If from '../../components/If';
const ContentType = () => {
  const [dataIncome, setDataIncome] = useState([]);

  const fetchData = filter => {
    console.log('FİLTER:', filter);
    editPageUtils.getAllContentTypes(onSuccessResult => {
      setDataIncome(onSuccessResult);
    });
  };

  // We are getting all content types when content types page load
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navigation onRefetchData={fetchData} />
      <If test={dataIncome}>
        <Paginated data={dataIncome} columns={COLUMNS} />
      </If>
    </>
  );
};

export default ContentType;

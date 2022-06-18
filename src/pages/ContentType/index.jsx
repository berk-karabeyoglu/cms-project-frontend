import React, { useEffect, useState } from 'react';
import Navigation from './navigation';
import { Paginated } from './table';
import { COLUMNS } from './columnData';
import editPageUtils from '../../utils/editPageUtils';
import If from '../../components/If';
const ContentType = () => {
  const [dataIncome, setDataIncome] = useState([]);

  // We are getting all content types when content types page load
  useEffect(() => {
    editPageUtils.getAllContentTypes(onSuccessResult => {
      setDataIncome(onSuccessResult);
    });
  }, []);

  return (
    <>
      <Navigation />
      <If test={dataIncome}>
        <Paginated data={dataIncome} columns={COLUMNS} />
      </If>
    </>
  );
};

export default ContentType;

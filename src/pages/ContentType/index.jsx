import React from 'react';
import Navigation from './navigation';
import { Paginated } from './table';
import data from './data';
import { COLUMNS } from './columnData';

const ContentType = () => {
  return (
    <>
      <Navigation />
      <Paginated data={data} columns={COLUMNS} />
    </>
  );
};

export default ContentType;
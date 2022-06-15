import React from 'react';
import { Paginated } from './table';
import data from './data';
import { COLUMNS } from './columnData';

const Content = () => {
  return <Paginated data={data} columns={COLUMNS} />;
};

export default Content;

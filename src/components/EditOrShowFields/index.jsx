import React from 'react';
import { useState } from 'react';
import If from '../../If';
import StringField from '../String';
import IntegerField from '../Integer';
import DecimalField from '../Decimal';
import FloatField from '../Float';
import BooleanField from '../Boolean';
import DateField from '../Date';
import FileField from '../File';
import { TableForFields } from '../../pages/Edit/tableForFields';

const EditOrShowFields = (props) => {
  const [selectedFieldType, setSelectedFieldType] = useState();
  const FIELD_TYPES = {
    string: (
      <StringField
        onClose={() => setSelectedFieldType(undefined)}
        reFetchFieldsData={props.reFetchFieldsData}
      />
    ),
    decimal: (
      <DecimalField
        onClose={() => {
          setSelectedFieldType(undefined);
        }}
        reFetchFieldsData={props.reFetchFieldsData}
      />
    ),
    boolean: (
      <BooleanField
        onClose={() => {
          setSelectedFieldType(undefined);
        }}
        reFetchFieldsData={props.reFetchFieldsData}
      />
    ),
    float: (
      <FloatField
        onClose={() => {
          setSelectedFieldType(undefined);
        }}
        reFetchFieldsData={props.reFetchFieldsData}
      />
    ),
    integer: (
      <IntegerField
        onClose={() => {
          setSelectedFieldType(undefined);
        }}
        reFetchFieldsData={props.reFetchFieldsData}
      />
    ),
    dateField: (
      <DateField
        onClose={() => {
          setSelectedFieldType(undefined);
        }}
        reFetchFieldsData={props.reFetchFieldsData}
      />
    ),
    fileField: (
      <FileField
        onClose={() => {
          setSelectedFieldType(undefined);
        }}
        reFetchFieldsData={props.reFetchFieldsData}
      />
    ),
  };

  return (
    <>
      <If test={!selectedFieldType}>
        <TableForFields columns={props.columns} data={props.data}></TableForFields>
      </If>
      <If test={!!selectedFieldType}>{FIELD_TYPES[selectedFieldType]}</If>
    </>
  );
};

export default EditOrShowFields;

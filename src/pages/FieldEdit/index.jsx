import { Flex, Spinner } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useState } from 'react';
import contentPageUtils from '../../utils/contentPageUtils';
import StringUpdateField from '../../components/FieldForUpdates/String';
import IntegerUpdateField from '../../components/FieldForUpdates/Integer';
import DecimalUpdateField from '../../components/FieldForUpdates/Decimal';
import FloatUpdateField from '../../components/FieldForUpdates/Float';
import DateUpdateField from '../../components/FieldForUpdates/Date';
import FileUpdateField from '../../components/FieldForUpdates/File';
import BooleanUpdateField from '../../components/FieldForUpdates/Boolean';

const FieldEdit = () => {
  const [selectedTypeID, setSelectedTypeID] = useState();
  const [fieldName, setFieldName] = useState();
  const [selectedFieldId, setSelectedFieldID] = useState();
  const [contentTypeFields, setContentTypeFields] = useState([]);
  const [checker, setChecker] = useState(false);
  const [fieldObj, setFieldObj] = useState({});
  const [sendingFieldsObject, setSendingFieldsObject] = useState({});
  const FIELD_TYPES = {
    string: <StringUpdateField fieldObj={sendingFieldsObject} />,
    decimal: <DecimalUpdateField fieldObj={sendingFieldsObject} />,
    boolean: <BooleanUpdateField fieldObj={sendingFieldsObject} />,
    float: <FloatUpdateField />,
    integer: <IntegerUpdateField />,
    dateField: <DateUpdateField />,
    fileField: <FileUpdateField />,
  };

  useEffect(() => {
    const splittedArray = window.location.pathname.split('/');
    const contentTypeID = splittedArray[4];
    const fieldID = splittedArray[splittedArray.length - 1];
    setSelectedTypeID(contentTypeID);
    setSelectedFieldID(fieldID);
    if (selectedTypeID !== undefined) {
      contentPageUtils.getContentTypeFields(selectedTypeID, incomingData => {
        setContentTypeFields(incomingData);
        setChecker(true);
      });
    }
    if (checker) {
      console.log('APIDEN GELEN FİELDLAR : ', contentTypeFields.data);
      contentTypeFields.data?.map(field => {
        if (field.id == selectedFieldId) {
          setFieldName(field.type);
          setFieldObj({
            label: field.label,
            column_name: field.column_name,
            description: field.description,
            is_required: field.is_required,
          });
          const fieldMetasObject = {};
          Object.entries(field.meta).map(item => {
            fieldMetasObject[item[0]] = item[1];
          });
          var sendingObject = Object.assign({},fieldObj,fieldMetasObject)
          setSendingFieldsObject(sendingObject);
          console.log('Spreadle birlestirilen: ', sendingObject);
          console.log('Props olarak gecilen: !', sendingFieldsObject);
        }
      });
    }
  }, [selectedTypeID, fieldName, checker]);

  return (
    <>
      <Flex
        alignItems="center"
        height="8rem"
        w="100%"
        wrap={'wrap'}
        h={'auto'}
        direction={'row'}
        p={6}
        justifyContent={'space-around'}
        bgColor="whiteAlpha.900"
      >
        {fieldName !== undefined ? FIELD_TYPES[fieldName] : <Spinner />}
      </Flex>
    </>
  );
};

export default FieldEdit;

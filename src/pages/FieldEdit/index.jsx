import { Flex, Spinner } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useState } from 'react';
import BooleanField from '../../components/Fields/Boolean';
import DateField from '../../components/Fields/Date';
import DecimalField from '../../components/Fields/Decimal';
import FileField from '../../components/Fields/File';
import FloatField from '../../components/Fields/Float';
import IntegerField from '../../components/Fields/Integer';
import StringField from '../../components/Fields/String';
import contentPageUtils from '../../utils/contentPageUtils';
import If from '../../components/If';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
  NumberInput,
  NumberInputField,
  Switch,
  Button,
  Heading,
  useToast,
  Text,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';

const FieldEdit = () => {
  const [selectedTypeID, setSelectedTypeID] = useState();
  const [fieldName, setFieldName] = useState();
  const [selectedFieldId, setSelectedFieldID] = useState();
  const [contentTypeFields, setContentTypeFields] = useState([]);
  const [checker, setChecker] = useState(false);
  const fieldObj = {};
  const FIELD_TYPES = {
    string: <StringField fieldMetas={fieldObj}/>,
    decimal: <DecimalField />,
    boolean: <BooleanField />,
    float: <FloatField />,
    integer: <IntegerField />,
    dateField: <DateField />,
    fileField: <FileField />,
  };

  useEffect(() => {
    const splittedArray = window.location.pathname.split('/');
    const contentTypeID = splittedArray[4];
    const fieldID = splittedArray[splittedArray.length - 1];
    setSelectedTypeID(contentTypeID);
    setSelectedFieldID(fieldID);
    if (selectedTypeID !== undefined) {
      contentPageUtils.getContentTypeFields(selectedTypeID, incomingData => {
        console.log(incomingData);
        setContentTypeFields(incomingData);
        setChecker(true);
      });
    }
    if (checker) {
      contentTypeFields.data?.map(field => {
        if (field.id == selectedFieldId) {
          setFieldName(field.type);
          fieldObj['label'] = field.label;
          fieldObj['colum_name'] = field.column_name;
          fieldObj['description'] = field.description;
          fieldObj['is_required'] = field.is_required;
        }
      });
    }
  }, [selectedTypeID, fieldName, checker]);

  const nameInputHandleOnBlur = (e, field) => {
    field(e);
  };
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
        {fieldName !== undefined ? (
          FIELD_TYPES[fieldName]
        ) : (
          // <Formik initialValues={{}} onSubmit={values => {}}>
          //   {props => (
          //     <Form>
          //       <Heading as={'h4'} size="md" mb={6}>
          //         Update Field
          //       </Heading>
          //       <Flex
          //         wrap={'wrap'}
          //         minW={'250px'}
          //         justifyContent={'space-evenly'}
          //       >
          //         <Field name="">
          //           {({ field, form }) => (
          //             <FormControl
          //               w={'40%'}
          //               minW={'250px'}
          //               isInvalid={form.errors.name && form.touched.name}
          //               mb={5}
          //             >
          //               <FormLabel htmlFor="">
          //                 <Flex>
          //                   <Text color="red">*</Text>Name
          //                 </Flex>
          //               </FormLabel>
          //               <Input
          //                 {...field}
          //                 size="md"
          //                 id=""
          //                 type=""
          //                 onBlur={e => nameInputHandleOnBlur(e, field.onBlur)}
          //               />
          //               <FormErrorMessage>{form.errors.name}</FormErrorMessage>
          //             </FormControl>
          //           )}
          //         </Field>
          //       </Flex>
          //     </Form>
          //   )}
          // </Formik>
          <Spinner />
        )}
      </Flex>
    </>
  );
};

export default FieldEdit;

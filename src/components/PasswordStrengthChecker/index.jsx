import React from 'react';
import { Text, VStack } from '@chakra-ui/react';
import If from '../If';
import validations from '../../validations/AuthValidations/loginValidation';
import { PASSWORD_VALIDATION_CRITERIAS } from '../../constants/constants';
const PasswordStrengthChecker = ({ password, isVisible }) => {
  const prepareTexts = () => {
    return Object.keys(PASSWORD_VALIDATION_CRITERIAS).map(_key => (
      <Text
        key={_key}
        fontSize=".85rem"
        fontWeight="semibold"
        color={
          validations
            .strengthPasswordChecker(password)
            .includes(PASSWORD_VALIDATION_CRITERIAS[_key])
            ? 'red.500'
            : 'green.500'
        }
      >
        {PASSWORD_VALIDATION_CRITERIAS[_key]}
      </Text>
    ));
  };
  return (
    <If test={isVisible}>
      <VStack ml="2" alignItems="start" gap="0.3rem">
        <Text fontSize=".85rem" fontWeight="semibold" color="gray.500">
          Your password:
        </Text>
        {prepareTexts()}
      </VStack>
    </If>
  );
};

export default PasswordStrengthChecker;

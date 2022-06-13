import { Box, Flex, Heading, Spacer, VStack } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import LoginForm from '../../components/LoginForm';
import ForgotPasswordForm from '../../components/ForgotPasswordForm';
import ResetPasswordForm from '../../components/ResetPasswordForm';
import { PATHS } from '../../constants/constants';
import { authUtils } from '../../utils/authenticationUtils';
import If from '../../components/If';

const AuthLayout = () => {
  const isTokenValid = authUtils.accessTokenChecker();
  return (
    <If test={isTokenValid}>
      <VStack minH="100vh">
        <Flex alignItems="center" height="4rem" w="100vw" bgColor="blue.500">
          <Flex minWidth="max-content" gap="2" w="100%">
            <Box p="2">
              <Heading size="md" textColor="whiteAlpha.800">
                Chakra App
              </Heading>
            </Box>
            <Spacer />
            <ColorModeSwitcher />
          </Flex>
        </Flex>
        {/*  yukaridaki auth header component */}
        <Flex flex="1" justifyContent="center" alignItems="center" h="100%">
          <Routes>
            <Route
              path={PATHS.FORGOT_PASSWORD}
              element={<ForgotPasswordForm />}
            />
            <Route
              path={PATHS.RESET_PASSWORD}
              element={<ResetPasswordForm />}
            />
            <Route path={PATHS.LOGIN} element={<LoginForm />} />
          </Routes>
        </Flex>
      </VStack>
    </If>
  );
};

export default AuthLayout;

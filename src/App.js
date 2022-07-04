import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import PrivateLayout from './layouts/PrivateLayout';
import Unauthorized from './pages/ErrorPages/Unauthorized';
import NotFound from './pages/ErrorPages/NotFound';
function App() {
    return (
        <ChakraProvider theme={theme}>
            <BrowserRouter>
                <Routes>
                    <Route path="/error/403" element={<Unauthorized />} />
                    <Route path="/admin/*" element={<PrivateLayout />} />
                    <Route path="/*" element={<AuthLayout />} />
                </Routes>
            </BrowserRouter>
        </ChakraProvider>
    );
}

export default App;

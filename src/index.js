import { ColorModeScript } from '@chakra-ui/react';
import React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'react-datepicker/dist/react-datepicker.css';
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
    <>
        <ColorModeScript />
        <App />
    </>
);

serviceWorker.unregister();

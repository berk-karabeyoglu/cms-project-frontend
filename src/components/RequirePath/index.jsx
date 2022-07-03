import React from 'react';
import { Navigate } from 'react-router-dom';

const RequirePath = ({ element }) => {
    const user_role = JSON.parse(localStorage.getItem('user_info')).userRole;
    console.log('REQUİRE PATHE GELDİ VALLAHİ');
    return user_role !== 'Editor' ? element : <Navigate to={'/error/403'}></Navigate>;
};

export default RequirePath;

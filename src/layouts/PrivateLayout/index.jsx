import { Route, Routes } from 'react-router-dom';
import { authUtils } from '../../utils/authenticationUtils';
import If from '../../components/If';
import SidebarWithHeader from '../../components/Sidebar';
import ContentType from '../../pages/ContentType';
import Content from '../../pages/Content';
import EditContentType from '../../pages/Edit';
import EditContent from '../../pages/ContentEdit';
import Users from '../../pages/Users';
import UserEdit from '../../pages/Users/UserEdit';
import FieldEdit from '../../pages/FieldEdit';
import { useEffect, useState } from 'react';
const PrivateLayout = () => {
  const isTokenValid = authUtils.validateAccessToken();
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    setUserName(JSON.parse(localStorage.getItem('user_info')).userName);
    setUserRole(JSON.parse(localStorage.getItem('user_info')).userRole);
  }, [userName, userRole]);
  return (
    <If test={isTokenValid}>
      <SidebarWithHeader userName={userName} userRole={userRole}>
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/users/edit/:user_id" element={<UserEdit />} />
          <Route path="/contents" element={<Content />} />
          <Route path="/content-types" element={<ContentType />} />
          <Route
            path="/content-types/edit/:content_type_id"
            element={<EditContentType />}
          />
          <Route
            path="/content-types/edit/:content_type_id/contents/:content_id"
            element={<EditContent />}
          />
          <Route
            path="/content-types/edit/:content_type_id/fields/:field_id"
            element={<FieldEdit />}
          />
        </Routes>
      </SidebarWithHeader>
    </If>
  );
};

export default PrivateLayout;

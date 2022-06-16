import { Route, Routes } from 'react-router-dom';
import { authUtils } from '../../utils/authenticationUtils';
import If from '../../components/If';
import SidebarWithHeader from '../../components/Sidebar';
import ContentType from '../../pages/ContentType';
import Content from '../../pages/Content';
import EditContentType from '../../pages/Edit';
const PrivateLayout = () => {
  const isTokenValid = authUtils.validateAccessToken();

  return (
    <If test={isTokenValid}>
      <SidebarWithHeader>
        <Routes>
          <Route path="/users" element={<h1>users</h1>} />
          <Route path="/contents" element={<Content />} />
          <Route path="/content-types" element={<ContentType />} />
          <Route path="/edit" element={<EditContentType />} />
        </Routes>
      </SidebarWithHeader>
    </If>
  );
};

export default PrivateLayout;

import { Route, Routes } from 'react-router-dom';
import { authUtils } from '../../utils/authenticationUtils';
import If from '../../components/If';
import SidebarWithHeader from '../../components/Sidebar';
import ContentType from '../../pages/ContentType';
import Content from '../../pages/Content';
import EditContentType from '../../pages/Edit';
import EditContent from '../../pages/ContentEdit';
import FieldEdit from '../../pages/FieldEdit';

const PrivateLayout = () => {
  const isTokenValid = authUtils.validateAccessToken();
  return (
    <If test={isTokenValid}>
      <SidebarWithHeader>
        <Routes>
          <Route path="/users" element={<h1>users</h1>} />
          <Route path="/contents" element={<Content />} />
          <Route path="/content-types" element={<ContentType />} />
          <Route path="/content-types/edit/:content_type_id" element={<EditContentType />} />
          <Route path="/content-types/edit/:content_type_id/contents/:content_id" element={<EditContent />} />
          <Route path="/content-types/edit/:content_type_id/fields/:field_id" element={<FieldEdit />} />
        </Routes>
      </SidebarWithHeader>
    </If>
  );
};

export default PrivateLayout;

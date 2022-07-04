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
import Profile from '../../pages/CurrentUserProfile';
import RequirePath from '../../components/RequirePath';
import NotFound from '../../pages/ErrorPages/NotFound';
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
                    {/* Protected routes from editor*/}
                    <Route element={<RequirePath element={<Users />} />}>
                        <Route path="/users" element={<Users />} />
                    </Route>
                    <Route element={<RequirePath element={<UserEdit />} />}>
                        <Route path="/users/edit/:user_id" element={<UserEdit />} />
                    </Route>
                    <Route element={<RequirePath element={<EditContentType />} />}>
                        <Route path="/content-types/edit/:content_type_id" element={<EditContentType />} />
                    </Route>
                    <Route element={<RequirePath element={<FieldEdit />} />}>
                        <Route path="/content-types/edit/:content_type_id/fields/:field_id" element={<FieldEdit />} />
                    </Route>
                    {/* Public routes for everyone */}
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/contents" element={<Content />} />
                    <Route path="/content-types" element={<ContentType />} />
                    <Route path="/content-types/edit/:content_type_id/contents/:content_id" element={<EditContent />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </SidebarWithHeader>
        </If>
    );
};

export default PrivateLayout;

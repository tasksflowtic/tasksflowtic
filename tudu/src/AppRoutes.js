import React, { useContext } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeContext } from './App';

// user
import UserPanel from './Components/User/UserHome';
import AllTasks from './Components/User/AllTasks';
import CreateTask from './Components/User/CreateTask';
import Setting from './Components/User/Setting';
import UserProfile from './Components/User/UserEditProfile';
import ViewTask from './Components/User/ViewTask';
import DWMTask from './Components/User/DWMTask';
import EmailUpdate from './Components/User/EmailUpdate';
import UpdatePhone from './Components/User/UpdatePhone';
import Password from './Components/User/Password';
import DeleteAccount from './Components/User/DeleteAccount';
import ContactSupport from './Components/User/CreateNewTicketUser';
import ContactSupportCard from './Components/Shared/ContactSupportAllTicket';
import SupportConversations from './Components/Shared/SupportConversations';
import UserAnnouncement from './Components/User/UserAnnouncement';
import ResetPasswordUsingLink from './Components/Auth/ResetPasswordUsingLink';

// admin
import AdminSignIn from './Components/Admin/AdminSignIn';
import AdminProfile from './Components/Admin/AdminProfile';
import AdminDashboard from './Components/Admin/AdminDashboard';
import AdminContactSupportRequests from './Components/Admin/AdminContactSupportRequests';
import Announcement from './Components/Admin/Announcement';
import AdminUserProfile from './Components/Admin/AdminUserProfile';

// auth
import SignUp from './Components/Auth/SignUp';
import SignIn from './Components/Auth/SignIn';
import PasswordResetLink from './Components/Auth/PasswordResetLink';

import NotFoundPage from './Components/Shared/NotFoundPage';


const AppRoutes = () => {
    const { role, user } = useContext(ThemeContext)

    return (
        <>
            <Routes>

                <Route path='/support/request/:conversationId' element={<SupportConversations />} />

                {!role && <>
                    <Route path='*' element={<Navigate to="/signup" />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='/signin' element={<SignIn />} />
                    <Route path='/admin/signin' element={<AdminSignIn />} />
                    <Route path='/forgot-password' element={<PasswordResetLink />} />
                    <Route path='/auth/password-reset/:token' element={<ResetPasswordUsingLink />} />
                </>}
                {
                    user?.Role && role === 'User' && <>
                        <Route path='*' element={<Navigate to="/Flowtic" />} />
                        <Route path='/Flowtic' element={<UserPanel />} />
                        <Route path='/alltasks' element={<AllTasks />} />
                        <Route path='/createtask' element={<CreateTask />} />
                        <Route path='/setting' element={<Setting />} />
                        <Route path='/profile/edit/:_id' element={<UserProfile />} />
                        <Route path='/viewtask/:title/:taskId' element={<ViewTask />} />
                        <Route path='/daily/weekly/monthly' element={<DWMTask />} />
                        <Route path='/setting/email' element={<EmailUpdate />} />
                        <Route path='/setting/phone' element={<UpdatePhone />} />
                        <Route path='/setting/password' element={<Password />} />
                        <Route path='/setting/deleteAccount' element={<DeleteAccount />} />
                        <Route path='/setting/contactSupport' element={<ContactSupport />} />
                        <Route path='/contactsupport/issues' element={<ContactSupportCard />} />
                        <Route path='/announcements' element={<UserAnnouncement />} />
                        <Route path='/*' element={<NotFoundPage />} />
                    </>
                }

                {
                    user?.Role && role === 'Admin' && <>
                        <Route path='/admin/dashboard' element={<AdminDashboard />} />
                        <Route path='/admin/profile' element={<AdminProfile />} />
                        <Route path='/admin/contactsupport/requests' element={<AdminContactSupportRequests />} />
                        <Route path='*' element={<Navigate to={'/admin/dashboard'} />} />
                        <Route path='/admin/announcements' element={<Announcement />} />
                        <Route path='/admin/user/:userId' element={<AdminUserProfile />} />
                    </>
                }
            </Routes>
        </>
    )
}

export default AppRoutes

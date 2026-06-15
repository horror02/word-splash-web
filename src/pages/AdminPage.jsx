import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminLayout from "../components/admin/AdminLayout";
import AdminDashboard from "../components/admin/AdminDashboard";
import ProfileSettings from "../components/admin/ProfileSettings";

const AdminPage = () => {
    return (
        <AdminLayout>
            <Routes>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="settings" element={<ProfileSettings />} />
            </Routes>
        </AdminLayout>
    );
};

export default AdminPage;

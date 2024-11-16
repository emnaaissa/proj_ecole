import React from 'react';
import { Route, Routes } from 'react-router-dom';
import EnseignantList from '../enseignant/EnseignantList';
import EleveList from '../eleve/EleveList';
import DashboardLayout from './DashboardLayout';
import './Dashboard.css';

const Dashboard = () => {
    return (
        <DashboardLayout>
            <Routes>
                <Route path="/" element={<div>مرحبا بكم في لوحة القيادة</div>} />
                <Route path="/enseignants" element={<EnseignantList />} />
                {/* Add other routes as needed */}
                <Route path="/eleves" element={<EleveList />} />
                <Route path="/profile" element={<div> الأقسام</div>} />
                <Route path="/settings" element={<div>الإعدادات</div>} />
            </Routes>
        </DashboardLayout>
    );
};

export default Dashboard;

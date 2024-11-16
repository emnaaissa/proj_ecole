import React from 'react';
import Sidebar from './Sidebar';
import './Dashboard.css';

const DashboardLayout = ({ children }) => {
    return (
        <div className="dashboard-layout">
            <Sidebar />
            <div className="dashboard-content">
                {children}
            </div>
        </div>
    );
};

export default DashboardLayout;

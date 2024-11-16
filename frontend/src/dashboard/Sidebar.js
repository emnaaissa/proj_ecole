import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <ul>
                <li><Link to="/">الصفحة الرئيسية</Link></li>
                <li><Link to="/enseignants">المعلمين</Link></li>
                <li><Link to="/eleves">التلاميذ</Link></li>
                <li><Link to="/profile"> الأقسام</Link></li>
                {/* يمكنك إضافة أقسام أخرى حسب الحاجة */}
            </ul>
        </div>
    );
};

export default Sidebar;

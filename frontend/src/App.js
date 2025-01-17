import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';

const App = () => {
  return (
    <Router>
      <div className="App" dir="rtl">
        <Routes>
          <Route path="/*" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

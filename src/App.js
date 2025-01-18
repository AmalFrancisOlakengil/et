import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Dashboard from "./Pages/Dashboard/dashboard.js";
import Addexpense from "./Pages/AddExpense/addexpense.js";
import Aiinsights from './Pages/Insights/insights.js';
import Expenselist from "./Pages/ExpenseList/expenselist.js";
import Settings from "./Pages/Settings/settings.js";
function App(){

  return (
 <>
  <Router>
            <Routes>
                {/* Define routes */}
                <Route path="/" element={<Dashboard />} /> {/* Default page */}
                <Route path="/AddExpense" element={<Addexpense />} />
                <Route path="/Insights" element={<Aiinsights />} />
                <Route path="/ExpenseList" element={<Expenselist />} />
                <Route path="/about" element={<Settings />} />
            </Routes>
  </Router>


 </>
  );
};

export default App;
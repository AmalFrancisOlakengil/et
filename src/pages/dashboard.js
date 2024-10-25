import React from "react";
import "./dashboard.css";
import { Link } from "react-router-dom";
import ExpenseGraph from './components/expensegraph';

export default function Dashboard() {
  // Get the current month name
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });

  return (
    <div className='dashboard'>
      <nav>
        <ul className='navbar'>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/pages/dashboard'>Dashboard</Link>
          </li>
          <li>
            <Link to='/pages/notification'>Notifications</Link>
          </li>
        </ul>
      </nav>
      
      {/* Display the current month */}
      <div className="dashboard-block">
        <div className="title-dashboard">
      <h1 className="title-sent">Your Data For</h1>
      <h1 className="monthname">{`${currentMonth}`}</h1>
      </div>
      <div className="graph">
      <ExpenseGraph/>
      </div>
      </div>
    </div>
  );
}

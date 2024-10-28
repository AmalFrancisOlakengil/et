import React from "react";
import "./dashboard.css";
import { Link ,  useLocation} from "react-router-dom";
import ExpenseGraph from './components/expensegraph';
import ExpenseGraph2 from "./components/expensegraph2";
export default function Dashboard() {
  // Get the current month name
  const location = useLocation();
  const { data = 0} = location.state || {};

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
      <ExpenseGraph exp = {data}/>
      </div>
      </div>
      <div className="data">
      <div className="WMO">
           <h1>Weekly Overview</h1>
           <h3>The most spent day: </h3>
           <h3>The least spent day: </h3>
           <h3>Days which crossed the Limit: </h3>
      </div>
      <div className="WMO">
           <h1>Monthly Overview</h1>
           <h3>The most spent day: </h3>
           <h3>The least spent day: </h3>
           <h3>Days which crossed the Limit: </h3>
           <h3>Month Balance: </h3>
           <h3>Previous Month Savings: </h3>
      </div>
      </div>
      <div className="dashboard-block">
         <ExpenseGraph2 exp = {data}/>
      </div>
    </div>
  );
}

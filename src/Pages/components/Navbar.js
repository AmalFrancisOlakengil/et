import "./Navbar.css";
import { Link } from 'react-router-dom';

function Navbar(){

    return(<>
     <nav className="Navbar">
      <ul className="NavbarList">
        <li><Link to="/"> 📊Dashboard</Link></li>
        <li><Link to="/AddExpense">🏦Add Expense</Link></li>
        <li><Link to="/ExpenseList">📝Expense List</Link></li>
        <li><Link to="/AiInsights" >🤖AI Insights</Link></li>
        <li><Link to="/Settings">⚙️Settings</Link></li>
      </ul>
     </nav>
    </>);
}


export default Navbar;
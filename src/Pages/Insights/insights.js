import Navbar from "../components/Navbar.js";

import Footer from "../components/Footer.js";

import ExpenseBarGraph from "./expensebargraph.js";
import ExpenseDay from "./expenseday.js";
import "./insights.css";

function Aiinsights(){
    return(<>
    <Navbar/>
    <div className="aiinsights">
        <h1 className="Title">Average Expenditure by Category</h1>
        <ExpenseBarGraph/>
        <h1 className="Title2">Average Expenditure by Day</h1>
        <ExpenseDay/>
    </div>
    <Footer/>
    </>)
    
    }
    
    export default Aiinsights;
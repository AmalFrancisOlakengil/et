import Navbar from "../components/Navbar.js";

import Footer from "../components/Footer.js";

import "./dashboard.css";
function Dashboard(){



return(<>
<Navbar />

<div className="Dashboard">
 <h1 className="Title">This Month's Summary ...</h1>
 <div className="month"> 
    <div className="monthnum">
    <div className="numcont"><h3>Monthly Income:</h3></div>
    <div className="numcont"><h3>Monthly Expense:</h3></div>
    <div className="numcont"><h3>Monthly Balance:</h3></div>
    </div>
    <div className="monthvis">
    <div className="xcat"><h3>Expenditure Categories</h3></div>
    <div className="xtre"><h3>Expenditure Trends</h3></div>
    </div>
 </div>
 <h1 className="Title2">Today's Summary ...</h1>
</div>


<Footer/>

</>)

}

export default Dashboard;
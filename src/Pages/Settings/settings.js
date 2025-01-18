
import Navbar from "../components/Navbar.js";

import Footer from "../components/Footer.js";

import "./settings.css";


function Settings(){
    return(<>
    <Navbar/>
    <div className="About">
        <h1 className="Title">MoneyMap</h1>
        <div className="aboutbox">
            <p><b>MoneyMap</b> is a comprehensive and user-friendly expense tracking application designed to help individuals and households manage their finances efficiently. The application allows users to seamlessly record, categorize, and analyze their daily expenditures, providing valuable insights into their spending habits. By leveraging advanced features such as data visualization and historical trends, ExpenseMate empowers users to make informed decisions, optimize their budgeting, and take control of their financial future.</p>
        </div>
        <div className="aboutbox">
            <h1>Key Features</h1>
            <ul>
                <li>
                <b>Expense Tracking:</b> Easily log and categorize your expenses to get a detailed overview of your spending.
                </li>
                <li>
                    <b>Data Visualization:</b>View your spending patterns with intuitive bar charts, highlighting expenses by category, day, and week, making it easier to spot trends.
                </li>
                <li>
                    <b>Average Expense Calculation:</b>Automatically calculate the average expenditure within each category and across days to provide better insights into spending behaviors.
                </li>
                <li>
                    <b>IndexedDB Integration:</b>Store and retrieve your data locally using IndexedDB, ensuring that all your financial data is securely saved on your device
                </li>
                <li>
                    <b>Budget Optimization:</b>Track how much you're spending in various categories and set budget goals to ensure that you're staying within your limits.
                </li>
                <li>
                    <b>Responsive Design:</b>The application is designed to be responsive and functional on a range of devices, from desktops to mobile devices, providing flexibility for users to track their expenses anytime, anywhere.
                </li>
            </ul>
        </div>
        <h1 className="Title2">Purpose</h1>
        <div className="aboutbox">
            <p>ExpenseMate aims to simplify personal finance management by providing a reliable tool that encourages consistent expense tracking. Whether you're saving for a specific goal, managing household finances, or simply curious about your spending habits, ExpenseMate offers the necessary tools to help you stay organized and financially empowered.</p>
        </div>
        <div className="aboutbox">
            <h1>Future Enhancements:</h1>
            <ul>
                <li>
                <b>Cloud Synchronization: </b>To allow users to sync their data across multiple devices.
                </li>
                <li>
                    <b>Advanced Reporting: </b> Include features like expense breakdowns, tax reporting, and financial summaries.
                </li>
                <li>
                    <b>Expense Prediction:</b>Implement AI-powered features to predict future spending based on past patterns.
                </li>
                <li>
                    <b>Multiple Users:</b>Enable a multi-user system for families or groups to manage shared expenses.
                </li>
            </ul>
        </div>
    </div>
    <Footer/>
    </>)
    
    }
    
    export default Settings;
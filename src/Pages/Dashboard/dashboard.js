import React, { useState, useCallback  } from "react";
import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import LineGraph from "./Linegraph.js";
import PieChart from "./piechart.js";
import PieChartToday from "./piecharttoday.js";
import "./dashboard.css";

function Dashboard() {
  // State to hold monthly income, expenses, and balance
  const [monthlyData, setMonthlyData] = useState({
    income: 0,
    expenses: 0,
    balance: 0,
  });

  // State to hold today's summary data
  const [summaryData, setSummaryData] = useState({
    highestSpending: 0,
    highestCategory: "",
    leastSpending: 0,
    leastCategory: "",
    totalExpenditure: 0,
  });

  function debounce(func, wait) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }
  
  // Handler for updating monthly income
  const handleIncomeChange = (e) => {
    const income = parseFloat(e.target.value) || 0;
    setMonthlyData((prev) => ({
      ...prev,
      income,
      balance: income - prev.expenses,
    }));
  };

  // Example logic to update monthly expenses (you can integrate actual expense calculations)
  // eslint-disable-next-line
  const handleMonthlyExpensesChange = useCallback(
    debounce((expenses) => {
      setMonthlyData((prev) => ({
        ...prev,
        expenses,
        balance: prev.income - expenses,
      }));
    }, 300), // Debounce delay
    []
  );
  

  return (
    <>
      <Navbar />

      <div className="Dashboard">
        <h1 className="Title">This Month's Summary ...</h1>

        <div className="month">
          {/* Input field for monthly income */}
          <div className="monthnum">
            <div className="numcont">
              <h3>Monthly Income:</h3>
              <input
                type="number"
                value={monthlyData.income}
                onChange={handleIncomeChange}
                placeholder="Enter your monthly income"
                className="income-input"
              />
              <p>${monthlyData.income.toFixed(2)}</p>
            </div>
            <div className="numcont">
              <h3>Monthly Expense:</h3>
              <p>${monthlyData.expenses.toFixed(2)}</p>
            </div>
            <div className="numcont">
              <h3>Monthly Balance:</h3>
              <p>${monthlyData.balance.toFixed(2)}</p>
            </div>
          </div>

          <div className="monthvis">
  <div className="xcat">
    <h3>Expenditure Categories</h3>
    <PieChart onExpensesCalculated={handleMonthlyExpensesChange} />
  </div>
  <div className="xtre">
    <h3>Expenditure Trends</h3>
    <LineGraph />
  </div>
</div>

        </div>

        <center>
          <h1 className="Title2">Today's Summary ...</h1>
        </center>
        <div className="centerer">
          <div className="today">
            <div className="details">
              <ul className="datalist">
                <li>Highest Spending: ${summaryData.highestSpending}</li>
                <li>Most Spent Category: {summaryData.highestCategory}</li>
                <li>Least Spending: ${summaryData.leastSpending}</li>
                <li>Least Spent Category: {summaryData.leastCategory}</li>
                <li>Total Expenditure: ${summaryData.totalExpenditure}</li>
              </ul>
            </div>
            <div className="piechart">
              <PieChartToday setSummaryData={setSummaryData} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Dashboard;
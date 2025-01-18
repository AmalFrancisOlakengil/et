import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import "./expenselist.css";

const openDb = () => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open("expensesDatabase", 1);

    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains("expenses")) {
        db.createObjectStore("expenses", {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    };

    request.onerror = (e) =>
      reject(`Error opening database: ${e.target.error}`);
    request.onsuccess = (e) => resolve(e.target.result);
  });
};

const getAllExpenses = async () => {
  try {
    const db = await openDb();
    const transaction = db.transaction("expenses", "readonly");
    const store = transaction.objectStore("expenses");
    const request = store.getAll(); // Get all entries from the store

    return new Promise((resolve, reject) => {
      request.onsuccess = (e) => {
        resolve(e.target.result); // Return all data
      };
      request.onerror = (e) =>
        reject(`Error retrieving data: ${e.target.error}`);
    });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return [];
  }
};

function Expenselist() {
  const [expenses, setExpenses] = useState([]); // State to store expenses
  const [summary, setSummary] = useState({
    totalExpenditure: 0,
    highestCategory: "",
    highestExpenditure: 0,
    leastCategory: "",
    leastExpenditure: 0,
    mostSpentDay: "",
    mostSpentDayAmount: 0,
    leastSpentDay: "",
    leastSpentDayAmount: 0,
  });

  useEffect(() => {
    const fetchAllExpenses = async () => {
      const allExpenses = await getAllExpenses();
      setExpenses(allExpenses); // Set expenses in the state

      // Calculate summary
      calculateSummary(allExpenses);
    };

    fetchAllExpenses(); // Fetch expenses when component mounts
  }, []);

  // Function to calculate the summary of the expenses
  const calculateSummary = (expenses) => {
  let totalExpenditure = 0;
  const categoryTotals = {};
  const dayTotals = {};

  expenses.forEach((expense) => {
    totalExpenditure += expense.amount;

    // Category wise expenditure
    if (!categoryTotals[expense.category]) {
      categoryTotals[expense.category] = 0;
    }
    categoryTotals[expense.category] += expense.amount;

    // Day wise expenditure
    if (!dayTotals[expense.day]) {
      dayTotals[expense.day] = 0;
    }
    dayTotals[expense.day] += expense.amount;
  });

  // Calculate highest and lowest category safely
  const highestCategory = Object.keys(categoryTotals).reduce(
    (a, b) => (categoryTotals[a] > categoryTotals[b] ? a : b),
    null // Provide an initial value of null
  );
  const leastCategory = Object.keys(categoryTotals).reduce(
    (a, b) => (categoryTotals[a] < categoryTotals[b] ? a : b),
    null // Provide an initial value of null
  );

  // Calculate most and least spent day safely
  const mostSpentDay = Object.keys(dayTotals).reduce(
    (a, b) => (dayTotals[a] > dayTotals[b] ? a : b),
    null // Provide an initial value of null
  );
  const leastSpentDay = Object.keys(dayTotals).reduce(
    (a, b) => (dayTotals[a] < dayTotals[b] ? a : b),
    null // Provide an initial value of null
  );

  // Update the summary state
  setSummary({
    totalExpenditure,
    highestCategory,
    highestExpenditure: highestCategory ? categoryTotals[highestCategory] : 0,
    leastCategory,
    leastExpenditure: leastCategory ? categoryTotals[leastCategory] : 0,
    mostSpentDay,
    mostSpentDayAmount: mostSpentDay ? dayTotals[mostSpentDay] : 0,
    leastSpentDay,
    leastSpentDayAmount: leastSpentDay ? dayTotals[leastSpentDay] : 0,
  });
};


  // Function to download expenses as CSV
  const downloadCSV = () => {
    const headers = [
      "ID",
      "Product",
      "Amount",
      "Category",
      "Description",
      "Date",
      "Day",
    ];
    const rows = expenses.map((expense) => [
      expense.id,
      expense.item,
      expense.amount,
      expense.category,
      expense.description,
      expense.date,
      expense.day,
    ]);

    let csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n";
    rows.forEach((row) => {
      csvContent += row.join(",") + "\n";
    });

    // Create a link and trigger download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "expenses.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Navbar />
      <div className="Expenselist">
        <center>
          <h1 className="Title">All Your Expenses</h1>
        </center>
        <div className="monthnum">
          <div className="numcont">
          <h3>Total Expenditure: ${summary.totalExpenditure}</h3>
          </div>
          <div className="numcont">
          <h3>
            Highest Expended Category: {summary.highestCategory} ($
            {summary.highestExpenditure})
          </h3>
          </div>
          <div className="numcont">
          <h3>
            Least Expended Category: {summary.leastCategory} ($
            {summary.leastExpenditure})
          </h3>
          </div>
          <div className="numcont">
          <h3>
            Most Spent Day: {summary.mostSpentDay} ($
            {summary.mostSpentDayAmount})
          </h3>
          </div>
          <div className="numcont">
          <h3>
            Least Spent Day: {summary.leastSpentDay} ($
            {summary.leastSpentDayAmount})
          </h3>
          </div>
        </div>
        <button onClick={downloadCSV} className="download-button">
          Download as CSV
        </button>
        <div className="expenses-list">
          {expenses.length === 0 ? (
            <p>No expenses recorded yet.</p>
          ) : (
            expenses.map((expense) => (
              <div key={expense.id} className="expense-item">
                <p>
                  <b>Product:</b> {expense.item}
                </p>
                <p>
                  <b>Amount:</b> {expense.amount}
                </p>
                <p>
                  <b>Category:</b> {expense.category}
                </p>
                <p>
                  <b>Description:</b> {expense.description}
                </p>
                <p>
                  <b>Date:</b> {expense.date}
                </p>
                <p>
                  <b>Day:</b> {expense.day}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Expenselist;

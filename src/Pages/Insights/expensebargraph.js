import React, { useEffect, useState, useCallback } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import "./insights.css";
// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ExpenseBarGraph = () => {
  const [expenses, setExpenses] = useState([]);
  const [chartData, setChartData] = useState(null);

  // Function to open IndexedDB and fetch data
  const openDb = useCallback(() => {
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

      request.onsuccess = (e) => resolve(e.target.result);
      request.onerror = (e) => reject(`Error opening database: ${e.target.error}`);
    });
  }, []);

  const fetchExpenses = useCallback(async () => {
    try {
      const db = await openDb();
      const transaction = db.transaction("expenses", "readonly");
      const store = transaction.objectStore("expenses");
      const request = store.getAll();

      request.onsuccess = (e) => setExpenses(e.target.result);
      request.onerror = (e) => console.error(`Error fetching data: ${e.target.error}`);
    } catch (error) {
      console.error(error);
    }
  }, [openDb]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  useEffect(() => {
    if (expenses.length > 0) {
      const categories = {};

      expenses.forEach((expense) => {
        if (!categories[expense.category]) {
          categories[expense.category] = { total: 0, count: 0 };
        }
        categories[expense.category].total += expense.amount;
        categories[expense.category].count += 1;
      });

      // Prepare data for chart (average expenditure per category)
      const labels = Object.keys(categories);
      const data = labels.map((category) => {
        const { total, count } = categories[category];
        return count > 0 ? (total / count).toFixed(2) : 0; // Average = total / count, 0 if no expenses
      });

      setChartData({
        labels,
        datasets: [
          {
            label: "Average Expenditure by Category",
            data,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      });
    }
  }, [expenses]);

  if (!chartData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="expenseday">
      <Bar
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Average Expenditure by Category" },
          },
        }}
      />
    </div>
  );
};

export default ExpenseBarGraph;

import React, { useEffect, useState, useCallback } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import "./insights.css";
// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ExpenseDay = () => {
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
      const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const dailyExpenses = {
        Sunday: { total: 0, count: 0 },
        Monday: { total: 0, count: 0 },
        Tuesday: { total: 0, count: 0 },
        Wednesday: { total: 0, count: 0 },
        Thursday: { total: 0, count: 0 },
        Friday: { total: 0, count: 0 },
        Saturday: { total: 0, count: 0 },
      };

      expenses.forEach((expense) => {
        // Get the day of the week (0 = Sunday, 1 = Monday, etc.)
        const dayOfWeek = new Date(expense.date).getDay();
        const dayName = weekdays[dayOfWeek];
        
        // Sum expenses by day of the week and count them
        dailyExpenses[dayName].total += expense.amount;
        dailyExpenses[dayName].count += 1;
      });

      // Prepare data for chart (average expenditure per day)
      const labels = weekdays;
      const data = weekdays.map(day => {
        const { total, count } = dailyExpenses[day];
        return count > 0 ? (total / count).toFixed(2) : 0; // Average = total / count, 0 if no expenses
      });

      setChartData({
        labels,
        datasets: [
          {
            label: "Average Expenditure by Day of the Week",
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
            title: { display: true, text: "Average Expenditure by Day of the Week" },
          },
        }}
      />
    </div>
  );
};

export default ExpenseDay;

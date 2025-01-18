import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

// Register Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

// Function to open the IndexedDB
const openDb = () => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open('expensesDatabase', 1);

    request.onsuccess = (e) => resolve(e.target.result);
    request.onerror = (e) => reject(`Error opening database: ${e.target.error}`);
  });
};

// Function to fetch all expenses from IndexedDB
const fetchExpenses = async () => {
  const db = await openDb();
  const transaction = db.transaction('expenses', 'readonly');
  const store = transaction.objectStore('expenses');
  const request = store.getAll();

  return new Promise((resolve, reject) => {
    request.onsuccess = (e) => resolve(e.target.result);
    request.onerror = (e) => reject(`Error fetching data: ${e.target.error}`);
  });
};

const LineGraph = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const prepareData = async () => {
      const expenses = await fetchExpenses();

      // Get today's date and calculate the date 30 days ago
      const today = new Date();
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(today.getDate() - 30);

      // Filter expenses within the last 30 days
      const recentExpenses = expenses.filter((expense) => {
        const expenseDate = new Date(expense.date); // Assuming `expense.date` is in "YYYY-MM-DD" format
        return expenseDate >= thirtyDaysAgo && expenseDate <= today;
      });

      // Group expenses by date and sum their amounts
      const groupedData = recentExpenses.reduce((acc, expense) => {
        const date = expense.date; // Assuming `expense.date` exists in "YYYY-MM-DD" format
        acc[date] = (acc[date] || 0) + expense.amount;
        return acc;
      }, {});

      // Sort dates and prepare data for the chart
      const sortedDates = Object.keys(groupedData).sort();
      const prices = sortedDates.map((date) => groupedData[date]);

      // Set chart data
      setChartData({
        labels: sortedDates,
        datasets: [
          {
            label: 'Daily Expenses (Last 30 Days)',
            data: prices,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            pointRadius: 4,
          },
        ],
      });
    };

    prepareData();
  }, []);

  // Chart configuration
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Price (in $)',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className='linegraph'>
      <h2>Daily Expenses Line Graph (Last 30 Days)</h2>
      {chartData ? <Line data={chartData} options={options} /> : <p>Loading...</p>}
    </div>
  );
};

export default LineGraph;

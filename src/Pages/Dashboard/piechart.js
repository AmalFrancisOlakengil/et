import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

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

const PieChart = ({ onExpensesCalculated }) => {
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

      // Group expenses by category and sum their amounts
      const categoryData = recentExpenses.reduce((acc, expense) => {
        const category = expense.category || 'Uncategorized';
        acc[category] = (acc[category] || 0) + expense.amount;
        return acc;
      }, {});

      // Calculate total expenses
      const totalExpenses = Object.values(categoryData).reduce(
        (acc, value) => acc + value,
        0
      );

      // Notify parent component about the total expenses
      if (onExpensesCalculated) {
        onExpensesCalculated(totalExpenses);
      }

      // Prepare data for the chart
      const labels = Object.keys(categoryData);
      const dataValues = Object.values(categoryData);
      const backgroundColors = [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4BC0C0',
        '#9966FF',
        '#FF9F40',
      ]; // Default colors, can add more if needed

      setChartData({
        labels,
        datasets: [
          {
            data: dataValues,
            backgroundColor: backgroundColors.slice(0, labels.length),
            borderColor: backgroundColors.slice(0, labels.length),
            borderWidth: 1,
          },
        ],
      });
    };

    prepareData();
  }, [onExpensesCalculated]);

  // Default options for the pie chart
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className='piechart-graph'>
      <h2>Expenses by Category (Last 30 Days)</h2>
      {chartData ? <Pie data={chartData} options={options} /> : <p>Loading...</p>}
    </div>
  );
};

export default PieChart;

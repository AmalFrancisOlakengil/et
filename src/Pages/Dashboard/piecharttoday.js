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

const PieChartToday = ({ setSummaryData }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const prepareData = async () => {
      const expenses = await fetchExpenses();

      // Get today's date in "YYYY-MM-DD" format
      const today = new Date();
      const todayDateString = today.toISOString().split('T')[0]; // Converts to "YYYY-MM-DD"

      // Filter expenses for today only
      const todayExpenses = expenses.filter((expense) => expense.date === todayDateString);

      // Group expenses by category and sum their amounts
      const categoryData = todayExpenses.reduce((acc, expense) => {
        const category = expense.category || 'Uncategorized';
        acc[category] = (acc[category] || 0) + expense.amount;
        return acc;
      }, {});

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

      // Calculate the required data for summary
      const highestSpending = Math.max(...dataValues);
      const highestCategory = labels[dataValues.indexOf(highestSpending)];
      const leastSpending = Math.min(...dataValues);
      const leastCategory = labels[dataValues.indexOf(leastSpending)];
      const totalExpenditure = dataValues.reduce((sum, value) => sum + value, 0);

      // Set the summary data to pass to the parent component (Dashboard)
      setSummaryData({
        highestSpending,
        highestCategory,
        leastSpending,
        leastCategory,
        totalExpenditure,
      });

      // Set chart data
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
  }, [setSummaryData]);

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
    <div className='piechart2-graph'>
      <h2>Today's Expenses by Category</h2>
      {chartData ? <Pie data={chartData} options={options} /> : <p>Loading...</p>}
    </div>
  );
};

export default PieChartToday;

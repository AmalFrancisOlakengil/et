import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register necessary components with Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ExpenseGraph = () => {
    // Function to get dates for the current week
    const getCurrentWeekDates = () => {
        const currentDate = new Date();
        const weekDates = [];

        // Start from Sunday of the current week
        currentDate.setDate(currentDate.getDate() - currentDate.getDay());

        for (let i = 0; i < 7; i++) {
            weekDates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        // Format dates as 'MM/DD' for labels
        return weekDates.map(date => `${date.getMonth() + 1}/${date.getDate()}`);
    };

    // Labels for the chart
    const labels = getCurrentWeekDates();

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Daily Expenses',
                data: [50, 100, 75, 60, 90, 120, 80], // Sample data
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div style={{ width: '80%', height: '80%', margin: 'auto' }}>
            <h2>Weekly Expense Overview</h2>
            <Bar data={data} options={options} />
        </div>
    );
};

export default ExpenseGraph;

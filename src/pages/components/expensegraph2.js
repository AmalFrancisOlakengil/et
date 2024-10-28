import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register necessary components with Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ExpenseGraph2 = (props) => {
    // Load saved values from localStorage or initialize with zero values
    const initialValues = JSON.parse(localStorage.getItem('weeklyExpenses')) || new Array(7).fill(0);
    console.log(initialValues);
    const [value, setValue] = useState(initialValues);

    // Function to get dates for the current week
    const getCurrentWeekDates = () => {
        const currentDate = new Date();
        const weekDates = [];
        const index = currentDate.getDay();
    
        // Start from Sunday of the current week
        currentDate.setDate(currentDate.getDate() - index);

        for (let i = 0; i < 7; i++) {
            weekDates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        // Format dates as 'MM/DD' for labels
        return {
            dates: weekDates.map(date => `${date.getMonth() + 1}/${date.getDate()}`),
            index,
        };
    };

    // Labels for the chart
    const { dates: labels, index } = getCurrentWeekDates();

    useEffect(() => {
        // Update the value for the current day
        setValue(prevValues => {
            const updatedValues = [...prevValues];
            updatedValues[index] += (parseInt(props.exp, 10)/2);

            // Save the updated values to localStorage
            localStorage.setItem('weeklyExpenses', JSON.stringify(updatedValues));
            return updatedValues;
        });
    }, [props.exp, index]); // Runs every time props.exp changes or when the index changes

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Future Expenses',
                data: value,
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
            <h2>Future Spending Trends</h2>
            <Bar data={data} options={options} />
        </div>
    );
};

export default ExpenseGraph2;



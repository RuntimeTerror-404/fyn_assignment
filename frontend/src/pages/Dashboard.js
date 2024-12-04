import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';

const Dashboard = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Fetch revenue data from the backend
        axios.get('http://localhost:8000/api/transactions/')
            .then(response => {
                // Process data for daily, monthly, and yearly revenues
                const transactions = response.data;
                const processedData = processRevenueData(transactions);
                setData(processedData);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const processRevenueData = (transactions) => {
        // Process transactions to calculate daily, monthly, and yearly revenue
        const revenues = transactions.reduce((acc, transaction) => {
            const date = new Date(transaction.date);
            const year = date.getFullYear();
            const month = `${year}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
            const day = `${month}-${date.getDate().toString().padStart(2, '0')}`;

            // Aggregate total_price for each day, month, and year
            acc.daily[day] = (acc.daily[day] || 0) + parseFloat(transaction.total_price);
            acc.monthly[month] = (acc.monthly[month] || 0) + parseFloat(transaction.total_price);
            acc.yearly[year] = (acc.yearly[year] || 0) + parseFloat(transaction.total_price);

            return acc;
        }, { daily: {}, monthly: {}, yearly: {} });

        // Convert daily, monthly, and yearly revenues into an array of objects
        const dailyData = Object.entries(revenues.daily).map(([day, revenue]) => ({ label: day, revenue }));
        const monthlyData = Object.entries(revenues.monthly).map(([month, revenue]) => ({ label: month, revenue }));
        const yearlyData = Object.entries(revenues.yearly).map(([year, revenue]) => ({ label: year, revenue }));

        // Return combined data for the chart
        return [
            { label: 'Daily', revenueData: dailyData },
            { label: 'Monthly', revenueData: monthlyData },
            { label: 'Yearly', revenueData: yearlyData },
        ];
    };

    return (
        <div>
            <h1>Revenue Dashboard</h1>
            <BarChart
                width={600}
                height={400}
                data={data[0]?.revenueData || []}  // Show Daily Data as default
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#8884d8" />
            </BarChart>

            {/* You can add dropdowns or buttons to switch between Daily, Monthly, and Yearly data */}
        </div>
    );
};

export default Dashboard;

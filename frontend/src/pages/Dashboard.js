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
        // This function should return formatted data for the BarChart
        const revenues = transactions.reduce((acc, transaction) => {
            const date = new Date(transaction.date);
            const year = date.getFullYear();
            const month = `${year}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
            const day = `${month}-${date.getDate().toString().padStart(2, '0')}`;

            acc.yearly[year] = (acc.yearly[year] || 0) + transaction.total_price;
            acc.monthly[month] = (acc.monthly[month] || 0) + transaction.total_price;
            acc.daily[day] = (acc.daily[day] || 0) + transaction.total_price;

            return acc;
        }, { daily: {}, monthly: {}, yearly: {} });

        return [
            { label: 'Daily', revenue: Object.values(revenues.daily).reduce((sum, val) => sum + val, 0) },
            { label: 'Monthly', revenue: Object.values(revenues.monthly).reduce((sum, val) => sum + val, 0) },
            { label: 'Yearly', revenue: Object.values(revenues.yearly).reduce((sum, val) => sum + val, 0) },
        ];
    };

    return (
        <div>
            <h1>Revenue Dashboard</h1>
            <BarChart
                width={600}
                height={400}
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#8884d8" />
            </BarChart>
        </div>
    );
};

export default Dashboard;

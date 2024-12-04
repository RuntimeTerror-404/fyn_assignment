import React from 'react';
import './App.css'; 
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ComponentsPage from './pages/ComponentsPage';
import VehiclesPage from './pages/VehiclesPage';
import IssuesPage from './pages/IssuesPage';
import TransactionsPage from './pages/TransactionsPage';

function App() {
    return (
        <Router>
            <nav>
                <Link to="/">Dashboard</Link>
                <Link to="/components">Components</Link>
                <Link to="/vehicles">Vehicles</Link>
                <Link to="/issues">Issues</Link>
                <Link to="/transactions">Transactions</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/components" element={<ComponentsPage />} />
                <Route path="/vehicles" element={<VehiclesPage />} />
                <Route path="/issues" element={<IssuesPage />} />
                <Route path="/transactions" element={<TransactionsPage />} />
            </Routes>
        </Router>
    );
}

export default App;

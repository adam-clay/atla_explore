import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UsersPage from './UsersPage';
import UserDetail from './UserDetail';
import BranchesPage from './BranchesPage';
import BranchDetail from './BranchDetail';
import ReceiverSubscriptionsPage from './ReceiverSubscriptionsPage';
import ReceiverSubscriptionForm from './ReceiverSubscriptionForm'
import Header from './Header';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <div>
        <nav>
        <Link to="/">Dashboard</Link>
          <Link to="/users">Users</Link>
          <Link to="/branches">Branches</Link>
          <Link to="/receiver_subscriptions">Display Receiver Subscriptions</Link>
          <Link to="/receiver_subscriptions_form">DRS Form</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:username" element={<UserDetail />} />
          <Route path="/branches" element={<BranchesPage />} />
          <Route path="/receiver_subscriptions" element={<ReceiverSubscriptionsPage />} />
          <Route path="/receiver_subscriptions_form" element={<ReceiverSubscriptionForm />} />
          <Route path="/branches/:name" element={<BranchDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

function Dashboard() {
  return (
    <div>
      <br></br>
      <Link to="/users" className="button">View Users</Link>
      <br></br>
      <br></br>
      <Link to="/branches" className="button">View Branches</Link>
      <br></br>
      <br></br>
      <Link to="/receiver_subscriptions" className="button">Display Receiver Subscriptions</Link>
      <br></br>
      <br></br>
      <Link to="/receiver_subscriptions_form" className="button">DRS Form</Link>
    
    </div>
  );
}

export default App;

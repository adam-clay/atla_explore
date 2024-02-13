import React, { useState, useEffect, useRef} from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UsersPage from './pages/UsersPage';
import UserDetail from './pages/UserDetail';
import BranchesPage from './pages/BranchesPage';
import BranchDetail from './pages/BranchDetail';
import ReceiverSubscriptionsPage from './pages/ReceiverSubscriptionsPage';
import ReceiverSubscriptionForm from './pages/ReceiverSubscriptionForm'
import Header from './components/Header';
import Footer from './components/Footer';
import ThankYouPage from './pages/ThankYou';
import BranchLocations from './pages/BranchLocations';
import ServiceQuoter from './pages/ServiceQuoter';
import LoginPage from './pages/LoginPage';
import Contact from './pages/Contact';
import ClosestBranch from './pages/ClosestBranch';
// import ProtectedRoute from './components/protectedRoute';
import './App.css';

import logo from './images/at-logo.png';
import dashboard1 from './images/dashboard1.jpg';
import dashboard2 from './images/dashboard2.jpg';

// doing OAuth stuff
import { GoogleOAuthProvider } from "@react-oauth/google";

const images = [dashboard1, dashboard2];

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    // Check if user is logged in (this is a simplified example)
    const token = localStorage.getItem('userToken');
    const userIsAuthenticated = !!token;
    setIsAuthenticated(userIsAuthenticated);

    // uncomment when permissions are set up correctly
    // also need to make sure the response model is correct
    // if (userIsAuthenticated) {
    //   axios.get('/users/me', { headers: { Authorization: `Bearer ${token}` } })
    //     .then(response => {
    //       setUser(response.data);
    //       if (response.data.email.endsWith('@atjd.net')) {
    //         axios.get('/users/perms/me', { headers: { Authorization: `Bearer ${token}` } })
    //           .then(response => {
    //             const permissionNames = response.data.map(permission => permission.name);
    //             setPermissions(permissionNames);
    //           });
    //       }
    //     });
    // }
  }, []);

  // adding permissions stuff
  const handleLoginSuccess = (response) => {
    console.log('Login Success:', response);
    localStorage.setItem('userToken', response.tokenId); 
    setIsAuthenticated(true);
  };

  const handleLoginFailure = (error) => {
    console.error('Login Failed:', error);
    setIsAuthenticated(false);
  };

  const logout = () => {
    localStorage.removeItem('userToken');
    setIsAuthenticated(false);
  };

  const [showMenu, setShowMenu] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Router>
        {/* <Header /> */}
        {isAuthenticated ? (
          <>
          <Header />
          <nav className="navbar">
            <div>
              <button onClick={toggleMenu}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px">
                  <path d="M0 0h24v24H0z" fill="none"/>
                  <path d="M4 11h16v2H4zm0-4h16v2H4zm0 8h16v2H4z"/>
                </svg>
              </button>
                <div ref={dropdownRef} className={`dropdown-menu ${showMenu ? 'show' : ''}`}>
                <img src={logo} alt="Logo" className="dropdown-logo" />
                  <div className="dropdown-content">
                    <Link to="/" onClick={toggleMenu}>Dashboard</Link>
                    <Link to="/users" onClick={toggleMenu}>Users</Link>
                    <Link to="/branches" onClick={toggleMenu}>Branches</Link>
                    <Link to="/receiver_subscriptions" onClick={toggleMenu}>Display Receiver Subscriptions</Link>
                    <Link to="/receiver_subscriptions_form" onClick={toggleMenu}>DRS Form</Link>
                    <Link to="/service_quoter" onClick={toggleMenu}>Service Quoter</Link>
                    <Link to="/branch_locations" onClick={toggleMenu}>Branch Locations</Link>
                    <Link to="/closest_branch" onClick={toggleMenu}>Closest Branch</Link>
                  </div>
                </div>
              </div>
              <div className='logout-button'>
                <button onClick={logout}>Logout</button>
            </div>
          </nav>
            {/* add permissions.includes('...') for each of these */}
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/users/:username" element={<UserDetail />} />
              <Route path="/branches" element={<BranchesPage />} />
              <Route path="/receiver_subscriptions" element={<ReceiverSubscriptionsPage />} />
              <Route path="/receiver_subscriptions_form" element={<ReceiverSubscriptionForm />} />
              <Route path="/branches/:name" element={<BranchDetail />} />
              <Route path="/thank-you" element={<ThankYouPage />} />
              <Route path="/branch_locations" element={<BranchLocations />} />
              <Route path="/service_quoter" element={<ServiceQuoter />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/closest_branch" element={<ClosestBranch />} />
              {/* <ProtectedRoute path="/admin" component={AdminPage} /> */}
            </Routes>
          </>
        ) : (
          <LoginPage onLoginSuccess={handleLoginSuccess} onLoginFailure={handleLoginFailure} />
        )}
        <Footer />
      </Router>
    </GoogleOAuthProvider>
  );
}

function Dashboard() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((currentImageIndex + 1) % images.length);
    }, 10000);  // Change image every 3 seconds

    return () => {
      clearInterval(timer);  // Clean up the interval on unmount
    };
  }, [currentImageIndex]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: 'auto' }}>
      <img src={images[currentImageIndex]} alt="Cycling image" style={{ width: '95%', height: 'auto' }} />
    </div>
  );
}

export default App;

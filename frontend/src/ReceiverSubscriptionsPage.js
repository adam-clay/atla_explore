import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ReceiverSubscriptionsPage() {
  const [subscriptions, setsubscriptions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/drs_subscriptions')
      .then(response => setsubscriptions(response.data))
      .catch(error => console.error('Error fetching subscriptions:', error));
  }, []);

  return (
    <div>
      <h1>Subscriptions</h1>
      <ul>
      {subscriptions.map(subscription => (
        <li key={subscription.type}>
          <Link to={`/subscriptions/${subscription.type}`} className="subscription-item">
              <span>{subscription.type}</span> -&nbsp;
              <span>{ subscription.duration}</span> -&nbsp;
              <span>{ subscription.subscription_id}</span>
          </Link>
        </li>
      ))}
      </ul>
    </div>
  );
}

export default ReceiverSubscriptionsPage;

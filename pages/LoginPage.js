import React from 'react';
import { GoogleLogin, GoogleOAuthProvider } from 'react-oauth-google';
import bgImg from '../images/bg-material.png';
import card_bgImg from '../images/bg-pattern.png';
import cardLogo from '../images/at-logo.png';

// functional component that accepts props for handling login success/failure
const LoginPage = ({ onLoginSuccess, onLoginFailure }) => {
    return (
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <div className="login-page" style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          overflow: 'hidden'
        }}>
          <div style={{
            backgroundImage: `url(${bgImg})`,
            backgroundSize: 'cover',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          }} />
          <div className="login-container" style={{
            position: 'relative',
            width: '400px',
            height: '400px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1
          }}>
            <img src={cardLogo} alt="Card" style={{
              position: 'absolute',
              top: '15%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '80%',
              height: 'auto'
            }} />
            <p>Please log in to continue</p>
            <GoogleLogin
              onSuccess={onLoginSuccess}
              onError={onLoginFailure}
              useOneTap
            />
          </div>
        </div>
      </GoogleOAuthProvider>
    );
  };
  
  export default LoginPage;
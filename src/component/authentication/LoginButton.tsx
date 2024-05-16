// src/components/LoginButton.tsx
import React, { useState, useEffect } from 'react';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from './authConfig';
import { InteractionRequiredAuthError } from '@azure/msal-browser';

const LoginButton: React.FC = () => {
    const { instance, accounts } = useMsal();
    const [userDetails, setUserDetails] = useState<{ name: string, email: string } | null>(null);
    const [showDropdown, setShowDropdown] = useState(false);

    const handleLogin = () => {
      instance.loginPopup(loginRequest).then(() => {
          getUserProfile();
      }).catch(e => {
          console.error(e);
      });
    };

    const getUserProfile = async () => {
      try {
          const account = accounts[0];
          const response = await instance.acquireTokenSilent({
              ...loginRequest,
              account: account
          });
          const userResponse = await fetch('https://graph.microsoft.com/v1.0/me', {
              headers: {
                  Authorization: `Bearer ${response.accessToken}`
              }
          });
          const userData = await userResponse.json();
          setUserDetails({ name: userData.displayName, email: userData.mail });
      } catch (e) {
          if (e instanceof InteractionRequiredAuthError) {
              instance.acquireTokenPopup(loginRequest).then(() => {
                  getUserProfile();
              });
          } else {
              console.error(e);
          }
      }
    };

    const handleLogout = () => {
      instance.logoutPopup().catch(e => {
          console.error(e);
      });
    };

    useEffect(() => {
      if (accounts.length > 0 && !userDetails) {
          getUserProfile();
      }
    }, [accounts]);

    return (
      <div style={{ position: 'absolute', top: 10, right: 10 }}>
          {userDetails ? (
              <div>
                  <span
                      onClick={() => setShowDropdown(!showDropdown)}
                      style={{ cursor: 'pointer' }}
                  >
                      Welcome, {userDetails.name} ({userDetails.email})
                  </span>
                  {showDropdown && (
                      <div
                          style={{
                              position: 'absolute',
                              right: 0,
                              backgroundColor: 'white',
                              border: '1px solid #ccc',
                              boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
                              zIndex: 1000
                          }}
                      >
                          <button onClick={handleLogout} style={{ width: '100%' }}>
                              Sign Out
                          </button>
                      </div>
                  )}
              </div>
          ) : (
              <button onClick={handleLogin}>Login</button>
          )}
      </div>
    );
};

export default LoginButton;

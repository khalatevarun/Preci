import React from 'react';
import Amplify from 'aws-amplify';
import {
  AmplifyAuthenticator,
  AmplifySignUp,
  AmplifySignOut,
} from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import awsconfig from './aws-exports';
import { useState, useEffect } from 'react';

Amplify.configure(awsconfig);

const App = () => {
  const [authState, setAuthState] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  return authState === AuthState.SignedIn && user ? (
    <div className="App">
      <div>Hello, {user.username}</div>
      <AmplifySignOut />
    </div>
  ) : (
    <AmplifyAuthenticator>
      <AmplifySignUp
        slot="sign-up"
        formField={[
          { type: 'username' },
          { type: 'password' },
          { type: 'email' },
        ]}
      />
    </AmplifyAuthenticator>
  );
};

export default App;

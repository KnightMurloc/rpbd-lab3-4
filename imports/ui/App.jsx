import React from 'react';
import {Echo} from "./Echo";
import {LoginForm} from "./LoginForm";
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

export const App = () => {
  const user = useTracker(() => Meteor.user());
  console.log(user)

  const logout = e => {
    Meteor.logout();
  };

  return <div>
    {user ? (
        <div>
          <h1>Welcome {user.username}</h1>
          <button onClick={logout}>logout</button>
          <Echo/>
        </div>
      ) : (
          <LoginForm/>
      )
    }
  </div>
};

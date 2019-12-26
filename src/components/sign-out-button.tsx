import 'firebase/auth';

import firebase from 'firebase/app';
import * as React from 'react';

export const SignOutButton = () => {
  const onClickHandler = () => {
    firebase.auth().signOut();
  };

  return <button onClick={onClickHandler}>Sign-out する</button>;
};

export default SignOutButton;

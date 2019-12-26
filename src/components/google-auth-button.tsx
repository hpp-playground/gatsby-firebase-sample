import 'firebase/auth';

import firebase from 'firebase/app';
import React from 'react';

export const GoogleAuthButton = () => {
  const onClickHandler = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };

  return <button onClick={onClickHandler}>GoogleアカウントでSign-in</button>;
};

export default GoogleAuthButton;

import 'firebase/auth';

import firebase from 'firebase/app';
import { useEffect, useState } from 'react';
import { createContainer } from 'unstated-next';

type User = {
  readonly uid: string;
  readonly name: string;
};

const config = {
  apiKey: 'AIzaSyBYqOHpfL1ondvkMLJvRdnrRW2tET9vl2E',
  authDomain: 'gatsby-firebase-sample.firebaseapp.com',
  databaseURL: 'https://gatsby-firebase-sample.firebaseio.com',
  projectId: 'gatsby-firebase-sample',
  storageBucket: 'gatsby-firebase-sample.appspot.com',
  messagingSenderId: '670176804221',
  appId: '1:670176804221:web:58f9fcd81e0c74607b2014',
  measurementId: 'G-E49FPRK8PD'
};
firebase.initializeApp(config);

const useFirebaseAuthContainer = () => {
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.info(`firebase: authorized (uid: ${user.uid})`);
        const userName = user.displayName ? user.displayName : '名無し';
        setUser({ uid: user.uid, name: userName });
      } else {
        console.info(`firebase: unauthorized`);
        setUser(null);
      }
    });

    return () => {
      console.info(`firebase: unsubscribe onAuthStateChanged`);
      unsubscribe();
    };
  }, []);

  return { user };
};

export const FirebaseAuthContainer = createContainer(useFirebaseAuthContainer);

export default FirebaseAuthContainer;

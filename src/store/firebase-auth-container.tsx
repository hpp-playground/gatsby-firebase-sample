import 'firebase/auth';

import firebase from 'firebase/app';
import { useEffect, useState } from 'react';
import { createContainer } from 'unstated-next';

type User = {
  readonly uid: string;
  readonly name: string;
};

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

import { WrapWithProvider } from './src/components';
export const wrapRootElement = WrapWithProvider;

import firebase from 'firebase/app';

export const onClientEntry = () => {
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
};

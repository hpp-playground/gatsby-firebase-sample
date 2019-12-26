import React from 'react';

import Layout from '../layouts';
import { FirebaseAuthContainer, SwitchContainer } from '../store';

export const WrapWithProvider = ({ element }: any) => (
  <FirebaseAuthContainer.Provider>
    <SwitchContainer.Provider>
      <Layout>{element}</Layout>
    </SwitchContainer.Provider>
  </FirebaseAuthContainer.Provider>
);

export default WrapWithProvider;

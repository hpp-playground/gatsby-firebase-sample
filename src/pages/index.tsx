import React from 'react';

import styled from '@emotion/styled';

import { GoogleAuthButton, SEO, SignOutButton, TodoContents } from '../components';
import { FirebaseAuthContainer } from '../store';
import baseStyle from '../styles/base-style';

const Index: React.FCX = ({ className }) => {
  const { user } = FirebaseAuthContainer.useContainer();
  return (
    <main className={className}>
      {user ? (
        <>
          <TodoContents user={user} />

          <div>
            <SignOutButton />
          </div>
        </>
      ) : user === null ? (
        <>
          <section>test</section>
          <GoogleAuthButton />
        </>
      ) : (
        <div>not logged in</div>
      )}
    </main>
  );
};

const StyledIndex = styled(Index)`
  ${baseStyle};
  padding-top: 20rem;
`;

export default () => (
  <>
    <SEO title='Top' pathname='/' />
    <StyledIndex />
  </>
);

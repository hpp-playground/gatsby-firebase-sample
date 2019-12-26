import 'firebase/firestore';

import firebase from 'firebase/app';
import { useEffect, useState } from 'react';

export interface Todo {
  readonly id?: string;
  readonly text: string;
  readonly completed: boolean;
  readonly createdAt?: number;
  readonly updatedAt?: number;
}

const toModel = (id: string, data: firebase.firestore.DocumentData) => {
  const { text, completed } = data;
  const createdAt = data.createdAt
    ? data.createdAt.toDate().getTime()
    : undefined;
  const updatedAt = data.updatedAt
    ? data.updatedAt.toDate().getTime()
    : undefined;
  return {
    id,
    text,
    completed,
    createdAt,
    updatedAt
  };
};

export const useFirestoreTodos = (uid: string) => {
  const [todos, setTodos] = useState<Todo[]>();

  useEffect(() => {
    const collection = firebase
      .firestore()
      .collection(`users`)
      .doc(uid)
      .collection(`todos`);

    let query: firebase.firestore.Query = collection.orderBy(
      `createdAt`,
      `desc`
    );

    const unsubscribe = query.onSnapshot(snapshot => {
      console.info(`firestore: receive todos: size=${snapshot.docs.length}`);

      const todos = snapshot.docs.map(doc => toModel(doc.id, doc.data()));
      setTodos(todos);
    });

    return () => {
      console.info(`firestore: unsubscribe onSnapshot:todos`);
      unsubscribe();
    };
  }, []);

  return todos;
};

export default useFirestoreTodos;

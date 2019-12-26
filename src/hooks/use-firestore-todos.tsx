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

export const todosCollection = (uid: string) =>
  firebase
    .firestore()
    .collection(`users`)
    .doc(uid)
    .collection(`todos`);

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
    const collection = todosCollection(uid);

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

  const addTodo = async (uid: string, todoName: string) => {
    const checkedName = todoName.trim();
    if (!checkedName) {
      return;
    }
    await todosCollection(uid)
      .add({
        text: todoName,
        completed: false,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      })
      .catch(error => {
        console.error('Error add todo to Firebase Database', error);
      });
    return;
  };

  const updateTodo = async (
    uid: string,
    todoId: string,
    completed: boolean
  ) => {
    await todosCollection(uid)
      .doc(todoId)
      .update({
        completed,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      })
      .catch(error => {
        console.error('Error update todo to Firebase Database', error);
      });
    return;
  };

  const deleteTodo = async (uid: string, todoId: string) => {
    await todosCollection(uid)
      .doc(todoId)
      .delete()
      .catch(error => {
        console.error('Error delete todo to Firebase Database', error);
      });
    return;
  };

  return { todos, addTodo, updateTodo, deleteTodo };
};

export default useFirestoreTodos;

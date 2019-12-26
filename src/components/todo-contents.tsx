import React from 'react';

import { useFirestoreTodos } from '../hooks';
import AddTodoForm from './add-todo-form';
import TodoList from './todo-list';

type Props = {
  user: {
    readonly uid: string;
    readonly name: string;
  };
};

export const TodoContents = ({ user }: Props) => {
  const { todos, addTodo, updateTodo, deleteTodo } = useFirestoreTodos(
    user.uid
  );

  const handleAddTodoSubmit = async (todoName: string) => {
    await addTodo(user.uid, todoName);
  };

  const handleClickTodo = async (todo: any) => {
    await updateTodo(user.uid, todo.id, !todo.completed);
  };

  const handleClickDeleteTodo = async (todo: any) => {
    await deleteTodo(user.uid, todo.id);
  };

  return (
    <section>
      {todos ? (
        <>
          <AddTodoForm onSubmit={handleAddTodoSubmit} />
          <TodoList
            todos={todos}
            onClickTodo={handleClickTodo}
            onClickDeleteTodo={handleClickDeleteTodo}
          />
        </>
      ) : (
        <div>ろーでいんぐ</div>
      )}
    </section>
  );
};

export default TodoContents;

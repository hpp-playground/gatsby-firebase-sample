import * as React from 'react';

import { TodoListItem } from './todo-list-item';

type Props = {
  todos: any[];
  onClickTodo: (todo: object) => void;
  onClickDeleteTodo: (todo: object) => void;
};

export const TodoList = ({ todos, onClickTodo, onClickDeleteTodo }: Props) => (
  <ul>
    {todos.map(todo => (
      <TodoListItem
        key={todo.id}
        todo={todo}
        onClick={onClickTodo}
        onClickDelete={onClickDeleteTodo}
      />
    ))}
  </ul>
);

export default TodoList;

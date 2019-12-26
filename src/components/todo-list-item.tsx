import { Link } from 'gatsby';
import React, { useMemo } from 'react';

type Props = {
  todo: any;
  onClick: (todo: any) => void;
  onClickDelete: (todo: any) => void;
};

export const TodoListItem = ({ todo, onClick, onClickDelete }: Props) => {
  const handleOnClick = (_: React.SyntheticEvent<HTMLSpanElement>) => {
    onClick(todo);
  };

  const handleOnClickDelete = (_: React.SyntheticEvent<HTMLSpanElement>) => {
    onClickDelete(todo);
  };

  return useMemo(
    () => (
      <li>
        {todo.completed}
        <Link to={`/todos/${todo.id}/`}>{todo.text}</Link>
        <span onClick={handleOnClick}>
          {todo.completed ? `未了に戻す` : `完了にする`}
        </span>
        <span onClick={handleOnClickDelete}>削除する</span>
      </li>
    ),
    [todo]
  );
};

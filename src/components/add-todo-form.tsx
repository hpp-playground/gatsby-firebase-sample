import React from 'react';

export interface Props {
  onSubmit: (todoName: string) => void;
}

export const AddTodoForm = ({ onSubmit }: Props) => {
  const textInput = React.useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.SyntheticEvent<{}>) => {
    e.preventDefault();
    if (!textInput.current) {
      return;
    }
    onSubmit(textInput.current.value);
    textInput.current.value = '';
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' ref={textInput} />
      <button type='submit'>Add Todo</button>
    </form>
  );
};

export default AddTodoForm;

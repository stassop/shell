import React, { useState } from 'react';

import './TodoList.css';

export interface Todo {
  id: number,
  title: string,
}

interface TodoListProps {
  todos: Todo[],
  onSave: (id: number, text: string) => void,
  onDelete: (id: number) => void,
}

interface TodoItemProps {
  id: number,
  title: string,
  onSave: (id: number, text: string) => void,
  onDelete: (id: number) => void,
}

const TodoItem: React.FC<TodoItemProps> = ({ id, title, onSave, onDelete }: TodoItemProps) => {
  const [ text, setText ] = useState<string>(title);
  const [ isEditing, setIsEditing ] = useState<boolean>(false);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  }

  const saveEdit = () => {
    onSave(id, text);
    setIsEditing(false);
  }

  const deleteTodo = () => {
    onDelete(id);
  }

  const onChange = ({ target: { value: text }}: React.ChangeEvent<HTMLInputElement>) => {
    setText(text);
  };

  return (
    <div className="TodoItem">
      { isEditing &&
        <>
          <input className="TodoItem-input" type="text" value={text} onChange={onChange} />&nbsp;
          <button onClick={saveEdit}>Save</button>
        </>
      }
      { !isEditing &&
        <>
          <span className="TodoItem-title">{title}</span>&nbsp;
          <button onClick={toggleEdit}>Edit</button>&nbsp;
          <button onClick={deleteTodo}>Delete</button>
        </>
      }
    </div>
  );
};

const TodoList: React.FC<TodoListProps> = ({ todos, onSave, onDelete }: TodoListProps) => (
  <div className="TodoList">
    { todos.map(todo => (
        <TodoItem
          key={todo.id}
          { ...todo }
          onSave={onSave}
          onDelete={onDelete}
        />
      ))
    }
  </div>
);

export default TodoList;

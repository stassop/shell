import React, { useState } from 'react';

import '../styles/TodoList.css';

export interface Todo {
  id: number,
  title: string,
}

interface TodoListProps {
  todos: Todo[],
  onEdit: (id: number, text: string) => void,
  onDelete: (id: number) => void,
}

interface TodoItemProps {
  id: number,
  title: string,
  onEdit: (id: number, text: string) => void,
  onDelete: (id: number) => void,
}

const TodoItem: React.FC<TodoItemProps> = ({ id, title, onEdit, onDelete }: TodoItemProps) => {
  const [ text, setText ] = useState<string>(title);
  const [ isEditing, setIsEditing ] = useState<boolean>(false);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  }

  const editTodo = () => {
    onEdit(id, text);
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
          <button onClick={editTodo}>Save</button>
        </>
      }
      { !isEditing &&
        <>
          <div className="TodoItem-title">{title}</div>&nbsp;
          <button onClick={toggleEdit}>Edit</button>&nbsp;
          <button onClick={deleteTodo}>Delete</button>
        </>
      }
    </div>
  );
};

const TodoList: React.FC<TodoListProps> = ({ todos, onEdit, onDelete }: TodoListProps) => (
  <div className="TodoList">
    { todos.map(todo => (
        <TodoItem
          key={todo.id}
          { ...todo }
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))
    }
  </div>
);

export default TodoList;

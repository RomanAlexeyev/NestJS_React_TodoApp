import React from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_TODO, DELETE_TODO } from '../mutations/todo';
import './styles/item.css';

import tick from '../assets/svg/tick_icon.svg';
import edit from '../assets/svg/edit_icon.svg';
import remove from '../assets/svg/remove_icon.svg';
import { Todo, IModal } from '../App';

interface ItemProps {
  todo: Todo;
  refetch: () => void;
  setShowModal: React.Dispatch<React.SetStateAction<IModal>>;
}

const toString = (date: Date): string => {
  return new Date(date).toLocaleDateString('ru-RU');
};

const TodoItem = ({ todo, refetch, setShowModal }: ItemProps) => {
  const [updateTodo] = useMutation(UPDATE_TODO);
  const [deleteTodo] = useMutation(DELETE_TODO);

  const completeHandler = () => {
    updateTodo({
      variables: {
        id: todo._id,
        input: {
          completed: !todo.completed,
        },
      },
    }).then(() => {
      refetch();
    });
  };

  const removeHandler = () => {
    deleteTodo({
      variables: {
        id: todo._id,
      },
    }).then(() => {
      refetch();
    });
  };
  return (
    <div className="todo-item">
      <div className="todo-item-inner">
        <div className="todo-item-complete-button-container">
          <button
            className={`todo-item-complete-button ${
              todo.completed ? 'completed' : ''
            }`}
            onClick={() => completeHandler()}
          >
            <img src={tick} alt="" className="tick-icon icon" />
          </button>
        </div>
        <div className="todo-item-body">
          <p className="body-text">
            {todo.body}{' '}
            <div
              className={`todo-item-body-liner ${
                todo.completed ? 'completed' : ''
              }`}
            ></div>
          </p>
        </div>
        <div className="todo-item-deadline">{toString(todo.deadline)}</div>
        <div className="todo-item-edit-button-container">
          <button
            className="todo-item-edit-button"
            onClick={() => setShowModal({ type: 'edit', id: todo._id })}
          >
            <img src={edit} alt="" className="edit-icon icon" />
          </button>
        </div>
      </div>
      <div className="todo-item-delete-button-container">
        {todo.completed && (
          <button
            className="todo-item-delete-button"
            onClick={() => removeHandler()}
          >
            <img src={remove} alt="" className="remove-icon icon" />
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoItem;

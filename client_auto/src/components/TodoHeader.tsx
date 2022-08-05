import React from 'react';
import { Todo, IModal } from '../App';
import './styles/header.css';

interface TodoProps {
  todos: Todo[];
  setShowModal: React.Dispatch<React.SetStateAction<IModal>> 
}

const TodoHeader = ({ todos, setShowModal }: TodoProps) => {
  const getCurrentDate = (): string => {
    const date: Date = new Date();
    const currentDay: string = date.toLocaleDateString('ru-RU', {
      weekday: 'long',
    });
    return (
      currentDay.charAt(0).toUpperCase() +
      currentDay.slice(1) +
      ', ' +
      date.toLocaleDateString('ru-RU')
    );
  };

  return (
    <div className="header">
      <div className="header-info">
        <div className="current-date">{getCurrentDate()}</div>
        <div className="current-todos">
          Количество ToDo: {todos.length}; активных:{' '}
          {todos.filter((todo) => !todo.completed).length}
        </div>
      </div>
      <div className="button-container">
        <button className="add-button" onClick={() => setShowModal({type: 'add'})}></button>
      </div>
    </div>
  );
};

export default TodoHeader;

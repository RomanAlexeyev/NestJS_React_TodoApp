import React, { useState, MouseEvent, ChangeEvent } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_TODO, UPDATE_TODO } from '../mutations/todo';
import { ModalType, IModal, Todo } from '../App';
import './styles/modal.css';

interface InputBody {
  body: string;
  deadline: Date;
}

interface ModalProps {
  todo: Todo;
  type: ModalType;
  setShowModal: React.Dispatch<React.SetStateAction<IModal>>;
  refetch: () => void;
}

const toDateInputValue = (date: Date): string => {
  const local = date.toLocaleDateString('ru-RU');
  return local.split('.').reverse().join('-');
};

const initState: InputBody = {
  body: '',
  deadline: new Date(),
};

const TodoModal = ({ type, todo, setShowModal, refetch }: ModalProps) => {
  const [inputBody, setInputBody] = useState<InputBody>(
    todo ? { body: todo.body, deadline: new Date(todo.deadline) } : initState,
  );
  const [valid, setValid] = useState<boolean>(true);
  const [mutateTodo] = useMutation(type === 'add' ? ADD_TODO : UPDATE_TODO);

  const onChange = (
    e: ChangeEvent<HTMLInputElement>,
    changeType: string,
  ): void => {
    if (changeType === 'body') {
      setInputBody((prev) => ({
        ...prev,
        body: e.target.value,
      }));
      setValid(true);
    }

    if (changeType === 'date') {
      setInputBody((prev) => ({
        ...prev,
        deadline: new Date(e.target.value),
      }));
    }
  };

  const onClose = (): void => {
    setInputBody(initState);
    setShowModal({ type: null });
  };

  const validateInput = (): boolean => {
    if (inputBody.body === '') {
      setValid(false);
      return false;
    } else {
      return true;
    }
  };

  const clickHandler = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (!validateInput()) return;
    mutateTodo({
      variables: {
        id: todo?._id,
        input: {
          body: inputBody.body,
          deadline: inputBody.deadline,
        },
      },
    }).then(() => {
      onClose();
      refetch();
    });
  };

  return (
    <div className="todo-modal">
      <div className="todo-modal-title">
        {type === 'add' ? 'Добавить' : 'Редактировать'} ToDo
      </div>
      <div className="todo-modal-close" onClick={onClose}></div>
      <form className="todo-modal-form">
        <div className="todo-modal-hints">
          <div className="todo-modal-hint-body">Что предстоит сделать</div>
          <div className="todo-modal-hint-date">Дедлайн</div>
        </div>
        <div className="todo-modal-input">
          <input
            type="text"
            className="todo-modal-input-body custom-input"
            placeholder="Введите текст..."
            value={inputBody.body}
            onChange={(e) => onChange(e, 'body')}
          />
          <div className="todo-modal-input-date-container">
            <input
              type="date"
              className="todo-modal-input-date custom-input"
              value={toDateInputValue(inputBody.deadline)}
              onChange={(e) => onChange(e, 'date')}
            />
          </div>
        </div>
        <div className="todo-modal-validation">
          {!valid && 'Вы забыли указать, что предстоит сделать'}
        </div>
        <button className="submit-button" onClick={(e) => clickHandler(e)}>
          {type === 'add' ? 'Добавить' : 'Сохранить'}
        </button>
      </form>
    </div>
  );
};

export default TodoModal;

import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { GET_TODOS } from './query/todo';
import TodoItem from './components/TodoItem';
import TodoHeader from './components/TodoHeader';
import TodoModal from './components/TodoModal';
import './styles/app.css';

export interface Todo {
  _id: string;
  body: string;
  deadline: Date;
  completed: boolean;
}

export type ModalType = 'add' | 'edit' | null;

export interface IModal {
  type: ModalType;
  id?: string;
}

const App = () => {
  const { data, loading, error, refetch } = useQuery(GET_TODOS);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [showModal, setShowModal] = useState<IModal>({ type: null });

  useEffect(() => {
    if (!loading) {
      setTodos(data.getTodos);
    }
    if (error) {
      refetch();
    }
  }, [data, error]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app">
      <TodoHeader todos={todos} setShowModal={setShowModal} />
      {todos.length > 0 ? (
        <div className="todo-list">
          {todos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              refetch={refetch}
              setShowModal={setShowModal}
            />
          ))}
        </div>
      ) : (
        <div className="empty-screen">Пока что ни одной ToDo</div>
      )}
      {showModal.type && (
        <TodoModal
          type={showModal.type}
          todo={todos.filter((todo) => todo._id === showModal.id)[0]}
          setShowModal={setShowModal}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default App;

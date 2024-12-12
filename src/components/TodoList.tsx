import React from 'react';
import { observer } from 'mobx-react-lite';
import { todoStore } from '../stores/TodoStore';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';
import { LogOut } from 'lucide-react';
import { authStore } from '../stores/AuthStore';

const TodoList = observer(() => {
  const handleSignOut = async () => {
    try {
      await authStore.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
          <button
            onClick={handleSignOut}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Sign out
          </button>
        </div>
        
        <AddTodo />
        
        <div className="mt-8 space-y-4">
          {todoStore.todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
          {todoStore.todos.length === 0 && (
            <p className="text-center text-gray-500">No tasks yet. Add one above!</p>
          )}
        </div>
      </div>
    </div>
  );
});

export default TodoList;
import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { todoStore, Todo } from '../stores/TodoStore';
import { Pencil, Trash2, Check, X } from 'lucide-react';
import clsx from 'clsx';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem = observer(({ todo }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description);

  const handleUpdate = async () => {
    try {
      await todoStore.updateTodo(todo.id, {
        title: editTitle,
        description: editDescription,
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await todoStore.deleteTodo(todo.id);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleToggleComplete = async () => {
    try {
      await todoStore.toggleComplete(todo.id, !todo.completed);
    } catch (error) {
      console.error('Error toggling todo completion:', error);
    }
  };

  if (isEditing) {
    return (
      <div className="bg-white shadow rounded-lg p-4">
        <div className="space-y-2">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Task title"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Task description"
            rows={2}
          />
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={() => setIsEditing(false)}
            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <X className="h-4 w-4 mr-2" />
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Check className="h-4 w-4 mr-2" />
            Save
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={clsx(
      "bg-white shadow rounded-lg p-4 transition-all duration-200",
      todo.completed && "opacity-75"
    )}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggleComplete}
            className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <div>
            <h3 className={clsx(
              "text-lg font-medium text-gray-900",
              todo.completed && "line-through text-gray-500"
            )}>
              {todo.title}
            </h3>
            <p className={clsx(
              "mt-1 text-gray-500",
              todo.completed && "line-through"
            )}>
              {todo.description}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsEditing(true)}
            className="text-gray-400 hover:text-gray-500"
          >
            <Pencil className="h-5 w-5" />
          </button>
          <button
            onClick={handleDelete}
            className="text-red-400 hover:text-red-500"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
});

export default TodoItem;
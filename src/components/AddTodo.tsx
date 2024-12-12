import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { todoStore } from '../stores/TodoStore';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import { validateTodo } from '../utils/validation';

const AddTodo = observer(() => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const validation = validateTodo(title, description);
    if (!validation.isValid) {
      toast.error(validation.message!);
      return;
    }
    
    try {
      setIsSubmitting(true);
      await todoStore.addTodo(title, description);
      setTitle('');
      setDescription('');
      toast.success('Task added successfully!');
    } catch (error) {
      toast.error('Failed to add task');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Task Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Enter task title"
            maxLength={100}
            disabled={isSubmitting}
          />
          <p className="mt-1 text-sm text-gray-500">{title.length}/100</p>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Enter task description"
            maxLength={500}
            disabled={isSubmitting}
          />
          <p className="mt-1 text-sm text-gray-500">{description.length}/500</p>
        </div>
      </div>
      <div className="mt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Task
        </button>
      </div>
    </form>
  );
});

export default AddTodo;
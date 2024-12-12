import React from 'react';
import { observer } from 'mobx-react-lite';
import { todoStore } from '../stores/TodoStore';
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';

const Calendar = observer(() => {
  const today = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {format(today, 'MMMM yyyy')}
        </h2>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-500 dark:text-gray-400"
          >
            {day}
          </div>
        ))}
        {days.map((day) => {
          const tasksForDay = todoStore.todos.filter(
            (todo) => todo.dueDate && format(todo.dueDate, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
          );

          return (
            <button
              key={day.toString()}
              className={`
                p-2 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700
                ${format(day, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd')
                  ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-200'
                  : 'text-gray-700 dark:text-gray-200'}
              `}
            >
              <span className="block">{format(day, 'd')}</span>
              {tasksForDay.length > 0 && (
                <span className="block mt-1 text-xs bg-indigo-500 text-white rounded-full px-1">
                  {tasksForDay.length}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
});

export default Calendar;
import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { authStore } from './stores/AuthStore';
import { todoStore } from './stores/TodoStore';
import AuthForm from './components/AuthForm';
import TodoList from './components/TodoList';
import { Toaster } from 'react-hot-toast';
import { toastConfig } from './utils/toast-config';

const App = observer(() => {
  useEffect(() => {
    if (authStore.user) {
      todoStore.startListening();
    } else {
      todoStore.stopListening();
    }
  }, [authStore.user]);

  if (authStore.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <>
      <Toaster {...toastConfig} />
      {authStore.user ? <TodoList /> : <AuthForm />}
    </>
  );
});

export default App;
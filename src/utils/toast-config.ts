import { ToasterProps } from 'react-hot-toast';

export const toastConfig: ToasterProps = {
  position: 'top-center',
  duration: 4000,
  gutter: 8,
  toastOptions: {
    success: {
      className: '!bg-green-50 !text-green-800 !border !border-green-200',
      iconTheme: {
        primary: '#22c55e',
        secondary: '#ffffff',
      },
    },
    error: {
      className: '!bg-red-50 !text-red-800 !border !border-red-200',
      iconTheme: {
        primary: '#ef4444',
        secondary: '#ffffff',
      },
    },
  },
};
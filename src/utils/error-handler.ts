import toast from 'react-hot-toast';

interface FirebaseError {
  code: string;
  message: string;
}

const getFirebaseErrorMessage = (error: FirebaseError): string => {
  switch (error.code) {
    case 'auth/operation-not-allowed':
      return 'Email/password sign-in is not enabled. Please contact support.';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters long.';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      return 'Invalid email or password.';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later.';
    default:
      return error.message || 'An unexpected error occurred.';
  }
};

export const handleError = (error: any, customMessage?: string) => {
  console.error('Error details:', error);

  let displayMessage = customMessage || 'An error occurred';

  if (error?.code?.startsWith('auth/')) {
    displayMessage = getFirebaseErrorMessage(error as FirebaseError);
  }

  toast.error(displayMessage, {
    duration: 4000,
    position: 'top-right',
  });

  return error;
};
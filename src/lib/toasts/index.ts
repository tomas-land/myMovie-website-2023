import { toast, ToastOptions } from 'react-toastify';

export const toastSuccess = (message: string) => {
  toast.success(message, {
    position: 'top-right',
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    theme:'dark'
  } as ToastOptions);
};
export const toastError = (message: string) => {
  toast.error(message, {
    position: 'top-right',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    theme:'dark'

  } as ToastOptions);
};


export const toastInfo = (message: string) => {
  toast.info(message, {
    position: 'top-right',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    theme:'dark'

  } as ToastOptions);
};

export const toastWarning = (message: string) => {
  toast.warning(message, {
    position: 'top-right',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    theme:'dark'

  } as ToastOptions);
};


// const customStyles = {
//     backgroundColor: '#2a7a75', // Green background color
//     color: '#fff',              // White text color
//     fontWeight: 'bold',         // Bold text
//     fontSize: '1.5rem',
//     padding: '1rem',
//     borderRadius: '1rem',
//     textAlign: 'center' as const,
//     width: 'fit-content',
//     margin: '0 auto',
//     marginTop: '1rem',
//   };
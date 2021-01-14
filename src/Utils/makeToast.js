import { toast } from 'react-toastify';

const makeToast = (status, title) => {
   const toastTitle = title;
   switch (status) {
      case 'error':
         toast.error(`${toastTitle}`, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
         });
         break;
      case 'success':
         toast.success(`${toastTitle}`, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
         });
         break;

      default:
   }
};

export default makeToast;

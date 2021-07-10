import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

toast.configure();

const toastConfig = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
}

export const successCreateToast = () => toast.success('Movie created!', toastConfig)

export const failureCreateToast = () => toast.error('Movie is not created!', toastConfig);

export const successEditToast = () => toast.success('Movie edited!', toastConfig);

export const failureEditToast = () => toast.error('Movie is not eddited!', toastConfig);

export const deleteToast = () => toast.success('Movie deleted!', toastConfig);
import { toast } from "react-toastify";
export const successToast = (message) => {
  toast.success(message, {
    position: "bottom-center",
    autoClose: 500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

export const warningToast = (message) => {
  toast.warn(message, {
    position: "bottom-center",
    autoClose: 500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

export const errorToast = (message) =>{
    toast.error(message,{
        position: "bottom-center",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    })
}

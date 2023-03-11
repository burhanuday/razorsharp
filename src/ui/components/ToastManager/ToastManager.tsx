import { ToastContext } from "../../providers/Toast";
import "./ToastManager.css";

export const ToastManager = () => {
  return (
    <ToastContext.Consumer>
      {({ toasts }) => {
        return (
          <div className="toast__container">
            {toasts.map((toast) => (
              <div className="toast__message">{toast.message}</div>
            ))}
          </div>
        );
      }}
    </ToastContext.Consumer>
  );
};

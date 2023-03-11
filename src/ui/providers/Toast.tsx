import { createContext, FunctionComponent } from "preact";
import { useCallback, useContext, useState } from "preact/hooks";

type Toast = { message: string; id: string };

export const ToastContext = createContext({
  toasts: [] as Toast[],
  showToast: (message: string) => {},
});

export const ToastProvider: FunctionComponent = (props) => {
  const [toastNotifications, setToastNotifications] = useState<Toast[]>([]);

  const showToast = useCallback((message: string) => {
    const id = Date.now().toString();

    setToastNotifications((toastNotifications) => [
      ...toastNotifications,
      { message, id },
    ]);

    setTimeout(() => {
      setToastNotifications((toastNotifications) =>
        toastNotifications.filter((t) => t.id !== id)
      );
    }, 2000);
  }, []);

  return (
    <ToastContext.Provider value={{ toasts: toastNotifications, showToast }}>
      {props.children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const { showToast } = useContext(ToastContext);
  return showToast;
};

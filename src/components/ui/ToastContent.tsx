import { useEffect } from 'react';
import { useToastStore, type Toast } from '../../stores/useToastStore';
import { Icon } from './Icon';


const ToastItem = ({ toast } : {toast: Toast}) => {
  const removeToast = useToastStore((state) => state.removeToast);
  const { id, title, type, duration = 4000 } = toast;

  useEffect(() => {
    const timer = setTimeout(() => removeToast(id), duration);
    return () => clearTimeout(timer);
  }, [id, duration, removeToast]);

  return (
    <div
      className={`flex items-center gap-3 w-full p-2 rounded-md shadow-lg animate-in fade-in slide-in-from-right-5 duration-300 bg-white text-black border-b-2 border-green-900`}
    >
      <p>{type}</p> {/*todo: add icon */}
      <p className="flex-1 text-sm font-medium">{title}</p>
      <button 
        onClick={() => removeToast(id)} 
        className="text-lg opacity-50 hover:opacity-100 transition-opacity shrink-0 px-1"
      >
        <Icon name='close'/>
      </button>
    </div>
  );
};

export const ToastContent = () => {
  const toasts = useToastStore((state) => state.toasts);

  return (
    <div 
      className="fixed top-20 right-5 z-50 flex flex-col gap-3 w-full max-w-sm pointer-events-auto"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
};

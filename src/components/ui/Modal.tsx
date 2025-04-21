interface ModalProps {
    children: React.ReactNode;
    title?: string;
    open: boolean;
    onClose: () => void; // ✅ Change `onCancel` to `onClose`
    onOk?: () => Promise<void>; // ✅ Optional confirmation handler
    okText?: string;
  }
  
  const Modal: React.FC<ModalProps> = ({ title, children, open, onClose, onOk, okText = "OK" }) => {
    if (!open) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
          {children}
          <div className="flex justify-end mt-4">
            <button onClick={onClose} className="mr-2 px-4 py-2 text-gray-600">Cancel</button>
            {onOk && (
              <button onClick={onOk} className="px-4 py-2 bg-blue-600 text-white">{okText}</button>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  export default Modal;
  
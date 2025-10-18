import { cn } from "../../lib/utils";

const Modal = ({ isOpen, onClose, children, size = "md" }) => {
  if (!isOpen) return null;

  const sizes = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className={cn(
            "relative bg-white rounded-lg shadow-xl w-full animate-scale-in",
            sizes[size]
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

const ModalHeader = ({ children, className, onClose }) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between p-6 border-b",
        className
      )}
    >
      <div className="flex-1">{children}</div>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

const ModalTitle = ({ children, className }) => {
  return (
    <h2 className={cn("text-xl font-semibold text-primary-500", className)}>
      {children}
    </h2>
  );
};

const ModalContent = ({ children, className }) => {
  return <div className={cn("p-6", className)}>{children}</div>;
};

const ModalFooter = ({ children, className }) => {
  return (
    <div
      className={cn(
        "flex justify-end space-x-3 p-6 border-t bg-gray-50",
        className
      )}
    >
      {children}
    </div>
  );
};

export { Modal, ModalContent, ModalFooter, ModalHeader, ModalTitle };

import { cn } from "../../lib/utils";

const Input = ({ label, error, className, required, ...props }) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-rich-black mb-3">
          {label}
          {required && <span className="text-chestnut ml-1">*</span>}
        </label>
      )}
      <input
        className={cn(
          "block w-full px-4 py-3 border border-hookers-green/20 rounded-lg shadow-soft placeholder-hookers-green/70",
          "focus:outline-none focus:ring-2 focus:ring-hookers-green/40 focus:border-hookers-green",
          "transition-all duration-300 bg-white/80 backdrop-blur-sm",
          "hover:border-hookersGreen/30 hover:shadow-medium",
          error &&
            "border-chestnut/40 focus:ring-chestnut/40 focus:border-chestnut",
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-2 text-sm text-chestnut font-medium">{error}</p>
      )}
    </div>
  );
};

const Textarea = ({ label, error, className, required, ...props }) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-primary-500 mb-2">
          {label}
          {required && <span className="text-danger-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        className={cn(
          "block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400",
          "focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500",
          "transition-colors duration-200 resize-vertical",
          error &&
            "border-danger-500 focus:ring-danger-500 focus:border-danger-500",
          className
        )}
        rows={4}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-danger-500">{error}</p>}
    </div>
  );
};

const Select = ({
  label,
  error,
  options = [],
  className,
  required,
  placeholder = "Select an option",
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-primary-500 mb-2">
          {label}
          {required && <span className="text-danger-500 ml-1">*</span>}
        </label>
      )}
      <select
        className={cn(
          "block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm",
          "focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500",
          "transition-colors duration-200 bg-white",
          error &&
            "border-danger-500 focus:ring-danger-500 focus:border-danger-500",
          className
        )}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-danger-500">{error}</p>}
    </div>
  );
};

export { Input, Select, Textarea };

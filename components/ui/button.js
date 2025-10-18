import { cn } from "../../lib/utils";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className,
  disabled,
  loading,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-primary-500 text-primary-100 hover:bg-primary-900 focus:ring-primary-500 shadow-sm",
    secondary:
      "bg-secondary-500 text-white hover:bg-secondary-600 focus:ring-secondary-500 shadow-sm",
    accent:
      "bg-accent-500 text-white hover:bg-accent-600 focus:ring-accent-500 shadow-sm",
    danger:
      "bg-danger-500 text-white hover:bg-danger-600 focus:ring-danger-500 shadow-sm",
    outline:
      "border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-primary-100 focus:ring-primary-500",
    ghost: "text-primary-500 hover:bg-primary-100 focus:ring-primary-500",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {children}
    </button>
  );
};

export { Button };

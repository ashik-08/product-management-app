const ErrorState = ({ children }) => {
  return (
    <div className="flex items-center justify-center min-h-[10vh] col-span-full">
      <p className="mt-12 bg-red-50 text-red-500 text-center text-lg md:text-xl lg:text-2xl italic font-semibold px-8 py-14 rounded-xl">
        {children}
      </p>
    </div>
  );
};

export default ErrorState;

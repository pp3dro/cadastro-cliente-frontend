export default function Button({
  children,
  ...props
}: React.ButtonHTMLAttributes<any>) {
  return (
    <button
      className="text-white bg-primary-700 hover:bg-primary-800 dark: focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-secondary-700 dark:hover:bg-secondary-800 focus:outline-none dark:focus:ring-primary-800"
      {...props}
    >
      {children}
    </button>
  );
}

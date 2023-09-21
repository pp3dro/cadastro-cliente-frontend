export default function Button({ children, ...props}: React.ButtonHTMLAttributes<any>) {
    return <button  className="p-2 w-full border border-gray-400 rounded-md hover:bg-gray-700" {...props}>{children}</button>
};

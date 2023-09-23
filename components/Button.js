export default function Button({className, type, onClick, children}) {
    return (
        <button className={`
        rounded-full border-2 cursor-pointer py-4 px-8 
        text-sm text-white uppercase tracking-widest leading-3 button 
        ${className}`}
            type={type}
            onClick={onClick}>
            {children}
        </button>
    );
}
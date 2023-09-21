export default function TextButton({className, onClick, children}) {
    return (
        <button className={`
        py-2 cursor-pointer
        text-sm text-slate-600 uppercase tracking-widest leading-3 textButton
        ${className}`}
            onClick={onClick}>
            {children}
        </button>
    );
}
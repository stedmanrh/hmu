export default function TextButton({className, style, type, onClick, children}) {
    return (
        <button className={`
        py-2 cursor-pointer
        text-sm text-slate-600 uppercase tracking-widest leading-3 textButton
        ${className}`}
            style={style}
            type={type}
            onClick={onClick}>
            {children}
        </button>
    );
}
export default function TextButton({className, style, onClick, children}) {
    return (
        <button className={`
        py-2 cursor-pointer
        text-sm text-slate-600 uppercase tracking-widest leading-3 textButton
        ${className}`}
            style={style}
            onClick={onClick}>
            {children}
        </button>
    );
}
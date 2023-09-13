export default function TextButton(props) {
    return (
        <button className={`
        py-2 cursor-pointer
        text-sm text-slate-600 font-medium uppercase tracking-widest leading-3 textButton
        ${props.className}`}
            onClick={props.onClick}>
            {props.children}
        </button>
    );
}
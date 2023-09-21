export default function Button(props) {
    return (
        <button className={`
        rounded-full border-2 cursor-pointer py-4 px-8 
        text-sm text-white uppercase tracking-widest leading-3 button 
        ${props.className}`}
            onClick={props.onClick}>
            {props.children}
        </button>
    );
}
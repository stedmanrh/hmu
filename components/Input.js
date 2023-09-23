export default function Input(props) {
    return (
        <label className="mb-4">
            <div className="mb-1 text-slate-600">{props.label}</div>
            <input className="py-2 px-3 w-full max-w-md text-lg border rounded-md border-slate-300 text-slate-800
                placeholder:text-slate-400
                focus:outline-none focus:border-purple-400 focus:shadow-[inset_0_0_0.25rem_rgb(216,180,254)]"
                autocorrect="off" autocapitalize="off" spellcheck="false"
                type={props.type} 
                name={props.name} 
                value={props.value} 
                placeholder={props.placeholder} 
                onChange={props.onChange} 
                required={props.required} />
        </label>
    )
}
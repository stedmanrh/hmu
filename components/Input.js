export default function Input(props) {
    return (
        <label className="mb-4">
            <span className="mb-1 text-slate-600">{props.label}</span>
            {props.required ?
                <input className="p-2 w-full max-w-md text-lg border rounded-md border-slate-300 text-slate-800
                placeholder:text-slate-400
                focus:outline-none focus:border-purple-500 focus:shadow-[inset_0_0_0.25rem_rgb(216,180,254)]"
                    type={props.type} name={props.name} value={props.value} placeholder={props.placeholder} onChange={props.onChange} required />
                : <input className="p-2 w-full max-w-md text-lg border rounded-md border-slate-300 text-slate-800
                placeholder:text-slate-400
                focus:outline-none focus:border-purple-500 focus:shadow-[inset_0_0_0.25rem_rgb(216,180,254)]"                    type={props.type} name={props.name} value={props.value} placeholder={props.placeholder} onChange={props.onChange} />
            }
        </label>
    )
}
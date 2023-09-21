import TextButton from "./TextButton"

export default function InstallModal(props) {

    const instructions = (<p className="text-base text-slate-600">Do the monkey with me! Do the monkey with me! Do the monkey with me! Do the monkey with me! </p>)

    return (
        <div className="fixed w-full h-full bg-black/[.15]">
            <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
            w-96 px-8 pt-6 pb-4 rounded-xl flex flex-col space-y-2
            bg-white shadow-2xl">
                <p className="text-lg font-medium uppercase tracking-widest text-purple-600">How to install</p>
                {instructions}
                <div class="text-right">
                    <TextButton className="mt-4" onClick={props.dismiss}>Dismiss</TextButton>
                </div>
            </div>
        </div>
    )
}
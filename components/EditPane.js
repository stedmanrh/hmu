import TextButton from "./TextButton";

export default function EditPane(props) {


    return (
        <div className="fixed top-16 right-8 bottom-16 left-8
        flex flex-col divide-y-2 divide-solid divide-white/75">
            <div className={`relative z-10 grow flex items-center justify-center animate-pulse editContact`}>
                <TextButton className="px-8 py-5 rounded-full bg-black/10
                active:bg-black/[.15] transition-all duration-100
                text-xl font-medium !border-none"
                    onClick={props.editContact}>Edit contact</TextButton>
            </div>
            <div className={`relative z-10 grow flex items-center justify-center animate-pulse editLinks`}>
                <TextButton className="px-8 py-5 rounded-full bg-black/10
                active:bg-black/[.15] transition-all duration-100
                text-xl font-medium !border-none"
                    onClick={props.editLinks}>Edit links</TextButton>
            </div>
        </div>
    )
}
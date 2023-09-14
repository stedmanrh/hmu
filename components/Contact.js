export default function Contact(props) {
    return (
        <header className="flex flex-col items-center space-y-6">
            <div className="w-20 h-20 rounded-full
            flex justify-center items-center shrink-0
            bg-white shadow-md
            text-5xl">
                {props.vibe.emoji}
            </div>
            <div className="text-3xl">
                {props.name}
            </div>
        </header>
    )
}
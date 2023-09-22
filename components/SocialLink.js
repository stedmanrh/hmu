export default function SocialLink(props) {
    return (
        <div className={`w-20 h-20 mb-8 mx-4 rounded-full
            flex justify-center items-center shrink-0
            bg-white shadow-md
            text-5xl ${props.className}`}
            onClick={props.onClick}
            data-displayName={props.displayName}
            data-label={props.label}
            data-url={props.url}
            data-type={props.type} >
        </div>
    )
}
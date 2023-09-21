import Modal from "./Modal";

function Instructions({ os }) {
    if (os == "ios") {
        return (
            <div className="text-base text-slate-600 space-y-3">
                <ol className="ml-5 list-decimal space-y-3">
                    <li>Open <span className="text-purple-600">hmu.world</span> in Safari.</li>
                    <li>Tap the <em className={`relative font-medium uppercase tracking-wide pl-5 ml-1 mr-0.5 ${styles.share}`}>share</em> button.</li>
                    <li>Tap <em className="font-medium uppercase tracking-wide">Add to home screen</em>.</li>
                </ol>
            </div>
        );
    } else if (os == "android") {
        return (
            <div className="text-base text-slate-600 space-y-3">
                <ol className="ml-5 list-decimal space-y-3">
                    <li>Open <span className="text-purple-600">hmu.world</span> in Chrome.</li>
                    <li>Tap the <em className="font-medium uppercase tracking-wide">install app</em> button.</li>
                </ol>
            </div>
        );
    } else return (
        <div className="text-base text-slate-600 space-y-3">
            <p>
                Tactful supports iOS and Android.
            </p>
            <ol className="ml-5 list-decimal space-y-3">
                <li>Open <span className="text-purple-600">hmu.world</span> on your mobile device <em className="font-medium uppercase tracking-wide">or</em> scan the QR code on the homepage with its camera.</li>
                <li>Tap the <em className="font-medium uppercase tracking-wide">install app</em> button.</li>
            </ol>
        </div>
    );
}

export default function InstallModal({ os, dismiss }) {

    return (
        <Modal title="Install Tactful" dismiss={dismiss}>
            <Instructions os={os} />
        </Modal >
    )
}
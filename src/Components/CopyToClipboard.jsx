import { useEffect, useState } from "react";

export default function CopyToClipboard({text}){
const [isCopied, setIsCopid] = useState(false);

async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setIsCopid(true);
}

useEffect(() => {
    if(isCopied) {
        const timOutId = setTimeout(() => setIsCopid(false),3000);
        return() => clearTimeout(timOutId);
        }
}, [isCopied]);

return(
    <>
    <button className="copy-button" type="button" onClick={handleCopy}>
        Copy
    </button>
    {isCopied && <span>Copied</span>}
    </>
)



}
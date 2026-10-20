import { useState } from "react";
import "./Color.css";

 export default function Color({color , onDeleteColor}) {
  const [isConfirming, setIsConfirming] = useState(false);

   return (
    <article className="color-card" style={{backgroundColor: color.hex, color: color.contrastText}}>
    
    <h3>{color.hex}</h3>
    <p>{color.role}</p>
    <p>Constrast: {color.contrastText}</p>
    {isConfirming ? (
      <>
        <p className="color-card-highlight">Are sure about deleting this Color 🤔?</p>
        <button type="button" onClick={() => setIsConfirming(false)}>
          Cancle 😰
        </button>
        <button type="button" onClick={() => onDeleteColor(color.id)}>Yes ␡ Delete </button>
      </>
    ) : (
      
        <button type="button" onClick={() => setIsConfirming(true)}>Delete ␡</button>
    )}
    </article>
   );
 }

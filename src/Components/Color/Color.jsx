import { useState } from "react";
import "./Color.css";
import { ColorForm } from "./ColorForm";
import CopyToClipboard from "../CopyToClipboard";

 export default function Color({color , onDeleteColor, onEditColor}) {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const cardStyle = {backgroundColor: color.hex, color: color.contrastText};

    if(isEditing){
     return(
     <article className="color-card" style={cardStyle}>

      <ColorForm 
        initialData={color}
        buttonText="Update color"
        onSubmitColor={(updated) => {
        onEditColor({...updated, id: color.id });
        setIsEditing(false);
        }}
      />
      <button type="button" onClick={() => setIsEditing(false)}>Cancle</button>

    </article>
     )
      

    }



   return (
    <article className="color-card" style={cardStyle}>
    
    <h3>{color.hex}</h3>
    <CopyToClipboard text={color.hex} />
    <p><b>Color Name: {color.role}</b></p>
    <p><b>Constrast: {color.contrastText}</b></p>
    
    {isConfirming ? (
      <>
        <p className="color-card-highlight">Are sure about deleting this Color 🤔?</p>
        <button type="button" onClick={() => setIsConfirming(false)}>
          Cancle 😰
        </button>
        <button type="button" onClick={() => onDeleteColor(color.id)}>Yes ␡ Delete </button>
      </>
    ) : (
      <>
        <button type="button" onClick={() => setIsConfirming(true)}>Delete ␡</button>
        <button type="button" onClick={() => setIsEditing(true)}>Edit ✍️</button>
        </>
    )}
    </article>
   );
 }

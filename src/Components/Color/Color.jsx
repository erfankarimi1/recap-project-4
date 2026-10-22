import { useState } from "react";
import "./Color.css";
import  ColorForm  from "./ColorForm";
import CopyToClipboard from "../CopyToClipboard";
import ContrastChecker from "../ContrastChecker";

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
      <button className="Cancel" type="button" onClick={() => setIsEditing(false)}>Cancel</button>

    </article>
     )
      

    }



   return (
    <article className="color-card" style={cardStyle}>
    
    <h3 className="hex-color">{color.hex}</h3>
    <CopyToClipboard text={color.hex} />
    <p className="color-name"><b>Color Name: {color.role}</b></p>
    <p className="constrast-text"><b>Constrast: {color.contrastText}</b></p>
    <ContrastChecker hex ={color.hex} contrastText={color.contrastText}/>
    
    {isConfirming ? (
      <>
        <p className="color-card-highlight">Are sure about deleting this Color 🤔?</p>
        <button className="delete-question" type="button" onClick={() => setIsConfirming(false)}>
          Cancel 😰
        </button>
        <button className="yes-delete-button" type="button" onClick={() => onDeleteColor(color.id)}>Yes ␡ Delete </button>
      </>
    ) : (
      <>
        <button className="delete-button" type="button" onClick={() => setIsConfirming(true)}>Delete ␡</button>
        <button className="edit-button" type="button" onClick={() => setIsEditing(true)}>Edit ✍️</button>
        </>
    )}
    </article>
   );
 }

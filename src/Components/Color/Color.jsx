import "./Color.css";

 export default function Color({color}) {
   return (<>
    <article className="color-card" style={{backgroundColor: color.hex, color: color.contrastText}}>
    
    <h3>{color.hex}</h3>
    <p>{color.role}</p>
    <p>Constrast: {color.contrastText}</p>

    </article>
   </>);
 }

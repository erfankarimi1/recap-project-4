import { useState } from "react";

export function ColorInput({name, label, defaultValue }){

    const [value, setValue] = useState(defaultValue);

    return(
        <>
            <label htmlFor="name" >{label}</label>
            <input 
            type="text"
            name={name}
            id = "name"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            />
            <input 
            type="color"
            aria-label={`${label} picker`}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            />
            
        </>
    );
}
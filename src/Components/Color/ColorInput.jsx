import { useState } from "react";

export function ColorInput({name, lable, defaultValue }){

    const [value, setValue] = useState(defaultValue);

    return(
        <>
            <lable>{lable}</lable>
            <input 
            type="text"
            name={name}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            />
            <input 
            type="color"
            aria-label={`${lable} picker`}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            />
            
        </>
    );
}
import { ColorInput } from "./ColorInput";

export function ColorForm({onSubmitColor,initialData= {role: "some color", hex:"#123456", contrastText: "#ffffff"}})
{

    function handleSubmit(event){
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        onSubmitColor(data);
    }
    
return(
    <form className="color-form" onSubmit={handleSubmit}>
        <label htmlFor="role">Role
            <br />
            <input 
            name="role"
            type="text"
            id="role"
            defaultValue={initialData.role}
            />
        </label>

        <br />

        <label htmlFor="hex">Hex
            <br />
            <ColorInput name="hex" id="hex" defaultValue={initialData.hex} />
        </label>

        <br />

        <label htmlFor="contrastText">ContrastText
            <br />
            <ColorInput name="contrastText" id="constrastText" defaultValue={initialData.contrastText} />
        </label>
        <br />
        <button type="submit">Add Color</button>
    </form>
);
}
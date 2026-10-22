export default function ThemeBar(
    { themes,
      selectedThemeId,
      onSelectTheme,
      onAddTheme,
      onDeleteTheme,
      onEditTheme,  
      }){

    const isDefaultTheme = selectedThemeId ===  "t1";
    return(<>
        <select
            aria-label="Theme"
            value={selectedThemeId}
            onChange={(event) => onSelectTheme(event.target.value)}
        >
           {themes.map((theme) => (
                <option key={theme.id} value={theme.id}>
                    {theme.name}
                </option>
            ))
           }
        </select>
        
        <button type="button" onClick={onAddTheme}>
            Add
        </button>
        <button  type="button" onClick={onDeleteTheme} disabled= {isDefaultTheme} >
            Delete
        </button>
        <button type="button" onClick={onEditTheme} disabled ={isDefaultTheme}>
            Edit
        </button>
    
    
    </>);

}
import { initialColors,initialThemes } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";
import { nanoid } from "nanoid";
import  ColorForm  from "./Components/Color/ColorForm";
import useLocalStorageState from "use-local-storage-state";
import { useState } from "react";
import  ThemeBar  from "./Components/Theme/Theme";
import  ThemeForm  from "./Components/Theme/ThemeForm";

function getThemeColorIds(theme) {
  // Normalize saved theme data so both color IDs and older color objects work. - Copilot
  return theme.colors.map((color) =>
    typeof color === "string" ? color : color?.id
  ).filter(Boolean);
}

function App() {
  const [colors, setColors] = useLocalStorageState("colors", {defaultValue: initialColors});
  const [themes , setThemes] = useLocalStorageState("themes", {defaultValue: initialThemes,}); 
  const [seletedThemeId, setSelectedThemeId] = useState("t1");
  const [themeMode , setThemeMode] = useState(null);
  const selectedTheme = 
        themes.find((theme) => theme.id === seletedThemeId) ?? themes[0]; /////  find the theme that matches the selected theme id 
      
  const selectedThemeColorIds = getThemeColorIds(selectedTheme);
  const themeColors = colors.filter((color) =>
    selectedThemeColorIds.includes(color.id)
  );
  
function handleAddTheme(name){
    const newTheme = {id: nanoid(), name, colors: []};
    setThemes([...themes, newTheme]);
    setSelectedThemeId(newTheme.id);
    setThemeMode(null);
}
function handleEditTheme(name){
  if(selectedTheme.id === "t1") return;
  setThemes(
    themes.map((theme) => theme.id === selectedTheme.id ? {...theme, name} : theme)
  );
setThemeMode(null);
}



function handleDeleteTheme(){
    if(selectedTheme.id === "t1") return;
    setColors(colors.filter((color) => !selectedThemeColorIds.includes(color.id)));
    // Remove the selected theme's colors by ID, then remove the theme itself. - Copilot
      //setColors function logic: delete the selected theme from the colors array and update the colors state 
    setThemes(themes.filter((theme) => theme.id !== selectedTheme.id)); //setThemes function logic: delete the selected theme from the themes array and update the themes state 
    setSelectedThemeId("t1");
    setThemeMode(null);
}
function handleSelectTheme(id){
    setSelectedThemeId(id);
    // Updating this ID changes both the dropdown selection and the displayed cards. - Copilot
} // an open form will never show the name of the wronge theme 



    function handleAddColor(data){
      const newColor = {id : nanoid(), ...data};
      setColors([newColor, ...colors])
      setThemes(themes.map((theme) => 
        theme.id === selectedTheme.id
          ? {...theme, colors: [...getThemeColorIds(theme), newColor.id]}
          : theme))
      // Store the new color's ID because theme.colors is a list of IDs. - Copilot
    }
    function handleDeleteColor(id){
      setColors(colors.filter((color) => color.id !== id));
      setThemes(themes.map((theme) => 
        theme.id === selectedTheme.id
          ? {...theme, colors: getThemeColorIds(theme).filter((colorId) => colorId !== id)}
          : theme)
      ); // setThemes function logic : 
      // Keep the theme's ID list in sync when a card is deleted. - Copilot
      // 1. map over the themes array 
      // 2. for each theme, map over the colors array 
      /* 3. for each color , if the color.id is equal to the id of the color that we want to delete, 
      return the color that is not the one we want to delete */
    }
    function handleEditColor(updatedColor){
      setColors(
        colors.map((color) => 
          color.id === updatedColor.id ? updatedColor : color)
      );
    }


  return (
    <main>
      <h1>Theme Creator</h1>
     {/* Use callbacks so these state updates run only after a button click. - Copilot  here is my comment it's 3:51 am  */ }
      <ThemeBar 
        themes={themes}
        selectedThemeId={selectedTheme.id}
        onSelectTheme={handleSelectTheme}
        onAddTheme={() => setThemeMode("add")}
        onDeleteTheme={() => setThemeMode("delete")}
        onEditTheme={() => setThemeMode("edit")}
    />

  {(themeMode === "add" || themeMode === "edit") && (
    <ThemeForm
            key={`${themeMode}-${selectedTheme.id}`}
            initialName={themeMode === "edit" ? selectedTheme.name : ""}
            buttonText={themeMode === "edit" ? "Save theme" : "Add theme"}
            onSubmitName={themeMode === "edit" ? handleEditTheme : handleAddTheme}
            onCancel={() => setThemeMode(null)}
        />
      )}

      {themeMode === "delete" && (
        <div>
          <p>Delete {selectedTheme.name} and its colors?</p>
          <button type="button" onClick={() => setThemeMode(null)}>
            Cancel
          </button>
          <button type="button" onClick={handleDeleteTheme}>
            Yes, delete
          </button>
        </div>
      )}
      

      <ColorForm onSubmitColor={handleAddColor} />

      {themeColors.length === 0 && 
      <p>No Colors left. Add a new one </p>}

    <section className="color-grid" >
      {themeColors.map((color) => (
        <Color 
        key= {color.id} 
        color={color} 
        onDeleteColor={handleDeleteColor}
        onEditColor={handleEditColor}
        />
        ))} 
    </section>
    </main>
  );
 // 

}
export default App;

import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";
import { useState } from "react";
import { nanoid } from "nanoid";
import { ColorForm } from "./Components/Color/ColorForm";


function App() {
  const [colors, setColors] = useState(initialColors);
    function handleAddColor(data){
      const newColor = {id : nanoid(), ...data};
      setColors([newColor, ...colors])
    }


  return (
    <main>
      <h1>Theme Creator</h1>
      <ColorForm  onSubmitColor={handleAddColor} />
      {colors.map((color) => (
        <Color key= {color.id} color={color} />
        ))}

    </main>
  );

}
export default App;




















// import useSWR from 'swr';


// const url = 'https://www.aremycolorsaccessible.com/api/are-they';

// async function fetcher(url) {
//  const res = await fetch(url);
//   // If the status code is not in the range 200-299,
//   // we still try to parse and throw it.
//   if (!res.ok) {
//     const error = new Error('An error occurred while fetching the data.')
//     // Attach extra info to the error object.
//     error.info = await res.json()
//     error.status = res.status
//     throw error
//   }
//   return res.json()
// }





// const {data : color,error, isLoading} = useSWR(url, fetcher);
    // console.log(color, isLoading, error);
    // if(isLoading){
    //    return <h2>Data is Loading ....</h2>;
    // }
    // if(error || !color){
    //  return <h2>Something went wrong...</h2>;
    // }

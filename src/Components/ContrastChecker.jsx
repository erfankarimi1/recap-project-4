import useSWR from 'swr'
const url = "https://webaim.org/resources/contrastchecker/?fcolor=";
async function fetcher(url){
  const res = await fetch(url)
  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.')
    // Attach extra info to the error object.
    error.info = await res.json()
    error.status = res.status
    throw error
  }
  return res.json()
}
function getContrastRating(result){
    if(result.AAA === "pass")  return  "Yup";
    if(result.AA === "pass") return "Kinda";
    else return "Nope";
}
export default function ContrastChecker({ hex, contrastText}) {
  const { data, isLoading, error } = useSWR(
    `${url}${contrastText.replace("#", "")}&bcolor=${hex.replace("#", "")}&api`,
    fetcher,
  );

    if(isLoading){
        return <h1 className='checking-contrast-text'> Checking Contrast...</h1>
    }
    if(error || !data){
        return <h1 className='error-text'>Could not check Contrast</h1>
    }

    return (
<main>
 <p className='contrast-checker'><b>Overall Contrast Score: {getContrastRating(data)}</b></p>
</main>
  );
}
    


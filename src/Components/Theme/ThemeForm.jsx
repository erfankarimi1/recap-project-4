 export  default function ThemeForm({initialName = "",buttonText,onSubmitName,onCancel,}) {
  function handleSubmit(event) {
    event.preventDefault();
    const name = new FormData(event.target).get("name").trim();
    if (!name) return;
    onSubmitName(name);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Theme name
        <input name="name" type="text" defaultValue={initialName} required />
      </label>
      <button type="submit">{buttonText}</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
}

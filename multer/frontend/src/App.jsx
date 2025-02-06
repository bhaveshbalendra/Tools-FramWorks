import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState();
  const upload = () => {
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post("http://localhost:3001/upload", formData)
      .then((res) => {
        console.log(res);
      })
      .catch((er) => console.log(er));
  };
  function handleChange(e) {
    setFile(e.target.files[0]);
  }
  return (
    <div>
      <input type="file" onChange={handleChange} />
      <button type="button" onClick={upload}>
        Upload
      </button>
    </div>
  );
}

export default App;

// import "./styles.css";
import { Web3Storage } from "web3.storage";
import { useState } from "react";

const apiToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEUxYjc5QTZmM0I0ZkY5M2FjYjgwYjc3YUI0NDUzQUJGMUUyNjkxMDciLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NDc5NjY2ODE5NTEsIm5hbWUiOiJkLWNoYXQifQ.4eEl-M2x2d7IA_DwloL4-T7RA_TwO_zN_UsOGDoVxfw";

const client = new Web3Storage({ token: apiToken });
let IMG_URL; 

const Upload = () => {
  const [file, setFile] = useState("");
  const handleUpload = async () => {
    console.log(document.getElementById("input").files[0]);
    var fileInput = document.getElementById("input");

    const rootCid = await client.put(fileInput.files, {
      name: "cat pics",
      maxRetries: 3
    });

    console.log(rootCid);

    const res = await client.get(rootCid);
    const files = await res.files();
    console.log(files);
    const url = URL.createObjectURL(files[0]);
    console.log(url);
    IMG_URL = url;
    setFile(url);
  };

  function copyText() {
    // Get the text field
    var copyText = document.getElementById("field1");
  
    // Select the text field
    copyText.select();
  
     // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);
  
    // Alert the copied text
    alert("Copied the text: " + copyText.value);
  }

  return (
    <div >
      <div>
        <h2 htmlFor="file" style={{fontFamily:'sans-serif'}}>Choose file to upload</h2>
        {/* <br /> */}
        <input type="file" id="input" name="file" multiple />
      </div>
      <br />
      <div className="upload-btn">
        <button onClick={handleUpload} className='btn'>Submit</button>
      </div>
      <br />
      <label style={{fontFamily:'sans-serif'}}>URL : </label>
      <input type="text" id="field1" value={IMG_URL}></input>
      
      <button id='copy-btn' onClick={copyText} className='btn'>Copy URL</button>
      <br />
      <br />
      <br />
      <h2 style={{fontFamily:'sans-serif'}}>Paste the copied link below</h2>
    </div>
  );
}

export default Upload;
export { IMG_URL };
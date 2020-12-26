import React, { useState, useRef, useEffect, useCallback } from "react";

import CloudUploadIcon from "@material-ui/icons/CloudUpload";

const Upload = ({ handleFile }) => {
  const [file, setFile] = useState();
  const filePickerRef = useRef();

  const pickImagehandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div>
      <input
        type="file"
        id="file"
        accept=".mp3"
        ref={filePickerRef}
        style={{ display: "none" }}
        onChange={(event) => {
          const file = event.target.files[0];
          setFile(file);
          handleFile(file);
        }}
      />
      {file ? <p>{file.name}</p> : null}

      {console.log(file)}
      <button
        className={`btn btn-sm btn-danger`}
        type="button"
        onClick={pickImagehandler}
      >
        Upload Song
      </button>
    </div>
  );
};

export default Upload;

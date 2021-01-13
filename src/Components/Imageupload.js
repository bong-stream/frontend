import React, { useRef, useState, useEffect } from "react";
import Demo from "../assets/demo.png";

// import Button from "../Button/index";

const Imageupload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState();

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedImage = async (evt) => {
    let pickedFile;
    let fileIsValid = isValid;

    if (evt.target.files && evt.target.files.length === 1) {
      pickedFile = evt.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid(false);
    }

    const base64 = (file) => {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
          // console.log(fileReader.result);
          resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
          reject(error);
        };
      });
    };

    const image = await base64(pickedFile);

    props.onInput(props.id, image);
  };

  const pickImageHandler = (evt) => {
    filePickerRef.current.click();
  };

  return (
    <div>
      <input
        // id={props.id}
        style={{ display: "none" }}
        type="file"
        accept=".jpg , .png , .jpeg"
        ref={filePickerRef}
        onChange={pickedImage}
      />
      <div>
        <div>
          <div>
            <img
              src={
                previewUrl
                  ? previewUrl
                  : `${props.imageSrc ? props.imageSrc : Demo}`
              }
              alt="Preview"
              className="img-thumbnail"
            />

            {!previewUrl && <p></p>}
          </div>
          <br />
          <button
            className="btn btn-sm btn-danger"
            type="button"
            text="Choose Image"
            onClick={pickImageHandler}
          >
            Choose Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default Imageupload;

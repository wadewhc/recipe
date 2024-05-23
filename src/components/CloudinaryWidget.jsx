// from Ajay tech share
// https://github.com/csci5117s24/Ajay-cloudinary-tech-share/tree/main

import { createContext, useEffect, useState } from "react";

const CloudinaryScriptContext = createContext();

function CloudinaryWidget({ uwConfig, setImgInfo }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      const uwScript = document.getElementById("uw");
      if (!uwScript) {
        const script = document.createElement("script");
        script.setAttribute("async", "");
        script.setAttribute("id", "uw");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(script);
      } else {
        setLoaded(true);
      }
    }
  }, [loaded]);

  const initializeCloudinaryWidget = () => {
    if (loaded) {
      var myWidget = window.cloudinary.createUploadWidget(
        uwConfig,
        (error, result) => {
          if (!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result.info);
            setImgInfo(result.info);
          }
        }
      );

      document.getElementById("upload_widget").addEventListener(
        "click",
        function () {
          myWidget.open();
        },
        false
      );
    }
  };

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <button
        id="upload_widget"
        className="button"
        onClick={initializeCloudinaryWidget}
      >
        Upload Photo or Fillin URL
      </button>
    </CloudinaryScriptContext.Provider>
  );
}
export { CloudinaryScriptContext };
export default CloudinaryWidget;
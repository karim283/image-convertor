import React, { useState } from "react";

function App() {
  const [image, setImage] = useState(null);
  const [convertedImage, setConvertedImage] = useState(null);
  const [optimizedImage, setOptimizedImage] = useState(null);
  const [size, setSize] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const convertToBlackAndWhite = () => {
    if (!image) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.src = image;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      const threshold = 128;
      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;

        const newColor = avg < threshold ? 0 : 255;
        data[i] = newColor;
        data[i + 1] = newColor;
        data[i + 2] = newColor;
      }

      ctx.putImageData(imageData, 0, 0);
      setConvertedImage(canvas.toDataURL());
      setOptimizedImage(null);
    };
  };

  const optimizeImage = () => {
    if (!convertedImage || !size) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.src = convertedImage;
    img.onload = () => {
      const newSize = parseInt(size, 10);
      canvas.width = newSize;
      canvas.height = newSize;
      ctx.drawImage(img, 0, 0, newSize, newSize);
      setOptimizedImage(canvas.toDataURL());
    };
  };

  return (
    <>
      <div className="min-h-screen w-full flex flex-col justify-center items-center">
        <div className="h-[30vh] flex justify-center items-center text-center m-5 text-white text-3xl">
          CONVERT YOUR IMAGE TO BLACK AND WHITE
        </div>
        <div className="m-5 sm:m-0 sm:flex justify-center items-center sm:gap-12 sm:pt-3">
          <div className="w-full h-72 shadow-white  flex justify-center items-center sm:w-[40vh] sm:h-[40vh] md:w-[50vh] md:h-[50vh] lg:w-[70vh] lg:h-[70vh] bg-white">
            {image ? (
              <img
                src={image}
                alt="Uploaded"
                className="w-full h-full object-fill"
              />
            ) : (
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleImageUpload}
                className="flex justify-center items-center underline text-black border-gray-300 cursor-pointer"
              />
            )}
          </div>
          <div className="w-full h-72 mt-8 sm:mt-0 shadow-white flex justify-center items-center sm:w-[40vh] sm:h-[40vh] md:w-[50vh] md:h-[50vh] lg:w-[70vh] lg:h-[70vh] bg-white">
            {convertedImage && (
              <img
                src={convertedImage}
                alt="Converted"
                className="w-full h-full object-fill"
              />
            )}
          </div>
        </div>
        <div className=" w-full flex justify-center items-center m-10 pt-3">
          <button
            onClick={convertToBlackAndWhite}
            className="text-white bg-[#FA8232] mr-20 ml-20 sm:m-0 w-full h-10 sm:w-40 sm:h-10 rounded"
          >
            Convert
          </button>
        </div>
        {convertedImage && (
          <div className="flex justify-center items-center m-10">
            <div className="sm:flex flex-col items-center w-full  ">
              {optimizedImage && (
                <div className="sm:flex justify-center items-center w-full shadow-white   sm:w-[80vh] sm:h-[80vh] mt-5">
                  <img
                    src={optimizedImage}
                    alt="Optimized"
                    className="w-full h-72 sm:h-[80vh] object-fill"
                  />
                </div>
              )}
              <div className="flex justify-center items-center m-10 pt-3">
                <input
                  type="number"
                  placeholder="Size"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="mr-2 p-2 text-black border rounded"
                />
                <button
                  onClick={optimizeImage}
                  className="text-white bg-[#FA8232] h-10 sm:w-40 rounded"
                >
                  Optimize
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;

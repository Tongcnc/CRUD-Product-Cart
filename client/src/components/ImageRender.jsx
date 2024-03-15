/* eslint-disable react/prop-types */
import { IoMdAddCircle } from "react-icons/io";
import { IoIosCloseCircle } from "react-icons/io";

function ImageRendering(props) {
  const handleFileChange = (e) => {
    props.change(e.target.files[0]);
  };

  return (
    <>
      <p>Product Picture</p>
      <div className="flex flex-row">
        {props.image === null && (
          <div>
            <label htmlFor="upload">
              <div className="cursor-pointer flex flex-col gap-4 items-center justify-center bg-white rounded-lg w-[200px] h-[200px] my-4">
                <IoMdAddCircle size={50} />
                <p className="text-md">Add Product</p>
                <input
                  id="upload"
                  name="image"
                  type="file"
                  onChange={handleFileChange}
                  accept="image/jpg, image/jpeg, image/png"
                  hidden
                />
              </div>
            </label>
          </div>
        )}
      </div>

      {props.image && (
        <div className="w-[200px] h-[200px] mb-[25px] relative">
          {typeof props.image === "string" && (
            <img
              src={
                typeof props.image === "string"
                  ? `http://localhost:5000/images/${props.image}`
                  : props.image
              }
              alt={props.name}
              className="w-[200px] h-[200px] rounded object-cover"
            />
          )}
          {typeof props.image === "object" &&
            Object.keys(props.image).map((avatarKey) => {
              const file = props.image[avatarKey];
              return (
                <div key={avatarKey} className="image-preview-container">
                  <img
                    className="image-preview"
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                  />
                </div>
              );
            })}
          <button
            className="flex items-center justify-center absolute -top-3 -right-2 rounded-full bg-white hover:bg-black"
            onClick={() => props.change(null)}
          >
            <IoIosCloseCircle size={30} color="red" />
          </button>
        </div>
      )}
    </>
  );
}

export default ImageRendering;

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";
import ImageRendering from "../components/ImageRender";

function CreateProductPage() {
  const navigate = useNavigate();

  const [product, setProduct] = useState("");
  const [code, setCode] = useState("");
  const [price, setPrice] = useState("");
  const [quanity, setQuanity] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct();
  };

  const createProduct = async () => {
    try {
      const formData = new FormData();

      formData.append("product", product);
      formData.append("code", code);
      formData.append("price", price);
      formData.append("quanity", quanity);
      formData.append("file", image);

      await axios.post(`http://localhost:5000/product`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/");
    } catch (error) {
      console.log("Error creating data: ", error);
    }
  };

  console.log(image);

  return (
    <>
      <div className="flex justify-between items-center p-8 bg-black w-screen">
        <button onClick={() => navigate("/")}>
          <IoArrowBackCircle size={40} color="white" />
        </button>
        <h1 className="text-3xl font-bold text-white">Create Product</h1>
        <button
          className="Btn bg-white hover:bg-slate-200 transition delay-150"
          type="submit"
          onClick={handleSubmit}
        >
          Create
        </button>
      </div>
      <div className="flex flex-col items-center bg-slate-100 h-screen">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6 py-10">
            <label>
              <p>Product Name</p>
              <input
                id="product"
                type="text"
                value={product}
                name="product"
                placeholder="Name of the product"
                onChange={(e) => {
                  setProduct(e.target.value);
                }}
                className="Input"
                required
              />
            </label>

            <label>
              <p>Product Code</p>
              <input
                id="code"
                type="text"
                value={code}
                name="code"
                placeholder="Code of the product"
                onChange={(e) => {
                  setCode(e.target.value);
                }}
                className="Input"
                required
              />
            </label>

            <label>
              <p>Product Price (฿)</p>
              <input
                id="price"
                type="text"
                value={price}
                name="price"
                placeholder="Fill the price(Baht)"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                className="Input"
                required
              />
            </label>

            <label>
              <p>Product Quantity</p>
              <input
                id="quanity"
                type="tel"
                value={quanity}
                name="quanity"
                placeholder="Fill Amount of the product"
                onChange={(e) => {
                  setQuanity(e.target.value);
                }}
                className="Input"
                required
              />
            </label>
          </div>

          {/* Product Picture */}
          <ImageRendering image={image} name={product} change={setImage} />
        </form>
      </div>
    </>
  );
}

export default CreateProductPage;

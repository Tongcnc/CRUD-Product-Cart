import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";
import ModalComfirmDelete from "../components/ModalConfirmDelete";
import ImageRendering from "../components/ImageRender";

function EditProductPage() {
  const navigate = useNavigate();
  const params = useParams();

  const [product, setProduct] = useState("");
  const [code, setCode] = useState("");
  const [price, setPrice] = useState("");
  const [quanity, setQuanity] = useState("");
  const [image, setImage] = useState();

  const [isOpen, setIsOpen] = useState(false);

  const getProductById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/product/${params.productId}`
      );
      console.log(response.data[0]);
      setProduct(response.data[0].product);
      setCode(response.data[0].code);
      setPrice(response.data[0].price);
      setQuanity(response.data[0].quanity);
      setImage(response.data[0].image);
      console.log(response.data[0].image);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getProductById();
  }, []);

  const updateProduct = async () => {
    try {
      const formData = new FormData();

      formData.append("product", product);
      formData.append("code", code);
      formData.append("price", price);
      formData.append("quanity", quanity);
      formData.append("file", image);

      const response = await axios.put(
        `http://localhost:5000/product/${params.productId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        console.log("Product updated successfully:", response.data);
      } else {
        console.error("Failed to update product:", response.statusText);
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error("Error while updating product:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProduct();
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center bg-slate-100 w-screen h-screen">
      <div className="flex justify-between items-center p-8 bg-black w-screen">
        <button onClick={() => navigate("/")}>
          <IoArrowBackCircle size={40} color="white" />
        </button>
        <h1 className="text-3xl font-bold text-white">Edit Product</h1>
        <div className="flex gap-4">
          <button
            className="Btn bg-white hover:bg-slate-200 active:bg-slate-100 transition delay-150"
            onClick={handleSubmit}
          >
            Save
          </button>

          <button
            className="Btn text-white bg-red-600 hover:bg-red-700 active:bg-red-500 transition delay-150"
            onClick={() => setIsOpen(!isOpen)}
          >
            Delete
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center bg-slate-100 h-screen">
        <form>
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
              <p>Product Quanity</p>
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

      {isOpen && <ModalComfirmDelete setIsOpen={setIsOpen} />}
    </div>
  );
}

export default EditProductPage;

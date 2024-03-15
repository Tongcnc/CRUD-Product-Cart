import useProducts from "../hooks/useProducts";
import { useEffect } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import { IoMdAddCircle } from "react-icons/io";
import { FaCartPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ModalCart from "../components/ModalCart";

function HomePage() {
  const { productItem, getProducts } = useProducts();

  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getProducts("");
  }, []);

  function textHandler(e) {
    getProducts(e.target.value);
  }

  // Add to cart
  const addToCart = (productId) => {
    const newProduct = [...product];
    if (!newProduct.includes(productItem[productId])) {
      newProduct.push(productItem[productId]);
      productItem[productId].quanityCart = 1;
    } else {
      productItem[productId].quanityCart =
        productItem[productId].quanityCart + 1;
    }
    setProduct(newProduct);
  };

  return (
    <div className="flex flex-col items-center bg-slate-100 pb-10 relative h-full">
      <div className="flex justify-between items-center py-8 px-14 bg-black w-screen">
        <h1 className="text-4xl font-bold text-white">Product Cart</h1>
        <input
          type="text"
          placeholder="find your product..."
          onChange={textHandler}
          className="p-2 border-b-2 w-[50%] rounded-lg text-center focus:border-b-2 focus:border-black focus:outline-none"
        />
        <div className="relative">
          <p className="absolute -top-3 -right-3 text-white bg-red-600 rounded-full w-6 h-6 text-center font-bold">
            {product.length}
          </p>
          <button onClick={() => setIsOpen(!isOpen)}>
            <FaCartShopping color="white" size={30} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-10 pt-10">
        {productItem.map((item, index) => (
          <div key={index} className="Box-item text-start">
            {/* Render Image */}
            <img
              src={`http://localhost:5000/images/` + item.image}
              alt={item.product}
              className="h-[300px] rounded object-cover"
            />

            <div className="flex justify-between">
              <h2 className="font-semibold">{item.product}</h2>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    addToCart(index);
                  }}
                >
                  <FaCartPlus />
                </button>
                <button onClick={() => navigate(`/product/edit/${item.id}`)}>
                  <BsThreeDots />
                </button>
              </div>
            </div>
            <p>price: {item.price}฿</p>
            <div className="flex justify-between">
              <p>code: {item.code}</p>
              <p>quanity: {item.quanity}</p>
            </div>
          </div>
        ))}

        <div
          className="Box-item items-center justify-center cursor-pointer"
          onClick={() => navigate("/product/create")}
        >
          <IoMdAddCircle size={70} />
          <p className="text-lg">Add Product</p>
        </div>
      </div>

      {isOpen && (
        <ModalCart
          productItem={productItem}
          product={product}
          setProduct={setProduct}
        />
      )}
    </div>
  );
}

export default HomePage;
